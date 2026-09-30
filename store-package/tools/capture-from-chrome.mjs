import fs from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

const [url, widthArg, heightArg, outputPath, scaleArg] = process.argv.slice(2);
if (!url || !widthArg || !heightArg || !outputPath) {
  throw new Error('Usage: node capture-from-chrome.mjs <url> <width> <height> <output.png> [deviceScaleFactor]');
}

const width = Number(widthArg);
const height = Number(heightArg);
const deviceScaleFactor = Number(scaleArg || 1);
const version = await fetch('http://127.0.0.1:9444/json/version').then(response => response.json());

function connectCdp(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
  let nextId = 0;
  const pending = new Map();
  const opened = new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  socket.addEventListener('message', async event => {
    const raw = typeof event.data === 'string' ? event.data : await event.data.text();
    const message = JSON.parse(raw);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    }
  });
  return {
    socket,
    opened,
    send(method, params = {}) {
      const id = ++nextId;
      return new Promise((resolve, reject) => {
        pending.set(id, message => message.error ? reject(new Error(message.error.message)) : resolve(message.result));
        socket.send(JSON.stringify({ id, method, params }));
      });
    }
  };
}

const browser = connectCdp(version.webSocketDebuggerUrl);
await browser.opened;
const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
let target;
for (let attempt = 0; attempt < 30; attempt += 1) {
  target = (await fetch('http://127.0.0.1:9444/json/list').then(response => response.json()))
    .find(candidate => candidate.id === targetId);
  if (target?.webSocketDebuggerUrl) break;
  await delay(200);
}
if (!target?.webSocketDebuggerUrl) throw new Error('Chrome did not expose the new page target');

const page = connectCdp(target.webSocketDebuggerUrl);
await page.opened;
await page.send('Page.enable');
await page.send('Emulation.setDeviceMetricsOverride', {
  width, height, deviceScaleFactor, mobile: true, screenWidth: width, screenHeight: height
});
await page.send('Page.navigate', { url });

let readyState = '';
for (let attempt = 0; attempt < 80; attempt += 1) {
  await delay(250);
  const result = await page.send('Runtime.evaluate', {
    expression: "JSON.stringify({ready:document.readyState,action:document.body?.dataset?.captureReady||'',creative:document.body?.dataset?.creativeReady||'',items:document.querySelector('#game')?.contentDocument?.querySelectorAll('#drawer-tier1-strip .tier1-item-btn').length||0,loading:document.querySelector('#game')?.contentDocument?.querySelector('#loading-screen')?.className||''})",
    returnByValue: true
  });
  readyState = result.result?.value || '';
  const state = JSON.parse(readyState);
  if (state.creative === 'true' || (state.items > 0 && (!url.includes('action=') || state.action))) break;
}
await delay(1200);

const imageFormat = /\.jpe?g$/i.test(outputPath) ? 'jpeg' : 'png';
const image = await page.send('Page.captureScreenshot', {
  format: imageFormat,
  ...(imageFormat === 'jpeg' ? { quality: 95 } : {}),
  fromSurface: true,
  captureBeyondViewport: false
});
await fs.mkdir(new URL('.', `file:///${outputPath.replaceAll('\\', '/')}`).pathname, { recursive: true }).catch(() => {});
await fs.writeFile(outputPath, Buffer.from(image.data, 'base64'));
console.log(JSON.stringify({ outputPath, width, height, readyState }));

page.socket.close();
browser.send('Target.closeTarget', { targetId }).catch(() => {});
browser.socket.close();
