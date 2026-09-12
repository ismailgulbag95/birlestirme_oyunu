export const ITEM_DEFINITIONS = {
  ates: {
    id: 'ates',
    name: 'Ateş',
    description: 'Saf ısı ve enerji kaynağı.',
    tier: 1,
    colorPalette: { primary: '#ff4500', secondary: '#ff8c00', emissive: '#ff2200' },
    particles: { type: 'spark', color: '#ffaa00', count: 15 },
    recipe: null,
    icon: '🔥',
    category: 'elements'
  },
  su: {
    id: 'su',
    name: 'Su',
    description: 'Hayatın kaynağı, akışkan ve berrak.',
    tier: 1,
    colorPalette: { primary: '#0077be', secondary: '#00aaff', emissive: '#003366' },
    particles: { type: 'bubble', color: '#ffffff', count: 10 },
    recipe: null,
    icon: '💧',
    category: 'elements'
  },
  toprak: {
    id: 'toprak',
    name: 'Toprak',
    description: 'Sağlam temel, kaya ve bereket.',
    tier: 1,
    colorPalette: { primary: '#5c4033', secondary: '#8b5a2b', emissive: '#2d1b0d' },
    particles: { type: 'dust', color: '#8b7355', count: 8 },
    recipe: null,
    icon: '🌍',
    category: 'elements'
  },
  hava: {
    id: 'hava',
    name: 'Hava',
    description: 'Görünmez rüzgâr, nefes ve hareket.',
    tier: 1,
    colorPalette: { primary: '#e0ffff', secondary: '#b0e0e6', emissive: '#ffffff' },
    particles: { type: 'wind', color: '#ffffff', count: 12 },
    recipe: null,
    icon: '💨',
    category: 'elements'
  },
  buhar: {
    id: 'buhar',
    name: 'Buhar',
    description: 'Ateş ve suyun dansından doğan buğu.',
    tier: 2,
    colorPalette: { primary: '#dcdcdc', secondary: '#f5f5f5', emissive: '#aaaaaa' },
    particles: { type: 'cloud', color: '#ffffff', count: 20 },
    recipe: { inputs: ['ates', 'su'] },
    icon: '♨️',
    category: 'elements'
  },
  camur: {
    id: 'camur',
    name: 'Çamur',
    description: 'Su ve toprağın yoğrulmuş hali.',
    tier: 2,
    colorPalette: { primary: '#4a3b32', secondary: '#3d2817', emissive: '#1f140b' },
    particles: { type: 'drop', color: '#5c4033', count: 8 },
    recipe: { inputs: ['su', 'toprak'] },
    icon: '🟤',
    category: 'elements'
  },
  lav: {
    id: 'lav',
    name: 'Lav',
    description: 'Ateş ve toprağın erimiş ihtişamı.',
    tier: 2,
    colorPalette: { primary: '#cf1020', secondary: '#ff4500', emissive: '#ff0000' },
    particles: { type: 'ember', color: '#ffcc00', count: 25 },
    recipe: { inputs: ['ates', 'toprak'] },
    icon: '🌋',
    category: 'elements'
  },
  kum: {
    id: 'kum',
    name: 'Kum',
    description: 'Rüzgar ve taşın aşındırdığı tanecikler.',
    tier: 4,
    colorPalette: { primary: '#e6ca65', secondary: '#f4d06f', emissive: '#c2a642' },
    particles: { type: 'grain', color: '#f4d06f', count: 15 },
    recipe: { inputs: ['ruzgar', 'tas'] },
    icon: '⏳',
    category: 'elements'
  },
  obsidyen: {
    id: 'obsidyen',
    name: 'Obsidyen',
    description: 'Su ile aniden soğuyan lavın sert camı.',
    tier: 3,
    colorPalette: { primary: '#1c1c1c', secondary: '#3b2f4f', emissive: '#4b0082' },
    particles: { type: 'shimmer', color: '#9370db', count: 12 },
    recipe: { inputs: ['su', 'lav'] },
    icon: '⬛',
    category: 'elements'
  },
  yagmur: {
    id: 'yagmur',
    name: 'Yağmur',
    description: 'Hava ve suyun buluşmasından düşen damlalar.',
    tier: 2,
    colorPalette: { primary: '#87ceeb', secondary: '#00bfff', emissive: '#006699' },
    particles: { type: 'drop', color: '#87ceeb', count: 15 },
    recipe: { inputs: ['hava', 'su'] },
    icon: '🌧️',
    category: 'elements'
  },
  enerji: {
    id: 'enerji',
    name: 'Enerji',
    description: 'Ateş ve havanın saf plazma gücü.',
    tier: 2,
    colorPalette: { primary: '#ffeb3b', secondary: '#ffc107', emissive: '#ff9800' },
    particles: { type: 'spark', color: '#ffeb3b', count: 20 },
    recipe: { inputs: ['ates', 'hava'] },
    icon: '⚡',
    category: 'elements'
  },
  ruzgar: {
    id: 'ruzgar',
    name: 'Rüzgar',
    description: 'Güçlü ve hızlı hava akımı.',
    tier: 2,
    colorPalette: { primary: '#e0f7fa', secondary: '#b2ebf2', emissive: '#80deea' },
    particles: { type: 'wind', color: '#ffffff', count: 18 },
    recipe: { inputs: ['hava', 'hava'] },
    icon: '🌬️',
    category: 'elements'
  },
  tas: {
    id: 'tas',
    name: 'Taş',
    description: 'Hava ve lavın katılaşmış sert kayası.',
    tier: 3,
    colorPalette: { primary: '#78909c', secondary: '#607d8b', emissive: '#37474f' },
    particles: { type: 'dust', color: '#78909c', count: 10 },
    recipe: { inputs: ['hava', 'lav'] },
    icon: '🪨',
    category: 'elements'
  },
  cam: {
    id: 'cam',
    name: 'Cam',
    description: 'Ateş ve kumun eriyerek şeffaflaşması.',
    tier: 5,
    colorPalette: { primary: '#e0f7fa', secondary: '#b2ebf2', emissive: '#ffffff' },
    particles: { type: 'shimmer', color: '#ffffff', count: 15 },
    recipe: { inputs: ['ates', 'kum'] },
    icon: '🔮',
    category: 'elements'
  },
  bulut: {
    id: 'bulut',
    name: 'Bulut',
    description: 'Buhar ve suyun gökyüzündeki pofuduk kümesi.',
    tier: 3,
    colorPalette: { primary: '#ffffff', secondary: '#f1f5f9', emissive: '#cbd5e1' },
    particles: { type: 'cloud', color: '#ffffff', count: 20 },
    recipe: { inputs: ['buhar', 'su'] },
    icon: '☁️',
    category: 'elements'
  },
  yildirim: {
    id: 'yildirim',
    name: 'Yıldırım',
    description: 'Bulut ve enerjinin çakan keskin şimşeği.',
    tier: 4,
    colorPalette: { primary: '#facc15', secondary: '#fde047', emissive: '#eab308' },
    particles: { type: 'spark', color: '#facc15', count: 30 },
    recipe: { inputs: ['bulut', 'enerji'] },
    icon: '⚡',
    category: 'elements'
  },
  bitki: {
    id: 'bitki',
    name: 'Bitki',
    description: 'Toprak ve yağmurun yeşerten filizi.',
    tier: 3,
    colorPalette: { primary: '#4ade80', secondary: '#22c55e', emissive: '#15803d' },
    particles: { type: 'spark', color: '#4ade80', count: 10 },
    recipe: { inputs: ['toprak', 'yagmur'] },
    icon: '🌱',
    category: 'nature'
  },
  agac: {
    id: 'agac',
    name: 'Ağaç',
    description: 'Bitki ve toprağın büyüyen güçlü gövdesi.',
    tier: 4,
    colorPalette: { primary: '#16a34a', secondary: '#854d0e', emissive: '#14532d' },
    particles: { type: 'dust', color: '#16a34a', count: 12 },
    recipe: { inputs: ['bitki', 'toprak'] },
    icon: '🌲',
    category: 'nature'
  },
  odun: {
    id: 'odun',
    name: 'Odun',
    description: 'Ağaç ve taşın işlenen kütüğü.',
    tier: 5,
    colorPalette: { primary: '#a16207', secondary: '#ca8a04', emissive: '#713f12' },
    particles: { type: 'dust', color: '#a16207', count: 10 },
    recipe: { inputs: ['agac', 'tas'] },
    icon: '🪵',
    category: 'nature'
  },
  kiymik: {
    id: 'kiymik',
    name: 'Kıymık',
    description: 'Odun ve taşın sivri talaş parçası.',
    tier: 6,
    colorPalette: { primary: '#d97706', secondary: '#fbbf24', emissive: '#b45309' },
    particles: { type: 'spark', color: '#fbbf24', count: 8 },
    recipe: { inputs: ['odun', 'tas'] },
    icon: '🥢',
    category: 'nature'
  },
  lif: {
    id: 'lif',
    name: 'Lif',
    description: 'Bitki ve bitkinin sarılan lif demeti.',
    tier: 4,
    colorPalette: { primary: '#a3e635', secondary: '#bef264', emissive: '#65a30d' },
    particles: { type: 'spark', color: '#a3e635', count: 10 },
    recipe: { inputs: ['bitki', 'bitki'] },
    icon: '🌾',
    category: 'nature'
  },
  mantar: {
    id: 'mantar',
    name: 'Mantar',
    description: 'Beyaz benekli, kırmızı şapkalı, bodur saplı orman mantarı.',
    tier: 4,
    colorPalette: { primary: '#e63946', secondary: '#f1faee', emissive: '#9d0208' },
    particles: { type: 'spark', color: '#e63946', count: 8 },
    recipe: { inputs: ['bitki', 'camur'] },
    icon: '🍄',
    category: 'nature'
  },
  pamuk: {
    id: 'pamuk',
    name: 'Pamuk',
    description: 'Kurumuş kahverengi çanak yapraklar içinde duran bembeyaz pamuk kozası.',
    tier: 4,
    colorPalette: { primary: '#ffffff', secondary: '#dda15e', emissive: '#bc6c25' },
    particles: { type: 'cloud', color: '#ffffff', count: 12 },
    recipe: { inputs: ['toprak', 'bitki', 'yagmur'] },
    icon: '☁️',
    category: 'nature'
  },
  recine: {
    id: 'recine',
    name: 'Reçine',
    description: 'Damla formunda katılaşmış, bal sarısı kehribar cevheri.',
    tier: 6,
    colorPalette: { primary: '#ffb703', secondary: '#fb8500', emissive: '#ffb703' },
    particles: { type: 'shimmer', color: '#ffb703', count: 10 },
    recipe: { inputs: ['ilkel_bicak', 'agac'] },
    icon: '🍯',
    category: 'nature'
  },
  yasam: {
    id: 'yasam',
    name: 'Yaşam',
    description: 'İçinde yeşilimsi çift sarmal DNA sembolü dönen ışıldayan öz küresi.',
    tier: 5,
    colorPalette: { primary: '#52b788', secondary: '#74c69d', emissive: '#1b4332' },
    particles: { type: 'spark', color: '#52b788', count: 25 },
    recipe: { inputs: ['enerji', 'camur', 'bitki'] },
    icon: '🧬',
    category: 'life'
  },
  kus: {
    id: 'kus',
    name: 'Kuş',
    description: 'Basit geometrik gövdeli, mavi kanatlı, sarı gagalı küçük serçe.',
    tier: 6,
    colorPalette: { primary: '#4ea8de', secondary: '#ffb703', emissive: '#023e8a' },
    particles: { type: 'wind', color: '#4ea8de', count: 15 },
    recipe: { inputs: ['hava', 'yasam'] },
    icon: '🐦',
    category: 'life'
  },
  hayvan: {
    id: 'hayvan',
    name: 'Hayvan',
    description: 'Dört narin bacağı ve kısa kuyruğu olan bloklu canlı silüeti.',
    tier: 6,
    colorPalette: { primary: '#b08968', secondary: '#dda15e', emissive: '#7f5539' },
    particles: { type: 'dust', color: '#b08968', count: 12 },
    recipe: { inputs: ['toprak', 'yasam'] },
    icon: '🦌',
    category: 'life'
  },
  balik: {
    id: 'balik',
    name: 'Balık',
    description: 'Üçgen yüzgeçli, turuncu-gümüş renkli köşeli gövdeli sazan.',
    tier: 6,
    colorPalette: { primary: '#f77f00', secondary: '#fcbf49', emissive: '#d62828' },
    particles: { type: 'drop', color: '#f77f00', count: 12 },
    recipe: { inputs: ['yasam', 'su'] },
    icon: '🐟',
    category: 'life'
  },
  ip: {
    id: 'ip',
    name: 'İp',
    description: 'Düğümlenmiş, halka şeklinde sarılı saman sarısı halat rulosu.',
    tier: 5,
    colorPalette: { primary: '#d4a373', secondary: '#e9edc9', emissive: '#bc6c25' },
    particles: { type: 'dust', color: '#d4a373', count: 8 },
    recipe: { inputs: ['lif', 'lif'] },
    icon: '🪢',
    category: 'craft_tools'
  },
  kumas: {
    id: 'kumas',
    name: 'Kumaş',
    description: 'Düzenli katlanmış, kenarları köşeli bej renkli kumaş bezi.',
    tier: 6,
    colorPalette: { primary: '#fefae0', secondary: '#dda15e', emissive: '#b08968' },
    particles: { type: 'dust', color: '#fefae0', count: 10 },
    recipe: { inputs: ['pamuk', 'ip'] },
    icon: '🧶',
    category: 'craft_tools'
  },
  komur: {
    id: 'komur',
    name: 'Kömür',
    description: 'Düzensiz yüzeylere sahip, mat siyah renkli karbon parçası.',
    tier: 5,
    colorPalette: { primary: '#212529', secondary: '#343a40', emissive: '#000000' },
    particles: { type: 'dust', color: '#212529', count: 10 },
    recipe: { inputs: ['ates', 'agac'] },
    icon: '⬛',
    category: 'craft_tools'
  },
  kul: {
    id: 'kul',
    name: 'Kül',
    description: 'İçinde sönmeye yüz tutmuş kor parçaları olan gri toz yığını.',
    tier: 6,
    colorPalette: { primary: '#adb5bd', secondary: '#6c757d', emissive: '#e56b6f' },
    particles: { type: 'dust', color: '#adb5bd', count: 15 },
    recipe: { inputs: ['komur', 'ates'] },
    icon: '💨',
    category: 'craft_tools'
  },
  kagit: {
    id: 'kagit',
    name: 'Kağıt',
    description: 'Ucu hafif kıvrılmış, açık sarı renkte dikdörtgen parşömen tabakası.',
    tier: 6,
    colorPalette: { primary: '#faedcd', secondary: '#d4a373', emissive: '#ccd5ae' },
    particles: { type: 'dust', color: '#faedcd', count: 8 },
    recipe: { inputs: ['tas', 'agac', 'su'] },
    icon: '📜',
    category: 'craft_tools'
  },
  ilkel_bicak: {
    id: 'ilkel_bicak',
    name: 'İlkel Bıçak',
    description: 'Kısa ahşap sapına iple tutturulmuş çakmaktaşı uçlu kaba bıçak.',
    tier: 6,
    colorPalette: { primary: '#7f4f24', secondary: '#343a40', emissive: '#212529' },
    particles: { type: 'spark', color: '#6c757d', count: 8 },
    recipe: { inputs: ['cakmaktasi', 'kiymik', 'odun'] },
    icon: '🔪',
    category: 'craft_tools'
  },
  kus_tuyu: {
    id: 'kus_tuyu',
    name: 'Kuş Tüyü',
    description: 'Orta damarı belirgin, ucu beyazdan gök mavisine dönen tüy.',
    tier: 7,
    colorPalette: { primary: '#e0fbfc', secondary: '#98c1d9', emissive: '#3d5a80' },
    particles: { type: 'wind', color: '#e0fbfc', count: 10 },
    recipe: { inputs: ['kus', 'ilkel_bicak'] },
    icon: '🪶',
    category: 'craft_tools'
  },
  deri: {
    id: 'deri',
    name: 'Deri',
    description: 'Kenarları asimetrik kesilmiş, taba rengi işlenmemiş post.',
    tier: 7,
    colorPalette: { primary: '#bc6c25', secondary: '#dda15e', emissive: '#9b5de5' },
    particles: { type: 'dust', color: '#bc6c25', count: 10 },
    recipe: { inputs: ['hayvan', 'ilkel_bicak'] },
    icon: '📜',
    category: 'craft_tools'
  },
  kavrulmus_et: {
    id: 'kavrulmus_et',
    name: 'Kavrulmuş Et',
    description: 'Beyaz kemik sapından tutulan, kızarmış kahverengi et butu.',
    tier: 7,
    colorPalette: { primary: '#b05721', secondary: '#f4a261', emissive: '#e76f51' },
    particles: { type: 'spark', color: '#f4a261', count: 12 },
    recipe: { inputs: ['hayvan', 'ates'] },
    icon: '🍖',
    category: 'craft_tools'
  },
  comlek: {
    id: 'comlek',
    name: 'Çömlek',
    description: 'Geniş göbekli, dar boyunlu kiremit kırmızısı pişmiş kil testi.',
    tier: 5,
    colorPalette: { primary: '#b83321', secondary: '#d9534f', emissive: '#802010' },
    particles: { type: 'dust', color: '#b83321', count: 8 },
    recipe: { inputs: ['ates', 'camur'] },
    icon: '🏺',
    category: 'craft_tools'
  },
  su_comlegi: {
    id: 'su_comlegi',
    name: 'Su Çömleği',
    description: 'Ağzından mavi su yüzeyi görünen, ıslak killi dolgun testi.',
    tier: 6,
    colorPalette: { primary: '#b83321', secondary: '#00bfff', emissive: '#006699' },
    particles: { type: 'drop', color: '#00bfff', count: 10 },
    recipe: { inputs: ['comlek', 'su'] },
    icon: '🏺',
    category: 'craft_tools'
  },
  sise: {
    id: 'sise',
    name: 'Şişe',
    description: 'Mantar tıpası olan şeffaf, silindirik cam iksir tüpü.',
    tier: 6,
    colorPalette: { primary: '#e0f7fa', secondary: '#a3704c', emissive: '#ffffff' },
    particles: { type: 'shimmer', color: '#ffffff', count: 10 },
    recipe: { inputs: ['ates', 'cam'] },
    icon: '🧪',
    category: 'craft_tools'
  },
  cakmaktasi: {
    id: 'cakmaktasi',
    name: 'Çakmaktaşı',
    description: 'Bir kenarı keskinleştirilmiş, koyu antrasit renkli yontma taş.',
    tier: 4,
    colorPalette: { primary: '#343a40', secondary: '#495057', emissive: '#212529' },
    particles: { type: 'spark', color: '#ffffff', count: 12 },
    recipe: { inputs: ['tas', 'tas'] },
    icon: '🪨',
    category: 'craft_tools'
  },
  yay: {
    id: 'yay',
    name: 'Yay',
    description: 'Uçları gergin iple birbirine bağlanmış kavisli ahşap av yayı.',
    tier: 7,
    colorPalette: { primary: '#a0522d', secondary: '#f4a261', emissive: '#654321' },
    particles: { type: 'wind', color: '#f4a261', count: 10 },
    recipe: { inputs: ['ip', 'odun'] },
    icon: '🏹',
    category: 'craft_tools'
  },
  ok: {
    id: 'ok',
    name: 'Ok',
    description: 'Ucunda sivri taş, arkasında tüy bulunan ince tahta ok.',
    tier: 8,
    colorPalette: { primary: '#8b5a2b', secondary: '#e0fbfc', emissive: '#343a40' },
    particles: { type: 'wind', color: '#e0fbfc', count: 10 },
    recipe: { inputs: ['kus_tuyu', 'kiymik', 'odun'] },
    icon: '🎯',
    category: 'craft_tools'
  },
  mesale: {
    id: 'mesale',
    name: 'Meşale',
    description: 'Başına beze sarılı reçine geçirilmiş, ucu yanan ahşap meşale.',
    tier: 7,
    colorPalette: { primary: '#8b5a2b', secondary: '#ff4500', emissive: '#ff8c00' },
    particles: { type: 'spark', color: '#ff4500', count: 15 },
    recipe: { inputs: ['lif', 'recine', 'odun'] },
    icon: '🕯️',
    category: 'craft_tools'
  },
  metal: {
    id: 'metal',
    name: 'Metal',
    description: 'İçinde parlak gri damarlar parıldayan ergitilmiş taş cevheri.',
    tier: 4,
    colorPalette: { primary: '#adb5bd', secondary: '#6c757d', emissive: '#495057' },
    particles: { type: 'shimmer', color: '#ced4da', count: 12 },
    recipe: { inputs: ['ates', 'tas'] },
    icon: '🪙',
    category: 'craft_tools'
  },
  demir_kulce: {
    id: 'demir_kulce',
    name: 'Demir Külçe',
    description: 'Pahlanmış kenarlarıyla profesyonel döküm çelik külçe.',
    tier: 5,
    colorPalette: { primary: '#ced4da', secondary: '#adb5bd', emissive: '#6c757d' },
    particles: { type: 'shimmer', color: '#ffffff', count: 15 },
    recipe: { inputs: ['ates', 'metal', 'tas'] },
    icon: '🧱',
    category: 'craft_tools'
  },
  metal_bicak: {
    id: 'metal_bicak',
    name: 'Metal Bıçak',
    description: 'Deri sarılı kabzası ve çift ağızlı parlak çelik namlulu bıçak.',
    tier: 7,
    colorPalette: { primary: '#dee2e6', secondary: '#bc6c25', emissive: '#495057' },
    particles: { type: 'spark', color: '#dee2e6', count: 10 },
    recipe: { inputs: ['demir_kulce', 'ilkel_bicak', 'odun'] },
    icon: '🗡️',
    category: 'craft_tools'
  },
  kazma: {
    id: 'kazma',
    name: 'Kazma',
    description: 'Masif ahşap sapa monte edilmiş kavisli çift taraflı demir uç.',
    tier: 6,
    colorPalette: { primary: '#adb5bd', secondary: '#8b5a2b', emissive: '#495057' },
    particles: { type: 'dust', color: '#adb5bd', count: 10 },
    recipe: { inputs: ['demir_kulce', 'tas', 'odun'] },
    icon: '⛏️',
    category: 'craft_tools'
  },
  kilic: {
    id: 'kilic',
    name: 'Kılıç',
    description: 'Çapraz korumalığı, deri kabzası ve parıldayan kesici gövdesi.',
    tier: 7,
    colorPalette: { primary: '#e9ecef', secondary: '#bc6c25', emissive: '#6c757d' },
    particles: { type: 'spark', color: '#ffffff', count: 18 },
    recipe: { inputs: ['komur', 'demir_kulce', 'odun'] },
    icon: '⚔️',
    category: 'craft_tools'
  },
  ahsap_kalkan: {
    id: 'ahsap_kalkan',
    name: 'Ahşap Kalkan',
    description: 'Tahta kalaslardan birleştirilmiş, kenarları ham deri kalkan.',
    tier: 7,
    colorPalette: { primary: '#8b5a2b', secondary: '#bc6c25', emissive: '#5c4033' },
    particles: { type: 'dust', color: '#8b5a2b', count: 10 },
    recipe: { inputs: ['deri', 'odun', 'odun'] },
    icon: '🛡️',
    category: 'craft_tools'
  },
  demir_kalkan: {
    id: 'demir_kalkan',
    name: 'Demir Kalkan',
    description: 'Perçin detaylı, parlatılmış damla formunda çelik kalkan.',
    tier: 8,
    colorPalette: { primary: '#ced4da', secondary: '#495057', emissive: '#adb5bd' },
    particles: { type: 'shimmer', color: '#ffffff', count: 12 },
    recipe: { inputs: ['demir_kulce', 'ahsap_kalkan'] },
    icon: '🛡️',
    category: 'craft_tools'
  },
  deri_zirh: {
    id: 'deri_zirh',
    name: 'Deri Zırh',
    description: 'İplerle dikişlenmiş, omuzları tokalı kahverengi yelek zırh.',
    tier: 7,
    colorPalette: { primary: '#bc6c25', secondary: '#dda15e', emissive: '#7f5539' },
    particles: { type: 'dust', color: '#bc6c25', count: 10 },
    recipe: { inputs: ['deri', 'ip'] },
    icon: '🦺',
    category: 'craft_tools'
  },
  demir_zirh: {
    id: 'demir_zirh',
    name: 'Demir Zırh',
    description: 'Parlak çelik göğüs plakası ve omuzluklardan oluşan ağır zırh.',
    tier: 8,
    colorPalette: { primary: '#ced4da', secondary: '#adb5bd', emissive: '#495057' },
    particles: { type: 'shimmer', color: '#ffffff', count: 15 },
    recipe: { inputs: ['demir_kulce', 'demir_kulce', 'deri'] },
    icon: '🛡️',
    category: 'craft_tools'
  },
  yatak: {
    id: 'yatak',
    name: 'Yatak',
    description: 'Ahşap ayaklı, üzerinde beyaz yastık ve renkli örtü olan yatak.',
    tier: 8,
    colorPalette: { primary: '#8b5a2b', secondary: '#ffffff', emissive: '#e76f51' },
    particles: { type: 'cloud', color: '#ffffff', count: 12 },
    recipe: { inputs: ['kumas', 'kus_tuyu', 'ip'] },
    icon: '🛏️',
    category: 'craft_tools'
  },

  // Kategori 5: Kimya, Simya & Büyü Eşyaları
  zehirli_sivi: {
    id: 'zehirli_sivi',
    name: 'Zehirli Sıvı',
    description: 'Mantar ve su çömleğinden elde edilen tehlikeli yeşil sıvı.',
    tier: 5,
    colorPalette: { primary: '#22c55e', secondary: '#15803d', emissive: '#00ff44' },
    particles: { type: 'drop', color: '#22c55e', count: 12 },
    recipe: { inputs: ['mantar', 'su_comlegi', null] },
    icon: '🧪',
    category: 5
  },
  zehir_sisesi: {
    id: 'zehir_sisesi',
    name: 'Zehir Şişesi',
    description: 'Şişelenmiş ölümcül zehirli iksir.',
    tier: 6,
    colorPalette: { primary: '#16a34a', secondary: '#4ade80', emissive: '#16a34a' },
    particles: { type: 'spark', color: '#22c55e', count: 10 },
    recipe: { inputs: ['sise', 'zehirli_sivi', null] },
    icon: '🍾',
    category: 5
  },
  zehirli_kilic: {
    id: 'zehirli_kilic',
    name: 'Zehirli Kılıç',
    description: 'Ölümcül zehirle kaplanmış çelik kılıç.',
    tier: 8,
    colorPalette: { primary: '#15803d', secondary: '#86efac', emissive: '#22c55e' },
    particles: { type: 'spark', color: '#86efac', count: 15 },
    recipe: { inputs: ['kilic', 'zehir_sisesi', null] },
    icon: '🗡️',
    category: 5
  },
  sifa_iksiri: {
    id: 'sifa_iksiri',
    name: 'Şifa İksiri',
    description: 'Bitki, şişe ve su çömleğinden hazırlanan can verici iksir.',
    tier: 6,
    colorPalette: { primary: '#ef4444', secondary: '#f87171', emissive: '#dc2626' },
    particles: { type: 'spark', color: '#ef4444', count: 15 },
    recipe: { inputs: ['bitki', 'sise', 'su_comlegi'] },
    icon: '🧪',
    category: 5
  },
  mana_iksiri: {
    id: 'mana_iksiri',
    name: 'Mana İksiri',
    description: 'Enerji, şişe ve su çömleği ile özütlenen büyülü mana iksiri.',
    tier: 6,
    colorPalette: { primary: '#3b82f6', secondary: '#60a5fa', emissive: '#2563eb' },
    particles: { type: 'spark', color: '#3b82f6', count: 15 },
    recipe: { inputs: ['enerji', 'sise', 'su_comlegi'] },
    icon: '🧪',
    category: 5
  },
  barut: {
    id: 'barut',
    name: 'Barut',
    description: 'Kömür, kül ve reçineden yapılan patlayıcı siyah toz.',
    tier: 7,
    colorPalette: { primary: '#374151', secondary: '#1f2937', emissive: '#f59e0b' },
    particles: { type: 'dust', color: '#f59e0b', count: 15 },
    recipe: { inputs: ['komur', 'kul', 'recine'] },
    icon: '💥',
    category: 5
  },
  bomba: {
    id: 'bomba',
    name: 'Bomba',
    description: 'Barut, demir külçe ve ip ile hazırlanan yıkıcı patlayıcı.',
    tier: 8,
    colorPalette: { primary: '#111827', secondary: '#f59e0b', emissive: '#ef4444' },
    particles: { type: 'spark', color: '#ef4444', count: 20 },
    recipe: { inputs: ['barut', 'demir_kulce', 'ip'] },
    icon: '💣',
    category: 5
  },
  buyu_parsomeni: {
    id: 'buyu_parsomeni',
    name: 'Büyü Parşömeni',
    description: 'Kağıt, kül ve kuş tüyü ile yazılan kadim tılsımlı parşömen.',
    tier: 7,
    colorPalette: { primary: '#a855f7', secondary: '#c084fc', emissive: '#9333ea' },
    particles: { type: 'shimmer', color: '#c084fc', count: 15 },
    recipe: { inputs: ['kagit', 'kul', 'kus_tuyu'] },
    icon: '📜',
    category: 5
  },
  yildirim_parsomeni: {
    id: 'yildirim_parsomeni',
    name: 'Yıldırım Parşömeni',
    description: 'Büyü parşömeni ve yıldırımın gücüyle yüklenmiş parşömen.',
    tier: 8,
    colorPalette: { primary: '#eab308', secondary: '#fde047', emissive: '#ca8a04' },
    particles: { type: 'spark', color: '#fde047', count: 20 },
    recipe: { inputs: ['buyu_parsomeni', 'yildirim', null] },
    icon: '⚡',
    category: 5
  },
  ates_topu_kitabi: {
    id: 'ates_topu_kitabi',
    name: 'Ateş Topu Kitabı',
    description: 'Ateş ve büyü parşömeninden oluşan alevli büyü kitabı.',
    tier: 8,
    colorPalette: { primary: '#f97316', secondary: '#fb923c', emissive: '#ea580c' },
    particles: { type: 'ember', color: '#f97316', count: 25 },
    recipe: { inputs: ['ates', 'buyu_parsomeni', null] },
    icon: '📖',
    category: 5
  },

  // Kategori 6: Mekanik & Medeniyet Eşyaları
  buhar_motoru: {
    id: 'buhar_motoru',
    name: 'Buhar Motoru',
    description: 'Buhar, demir külçe ve kömürün basınçlı gücüyle çalışan ağır mekanik pistonlu motor.',
    tier: 7,
    colorPalette: { primary: '#475569', secondary: '#94a3b8', emissive: '#f59e0b' },
    particles: { type: 'cloud', color: '#ffffff', count: 15 },
    recipe: { inputs: ['buhar', 'demir_kulce', 'komur'] },
    icon: '⚙️',
    category: 6
  },
  tekerlek: {
    id: 'tekerlek',
    name: 'Tekerlek',
    description: 'Odun ve taştan yontulmuş, pürüzsüz dönen dairesel ahşap tekerlek.',
    tier: 6,
    colorPalette: { primary: '#8b5a2b', secondary: '#a0522d', emissive: '#5c4033' },
    particles: { type: 'dust', color: '#8b5a2b', count: 10 },
    recipe: { inputs: ['odun', 'odun', 'tas'] },
    icon: '🛞',
    category: 6
  },
  el_arabasi: {
    id: 'el_arabasi',
    name: 'El Arabası',
    description: 'Demir külçe, odun ve tekerlekten yapılmış taşıma arabası.',
    tier: 7,
    colorPalette: { primary: '#a16207', secondary: '#64748b', emissive: '#475569' },
    particles: { type: 'dust', color: '#a16207', count: 12 },
    recipe: { inputs: ['demir_kulce', 'odun', 'tekerlek'] },
    icon: '🛒',
    category: 6
  },
  lokomotif: {
    id: 'lokomotif',
    name: 'Lokomotif',
    description: 'Buhar motoru, demir ve tekerleklerle inşa edilmiş dev raylı tren başı.',
    tier: 9,
    colorPalette: { primary: '#1e293b', secondary: '#ef4444', emissive: '#f59e0b' },
    particles: { type: 'cloud', color: '#cbd5e1', count: 20 },
    recipe: { inputs: ['buhar_motoru', 'demir_kulce', 'tekerlek'] },
    icon: '🚂',
    category: 6
  },
  ampul: {
    id: 'ampul',
    name: 'Ampul',
    description: 'Cam, metal ve yıldırımın gücüyle akkor ışık saçan cam tüp.',
    tier: 7,
    colorPalette: { primary: '#facc15', secondary: '#fef08a', emissive: '#eab308' },
    particles: { type: 'spark', color: '#facc15', count: 15 },
    recipe: { inputs: ['cam', 'metal', 'yildirim'] },
    icon: '💡',
    category: 6
  },
  fener: {
    id: 'fener',
    name: 'Fener',
    description: 'Ampul, demir külçe ve enerjiyle çalışan parıltılı el feneri.',
    tier: 8,
    colorPalette: { primary: '#eab308', secondary: '#38bdf8', emissive: '#fef08a' },
    particles: { type: 'shimmer', color: '#fde047', count: 15 },
    recipe: { inputs: ['ampul', 'demir_kulce', 'enerji'] },
    icon: '🔦',
    category: 6
  },
  pusula: {
    id: 'pusula',
    name: 'Pusula',
    description: 'Cam ve demir kadran içinde yön gösteren manyetik pusula.',
    tier: 7,
    colorPalette: { primary: '#0284c7', secondary: '#e2e8f0', emissive: '#38bdf8' },
    particles: { type: 'shimmer', color: '#38bdf8', count: 10 },
    recipe: { inputs: ['cam', 'cam', 'demir_kulce'] },
    icon: '🧭',
    category: 6
  },
  miknatis: {
    id: 'miknatis',
    name: 'Mıknatıs',
    description: 'Yıldırım çarpmasıyla manyetize olmuş kavisli çelik demir.',
    tier: 7,
    colorPalette: { primary: '#dc2626', secondary: '#2563eb', emissive: '#ef4444' },
    particles: { type: 'spark', color: '#ef4444', count: 15 },
    recipe: { inputs: ['demir_kulce', 'yildirim', null] },
    icon: '🧲',
    category: 6
  },
  elektrik_motoru: {
    id: 'elektrik_motoru',
    name: 'Elektrik Motoru',
    description: 'Enerji, metal ve mıknatıs ile dönen bobinli elektromanyetik motor.',
    tier: 8,
    colorPalette: { primary: '#0284c7', secondary: '#f59e0b', emissive: '#38bdf8' },
    particles: { type: 'spark', color: '#38bdf8', count: 18 },
    recipe: { inputs: ['enerji', 'metal', 'miknatis'] },
    icon: '⚡',
    category: 6
  },

  // Kategori 7: Ağır Sanayi, Metalurji ve İleri İnşaat Eşyaları
  celik_kulce: {
    id: 'celik_kulce',
    name: 'Çelik Külçe',
    description: 'Ateş, demir ve kömürün yüksek ısıda eritilmesiyle elde edilen dayanıklı alaşım.',
    tier: 7,
    colorPalette: { primary: '#64748b', secondary: '#94a3b8', emissive: '#cbd5e1' },
    particles: { type: 'spark', color: '#cbd5e1', count: 15 },
    recipe: { inputs: ['ates', 'demir_kulce', 'komur'] },
    icon: '🧱',
    category: 7
  },
  ors: {
    id: 'ors',
    name: 'Örs',
    description: 'Çelik külçe ve taştan yontulmuş demirci örsü.',
    tier: 8,
    colorPalette: { primary: '#334155', secondary: '#475569', emissive: '#1e293b' },
    particles: { type: 'spark', color: '#94a3b8', count: 12 },
    recipe: { inputs: ['celik_kulce', 'tas', null] },
    icon: '⚒️',
    category: 7
  },
  civi: {
    id: 'civi',
    name: 'Çivi',
    description: 'Ocakta dövülmüş sivri uçlu çelik bağlantı çivisi.',
    tier: 6,
    colorPalette: { primary: '#94a3b8', secondary: '#cbd5e1', emissive: '#64748b' },
    particles: { type: 'spark', color: '#cbd5e1', count: 8 },
    recipe: { inputs: ['ates', 'demir_kulce', null] },
    icon: '📌',
    category: 7
  },
  tugla: {
    id: 'tugla',
    name: 'Tuğla',
    description: 'Fırınlanmış kiremit rengi inşaat bloğu.',
    tier: 5,
    colorPalette: { primary: '#ea580c', secondary: '#c2410c', emissive: '#9a3412' },
    particles: { type: 'dust', color: '#ea580c', count: 10 },
    recipe: { inputs: ['ates', 'camur', null] },
    icon: '🧱',
    category: 7
  },
  harc: {
    id: 'harc',
    name: 'Harç',
    description: 'Kum, su ve taş tozundan yoğrulmuş inşaat bağlayıcısı.',
    tier: 6,
    colorPalette: { primary: '#a8a29e', secondary: '#78716c', emissive: '#57534e' },
    particles: { type: 'dust', color: '#a8a29e', count: 10 },
    recipe: { inputs: ['kum', 'su', 'tas'] },
    icon: '🪨',
    category: 7
  },
  tugla_duvar: {
    id: 'tugla_duvar',
    name: 'Tuğla Duvar',
    description: 'Harç ve tuğlaların örülmesiyle yapılmış sağlam yapı duvarı.',
    tier: 7,
    colorPalette: { primary: '#c2410c', secondary: '#a8a29e', emissive: '#7c2d12' },
    particles: { type: 'dust', color: '#c2410c', count: 12 },
    recipe: { inputs: ['harc', 'tugla', null] },
    icon: '🧱',
    category: 7
  },
  saglam_sandik: {
    id: 'saglam_sandik',
    name: 'Sağlam Sandık',
    description: 'Çelik külçe, çivi ve ahşapla güçlendirilmiş kilitli sandık.',
    tier: 8,
    colorPalette: { primary: '#854d0e', secondary: '#64748b', emissive: '#eab308' },
    particles: { type: 'spark', color: '#eab308', count: 12 },
    recipe: { inputs: ['celik_kulce', 'civi', 'odun'] },
    icon: '🧰',
    category: 7
  },
  kristal: {
    id: 'kristal',
    name: 'Kristal',
    description: 'Enerji ve kazma yardımıyla derinden çıkarılan parıltılı kristal cevheri.',
    tier: 7,
    colorPalette: { primary: '#38bdf8', secondary: '#818cf8', emissive: '#0284c7' },
    particles: { type: 'shimmer', color: '#38bdf8', count: 20 },
    recipe: { inputs: ['enerji', 'kazma', 'tas'] },
    icon: '💎',
    category: 7
  },
  teleskop: {
    id: 'teleskop',
    name: 'Teleskop',
    description: 'Cam, kristal ve metal merceklerden oluşan gökyüzü gözlem tüpü.',
    tier: 8,
    colorPalette: { primary: '#f59e0b', secondary: '#38bdf8', emissive: '#eab308' },
    particles: { type: 'shimmer', color: '#38bdf8', count: 18 },
    recipe: { inputs: ['cam', 'kristal', 'metal'] },
    icon: '🔭',
    category: 7
  },
  vinc: {
    id: 'vinc',
    name: 'Vinç',
    description: 'Çelik külçe, elektrik motoru ve tekerleklerle çalışan ağır yük kaldırıcı vinç.',
    tier: 9,
    colorPalette: { primary: '#eab308', secondary: '#1e293b', emissive: '#ca8a04' },
    particles: { type: 'spark', color: '#eab308', count: 22 },
    recipe: { inputs: ['celik_kulce', 'elektrik_motoru', 'tekerlek'] },
    icon: '🏗️',
    category: 7
  },

  // Kategori VIII: Kadim Kozmoloji, Boyutlar & Esrarengiz Güçler Eşyaları
  yildiz_tozu: {
    id: 'yildiz_tozu',
    name: 'Yıldız Tozu',
    description: 'Teleskopla gözlemlenen ve enerjiyle toplanan parıltılı kozmik toz.',
    tier: 8,
    colorPalette: { primary: '#a855f7', secondary: '#e0e7ff', emissive: '#c084fc' },
    particles: { type: 'shimmer', color: '#e0e7ff', count: 20 },
    recipe: { inputs: ['enerji', 'teleskop', null] },
    icon: '✨',
    category: 8
  },
  prizma_tasi: {
    id: 'prizma_tasi',
    name: 'Prizma Taşı',
    description: 'Kristal ve yıldız tozunun birleşimiyle ışığı tayflara ayıran kadim taş.',
    tier: 9,
    colorPalette: { primary: '#38bdf8', secondary: '#f43f5e', emissive: '#a855f7' },
    particles: { type: 'shimmer', color: '#38bdf8', count: 20 },
    recipe: { inputs: ['kristal', 'yildiz_tozu', null] },
    icon: '💎',
    category: 8
  },
  kahin_kuresi: {
    id: 'kahin_kuresi',
    name: 'Kahin Küresi',
    description: 'Prizma taşı, cam ve enerjiyle geleceği gösteren mistik küre.',
    tier: 9,
    colorPalette: { primary: '#6366f1', secondary: '#a855f7', emissive: '#818cf8' },
    particles: { type: 'shimmer', color: '#818cf8', count: 22 },
    recipe: { inputs: ['cam', 'enerji', 'prizma_tasi'] },
    icon: '🔮',
    category: 8
  },
  portal_runu: {
    id: 'portal_runu',
    name: 'Portal Rünü',
    description: 'Büyü parşömeni ve yıldız tozuyla mühürlenmiş uzay-zaman rünü.',
    tier: 8,
    colorPalette: { primary: '#ec4899', secondary: '#a855f7', emissive: '#f43f5e' },
    particles: { type: 'spark', color: '#ec4899', count: 18 },
    recipe: { inputs: ['buyu_parsomeni', 'yildiz_tozu', null] },
    icon: '🧿',
    category: 8
  },
  bosluk_sisesi: {
    id: 'bosluk_sisesi',
    name: 'Boşluk Şişesi',
    description: 'Kristal, şişe ve yıldırım gücüyle karanlık boşluğu hapseden iksir tüpü.',
    tier: 9,
    colorPalette: { primary: '#1e1b4b', secondary: '#312e81', emissive: '#4c1d95' },
    particles: { type: 'spark', color: '#818cf8', count: 18 },
    recipe: { inputs: ['kristal', 'sise', 'yildirim'] },
    icon: '🌌',
    category: 8
  },
  boyut_kapisi: {
    id: 'boyut_kapisi',
    name: 'Boyut Kapısı',
    description: 'Çelik külçe, portal rünü ve tuğla duvardan inşa edilmiş geçit kapısı.',
    tier: 10,
    colorPalette: { primary: '#7e22ce', secondary: '#3b82f6', emissive: '#a855f7' },
    particles: { type: 'shimmer', color: '#c084fc', count: 25 },
    recipe: { inputs: ['celik_kulce', 'portal_runu', 'tugla_duvar'] },
    icon: '🚪',
    category: 8
  },
  anka_kulu: {
    id: 'anka_kulu',
    name: 'Anka Külü',
    description: 'Kutsal ateş ve küllerle sonsuz döngüde küllerinden doğan mistik anka külü.',
    tier: 9,
    colorPalette: { primary: '#ef4444', secondary: '#f97316', emissive: '#f59e0b' },
    particles: { type: 'ember', color: '#f59e0b', count: 25 },
    recipe: { inputs: ['anka_kulu', 'ates', 'kul'] },
    icon: '🪶',
    category: 8
  },
  runik_zirh: {
    id: 'runik_zirh',
    name: 'Runik Zırh',
    description: 'Demir zırhın örşte prizma taşı ile işlenmiş efsanevi koruyucu zırhı.',
    tier: 10,
    colorPalette: { primary: '#3b82f6', secondary: '#e2e8f0', emissive: '#60a5fa' },
    particles: { type: 'shimmer', color: '#60a5fa', count: 20 },
    recipe: { inputs: ['demir_zirh', 'ors', 'prizma_tasi'] },
    icon: '🛡️',
    category: 8
  },
  firtina_kilici: {
    id: 'firtina_kilici',
    name: 'Fırtına Kılıcı',
    description: 'Kılıca prizma taşı ve yıldırım çakılarak dövülmüş elektrikli kılıç.',
    tier: 10,
    colorPalette: { primary: '#0284c7', secondary: '#facc15', emissive: '#38bdf8' },
    particles: { type: 'spark', color: '#facc15', count: 22 },
    recipe: { inputs: ['kilic', 'prizma_tasi', 'yildirim'] },
    icon: '⚔️',
    category: 8
  },
  yildiz_gecidi_cekirdegi: {
    id: 'yildiz_gecidi_cekirdegi',
    name: 'Yıldız Geçidi Çekirdeği',
    description: 'Boşluk şişesi, kahin küresi ve portal rününün birleşimiyle evrenin kalbi.',
    tier: 11,
    colorPalette: { primary: '#d946ef', secondary: '#06b6d4', emissive: '#f43f5e' },
    particles: { type: 'shimmer', color: '#d946ef', count: 30 },
    recipe: { inputs: ['bosluk_sisesi', 'kahin_kuresi', 'portal_runu'] },
    icon: '🌌',
    category: 8
  },

  // === 32 Yeni Eşya Tanımları ===
  // Kat 1
  kar: {
    id: 'kar',
    name: 'Kar',
    description: 'Hava ve yağmurun dondurucu soğukta kristalleşmesi.',
    tier: 3,
    colorPalette: { primary: '#f8fafc', secondary: '#e2e8f0', emissive: '#ffffff' },
    particles: { type: 'cloud', color: '#ffffff', count: 15 },
    recipe: { inputs: ['hava', 'yagmur', null] },
    icon: '❄️',
    category: 1
  },
  buz: {
    id: 'buz',
    name: 'Buz',
    description: 'Sıkışmış kar tanelerinin donmasıyla oluşan sert, şeffaf kütle.',
    tier: 4,
    colorPalette: { primary: '#38bdf8', secondary: '#bae6fd', emissive: '#7dd3fc' },
    particles: { type: 'shimmer', color: '#bae6fd', count: 15 },
    recipe: { inputs: ['kar', 'kar', null] },
    icon: '🧊',
    category: 1
  },
  col: {
    id: 'col',
    name: 'Çöl',
    description: 'Rüzgarın toprağı aşındırıp savurmasıyla oluşan sonsuz kum denizi.',
    tier: 4,
    colorPalette: { primary: '#f59e0b', secondary: '#d97706', emissive: '#fbbf24' },
    particles: { type: 'grain', color: '#f59e0b', count: 15 },
    recipe: { inputs: ['ruzgar', 'toprak', null] },
    icon: '🏜️',
    category: 1
  },

  // Kat 2
  tohum: {
    id: 'tohum',
    name: 'Tohum',
    description: 'Bitki, toprak ve yağmurun bereketinden doğan hayat tanesi.',
    tier: 4,
    colorPalette: { primary: '#a16207', secondary: '#ca8a04', emissive: '#854d0e' },
    particles: { type: 'dust', color: '#ca8a04', count: 10 },
    recipe: { inputs: ['bitki', 'toprak', 'yagmur'] },
    icon: '🌱',
    category: 2
  },
  bugday: {
    id: 'bugday',
    name: 'Buğday',
    description: 'Tohum ve su ile yetişen altın sarısı başak.',
    tier: 5,
    colorPalette: { primary: '#eab308', secondary: '#fde047', emissive: '#ca8a04' },
    particles: { type: 'dust', color: '#fde047', count: 12 },
    recipe: { inputs: ['bugday', 'su', 'tohum'] },
    icon: '🌾',
    category: 2
  },
  nane: {
    id: 'nane',
    name: 'Nane',
    description: 'Buzlu soğukta ferahlatıcı aromasıyla yetişen yeşil nane yaprağı.',
    tier: 4,
    colorPalette: { primary: '#10b981', secondary: '#34d399', emissive: '#059669' },
    particles: { type: 'spark', color: '#34d399', count: 10 },
    recipe: { inputs: ['bitki', 'buz', null] },
    icon: '🌿',
    category: 2
  },
  agac_kabugu: {
    id: 'agac_kabugu',
    name: 'Ağaç Kabuğu',
    description: 'Metal bıçakla ağaçtan soyulmuş sert dış kabuk dokusu.',
    tier: 5,
    colorPalette: { primary: '#78350f', secondary: '#92400e', emissive: '#451a03' },
    particles: { type: 'dust', color: '#78350f', count: 10 },
    recipe: { inputs: ['agac', 'metal_bicak', null] },
    icon: '🪵',
    category: 2
  },

  // Kat 3
  inek: {
    id: 'inek',
    name: 'İnek',
    description: 'Toprakta beslenen uysal ve verimli büyükbaş hayvan.',
    tier: 7,
    colorPalette: { primary: '#f8fafc', secondary: '#1e293b', emissive: '#cbd5e1' },
    particles: { type: 'dust', color: '#f8fafc', count: 10 },
    recipe: { inputs: ['hayvan', 'toprak', null] },
    icon: '🐄',
    category: 3
  },
  sut: {
    id: 'sut',
    name: 'Süt',
    description: 'Çömleğe sağılmış taze, besleyici beyaz süt.',
    tier: 8,
    colorPalette: { primary: '#ffffff', secondary: '#f1f5f9', emissive: '#e2e8f0' },
    particles: { type: 'drop', color: '#ffffff', count: 12 },
    recipe: { inputs: ['comlek', 'inek', null] },
    icon: '🥛',
    category: 3
  },
  yumurta: {
    id: 'yumurta',
    name: 'Yumurta',
    description: 'Tohumla beslenen kuşun yumurtladığı pürüzsüz yumurta.',
    tier: 7,
    colorPalette: { primary: '#fef3c7', secondary: '#fde68a', emissive: '#fef08a' },
    particles: { type: 'dust', color: '#fef3c7', count: 8 },
    recipe: { inputs: ['kus', 'tohum', null] },
    icon: '🥚',
    category: 3
  },
  mercan: {
    id: 'mercan',
    name: 'Mercan',
    description: 'Balık ve su bitkilerinin ekosisteminde oluşan renkli deniz mercanı.',
    tier: 7,
    colorPalette: { primary: '#f43f5e', secondary: '#fb7185', emissive: '#e11d48' },
    particles: { type: 'drop', color: '#fb7185', count: 12 },
    recipe: { inputs: ['balik', 'bitki', 'su'] },
    icon: '🪸',
    category: 3
  },

  // Kat 4
  olta: {
    id: 'olta',
    name: 'Olta',
    description: 'Ahşap çubuk ve ipe bağlı balık iğnesi.',
    tier: 7,
    colorPalette: { primary: '#8b5a2b', secondary: '#cbd5e1', emissive: '#d4a373' },
    particles: { type: 'drop', color: '#38bdf8', count: 10 },
    recipe: { inputs: ['balik', 'ip', 'odun'] },
    icon: '🎣',
    category: 4
  },
  yelken: {
    id: 'yelken',
    name: 'Yelken',
    description: 'Rüzgarı yakalamak için ahşap direkte gerilmiş dayanıklı kumaş.',
    tier: 7,
    colorPalette: { primary: '#f8fafc', secondary: '#94a3b8', emissive: '#e2e8f0' },
    particles: { type: 'wind', color: '#ffffff', count: 12 },
    recipe: { inputs: ['kumas', 'odun', null] },
    icon: '⛵',
    category: 4
  },
  sal: {
    id: 'sal',
    name: 'Sal',
    description: 'İp ve odunlarla bağlanan yelkenli deniz taşıtı.',
    tier: 8,
    colorPalette: { primary: '#78350f', secondary: '#f8fafc', emissive: '#92400e' },
    particles: { type: 'drop', color: '#38bdf8', count: 12 },
    recipe: { inputs: ['ip', 'odun', 'yelken'] },
    icon: '🛶',
    category: 4
  },
  obsidyen_bicak: {
    id: 'obsidyen_bicak',
    name: 'Obsidyen Bıçak',
    description: 'Sivri obsidyen ve ahşap sapın iplerle bağlanmasıyla oluşan keskin bıçak.',
    tier: 7,
    colorPalette: { primary: '#0f172a', secondary: '#8b5a2b', emissive: '#334155' },
    particles: { type: 'spark', color: '#94a3b8', count: 10 },
    recipe: { inputs: ['ip', 'obsidyen', 'odun'] },
    icon: '🔪',
    category: 4
  },

  // Kat 5
  peynir: {
    id: 'peynir',
    name: 'Peynir',
    description: 'Isıtılan sütün mayalanmasıyla elde edilen lezzetli peynir bloğu.',
    tier: 8,
    colorPalette: { primary: '#facc15', secondary: '#fde047', emissive: '#eab308' },
    particles: { type: 'dust', color: '#fde047', count: 10 },
    recipe: { inputs: ['ates', 'sut', null] },
    icon: '🧀',
    category: 5
  },
  un: {
    id: 'un',
    name: 'Un',
    description: 'Buğdayın taş değirmende öğütülmesiyle oluşan ince beyaz toz.',
    tier: 6,
    colorPalette: { primary: '#fef3c7', secondary: '#ffffff', emissive: '#fde68a' },
    particles: { type: 'dust', color: '#ffffff', count: 12 },
    recipe: { inputs: ['bugday', 'tas', null] },
    icon: '🌾',
    category: 5
  },
  hamur: {
    id: 'hamur',
    name: 'Hamur',
    description: 'Un ve suyun yoğrulmasıyla hazırlanan ekmek hamuru.',
    tier: 7,
    colorPalette: { primary: '#fef08a', secondary: '#fde047', emissive: '#eab308' },
    particles: { type: 'dust', color: '#fef08a', count: 10 },
    recipe: { inputs: ['su', 'un', null] },
    icon: '🍞',
    category: 5
  },
  ekmek: {
    id: 'ekmek',
    name: 'Ekmek',
    description: 'Fırında pişen mis kokulu kızarmış somun ekmek.',
    tier: 8,
    colorPalette: { primary: '#b45309', secondary: '#d97706', emissive: '#78350f' },
    particles: { type: 'spark', color: '#d97706', count: 10 },
    recipe: { inputs: ['ates', 'hamur', null] },
    icon: '🍞',
    category: 5
  },

  // Kat 6
  disli_cark: {
    id: 'disli_cark',
    name: 'Dişli Çark',
    description: 'Demir külçe ve çivilerden üretilmiş hassas mekanik dişli.',
    tier: 7,
    colorPalette: { primary: '#64748b', secondary: '#cbd5e1', emissive: '#475569' },
    particles: { type: 'spark', color: '#cbd5e1', count: 12 },
    recipe: { inputs: ['civi', 'demir_kulce', null] },
    icon: '⚙️',
    category: 6
  },
  degirmen: {
    id: 'degirmen',
    name: 'Değirmen',
    description: 'Buhar motoru ve dişlilerle çalışan dev öğütme tesisi.',
    tier: 9,
    colorPalette: { primary: '#78350f', secondary: '#64748b', emissive: '#f59e0b' },
    particles: { type: 'dust', color: '#f59e0b', count: 15 },
    recipe: { inputs: ['buhar_motoru', 'disli_cark', 'odun'] },
    icon: '🛞',
    category: 6
  },
  ayna: {
    id: 'ayna',
    name: 'Ayna',
    description: 'Cam, metal ve enerji pürüzsüzlüğü ile ışığı yansıtan parlak yüzey.',
    tier: 7,
    colorPalette: { primary: '#e2e8f0', secondary: '#38bdf8', emissive: '#ffffff' },
    particles: { type: 'shimmer', color: '#ffffff', count: 15 },
    recipe: { inputs: ['cam', 'enerji', 'metal'] },
    icon: '🪞',
    category: 6
  },
  saat: {
    id: 'saat',
    name: 'Saat',
    description: 'İnce dişliler ve enerjiyle tıkır tıkır zamanı ölçen mekanizma.',
    tier: 8,
    colorPalette: { primary: '#eab308', secondary: '#94a3b8', emissive: '#fde047' },
    particles: { type: 'spark', color: '#fde047', count: 12 },
    recipe: { inputs: ['demir_kulce', 'disli_cark', 'enerji'] },
    icon: '⏰',
    category: 6
  },

  // Kat 7
  demir_parmaklik: {
    id: 'demir_parmaklik',
    name: 'Demir Parmaklık',
    description: 'Dövülmüş çelik çubuklardan oluşan sağlam demir parmaklık.',
    tier: 7,
    colorPalette: { primary: '#334155', secondary: '#64748b', emissive: '#1e293b' },
    particles: { type: 'spark', color: '#94a3b8', count: 10 },
    recipe: { inputs: ['ates', 'demir_kulce', 'demir_kulce'] },
    icon: '🧱',
    category: 7
  },
  savas_baltasi: {
    id: 'savas_baltasi',
    name: 'Savaş Baltası',
    description: 'Çelik külçe ve ahşap saptan yapılan ağır kesici balta.',
    tier: 8,
    colorPalette: { primary: '#475569', secondary: '#78350f', emissive: '#94a3b8' },
    particles: { type: 'spark', color: '#cbd5e1', count: 12 },
    recipe: { inputs: ['celik_kulce', 'odun', null] },
    icon: '🪓',
    category: 7
  },
  gozetleme_kulesi: {
    id: 'gozetleme_kulesi',
    name: 'Gözetleme Kulesi',
    description: 'Harç ve tuğlalardan yükselen heybetli savunma kulesi.',
    tier: 8,
    colorPalette: { primary: '#c2410c', secondary: '#78716c', emissive: '#9a3412' },
    particles: { type: 'dust', color: '#c2410c', count: 15 },
    recipe: { inputs: ['harc', 'tugla', 'tugla'] },
    icon: '🏰',
    category: 7
  },
  kale_kapisi: {
    id: 'kale_kapisi',
    name: 'Kale Kapısı',
    description: 'Çelik külçe, çivi ve demir parmaklıklarla zırhlanmış dev kale kapısı.',
    tier: 9,
    colorPalette: { primary: '#1e293b', secondary: '#475569', emissive: '#64748b' },
    particles: { type: 'spark', color: '#94a3b8', count: 15 },
    recipe: { inputs: ['celik_kulce', 'civi', 'demir_parmaklik'] },
    icon: '🚪',
    category: 7
  },

  // Kat 8
  buz_runu: {
    id: 'buz_runu',
    name: 'Buz Rünü',
    description: 'Buz ve büyü parşömeniyle dondurucu soğuk mühürü.',
    tier: 8,
    colorPalette: { primary: '#0284c7', secondary: '#38bdf8', emissive: '#7dd3fc' },
    particles: { type: 'shimmer', color: '#7dd3fc', count: 18 },
    recipe: { inputs: ['buz', 'buyu_parsomeni', null] },
    icon: '❄️',
    category: 8
  },
  cehennem_tasi: {
    id: 'cehennem_tasi',
    name: 'Cehennem Taşı',
    description: 'Ateş, obsidyen ve portal rününün alevli boyutsal kayası.',
    tier: 9,
    colorPalette: { primary: '#dc2626', secondary: '#1e293b', emissive: '#f97316' },
    particles: { type: 'ember', color: '#f97316', count: 20 },
    recipe: { inputs: ['ates', 'obsidyen', 'portal_runu'] },
    icon: '🔥',
    category: 8
  },
  zaman_kum_saati: {
    id: 'zaman_kum_saati',
    name: 'Zaman Kum Saati',
    description: 'Kristal, portal rünü ve saat ile zamanı akıtan mistik kum saati.',
    tier: 10,
    colorPalette: { primary: '#f59e0b', secondary: '#ec4899', emissive: '#fbbf24' },
    particles: { type: 'shimmer', color: '#fbbf24', count: 22 },
    recipe: { inputs: ['kristal', 'portal_runu', 'saat'] },
    icon: '⏳',
    category: 8
  },
  illuzyon_aynasi: {
    id: 'illuzyon_aynasi',
    name: 'İllüzyon Aynası',
    description: 'Ayna, prizma taşı ve yıldız tozundan gerçekliği büken büyülü ayna.',
    tier: 10,
    colorPalette: { primary: '#d946ef', secondary: '#38bdf8', emissive: '#f43f5e' },
    particles: { type: 'shimmer', color: '#d946ef', count: 25 },
    recipe: { inputs: ['ayna', 'prizma_tasi', 'yildiz_tozu'] },
    icon: '🪞',
    category: 8
  },

  // ================= KATEGORİ 9: YÜKSEK BİLİM & SİBER-BÜYÜ EŞYALARI ================
  siber_kristal: {
    id: 'siber_kristal',
    name: 'Siber Kristal',
    description: 'Kristal, elektrik motoru ve prizma taşının rezonansıyla parıldayan veri çekirdeği.',
    tier: 9,
    colorPalette: { primary: '#06b6d4', secondary: '#3b82f6', emissive: '#0ea5e9' },
    particles: { type: 'spark', color: '#38bdf8', count: 18 },
    recipe: { inputs: ['kristal', 'elektrik_motoru', 'prizma_tasi'] },
    icon: '💎',
    category: 9
  },
  hologram_kupu: {
    id: 'hologram_kupu',
    name: 'Hologram Küpü',
    description: 'Cam küp içinde sıkıştırılmış siber kristal ve enerji ışık projeksiyonu.',
    tier: 9,
    colorPalette: { primary: '#10b981', secondary: '#06b6d4', emissive: '#059669' },
    particles: { type: 'spark', color: '#34d399', count: 16 },
    recipe: { inputs: ['cam', 'enerji', 'siber_kristal'] },
    icon: '🧊',
    category: 9
  },
  buhar_jeneratoru: {
    id: 'buhar_jeneratoru',
    name: 'Buhar Jeneratörü',
    description: 'Buhar motoru ve çelik dişlilerle güçlendirilmiş devasa pirinç tazyik makinesi.',
    tier: 9,
    colorPalette: { primary: '#d97706', secondary: '#b45309', emissive: '#f59e0b' },
    particles: { type: 'smoke', color: '#d1d5db', count: 20 },
    recipe: { inputs: ['buhar_motoru', 'celik_kulce', 'disli_cark'] },
    icon: '⚙️',
    category: 9
  },
  meka_zirhi: {
    id: 'meka_zirhi',
    name: 'Meka Zırhı',
    description: 'Rünik zırhın çelik plakalar ve plazma jeneratörüyle donatılmış güç gövdesi.',
    tier: 9,
    colorPalette: { primary: '#475569', secondary: '#f97316', emissive: '#ea580c' },
    particles: { type: 'spark', color: '#fb923c', count: 15 },
    recipe: { inputs: ['celik_kulce', 'runik_zirh', 'buhar_jeneratoru'] },
    icon: '🛡️',
    category: 9
  },
  plazma_tufegi: {
    id: 'plazma_tufegi',
    name: 'Plazma Tüfeği',
    description: 'Fırtına kılıcının enerjisi ve siber kristal ile ateşlenen yüksek enerjili silah.',
    tier: 9,
    colorPalette: { primary: '#3b82f6', secondary: '#ec4899', emissive: '#6366f1' },
    particles: { type: 'spark', color: '#f43f5e', count: 22 },
    recipe: { inputs: ['celik_kulce', 'firtina_kilici', 'siber_kristal'] },
    icon: '🔫',
    category: 9
  },
  felsefe_tasi: {
    id: 'felsefe_tasi',
    name: 'Felsefe Taşı',
    description: 'Anka külü ve cehennem taşının saf simya ile yoğrulduğu efsanevi cevher.',
    tier: 10,
    colorPalette: { primary: '#dc2626', secondary: '#f59e0b', emissive: '#ef4444' },
    particles: { type: 'shimmer', color: '#f87171', count: 26 },
    recipe: { inputs: ['anka_kulu', 'cehennem_tasi', 'prizma_tasi'] },
    icon: '🔮',
    category: 9
  },
  gunes_paneli: {
    id: 'gunes_paneli',
    name: 'Güneş Paneli',
    description: 'Cam yüzey ve siber kristal katmanlarıyla ışığı doğrudan elektriğe çeviren panel.',
    tier: 9,
    colorPalette: { primary: '#0284c7', secondary: '#facc15', emissive: '#38bdf8' },
    particles: { type: 'spark', color: '#fef08a', count: 14 },
    recipe: { inputs: ['cam', 'elektrik_motoru', 'siber_kristal'] },
    icon: '☀️',
    category: 9
  },
  yercekimsiz_platform: {
    id: 'yercekimsiz_platform',
    name: 'Yerçekimsiz Platform',
    description: 'Mıknatıs, portal rünü ve siber kristal ile havada asılı duran iniş pedi.',
    tier: 9,
    colorPalette: { primary: '#9333ea', secondary: '#c084fc', emissive: '#a855f7' },
    particles: { type: 'ring', color: '#c084fc', count: 20 },
    recipe: { inputs: ['miknatis', 'portal_runu', 'siber_kristal'] },
    icon: '🛸',
    category: 9
  },
  biyonik_kol: {
    id: 'biyonik_kol',
    name: 'Biyonik Kol',
    description: 'Çelik eklemler ve siber kristal sinir uçlarıyla donatılmış sibernetik uzuv.',
    tier: 9,
    colorPalette: { primary: '#64748b', secondary: '#06b6d4', emissive: '#0284c7' },
    particles: { type: 'spark', color: '#38bdf8', count: 12 },
    recipe: { inputs: ['celik_kulce', 'elektrik_motoru', 'siber_kristal'] },
    icon: '🦾',
    category: 9
  },
  usturlap: {
    id: 'usturlap',
    name: 'Kozmik Usturlap',
    description: 'Pusula ve teleskopun altın yörünge halkalarıyla gökcisimlerini haritalayan alet.',
    tier: 9,
    colorPalette: { primary: '#eab308', secondary: '#3b82f6', emissive: '#ca8a04' },
    particles: { type: 'shimmer', color: '#fde047', count: 16 },
    recipe: { inputs: ['pusula', 'teleskop', 'yildiz_tozu'] },
    icon: '🧭',
    category: 9
  },
  tesla_bobini: {
    id: 'tesla_bobini',
    name: 'Tesla Bobini',
    description: 'Yıldırım gücünü kesintisiz yüksek voltaj arklarına dönüştüren kule jeneratörü.',
    tier: 9,
    colorPalette: { primary: '#0284c7', secondary: '#38bdf8', emissive: '#0ea5e9' },
    particles: { type: 'spark', color: '#60a5fa', count: 28 },
    recipe: { inputs: ['celik_kulce', 'elektrik_motoru', 'yildirim'] },
    icon: '⚡',
    category: 9
  },

  kuantum_islemci: {
    id: 'kuantum_islemci',
    name: 'Kuantum İşlemci',
    description: 'Prizma taşı ve siber kristal matrisleriyle hesaplama yapan süper çip.',
    tier: 10,
    colorPalette: { primary: '#0284c7', secondary: '#22d3ee', emissive: '#0ea5e9' },
    particles: { type: 'spark', color: '#38bdf8', count: 20 },
    recipe: { inputs: ['elektrik_motoru', 'prizma_tasi', 'siber_kristal'] },
    icon: '💻',
    category: 9
  },
  minyatur_yildiz: {
    id: 'minyatur_yildiz',
    name: 'Minyatür Yıldız',
    description: 'Manyetik muhafaza içinde kontrol altında tutulan mikro süpernova.',
    tier: 10,
    colorPalette: { primary: '#f97316', secondary: '#eab308', emissive: '#ef4444' },
    particles: { type: 'flame', color: '#fb923c', count: 30 },
    recipe: { inputs: ['bosluk_sisesi', 'yildiz_gecidi_cekirdegi', 'yildiz_tozu'] },
    icon: '☀️',
    category: 9
  },

  // ================= KATEGORİ 10: DOĞA & COĞRAFYA EŞYALARI ================
  dag: {
    id: 'dag',
    name: 'Dağ',
    description: 'Yükselen devasa kaya kütlesi ve karlı zirveler.',
    tier: 2,
    colorPalette: { primary: '#64748b', secondary: '#94a3b8', emissive: '#475569' },
    particles: { type: 'dust', color: '#cbd5e1', count: 12 },
    recipe: { inputs: ['toprak', 'tas', null] },
    icon: '⛰️',
    category: 10
  },
  kaya: {
    id: 'kaya',
    name: 'Kaya',
    description: 'Yılların baskısıyla sertleşmiş yosunlu monolit taş.',
    tier: 2,
    colorPalette: { primary: '#78716c', secondary: '#a8a29e', emissive: '#57534e' },
    particles: { type: 'dust', color: '#a8a29e', count: 10 },
    recipe: { inputs: ['tas', 'tas', null] },
    icon: '🪨',
    category: 10
  },
  gunes: {
    id: 'gunes',
    name: 'Güneş',
    description: 'Gökyüzünü aydınlatan ve ısıtan saf yaşam ışığı.',
    tier: 2,
    colorPalette: { primary: '#eab308', secondary: '#facc15', emissive: '#ca8a04' },
    particles: { type: 'spark', color: '#fef08a', count: 25 },
    recipe: { inputs: ['ates', 'enerji', null] },
    icon: '☀️',
    category: 10
  },
  okyanus: {
    id: 'okyanus',
    name: 'Okyanus',
    description: 'Uçsuz bucaksız derin sular ve coşkulu dalgalar.',
    tier: 2,
    colorPalette: { primary: '#0284c7', secondary: '#0369a1', emissive: '#075985' },
    particles: { type: 'bubble', color: '#38bdf8', count: 20 },
    recipe: { inputs: ['su', 'su', null] },
    icon: '🌊',
    category: 10
  },
  volkan: {
    id: 'volkan',
    name: 'Volkan',
    description: 'Zirvesinden duman ve kızgın lavlar fışkıran yanardağ.',
    tier: 3,
    colorPalette: { primary: '#dc2626', secondary: '#ea580c', emissive: '#b91c1c' },
    particles: { type: 'flame', color: '#f97316', count: 24 },
    recipe: { inputs: ['dag', 'lav', null] },
    icon: '🌋',
    category: 10
  },
  ada: {
    id: 'ada',
    name: 'Ada',
    description: 'Turkuaz suların ortasında palmiyelerle bezeli kara parçası.',
    tier: 3,
    colorPalette: { primary: '#10b981', secondary: '#06b6d4', emissive: '#059669' },
    particles: { type: 'bubble', color: '#6ee7b7', count: 14 },
    recipe: { inputs: ['okyanus', 'toprak', null] },
    icon: '🏝️',
    category: 10
  },
  nehir: {
    id: 'nehir',
    name: 'Nehir',
    description: 'Toprağı yararak akıp giden coşkun su yolu.',
    tier: 2,
    colorPalette: { primary: '#0ea5e9', secondary: '#38bdf8', emissive: '#0284c7' },
    particles: { type: 'bubble', color: '#7dd3fc', count: 16 },
    recipe: { inputs: ['su', 'toprak', null] },
    icon: '🏞️',
    category: 10
  },
  orman: {
    id: 'orman',
    name: 'Orman',
    description: 'Yemyeşil ağaçlar ve gür bitki örtüsüyle kaplı koruluk.',
    tier: 2,
    colorPalette: { primary: '#15803d', secondary: '#22c55e', emissive: '#166534' },
    particles: { type: 'leaf', color: '#4ade80', count: 18 },
    recipe: { inputs: ['agac', 'agac', null] },
    icon: '🌲',
    category: 10
  },
  firtina_bulutu: {
    id: 'firtina_bulutu',
    name: 'Fırtına Bulutu',
    description: 'Şimşekler çaktıran koyu gri fırtına kümesi.',
    tier: 2,
    colorPalette: { primary: '#475569', secondary: '#334155', emissive: '#facc15' },
    particles: { type: 'spark', color: '#fef08a', count: 20 },
    recipe: { inputs: ['hava', 'yagmur', 'yildirim'] },
    icon: '🌩️',
    category: 10
  },
  magara: {
    id: 'magara',
    name: 'Mağara',
    description: 'Dağın derinliklerine uzanan gizemli karanlık kovuk.',
    tier: 2,
    colorPalette: { primary: '#334155', secondary: '#1e293b', emissive: '#0f172a' },
    particles: { type: 'dust', color: '#64748b', count: 12 },
    recipe: { inputs: ['dag', 'tas', null] },
    icon: '🕳️',
    category: 10
  },
  gokkusagi: {
    id: 'gokkusagi',
    name: 'Gökkuşağı',
    description: 'Güneş ışınlarının yağmur damlalarında kırılmasıyla doğan renk cümbüşü.',
    tier: 3,
    colorPalette: { primary: '#ec4899', secondary: '#3b82f6', emissive: '#eab308' },
    particles: { type: 'shimmer', color: '#f472b6', count: 25 },
    recipe: { inputs: ['gunes', 'yagmur', null] },
    icon: '🌈',
    category: 10
  },
  kanyon: {
    id: 'kanyon',
    name: 'Kanyon',
    description: 'Nehrin yüzyıllar boyu oyduğu derin kızıl kanyon vadisi.',
    tier: 3,
    colorPalette: { primary: '#b45309', secondary: '#9a3412', emissive: '#78350f' },
    particles: { type: 'dust', color: '#d97706', count: 15 },
    recipe: { inputs: ['dag', 'nehir', null] },
    icon: '🏜️',
    category: 10
  },
  fay_hatti: {
    id: 'fay_hatti',
    name: 'Fay Hattı',
    description: 'Yerkabuğunun şiddetle sarsılıp ayrıldığı derin yarık.',
    tier: 2,
    colorPalette: { primary: '#57534e', secondary: '#44403c', emissive: '#292524' },
    particles: { type: 'dust', color: '#78716c', count: 14 },
    recipe: { inputs: ['toprak', 'toprak', 'tas'] },
    icon: '⚡',
    category: 10
  },
  bulut: {
    id: 'bulut',
    name: 'Bulut',
    description: 'Gökyüzünde süzülen pamuksu beyaz su buharı kümesi.',
    tier: 1,
    colorPalette: { primary: '#e2e8f0', secondary: '#f8fafc', emissive: '#cbd5e1' },
    particles: { type: 'cloud', color: '#ffffff', count: 18 },
    recipe: { inputs: ['buhar', 'hava', null] },
    icon: '☁️',
    category: 10
  },

  // ================= KATEGORİ 3 & 2: CANLILAR, FAUNA & DOĞA GÜNCELLEMESİ ================
  at: {
    id: 'at',
    name: 'At',
    description: 'Sadık, güçlü ve rüzgâr gibi hızlı binek hayvanı.',
    tier: 2,
    colorPalette: { primary: '#854d0e', secondary: '#a16207', emissive: '#713f12' },
    particles: { type: 'dust', color: '#ca8a04', count: 12 },
    recipe: { inputs: ['hayvan', 'toprak', null] },
    icon: '🐴',
    category: 3
  },
  koyun: {
    id: 'koyun',
    name: 'Koyun',
    description: 'Yumuşacık beyaz yünleriyle otlaklarda yayılan uysal hayvan.',
    tier: 2,
    colorPalette: { primary: '#f8fafc', secondary: '#e2e8f0', emissive: '#cbd5e1' },
    particles: { type: 'cloud', color: '#ffffff', count: 10 },
    recipe: { inputs: ['bitki', 'hayvan', null] },
    icon: '🐑',
    category: 3
  },
  kurt: {
    id: 'kurt',
    name: 'Kurt',
    description: 'Dolunaya uluyan, vahşi doğanın keskin gözlü avcısı.',
    tier: 2,
    colorPalette: { primary: '#64748b', secondary: '#475569', emissive: '#334155' },
    particles: { type: 'spark', color: '#94a3b8', count: 14 },
    recipe: { inputs: ['hayvan', 'orman', null] },
    icon: '🐺',
    category: 3
  },
  ari: {
    id: 'ari',
    name: 'Arı',
    description: 'Çiçek çiçek gezip nektar toplayan çalışkan bal arısı.',
    tier: 2,
    colorPalette: { primary: '#eab308', secondary: '#000000', emissive: '#ca8a04' },
    particles: { type: 'spark', color: '#facc15', count: 12 },
    recipe: { inputs: ['kus', 'nilufer', null] },
    icon: '🐝',
    category: 3
  },
  yilan: {
    id: 'yilan',
    name: 'Yılan',
    description: 'Sessizce süzülen, zehirli ve gizemli sürüngen.',
    tier: 2,
    colorPalette: { primary: '#15803d', secondary: '#16a34a', emissive: '#14532d' },
    particles: { type: 'bubble', color: '#4ade80', count: 10 },
    recipe: { inputs: ['hayvan', 'zehirli_sivi', null] },
    icon: '🐍',
    category: 3
  },
  baykus: {
    id: 'baykus',
    name: 'Baykuş',
    description: 'Gecenin karanlığında ormanı gözleyen bilge gece kuşu.',
    tier: 2,
    colorPalette: { primary: '#78350f', secondary: '#b45309', emissive: '#451a03' },
    particles: { type: 'feather', color: '#d97706', count: 12 },
    recipe: { inputs: ['kus', 'orman', null] },
    icon: '🦉',
    category: 3
  },
  kaplumbaga: {
    id: 'kaplumbaga',
    name: 'Kaplumbağa',
    description: 'Ağır adımlarla yürüyen, sağlam kabuklu bilge amfibi.',
    tier: 2,
    colorPalette: { primary: '#166534', secondary: '#854d0e', emissive: '#14532d' },
    particles: { type: 'bubble', color: '#86efac', count: 8 },
    recipe: { inputs: ['hayvan', 'su', 'tas'] },
    icon: '🐢',
    category: 3
  },
  bal: {
    id: 'bal',
    name: 'Bal Kavanozu',
    description: 'Çalışkan arıların çiçek nektarından süzdüğü altın tatlılık.',
    tier: 3,
    colorPalette: { primary: '#f59e0b', secondary: '#fbbf24', emissive: '#d97706' },
    particles: { type: 'shimmer', color: '#fde047', count: 16 },
    recipe: { inputs: ['ari', 'comlek', null] },
    icon: '🍯',
    category: 4
  },
  nilufer: {
    id: 'nilufer',
    name: 'Nilüfer',
    description: 'Durgun suların üstünde zarafetle açan pembe çiçek.',
    tier: 2,
    colorPalette: { primary: '#ec4899', secondary: '#f472b6', emissive: '#db2777' },
    particles: { type: 'leaf', color: '#fbcfe8', count: 14 },
    recipe: { inputs: ['bitki', 'su', null] },
    icon: '🪷',
    category: 2
  },
  elma: {
    id: 'elma',
    name: 'Elma',
    description: 'Ağaç dallarında olgunlaşmış sulu ve kıpkırmızı meyve.',
    tier: 2,
    colorPalette: { primary: '#dc2626', secondary: '#ef4444', emissive: '#b91c1c' },
    particles: { type: 'leaf', color: '#f87171', count: 10 },
    recipe: { inputs: ['agac', 'gunes', null] },
    icon: '🍎',
    category: 2
  },
  kurbaga: {
    id: 'kurbaga',
    name: 'Kurbağa',
    description: 'Nilüfer yaprakları arasında neşeyle sıçrayan amfibi.',
    tier: 2,
    colorPalette: { primary: '#22c55e', secondary: '#16a34a', emissive: '#15803d' },
    particles: { type: 'bubble', color: '#86efac', count: 12 },
    recipe: { inputs: ['camur', 'hayvan', null] },
    icon: '🐸',
    category: 3
  },
  sincap: {
    id: 'sincap',
    name: 'Sincap',
    description: 'Palamut toplayıp ağaç kovuklarında saklayan sevimli kemirgen.',
    tier: 2,
    colorPalette: { primary: '#a16207', secondary: '#ca8a04', emissive: '#854d0e' },
    particles: { type: 'dust', color: '#eab308', count: 10 },
    recipe: { inputs: ['hayvan', 'tohum', null] },
    icon: '🐿️',
    category: 3
  },
  geyik: {
    id: 'geyik',
    name: 'Geyik',
    description: 'Ormanın derinliklerinde süzülen heybetli boynuzlu geyik.',
    tier: 3,
    colorPalette: { primary: '#92400e', secondary: '#b45309', emissive: '#78350f' },
    particles: { type: 'leaf', color: '#fde047', count: 14 },
    recipe: { inputs: ['hayvan', 'orman', 'dag'] },
    icon: '🦌',
    category: 3
  },
  kelebek: {
    id: 'kelebek',
    name: 'Kelebek',
    description: 'Rengarenk kanatlarıyla çiçekler arasında dans eden böcek.',
    tier: 2,
    colorPalette: { primary: '#3b82f6', secondary: '#f97316', emissive: '#2563eb' },
    particles: { type: 'spark', color: '#93c5fd', count: 18 },
    recipe: { inputs: ['kus', 'nilufer', 'hava'] },
    icon: '🦋',
    category: 3
  },
  // --- YENİ BASİT EŞYALAR ---
  sis: {
    id: 'sis',
    name: 'Sis',
    description: 'Havanın su buharı ile yoğuşması sonucu yeryüzüne inen hafif pus.',
    tier: 2,
    colorPalette: { primary: '#cbd5e1', secondary: '#94a3b8', emissive: '#64748b' },
    particles: { type: 'cloud', color: '#e2e8f0', count: 15 },
    recipe: { inputs: ['hava', 'su', null] },
    icon: '🌫️',
    category: 'elements'
  },
  gayzer: {
    id: 'gayzer',
    name: 'Gayzer',
    description: 'Yeraltındaki ısınmış su ve buharın taşlar arasından fışkırması.',
    tier: 2,
    colorPalette: { primary: '#0ea5e9', secondary: '#38bdf8', emissive: '#0284c7' },
    particles: { type: 'bubble', color: '#ffffff', count: 20 },
    recipe: { inputs: ['ates', 'toprak', 'su'] },
    icon: '♨️',
    category: 'elements'
  },
  kaktus: {
    id: 'kaktus',
    name: 'Kaktüs',
    description: 'Kızgın çöl kumlarında bile dimdik duran çiçekli dikenli bitki.',
    tier: 2,
    colorPalette: { primary: '#15803d', secondary: '#22c55e', emissive: '#166534' },
    particles: { type: 'leaf', color: '#86efac', count: 10 },
    recipe: { inputs: ['bitki', 'kum', null] },
    icon: '🌵',
    category: 'nature'
  },
  cam_agaci: {
    id: 'cam_agaci',
    name: 'Karlı Çam Ağacı',
    description: 'Karlı dağ yamaçlarında kışın da beyaz karlar altında dimdik duran çam ağacı.',
    tier: 2,
    colorPalette: { primary: '#166534', secondary: '#f8fafc', emissive: '#14532d' },
    particles: { type: 'cloud', color: '#f8fafc', count: 12 },
    recipe: { inputs: ['agac', 'kar', null] },
    icon: '🌲',
    category: 'nature'
  },
  tavuk: {
    id: 'tavuk',
    name: 'Tavuk',
    description: 'Yumurtadan çıkan, tarlalarda dolaşan sevimli kümes hayvanı.',
    tier: 2,
    colorPalette: { primary: '#f59e0b', secondary: '#fbbf24', emissive: '#d97706' },
    particles: { type: 'spark', color: '#fef08a', count: 8 },
    recipe: { inputs: ['kus', 'yumurta', null] },
    icon: '🐔',
    category: 'life'
  },
  kedi: {
    id: 'kedi',
    name: 'Kedi',
    description: 'Sütü ve sıcağı seven sevimli uysal evcil dost.',
    tier: 2,
    colorPalette: { primary: '#f97316', secondary: '#ea580c', emissive: '#c2410c' },
    particles: { type: 'spark', color: '#fed7aa', count: 10 },
    recipe: { inputs: ['hayvan', 'sut', null] },
    icon: '🐱',
    category: 'life'
  },
  mesale: {
    id: 'mesale',
    name: 'Meşale',
    description: 'Karanlık mağaraları ve yolları aydınlatan alevli ahşap meşale.',
    tier: 2,
    colorPalette: { primary: '#f97316', secondary: '#ef4444', emissive: '#ea580c' },
    particles: { type: 'spark', color: '#ffaa00', count: 15 },
    recipe: { inputs: ['ates', 'odun', null] },
    icon: '🔦',
    category: 'craft_tools'
  },
  somon: {
    id: 'somon',
    name: 'Somon',
    description: 'Akıntının tersine nehirlerde sıçrayan çevik tatlı su balığı.',
    tier: 2,
    colorPalette: { primary: '#fb7185', secondary: '#f43f5e', emissive: '#e11d48' },
    particles: { type: 'bubble', color: '#fecdd3', count: 10 },
    recipe: { inputs: ['balik', 'nehir', null] },
    icon: '🐟',
    category: 'life'
  },
  yay: {
    id: 'yay',
    name: 'Yay',
    description: 'Esnek bir dal ve gergin ip ile yapılan avcı silahı.',
    tier: 2,
    colorPalette: { primary: '#78350f', secondary: '#92400e', emissive: '#451a03' },
    particles: { type: 'spark', color: '#fde047', count: 10 },
    recipe: { inputs: ['ip', 'odun', null] },
    icon: '🏹',
    category: 'craft_tools'
  },
  barut_ficisi: {
    id: 'barut_ficisi',
    name: 'Barut Fıçısı',
    description: 'Ateşle buluştuğunda şiddetli patlama yaratan ahşap fıçı.',
    tier: 3,
    colorPalette: { primary: '#dc2626', secondary: '#b91c1c', emissive: '#991b1b' },
    particles: { type: 'spark', color: '#ef4444', count: 20 },
    recipe: { inputs: ['barut', 'odun', null] },
    icon: '🛢️',
    category: 5
  },
  su_degirmeni: {
    id: 'su_degirmeni',
    name: 'Su Değirmeni',
    description: 'Akarsuyun akış gücüyle dönen ahşap çark mekanizması.',
    tier: 3,
    colorPalette: { primary: '#0284c7', secondary: '#0369a1', emissive: '#075985' },
    particles: { type: 'bubble', color: '#38bdf8', count: 12 },
    recipe: { inputs: ['su', 'tekerlek', null] },
    icon: '⚙️',
    category: 6
  },
  buz_dagi: {
    id: 'buz_dagi',
    name: 'Buz Dağı',
    description: 'Okyanusta yüzen devasa parıltılı buz kütlesi.',
    tier: 2,
    colorPalette: { primary: '#38bdf8', secondary: '#bae6fd', emissive: '#0284c7' },
    particles: { type: 'shimmer', color: '#ffffff', count: 15 },
    recipe: { inputs: ['buz', 'okyanus', null] },
    icon: '🏔️',
    category: 'elements'
  },
  kalkan: {
    id: 'kalkan',
    name: 'Kalkan',
    description: 'Saldırılardan ve oklardan koruyan sağlam yuvarlak ahşap kalkan.',
    tier: 2,
    colorPalette: { primary: '#64748b', secondary: '#94a3b8', emissive: '#334155' },
    particles: { type: 'spark', color: '#cbd5e1', count: 8 },
    recipe: { inputs: ['odun', 'demir_kulce', null] },
    icon: '🛡️',
    category: 'craft_tools'
  },
  iksir_kazani: {
    id: 'iksir_kazani',
    name: 'İksir Kazanı',
    description: 'Ateş üzerinde iksirlerin ve simya özlerinin kaynatıldığı döküm kazan.',
    tier: 3,
    colorPalette: { primary: '#1e293b', secondary: '#475569', emissive: '#0f172a' },
    particles: { type: 'bubble', color: '#a855f7', count: 16 },
    recipe: { inputs: ['ates', 'comlek', 'su'] },
    icon: '🍲',
    category: 5
  }
};

// Aliases mapping from legacy English IDs to canonical ASCII Turkish item IDs
export const ITEM_ALIASES = {
  fire: 'ates',
  water: 'su',
  earth: 'toprak',
  air: 'hava',
  steam: 'buhar',
  mud: 'camur',
  lava: 'lav',
  sand: 'kum',
  obsidian: 'obsidyen',
  rain: 'yagmur',
  energy: 'enerji',
  wind: 'ruzgar',
  stone: 'tas',
  glass: 'cam',
  cloud: 'bulut',
  lightning: 'yildirim',
  plant: 'bitki',
  tree: 'agac',
  wood: 'odun',
  splinter: 'kiymik',
  fiber: 'lif',
  mushroom: 'mantar',
  cotton: 'pamuk',
  resin: 'recine',
  life: 'yasam',
  bird: 'kus',
  animal: 'hayvan',
  fish: 'balik',
  rope: 'ip',
  fabric: 'kumas',
  coal: 'komur',
  ash: 'kul',
  paper: 'kagit',
  primitive_knife: 'ilkel_bicak',
  feather: 'kus_tuyu',
  leather: 'deri',
  cooked_meat: 'kavrulmus_et',
  pottery: 'comlek',
  water_jug: 'su_comlegi',
  bottle: 'sise',
  flint: 'cakmaktasi',
  bow: 'yay',
  arrow: 'ok',
  torch: 'mesale',
  raw_metal: 'metal',
  iron_ingot: 'demir_kulce',
  metal_knife: 'metal_bicak',
  pickaxe: 'kazma',
  sword: 'kilic',
  wooden_shield: 'ahsap_kalkan',
  iron_shield: 'demir_kalkan',
  leather_armor: 'deri_zirh',
  iron_armor: 'demir_zirh',
  bed: 'yatak',
  forest: 'orman'
};

export function getCanonicalId(id) {
  if (!id) return null;
  return ITEM_ALIASES[id] || id;
}

// Map alias keys directly on ITEM_DEFINITIONS for fast lookup
Object.keys(ITEM_ALIASES).forEach(enKey => {
  const targetId = ITEM_ALIASES[enKey];
  if (ITEM_DEFINITIONS[targetId] && !ITEM_DEFINITIONS[enKey]) {
    ITEM_DEFINITIONS[enKey] = ITEM_DEFINITIONS[targetId];
  }
});

// Reçeteler (Kategori 1-8)
export const RECIPES_CAT_1 = [
  { inputs: ["hava", "yagmur", null], output: "kar", category: 1 },
  { inputs: ["kar", "kar", null], output: "buz", category: 1 },
  { inputs: ["lav", "su", null], output: "obsidyen", category: 1 },
  { inputs: ["ruzgar", "toprak", null], output: "col", category: 1 }
];

export const RECIPES_CAT_2 = [
  { inputs: ["bitki", "toprak", "yagmur"], output: "tohum", category: 2 },
  { inputs: ["bugday", "su", "tohum"], output: "bugday", category: 2 },
  { inputs: ["bitki", "buz", null], output: "nane", category: 2 },
  { inputs: ["agac", "metal_bicak", null], output: "agac_kabugu", category: 2 }
];

export const RECIPES_CAT_3 = [
  { inputs: ["hayvan", "toprak", null], output: "inek", category: 3 },
  { inputs: ["comlek", "inek", null], output: "sut", category: 3 },
  { inputs: ["kus", "tohum", null], output: "yumurta", category: 3 },
  { inputs: ["balik", "bitki", "su"], output: "mercan", category: 3 }
];

export const RECIPES_CAT_4 = [
  { inputs: ["balik", "ip", "odun"], output: "olta", category: 4 },
  { inputs: ["kumas", "odun", null], output: "yelken", category: 4 },
  { inputs: ["ip", "odun", "yelken"], output: "sal", category: 4 },
  { inputs: ["ip", "obsidyen", "odun"], output: "obsidyen_bicak", category: 4 }
];

export const RECIPES_CAT_5 = [
  { inputs: ["mantar", "su_comlegi", null], output: "zehirli_sivi", category: 5 },
  { inputs: ["sise", "zehirli_sivi", null], output: "zehir_sisesi", category: 5 },
  { inputs: ["kilic", "zehir_sisesi", null], output: "zehirli_kilic", category: 5 },
  { inputs: ["bitki", "sise", "su_comlegi"], output: "sifa_iksiri", category: 5 },
  { inputs: ["enerji", "sise", "su_comlegi"], output: "mana_iksiri", category: 5 },
  { inputs: ["komur", "kul", "recine"], output: "barut", category: 5 },
  { inputs: ["barut", "demir_kulce", "ip"], output: "bomba", category: 5 },
  { inputs: ["kagit", "kul", "kus_tuyu"], output: "buyu_parsomeni", category: 5 },
  { inputs: ["buyu_parsomeni", "yildirim", null], output: "yildirim_parsomeni", category: 5 },
  { inputs: ["ates", "buyu_parsomeni", null], output: "ates_topu_kitabi", category: 5 },
  { inputs: ["ates", "sut", null], output: "peynir", category: 5 },
  { inputs: ["bugday", "tas", null], output: "un", category: 5 },
  { inputs: ["su", "un", null], output: "hamur", category: 5 },
  { inputs: ["ates", "hamur", null], output: "ekmek", category: 5 }
];

export const RECIPES_CAT_6 = [
  { inputs: ["buhar", "demir_kulce", "komur"], output: "buhar_motoru", category: 6 },
  { inputs: ["odun", "odun", "tas"], output: "tekerlek", category: 6 },
  { inputs: ["demir_kulce", "odun", "tekerlek"], output: "el_arabasi", category: 6 },
  { inputs: ["buhar_motoru", "demir_kulce", "tekerlek"], output: "lokomotif", category: 6 },
  { inputs: ["cam", "metal", "yildirim"], output: "ampul", category: 6 },
  { inputs: ["ampul", "demir_kulce", "enerji"], output: "fener", category: 6 },
  { inputs: ["cam", "cam", "demir_kulce"], output: "pusula", category: 6 },
  { inputs: ["demir_kulce", "yildirim", null], output: "miknatis", category: 6 },
  { inputs: ["enerji", "metal", "miknatis"], output: "elektrik_motoru", category: 6 },
  { inputs: ["civi", "demir_kulce", null], output: "disli_cark", category: 6 },
  { inputs: ["buhar_motoru", "disli_cark", "odun"], output: "degirmen", category: 6 },
  { inputs: ["cam", "enerji", "metal"], output: "ayna", category: 6 },
  { inputs: ["demir_kulce", "disli_cark", "enerji"], output: "saat", category: 6 }
];

export const RECIPES_CAT_7 = [
  { inputs: ["ates", "demir_kulce", "komur"], output: "celik_kulce", category: 7 },
  { inputs: ["celik_kulce", "tas", null], output: "ors", category: 7 },
  { inputs: ["ates", "demir_kulce", null], output: "civi", category: 7 },
  { inputs: ["ates", "camur", null], output: "tugla", category: 7 },
  { inputs: ["kum", "su", "tas"], output: "harc", category: 7 },
  { inputs: ["harc", "tugla", null], output: "tugla_duvar", category: 7 },
  { inputs: ["celik_kulce", "civi", "odun"], output: "saglam_sandik", category: 7 },
  { inputs: ["enerji", "kazma", "tas"], output: "kristal", category: 7 },
  { inputs: ["cam", "kristal", "metal"], output: "teleskop", category: 7 },
  { inputs: ["celik_kulce", "elektrik_motoru", "tekerlek"], output: "vinc", category: 7 },
  { inputs: ["ates", "demir_kulce", "demir_kulce"], output: "demir_parmaklik", category: 7 },
  { inputs: ["celik_kulce", "odun", null], output: "savas_baltasi", category: 7 },
  { inputs: ["harc", "tugla", "tugla"], output: "gozetleme_kulesi", category: 7 },
  { inputs: ["celik_kulce", "civi", "demir_parmaklik"], output: "kale_kapisi", category: 7 }
];

export const RECIPES_CATEGORY_8 = [
  { inputs: ["enerji", "teleskop", null], output: "yildiz_tozu", category: 8 },
  { inputs: ["kristal", "yildiz_tozu", null], output: "prizma_tasi", category: 8 },
  { inputs: ["cam", "enerji", "prizma_tasi"], output: "kahin_kuresi", category: 8 },
  { inputs: ["buyu_parsomeni", "yildiz_tozu", null], output: "portal_runu", category: 8 },
  { inputs: ["kristal", "sise", "yildirim"], output: "bosluk_sisesi", category: 8 },
  { inputs: ["celik_kulce", "portal_runu", "tugla_duvar"], output: "boyut_kapisi", category: 8 },
  { inputs: ["anka_kulu", "ates", "kul"], output: "anka_kulu", category: 8 },
  { inputs: ["demir_zirh", "ors", "prizma_tasi"], output: "runik_zirh", category: 8 },
  { inputs: ["kilic", "prizma_tasi", "yildirim"], output: "firtina_kilici", category: 8 },
  { inputs: ["bosluk_sisesi", "kahin_kuresi", "portal_runu"], output: "yildiz_gecidi_cekirdegi", category: 8 },
  { inputs: ["buz", "buyu_parsomeni", null], output: "buz_runu", category: 8 },
  { inputs: ["ates", "obsidyen", "portal_runu"], output: "cehennem_tasi", category: 8 },
  { inputs: ["kristal", "portal_runu", "saat"], output: "zaman_kum_saati", category: 8 },
  { inputs: ["ayna", "prizma_tasi", "yildiz_tozu"], output: "illuzyon_aynasi", category: 8 }
];

export const RECIPES_CAT_8 = RECIPES_CATEGORY_8;

export const RECIPES_CAT_9 = [
  { inputs: ["kristal", "elektrik_motoru", "prizma_tasi"], output: "siber_kristal", category: 9 },
  { inputs: ["cam", "enerji", "siber_kristal"], output: "hologram_kupu", category: 9 },
  { inputs: ["buhar_motoru", "celik_kulce", "disli_cark"], output: "buhar_jeneratoru", category: 9 },
  { inputs: ["celik_kulce", "runik_zirh", "buhar_jeneratoru"], output: "meka_zirhi", category: 9 },
  { inputs: ["celik_kulce", "firtina_kilici", "siber_kristal"], output: "plazma_tufegi", category: 9 },
  { inputs: ["anka_kulu", "cehennem_tasi", "prizma_tasi"], output: "felsefe_tasi", category: 9 },
  { inputs: ["cam", "elektrik_motoru", "siber_kristal"], output: "gunes_paneli", category: 9 },
  { inputs: ["miknatis", "portal_runu", "siber_kristal"], output: "yercekimsiz_platform", category: 9 },
  { inputs: ["celik_kulce", "elektrik_motoru", "siber_kristal"], output: "biyonik_kol", category: 9 },
  { inputs: ["pusula", "teleskop", "yildiz_tozu"], output: "usturlap", category: 9 },
  { inputs: ["celik_kulce", "elektrik_motoru", "yildirim"], output: "tesla_bobini", category: 9 },

  { inputs: ["elektrik_motoru", "prizma_tasi", "siber_kristal"], output: "kuantum_islemci", category: 9 },
  { inputs: ["bosluk_sisesi", "yildiz_gecidi_cekirdegi", "yildiz_tozu"], output: "minyatur_yildiz", category: 9 }
];

export const RECIPES_CAT_10 = [
  { inputs: ["toprak", "tas", null], output: "dag", category: 10 },
  { inputs: ["tas", "tas", null], output: "kaya", category: 10 },
  { inputs: ["ates", "enerji", null], output: "gunes", category: 10 },
  { inputs: ["su", "su", null], output: "okyanus", category: 10 },
  { inputs: ["dag", "lav", null], output: "volkan", category: 10 },
  { inputs: ["okyanus", "toprak", null], output: "ada", category: 10 },
  { inputs: ["su", "toprak", null], output: "nehir", category: 10 },
  { inputs: ["agac", "agac", null], output: "orman", category: 10 },
  { inputs: ["hava", "yagmur", "yildirim"], output: "firtina_bulutu", category: 10 },
  { inputs: ["dag", "tas", null], output: "magara", category: 10 },
  { inputs: ["gunes", "yagmur", null], output: "gokkusagi", category: 10 },
  { inputs: ["dag", "nehir", null], output: "kanyon", category: 10 },
  { inputs: ["toprak", "toprak", "tas"], output: "fay_hatti", category: 10 },
  { inputs: ["buhar", "hava", null], output: "bulut", category: 10 }
];

export const RECIPES_CAT_FAUNA = [
  { inputs: ["hayvan", "toprak", null], output: "at", category: 3 },
  { inputs: ["bitki", "hayvan", null], output: "koyun", category: 3 },
  { inputs: ["hayvan", "orman", null], output: "kurt", category: 3 },
  { inputs: ["kus", "nilufer", null], output: "ari", category: 3 },
  { inputs: ["hayvan", "zehirli_sivi", null], output: "yilan", category: 3 },
  { inputs: ["kus", "orman", null], output: "baykus", category: 3 },
  { inputs: ["hayvan", "su", "tas"], output: "kaplumbaga", category: 3 },
  { inputs: ["ari", "comlek", null], output: "bal", category: 4 },
  { inputs: ["bitki", "su", null], output: "nilufer", category: 2 },
  { inputs: ["agac", "gunes", null], output: "elma", category: 2 },
  { inputs: ["camur", "hayvan", null], output: "kurbaga", category: 3 },
  { inputs: ["hayvan", "tohum", null], output: "sincap", category: 3 },
  { inputs: ["hayvan", "orman", "dag"], output: "geyik", category: 3 },
  { inputs: ["kus", "nilufer", "hava"], output: "kelebek", category: 3 }
];

export const RECIPES_CAT_SIMPLE = [
  { inputs: ["hava", "su", null], output: "sis", category: 1 },
  { inputs: ["ates", "toprak", "su"], output: "gayzer", category: 1 },
  { inputs: ["bitki", "kum", null], output: "kaktus", category: 2 },
  { inputs: ["agac", "kar", null], output: "cam_agaci", category: 2 },
  { inputs: ["kus", "yumurta", null], output: "tavuk", category: 3 },
  { inputs: ["hayvan", "sut", null], output: "kedi", category: 3 },
  { inputs: ["ates", "odun", null], output: "mesale", category: 4 },
  { inputs: ["balik", "nehir", null], output: "somon", category: 3 },
  { inputs: ["ip", "odun", null], output: "yay", category: 4 },
  { inputs: ["barut", "odun", null], output: "barut_ficisi", category: 5 },
  { inputs: ["su", "tekerlek", null], output: "su_degirmeni", category: 6 },
  { inputs: ["buz", "okyanus", null], output: "buz_dagi", category: 1 },
  { inputs: ["odun", "demir_kulce", null], output: "kalkan", category: 4 },
  { inputs: ["ates", "comlek", "su"], output: "iksir_kazani", category: 5 }
];



