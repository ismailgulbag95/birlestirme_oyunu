with open('src/items/ItemFactory.js', 'r', encoding='utf-8') as f:
    text = f.read()

fixed_text = text.replace(
    'const s2 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.45, stickMat);',
    'const s2 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.45, 4), stickMat);'
)

with open('src/items/ItemFactory.js', 'w', encoding='utf-8') as f:
    f.write(fixed_text)

print("Fixed syntax error in ItemFactory.js!")
