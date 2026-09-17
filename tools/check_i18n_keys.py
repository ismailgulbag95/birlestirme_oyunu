import re

with open('src/ui/UIManager.js', 'r', encoding='utf-8') as f:
    ui_content = f.read()

keys_used = set(re.findall(r"i18n\.t\(['\"]([^'\"]+)['\"]", ui_content))

with open('src/i18n/translations.js', 'r', encoding='utf-8') as f:
    tr_content = f.read()

print('Total keys used in UIManager:', len(keys_used))
missing = []
for k in sorted(keys_used):
    found = f'"{k}":' in tr_content or f"'{k}':" in tr_content
    if not found:
        missing.append(k)

print(f"Missing keys ({len(missing)}):")
for m in missing:
    print(" -", m)
