import assert from 'node:assert/strict';
import test from 'node:test';
import { AdManager } from '../src/systems/AdManager.js';

test('missing ad provider reports unavailable and does not award a reward', async () => {
  const manager = new AdManager();
  const result = await manager.showRewardedAd({ rewardType: 'hint' });

  assert.equal(manager.isAdConfigured(), false);
  assert.equal(result.success, false);
  assert.equal(result.error, 'unavailable');
});

test('only a confirmed rewarded response grants a reward', async () => {
  const manager = new AdManager();
  let rewardCallbacks = 0;
  manager.onReward(() => rewardCallbacks++);

  manager.setProvider({ showRewarded: async () => ({ type: 'hint', amount: 0 }) });
  const declined = await manager.showRewardedAd({ rewardType: 'hint' });
  assert.equal(declined.success, false);
  assert.equal(rewardCallbacks, 0);

  manager.setProvider({ showRewarded: async () => ({ type: 'hint', amount: 1 }) });
  const rewarded = await manager.showRewardedAd({ rewardType: 'hint', multiplier: 2 });
  assert.equal(rewarded.success, true);
  assert.equal(rewarded.multiplier, 2);
  assert.equal(rewardCallbacks, 1);
});

test('concurrent rewarded requests are rejected', async () => {
  const manager = new AdManager();
  let finishReward;
  manager.setProvider({ showRewarded: () => new Promise(resolve => { finishReward = resolve; }) });

  const firstRequest = manager.showRewardedAd();
  await Promise.resolve();
  const secondRequest = await manager.showRewardedAd();

  assert.equal(secondRequest.success, false);
  assert.equal(secondRequest.error, 'in_progress');
  finishReward(true);
  assert.equal((await firstRequest).success, true);
});
