with open('tools/generate_perfect_dag_tree.py', 'r', encoding='utf-8') as f:
    c = f.read()

# Replace kiymik line so that 'alet' can use ('odun', 'tas')
c = c.replace(
    'add("kiymik", ["odun", "bicak"] if "bicak" in b.reachable else ["odun", "tas"], [["odun", "tas", "agac"]], "Ahşap kıymık.")',
    'add("kiymik", ["odun", "ruzgar"], [["odun", "tas", "agac"]], "Ahşap kıymık.")'
)

with open('tools/generate_perfect_dag_tree.py', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated kiymik successfully.')
