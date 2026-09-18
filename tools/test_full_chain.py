import json

with open('tools/all_521_items.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

b_keys = set(items.keys())
reachable = set(['ates', 'su', 'toprak', 'hava'])
used = {}
recipes = {}

def track(item, a, b):
    if item not in b_keys:
        print('KEY ERROR:', item)
        return False
    if a not in reachable:
        print(f'FAIL {item}: input {a} not in reachable!')
        return False
    if b not in reachable:
        print(f'FAIL {item}: input {b} not in reachable!')
        return False
    k = tuple(sorted([a, b]))
    if k in used:
        print(f'FAIL {item}: pair ({a}, {b}) already used by {used[k]}')
        return False
    used[k] = item
    reachable.add(item)
    recipes[item] = [a, b]
    return True

# 1. Tier 2
track('camur', 'su', 'toprak')
track('lav', 'ates', 'toprak')
track('buhar', 'ates', 'su')
track('yagmur', 'su', 'hava')
track('kum', 'toprak', 'hava')
track('enerji', 'ates', 'hava')
track('deniz', 'su', 'su')

# 2. Tier 3 - Doğa & Maddeler
track('tas', 'lav', 'su')
track('obsidyen', 'lav', 'tas')
track('ruzgar', 'hava', 'enerji')
track('cam', 'kum', 'ates')
track('bulut', 'buhar', 'hava')
track('sis', 'buhar', 'toprak')
track('volkan', 'lav', 'toprak')
track('buz', 'su', 'ruzgar')
track('kar', 'bulut', 'buz')
track('dolu', 'yagmur', 'buz')
track('okyanus', 'deniz', 'su')
track('isik', 'enerji', 'ates')
track('gunes', 'isik', 'ates')
track('tuz', 'deniz', 'gunes')
track('tuzlu_su', 'su', 'tuz')
track('firtina', 'ruzgar', 'bulut')
track('yildirim', 'firtina', 'enerji')
track('fay_hatti', 'toprak', 'tas')
track('deprem', 'fay_hatti', 'enerji')
track('tsunami', 'deniz', 'deprem')
track('gol', 'yagmur', 'camur')
track('nehir', 'gol', 'tas')
track('dag', 'tas', 'fay_hatti')

# 3. Metaller, Elektrik, Demir, Çelik
track('metal', 'tas', 'ates')
track('elektrik', 'metal', 'enerji')
track('demir', 'metal', 'toprak')
track('bakir', 'metal', 'ates') # wait, tas+ates used by metal, so metal+ates = bakir!
track('altin', 'metal', 'gunes')
track('gumus', 'metal', 'isik')
track('civa', 'metal', 'su')
track('kukurt', 'volkan', 'toprak')

# 4. Yaşam, Bitkiler, İnsan
track('yasam', 'camur', 'enerji')
track('i_nsan', 'yasam', 'toprak')
track('bitki', 'yasam', 'su')
track('tohum', 'bitki', 'ruzgar')
track('agac', 'bitki', 'tohum')
track('odun', 'agac', 'tas')
track('komur', 'odun', 'ates')
track('elmas', 'komur', 'tas')
track('celik', 'demir', 'komur')
track('kagit', 'agac', 'su')
track('kalem', 'odun', 'komur') # wait, odun+ates used for komur. Kalem = odun + grafit/komur
track('yazi', 'kalem', 'kagit')
track('kitap', 'kagit', 'yazi')

# 5. Teknoloji, Alet, Bilgisayar, Robot
track('alet', 'odun', 'tas') # wait, odun+tas used by odun = agac+tas, so alet = odun + tas? alet is [odun, tas], odun is [agac, tas]!
track('bicak', 'alet', 'metal')
track('cekic', 'alet', 'demir')
track('pusula', 'demir', 'cam')
track('elektrik_motoru', 'demir', 'elektrik')
track('jenerator', 'elektrik_motoru', 'enerji')
track('bilgisayar', 'elektrik', 'cam')
track('robot', 'bilgisayar', 'demir')
track('yapay_zeka', 'bilgisayar', 'i_nsan')
track('zaman', 'kum', 'cam')

print('Explicit successful count:', len(recipes))
