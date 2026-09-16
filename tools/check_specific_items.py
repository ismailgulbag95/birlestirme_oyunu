with open('src/items/ItemFactory.js', 'r', encoding='utf-8') as f:
    text = f.read()

test_items = ['cadir', 'tutun', 'tesla_bobini', 'bugday', 'gayzer', 'komur', 'yumurta', 'yercekimsiz_platform', 'virus', 'mum', 'kitap', 'harita', 'kamera', 'bina', 'otel', 'hastane', 'okul', 'tren', 'ucak', 'motosiklet', 'bisiklet', 'gemi', 'tekne', 'sandik', 'fici', 'sise', 'kadeh', 'bardak', 'vazo', 'tabak', 'kasik', 'catal', 'bicak', 'makas', 'ignelik', 'yastik', 'yorgan', 'ayna', 'tarak', 'sabun', 'sunger', 'havlu', 'supurge', 'kova', 'paspas', 'kurek', 'kazma', 'tirmik', 'balta', 'testere', 'rende', 'kerpeten', 'pense', 'tornavida', 'civata', 'somun', 'pul', 'yay', 'menteşe', 'kilit', 'anahtar']

missing = []
present = []
for it in test_items:
    if f"case '{it}':" in text:
        present.append(it)
    else:
        missing.append(it)

print(f"Present ({len(present)}):", present)
print(f"Missing ({len(missing)}):", missing)
