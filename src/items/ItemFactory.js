import * as THREE from 'three';
import { ITEM_DEFINITIONS, getCanonicalId } from './itemDefinitions.js';

export class ItemFactory {
  constructor() {
    // Cache or setup if needed
  }

  static _createOutline(geometry, color = 0x1e293b, thickness = 0.035) {
    const outlineMat = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.BackSide
    });
    const outlineMesh = new THREE.Mesh(geometry, outlineMat);
    outlineMesh.scale.multiplyScalar(1.0 + thickness);
    return outlineMesh;
  }

  static createItemMesh(itemId) {
    const canonicalId = getCanonicalId(itemId) || itemId;
    const def = ITEM_DEFINITIONS[canonicalId] || ITEM_DEFINITIONS[itemId] || ITEM_DEFINITIONS.fire;
    const group = new THREE.Group();
    group.userData.itemId = canonicalId;
    group.userData.definition = def;

    let mainMesh;

    switch (canonicalId) {
      case 'fire':
        mainMesh = this._createFireMesh(def);
        break;
      case 'water':
        mainMesh = this._createWaterMesh(def);
        break;
      case 'earth':
        mainMesh = this._createEarthMesh(def);
        break;
      case 'air':
        mainMesh = this._createAirMesh(def);
        break;
      case 'steam':
        mainMesh = this._createSteamMesh(def);
        break;
      case 'mud':
        mainMesh = this._createMudMesh(def);
        break;
      case 'lava':
        mainMesh = this._createLavaMesh(def);
        break;
      case 'sand':
        mainMesh = this._createSandMesh(def);
        break;
      case 'obsidian':
        mainMesh = this._createObsidianMesh(def);
        break;
      case 'rain':
        mainMesh = this._createRainMesh(def);
        break;
      case 'energy':
        mainMesh = this._createEnergyMesh(def);
        break;
      case 'wind':
        mainMesh = this._createWindMesh(def);
        break;
      case 'stone':
        mainMesh = this._createStoneMesh(def);
        break;
      case 'glass':
        mainMesh = this._createGlassMesh(def);
        break;
      case 'cloud':
        mainMesh = this._createCloudMesh(def);
        break;
      case 'lightning':
        mainMesh = this._createLightningMesh(def);
        break;
      case 'plant':
        mainMesh = this._createPlantMesh(def);
        break;
      case 'tree':
        mainMesh = this._createTreeMesh(def);
        break;
      case 'wood':
        mainMesh = this._createWoodMesh(def);
        break;
      case 'splinter':
        mainMesh = this._createSplinterMesh(def);
        break;
      case 'fiber':
        mainMesh = this._createFiberMesh(def);
        break;
      case 'pottery':
        mainMesh = this._createPotteryMesh(def);
        break;
      case 'water_jug':
        mainMesh = this._createWaterJugMesh(def);
        break;
      case 'bottle':
        mainMesh = this._createBottleMesh(def);
        break;
      case 'flint':
        mainMesh = this._createFlintMesh(def);
        break;
      case 'bow':
        mainMesh = this._createBowMesh(def);
        break;
      case 'arrow':
        mainMesh = this._createArrowMesh(def);
        break;
      case 'torch':
        mainMesh = this._createTorchMesh(def);
        break;
      case 'raw_metal':
        mainMesh = this._createRawMetalMesh(def);
        break;
      case 'iron_ingot':
        mainMesh = this._createIronIngotMesh(def);
        break;
      case 'metal_knife':
        mainMesh = this._createMetalKnifeMesh(def);
        break;
      case 'pickaxe':
        mainMesh = this._createPickaxeMesh(def);
        break;
      case 'sword':
        mainMesh = this._createSwordMesh(def);
        break;
      case 'wooden_shield':
        mainMesh = this._createWoodenShieldMesh(def);
        break;
      case 'iron_shield':
        mainMesh = this._createIronShieldMesh(def);
        break;
      case 'leather_armor':
        mainMesh = this._createLeatherArmorMesh(def);
        break;
      case 'iron_armor':
        mainMesh = this._createIronArmorMesh(def);
        break;
      case 'bed':
        mainMesh = this._createBedMesh(def);
        break;
      case 'rope':
        mainMesh = this._createRopeMesh(def);
        break;
      case 'mushroom':
        mainMesh = this._createMushroomMesh(def);
        break;
      case 'yosun':
        mainMesh = this._createYosunMesh(def);
        break;
      case 'cotton':
        mainMesh = this._createCottonMesh(def);
        break;
      case 'fabric':
        mainMesh = this._createFabricMesh(def);
        break;
      case 'coal':
        mainMesh = this._createCoalMesh(def);
        break;
      case 'ash':
        mainMesh = this._createAshMesh(def);
        break;
      case 'paper':
        mainMesh = this._createPaperMesh(def);
        break;
      case 'life':
        mainMesh = this._createLifeMesh(def);
        break;
      case 'bird':
        mainMesh = this._createBirdMesh(def);
        break;
      case 'animal':
        mainMesh = this._createAnimalMesh(def);
        break;
      case 'fish':
        mainMesh = this._createFishMesh(def);
        break;
      case 'primitive_knife':
        mainMesh = this._createPrimitiveKnifeMesh(def);
        break;
      case 'feather':
        mainMesh = this._createFeatherMesh(def);
        break;
      case 'leather':
        mainMesh = this._createLeatherMesh(def);
        break;
      case 'cooked_meat':
        mainMesh = this._createCookedMeatMesh(def);
        break;
      case 'resin':
        mainMesh = this._createResinMesh(def);
        break;
      // Kategori 5: Kimya, Simya & Büyü Eşyaları
      case 'zehirli_sivi':
        mainMesh = this._createZehirliSiviMesh(def);
        break;
      case 'zehir_sisesi':
        mainMesh = this._createZehirSisesiMesh(def);
        break;
      case 'zehirli_kilic':
        mainMesh = this._createZehirliKilicMesh(def);
        break;
      case 'sifa_iksiri':
        mainMesh = this._createSifaIksiriMesh(def);
        break;
      case 'mana_iksiri':
        mainMesh = this._createManaIksiriMesh(def);
        break;
      case 'barut':
        mainMesh = this._createBarutMesh(def);
        break;
      case 'bomba':
        mainMesh = this._createBombaMesh(def);
        break;
      case 'buyu_parsomeni':
        mainMesh = this._createBuyuParsomeniMesh(def);
        break;
      case 'yildirim_parsomeni':
        mainMesh = this._createYildirimParsomeniMesh(def);
        break;
      case 'ates_topu_kitabi':
        mainMesh = this._createAtesTopuKitabiMesh(def);
        break;
      // Kategori 6: Mekanik & Medeniyet Eşyaları
      case 'buhar_motoru':
        mainMesh = this._createBuharMotoruMesh(def);
        break;
      case 'tekerlek':
        mainMesh = this._createTekerlekMesh(def);
        break;
      case 'el_arabasi':
        mainMesh = this._createElArabasiMesh(def);
        break;
      case 'lokomotif':
        mainMesh = this._createLokomotifMesh(def);
        break;
      case 'ampul':
        mainMesh = this._createAmpulMesh(def);
        break;
      case 'fener':
        mainMesh = this._createFenerMesh(def);
        break;
      case 'pusula':
        mainMesh = this._createPusulaMesh(def);
        break;
      case 'miknatis':
        mainMesh = this._createMiknatisMesh(def);
        break;
      case 'elektrik_motoru':
        mainMesh = this._createElektrikMotoruMesh(def);
        break;
      // Kategori 7: Ağır Sanayi, Metalurji ve İleri İnşaat Eşyaları
      case 'celik_kulce':
        mainMesh = this._createCelikKulceMesh(def);
        break;
      case 'ors':
        mainMesh = this._createOrsMesh(def);
        break;
      case 'civi':
        mainMesh = this._createCiviMesh(def);
        break;
      case 'tugla':
        mainMesh = this._createTuglaMesh(def);
        break;
      case 'harc':
        mainMesh = this._createHarcMesh(def);
        break;
      case 'tugla_duvar':
        mainMesh = this._createTuglaDuvarMesh(def);
        break;
      case 'saglam_sandik':
        mainMesh = this._createSaglamSandikMesh(def);
        break;
      case 'kristal':
        mainMesh = this._createKristalMesh(def);
        break;
      case 'teleskop':
        mainMesh = this._createTeleskopMesh(def);
        break;
      case 'vinc':
        mainMesh = this._createVincMesh(def);
        break;
      // Kategori VIII: Kadim Kozmoloji, Boyutlar & Esrarengiz Güçler Eşyaları
      case 'yildiz_tozu':
        mainMesh = this._createYildizTozuMesh(def);
        break;
      case 'prizma_tasi':
        mainMesh = this._createPrizmaTasiMesh(def);
        break;
      case 'kahin_kuresi':
        mainMesh = this._createKahinKuresiMesh(def);
        break;
      case 'portal_runu':
        mainMesh = this._createPortalRunuMesh(def);
        break;
      case 'bosluk_sisesi':
        mainMesh = this._createBoslukSisesiMesh(def);
        break;
      case 'boyut_kapisi':
        mainMesh = this._createBoyutKapisiMesh(def);
        break;
      case 'anka_kulu':
        mainMesh = this._createAnkaKuluMesh(def);
        break;
      case 'runik_zirh':
        mainMesh = this._createRunikZirhMesh(def);
        break;
      case 'firtina_kilici':
        mainMesh = this._createFirtinaKiliciMesh(def);
        break;
      case 'yildiz_gecidi_cekirdegi':
        mainMesh = this._createYildizGecidiCekirdegiMesh(def);
        break;
      // Yeni 32 Eşya
      case 'kar':
        mainMesh = this._createKarMesh(def);
        break;
      case 'buz':
        mainMesh = this._createBuzMesh(def);
        break;
      case 'col':
        mainMesh = this._createColMesh(def);
        break;
      case 'tohum':
        mainMesh = this._createTohumMesh(def);
        break;
      case 'bugday':
        mainMesh = this._createBugdayMesh(def);
        break;
      case 'nane':
        mainMesh = this._createNaneMesh(def);
        break;
      case 'agac_kabugu':
        mainMesh = this._createAgacKabuguMesh(def);
        break;
      case 'inek':
        mainMesh = this._createInekMesh(def);
        break;
      case 'sut':
        mainMesh = this._createSutMesh(def);
        break;
      case 'yumurta':
        mainMesh = this._createYumurtaMesh(def);
        break;
      case 'mercan':
        mainMesh = this._createMercanMesh(def);
        break;
      case 'olta':
        mainMesh = this._createOltaMesh(def);
        break;
      case 'yelken':
        mainMesh = this._createYelkenMesh(def);
        break;
      case 'sal':
        mainMesh = this._createSalMesh(def);
        break;
      case 'obsidyen_bicak':
        mainMesh = this._createObsidyenBicakMesh(def);
        break;
      case 'peynir':
        mainMesh = this._createPeynirMesh(def);
        break;
      case 'un':
        mainMesh = this._createUnMesh(def);
        break;
      case 'hamur':
        mainMesh = this._createHamurMesh(def);
        break;
      case 'ekmek':
        mainMesh = this._createEkmekMesh(def);
        break;
      case 'disli_cark':
        mainMesh = this._createDisliCarkMesh(def);
        break;
      case 'degirmen':
        mainMesh = this._createDegirmenMesh(def);
        break;
      case 'ayna':
        mainMesh = this._createAynaMesh(def);
        break;
      case 'saat':
        mainMesh = this._createSaatMesh(def);
        break;
      case 'demir_parmaklik':
        mainMesh = this._createDemirParmaklikMesh(def);
        break;
      case 'savas_baltasi':
        mainMesh = this._createSavasBaltasiMesh(def);
        break;
      case 'gozetleme_kulesi':
        mainMesh = this._createGozetlemeKulesiMesh(def);
        break;
      case 'kale_kapisi':
        mainMesh = this._createKaleKapisiMesh(def);
        break;
      case 'buz_runu':
        mainMesh = this._createBuzRunuMesh(def);
        break;
      case 'cehennem_tasi':
        mainMesh = this._createCehennemTasiMesh(def);
        break;
      case 'zaman_kum_saati':
        mainMesh = this._createZamanKumSaatiMesh(def);
        break;
      case 'illuzyon_aynasi':
        mainMesh = this._createIlluzyonAynasiMesh(def);
        break;
      // Kategori 9: Yüksek Bilim & Siber-Büyü Eşyaları
      case 'siber_kristal':
        mainMesh = this._createSiberKristalMesh(def);
        break;
      case 'hologram_kupu':
        mainMesh = this._createHologramKupuMesh(def);
        break;
      case 'buhar_jeneratoru':
        mainMesh = this._createBuharJeneratoruMesh(def);
        break;
      case 'meka_zirhi':
        mainMesh = this._createMekaZirhiMesh(def);
        break;
      case 'plazma_tufegi':
        mainMesh = this._createPlazmaTufegiMesh(def);
        break;
      case 'felsefe_tasi':
        mainMesh = this._createFelsefeTasiMesh(def);
        break;
      case 'gunes_paneli':
        mainMesh = this._createGunesPaneliMesh(def);
        break;
      case 'yercekimsiz_platform':
        mainMesh = this._createYercekimsizPlatformMesh(def);
        break;
      case 'biyonik_kol':
        mainMesh = this._createBiyonikKolMesh(def);
        break;
      case 'usturlap':
        mainMesh = this._createUsturlapMesh(def);
        break;
      case 'tesla_bobini':
        mainMesh = this._createTeslaBobiniMesh(def);
        break;
      case 'enerji_kalkani':
        mainMesh = this._createEnerjiKalkaniMesh(def);
        break;
      case 'kuantum_islemci':
        mainMesh = this._createKuantumIslemciMesh(def);
        break;
      case 'minyatur_yildiz':
        mainMesh = this._createMinyaturYildizMesh(def);
        break;
      // Kategori 10: Doğa & Coğrafya Eşyaları
      case 'dag':
        mainMesh = this._createDagMesh(def);
        break;
      case 'kaya':
        mainMesh = this._createKayaMesh(def);
        break;
      case 'gunes':
        mainMesh = this._createGunesMesh(def);
        break;
      case 'okyanus':
        mainMesh = this._createOkyanusMesh(def);
        break;
      case 'volkan':
        mainMesh = this._createVolkanMesh(def);
        break;
      case 'ada':
        mainMesh = this._createAdaMesh(def);
        break;
      case 'nehir':
        mainMesh = this._createNehirMesh(def);
        break;
      case 'orman':
        mainMesh = this._createOrmanMesh(def);
        break;
      case 'firtina_bulutu':
        mainMesh = this._createFirtinaBulutuMesh(def);
        break;
      case 'magara':
        mainMesh = this._createMagaraMesh(def);
        break;
      case 'gokkusagi':
        mainMesh = this._createGokkusagiMesh(def);
        break;
      case 'kanyon':
        mainMesh = this._createKanyonMesh(def);
        break;
      case 'fay_hatti':
        mainMesh = this._createFayHattiMesh(def);
        break;
      case 'bulut':
        mainMesh = this._createBulutMesh(def);
        break;
      // Kategori 3, 2 & 4: Canlılar, Fauna ve Doğa Güncellemesi
      case 'at':
        mainMesh = this._createAtMesh(def);
        break;
      case 'koyun':
        mainMesh = this._createKoyunMesh(def);
        break;
      case 'kurt':
        mainMesh = this._createKurtMesh(def);
        break;
      case 'ari':
        mainMesh = this._createAriMesh(def);
        break;
      case 'yilan':
        mainMesh = this._createYilanMesh(def);
        break;
      case 'baykus':
        mainMesh = this._createBaykusMesh(def);
        break;
      case 'kaplumbaga':
        mainMesh = this._createKaplumbagaMesh(def);
        break;
      case 'bal':
        mainMesh = this._createBalMesh(def);
        break;
      case 'nilufer':
        mainMesh = this._createNiluferMesh(def);
        break;
      case 'elma':
        mainMesh = this._createElmaMesh(def);
        break;
      case 'kurbaga':
        mainMesh = this._createKurbagaMesh(def);
        break;
      case 'sincap':
        mainMesh = this._createSincapMesh(def);
        break;
      case 'geyik':
        mainMesh = this._createGeyikMesh(def);
        break;
      case 'kelebek':
        mainMesh = this._createKelebekMesh(def);
        break;
      default:
        mainMesh = this._createDefaultMesh(def);
        break;
    }

    group.add(mainMesh);

    // Generate 4-6 fracture pieces for shattering mechanics
    group.userData.fracturePieces = this._generateFracturePieces(def);

    return group;
  }

  static _createFireMesh(def) {
    const group = new THREE.Group();

    // Dış alev hare & tabanı (2D alev görselindeki açık sarı/turuncu parlama çemberi)
    const haloGeo = new THREE.SphereGeometry(0.7, 16, 16);
    haloGeo.scale(1, 1.1, 0.4);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffe8b4,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.position.y = 0.5;
    group.add(halo);

    // Ana alev gövdesi (Kırmızımsı koyu turuncu dış siluet)
    const mainFlameGeo = new THREE.ConeGeometry(0.55, 1.35, 7);
    const mainFlameMat = new THREE.MeshToonMaterial({
      color: 0xef4444,
      emissive: 0xd97706,
      emissiveIntensity: 0.4
    });
    const mainFlame = new THREE.Mesh(mainFlameGeo, mainFlameMat);
    mainFlame.position.y = 0.65;
    mainFlame.add(this._createOutline(mainFlameGeo, 0x7f1d1d, 0.04));
    group.add(mainFlame);

    // Orta katman alev (Parlak turuncu)
    const midFlameGeo = new THREE.ConeGeometry(0.42, 1.1, 7);
    const midFlameMat = new THREE.MeshToonMaterial({
      color: 0xf97316,
      emissive: 0xfbbf24,
      emissiveIntensity: 0.6
    });
    const midFlame = new THREE.Mesh(midFlameGeo, midFlameMat);
    midFlame.position.set(0, 0.6, 0.08);
    group.add(midFlame);

    // Çekirdek alev (Sarı kalori çekirdeği)
    const coreFlameGeo = new THREE.ConeGeometry(0.24, 0.75, 6);
    const coreFlameMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const coreFlame = new THREE.Mesh(coreFlameGeo, coreFlameMat);
    coreFlame.position.set(0, 0.45, 0.14);
    group.add(coreFlame);

    // Sağ-sol kıvılcım dilleri
    const sparkGeo = new THREE.ConeGeometry(0.12, 0.4, 5);
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
    const leftSpark = new THREE.Mesh(sparkGeo, sparkMat);
    leftSpark.position.set(-0.42, 0.65, 0);
    leftSpark.rotation.z = 0.35;
    group.add(leftSpark);

    const rightSpark = new THREE.Mesh(sparkGeo, sparkMat);
    rightSpark.position.set(0.42, 0.7, 0);
    rightSpark.rotation.z = -0.35;
    group.add(rightSpark);

    const light = new THREE.PointLight(0xff7700, 2.0, 3.5);
    light.position.set(0, 0.7, 0.3);
    group.add(light);

    return group;
  }

  static _createWaterMesh(def) {
    const group = new THREE.Group();

    // 2D görseldeki gibi damla (Tear-drop) gövde
    // Alt yuvarlak küre
    const baseSphereGeo = new THREE.SphereGeometry(0.55, 24, 24);
    const waterMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.25,
      transmission: 0.85,
      opacity: 0.95,
      transparent: true,
      roughness: 0.08,
      ior: 1.33
    });
    const baseSphere = new THREE.Mesh(baseSphereGeo, waterMat);
    baseSphere.position.y = 0.45;
    group.add(baseSphere);

    // Üst sivri damla konisi
    const tipConeGeo = new THREE.ConeGeometry(0.52, 0.75, 24);
    const tipCone = new THREE.Mesh(tipConeGeo, waterMat);
    tipCone.position.y = 0.85;
    group.add(tipCone);

    // Koyu mavi dış kontur çizgisi (2D çizim efekti)
    const outlineGroup = new THREE.Group();
    const sphereOutline = this._createOutline(baseSphereGeo, 0x0369a1, 0.04);
    sphereOutline.position.y = 0.45;
    outlineGroup.add(sphereOutline);

    const tipOutline = this._createOutline(tipConeGeo, 0x0369a1, 0.04);
    tipOutline.position.y = 0.85;
    outlineGroup.add(tipOutline);
    group.add(outlineGroup);

    // 2D çizimdeki karakteristik beyaz ışık parıltısı (Highlight oval)
    const highlightGeo = new THREE.SphereGeometry(0.18, 12, 12);
    highlightGeo.scale(0.5, 1.2, 0.2);
    const highlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
    const highlight = new THREE.Mesh(highlightGeo, highlightMat);
    highlight.position.set(-0.24, 0.58, 0.42);
    highlight.rotation.z = 0.25;
    group.add(highlight);

    return group;
  }

  static _createEarthMesh(def) {
    const group = new THREE.Group();

    // 2D görseldeki Minecraft/Voxel tarzı çimenli toprak küpü (Grass Block)
    const cubeSize = 0.95;
    const dirtGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const dirtMat = new THREE.MeshStandardMaterial({
      color: 0x78350f, // Koyu verimli toprak kahvesi
      roughness: 0.9,
      metalness: 0.05
    });
    const dirtCube = new THREE.Mesh(dirtGeo, dirtMat);
    dirtCube.position.y = 0.55;
    dirtCube.add(this._createOutline(dirtGeo, 0x271406, 0.035));
    group.add(dirtCube);

    // Üstteki yeşil çimen tabakası (Grass Top Lid)
    const grassTopGeo = new THREE.BoxGeometry(cubeSize * 1.02, 0.22, cubeSize * 1.02);
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x4ade80, // 2D görseldeki canlı yeşil
      roughness: 0.6
    });
    const grassTop = new THREE.Mesh(grassTopGeo, grassMat);
    grassTop.position.set(0, 0.55 + cubeSize * 0.42, 0);
    grassTop.add(this._createOutline(grassTopGeo, 0x166534, 0.035));
    group.add(grassTop);

    // Çimenden aşağı sarkan küçük yeşil üçgen sarkıtlar
    const dripGeo = new THREE.ConeGeometry(0.1, 0.2, 4);
    const dripPositions = [
      [0.25, 0.85, 0.48], [-0.2, 0.85, 0.48],
      [0.48, 0.85, 0.15], [-0.48, 0.85, -0.2]
    ];
    dripPositions.forEach(([dx, dy, dz]) => {
      const drip = new THREE.Mesh(dripGeo, grassMat);
      drip.position.set(dx, dy, dz);
      drip.rotation.x = Math.PI;
      group.add(drip);
    });

    return group;
  }

  static _createAirMesh(def) {
    const group = new THREE.Group();

    // 2D görseldeki huni/hortum biçiminde dönen rüzgar burgusu (Tornado / Whirlwind)
    const tornadoMat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      roughness: 0.2,
      emissive: 0xbae6fd,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.88
    });

    // Aşağıdan yukarıya genişleyen 4 katmanlı rüzgar halkası (Torus rings)
    const layers = [
      { radius: 0.18, tube: 0.05, y: 0.25 },
      { radius: 0.32, tube: 0.065, y: 0.45 },
      { radius: 0.46, tube: 0.075, y: 0.68 },
      { radius: 0.62, tube: 0.085, y: 0.92 }
    ];

    layers.forEach((l, idx) => {
      const torusGeo = new THREE.TorusGeometry(l.radius, l.tube, 12, 24);
      const ring = new THREE.Mesh(torusGeo, tornadoMat);
      ring.rotation.x = Math.PI / 2 + (idx % 2 === 0 ? 0.12 : -0.12);
      ring.position.y = l.y;
      ring.add(this._createOutline(torusGeo, 0x0284c7, 0.03));
      group.add(ring);
    });

    // En tepedeki spiral rüzgar şeridi
    const capGeo = new THREE.ConeGeometry(0.2, 0.35, 6);
    const cap = new THREE.Mesh(capGeo, tornadoMat);
    cap.position.y = 0.15;
    cap.rotation.x = Math.PI;
    group.add(cap);

    return group;
  }

  static _createSteamMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Kabarık, yukarı doğru tüten beyaz-gri duman ve buhar küreleri kümesi
    const steamMat = new THREE.MeshToonMaterial({
      color: 0xf1f5f9,
      transparent: true,
      opacity: 0.85
    });

    const puffs = [
      { r: 0.35, x: 0, y: 0.3, z: 0 },
      { r: 0.42, x: -0.15, y: 0.55, z: 0.08 },
      { r: 0.38, x: 0.18, y: 0.62, z: -0.05 },
      { r: 0.3, x: -0.05, y: 0.88, z: 0.05 },
      { r: 0.22, x: 0.15, y: 1.05, z: 0 }
    ];

    puffs.forEach(p => {
      const geo = new THREE.SphereGeometry(p.r, 16, 16);
      const mesh = new THREE.Mesh(geo, steamMat);
      mesh.position.set(p.x, p.y, p.z);
      mesh.add(this._createOutline(geo, 0x94a3b8, 0.035));
      group.add(mesh);
    });

    return group;
  }

  static _createMudMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Erimiş/akışkan çamur yığını, üstte sıçrayan çamur damlacıkları ve baloncuk
    const mudMat = new THREE.MeshToonMaterial({
      color: 0x5c4033, // Zengin ıslak çamur kahvesi
      roughness: 0.8
    });

    // Ana çamur gövdesi
    const baseGeo = new THREE.SphereGeometry(0.65, 16, 16);
    baseGeo.scale(1.2, 0.55, 1.1);
    const base = new THREE.Mesh(baseGeo, mudMat);
    base.position.y = 0.3;
    base.add(this._createOutline(baseGeo, 0x27170c, 0.04));
    group.add(base);

    // Çamur baloncuğu
    const bubbleGeo = new THREE.SphereGeometry(0.24, 14, 14);
    const bubbleMat = new THREE.MeshToonMaterial({ color: 0x785542 });
    const bubble = new THREE.Mesh(bubbleGeo, bubbleMat);
    bubble.position.set(0.2, 0.52, 0.15);
    bubble.add(this._createOutline(bubbleGeo, 0x27170c, 0.035));
    group.add(bubble);

    // Yanlara sıçrayan küçük çamur parçaları
    const splashCoords = [[-0.45, 0.25, 0.3], [0.5, 0.2, -0.2], [-0.2, 0.65, -0.1]];
    splashCoords.forEach(([sx, sy, sz]) => {
      const sGeo = new THREE.SphereGeometry(0.12, 10, 10);
      const splash = new THREE.Mesh(sGeo, mudMat);
      splash.position.set(sx, sy, sz);
      splash.add(this._createOutline(sGeo, 0x27170c, 0.035));
      group.add(splash);
    });

    return group;
  }

  static _createLavaMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Çatlaklı koyu volkanik kaya kabuğu ve yarıklardan taşan kızgın magma/lav
    const rockGeo = new THREE.DodecahedronGeometry(0.65, 1);
    const rockMat = new THREE.MeshToonMaterial({
      color: 0x1c1917, // Simsiyah volkanik bazalt
      roughness: 0.9
    });
    const rock = new THREE.Mesh(rockGeo, rockMat);
    rock.position.y = 0.5;
    rock.add(this._createOutline(rockGeo, 0x0c0a09, 0.04));
    group.add(rock);

    // Taşın üstünden/yarıklarından dışarı taşan parlak lav akıntıları
    const lavaMat = new THREE.MeshBasicMaterial({ color: 0xff3b00 });
    const lavaCoreGeo = new THREE.SphereGeometry(0.48, 14, 14);
    const lavaCore = new THREE.Mesh(lavaCoreGeo, lavaMat);
    lavaCore.position.set(0.1, 0.55, 0.15);
    group.add(lavaCore);

    // Üstte kaynayan parlak sarı lav damlası
    const dropGeo = new THREE.SphereGeometry(0.22, 10, 10);
    const dropMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const drop = new THREE.Mesh(dropGeo, dropMat);
    drop.position.set(-0.15, 0.85, 0.1);
    group.add(drop);

    const light = new THREE.PointLight(0xff5500, 2.2, 3.5);
    light.position.set(0, 0.7, 0.4);
    group.add(light);

    return group;
  }

  static _createSandMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Katmanlı altın sarısı kum tepeciği ve dökülen kum taneleri
    const sandMat = new THREE.MeshToonMaterial({
      color: 0xf59e0b, // Altın çöl sarısı
      roughness: 0.85
    });

    const duneGeo = new THREE.ConeGeometry(0.75, 0.7, 8);
    const dune = new THREE.Mesh(duneGeo, sandMat);
    dune.position.y = 0.35;
    dune.add(this._createOutline(duneGeo, 0xb45309, 0.04));
    group.add(dune);

    // Yan tepecik
    const sideGeo = new THREE.ConeGeometry(0.45, 0.5, 7);
    const sideDune = new THREE.Mesh(sideGeo, sandMat);
    sideDune.position.set(0.35, 0.25, 0.15);
    sideDune.add(this._createOutline(sideGeo, 0xb45309, 0.035));
    group.add(sideDune);

    // Parıldayan kum kristalleri
    const grainMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const gCoords = [[-0.2, 0.45, 0.3], [0.1, 0.6, 0.2], [0.4, 0.3, -0.1]];
    gCoords.forEach(([gx, gy, gz]) => {
      const gGeo = new THREE.OctahedronGeometry(0.08, 0);
      const grain = new THREE.Mesh(gGeo, grainMat);
      grain.position.set(gx, gy, gz);
      group.add(grain);
    });

    return group;
  }

  static _createObsidianMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Keskin yüzeyli, mor/eflatun parıltılı koyu siyah volkanik cam kristali
    const crystalGeo = new THREE.OctahedronGeometry(0.65, 0);
    crystalGeo.scale(0.85, 1.3, 0.85);

    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x180d2b, // Koyu mor-siyah
      roughness: 0.15,
      metalness: 0.7,
      emissive: 0x581c87,
      emissiveIntensity: 0.4
    });

    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    crystal.position.y = 0.65;
    crystal.rotation.y = Math.PI / 4;
    crystal.add(this._createOutline(crystalGeo, 0x3b0764, 0.04));
    group.add(crystal);

    // Yan keskin faset parçası
    const shardGeo = new THREE.OctahedronGeometry(0.35, 0);
    shardGeo.scale(0.6, 1.1, 0.6);
    const shard = new THREE.Mesh(shardGeo, crystalMat);
    shard.position.set(0.35, 0.4, 0.1);
    shard.rotation.z = -0.3;
    shard.add(this._createOutline(shardGeo, 0x3b0764, 0.035));
    group.add(shard);

    return group;
  }

  static _createRainMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Açık mavi, hafif eğimli düşen 3 adet parlak su damlası kümesi
    const dropMat = new THREE.MeshToonMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.88,
      emissive: 0x0284c7,
      emissiveIntensity: 0.25
    });

    const drops = [
      { scale: 0.32, x: -0.28, y: 0.7, z: 0.05 },
      { scale: 0.38, x: 0.1, y: 0.45, z: 0 },
      { scale: 0.28, x: -0.05, y: 0.2, z: 0.15 }
    ];

    drops.forEach(d => {
      const dropGeo = new THREE.ConeGeometry(0.4, 0.9, 8);
      const mesh = new THREE.Mesh(dropGeo, dropMat);
      mesh.scale.set(d.scale, d.scale, d.scale);
      mesh.position.set(d.x, d.y, d.z);
      mesh.rotation.z = 0.22; // Hafif rüzgarlı eğim
      mesh.add(this._createOutline(dropGeo, 0x0369a1, 0.04));
      group.add(mesh);

      // Damlanın altındaki yuvarlak küresel dip
      const sphereGeo = new THREE.SphereGeometry(0.4 * d.scale, 8, 8);
      const sMesh = new THREE.Mesh(sphereGeo, dropMat);
      sMesh.position.set(d.x, d.y - 0.35 * d.scale, d.z);
      group.add(sMesh);
    });

    return group;
  }

  static _createEnergyMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Sarı ve turuncu elektrik şelaleleri saçan plazma küresi
    const coreGeo = new THREE.IcosahedronGeometry(0.45, 1);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = 0.55;
    group.add(core);

    // Dönen enerji halkaları
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const ringGeo1 = new THREE.TorusGeometry(0.65, 0.045, 8, 24);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat);
    ring1.position.y = 0.55;
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(0.58, 0.04, 8, 24);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat);
    ring2.position.y = 0.55;
    ring2.rotation.y = Math.PI / 3;
    ring2.rotation.z = Math.PI / 4;
    group.add(ring2);

    const light = new THREE.PointLight(0xffea00, 2.5, 3.5);
    light.position.set(0, 0.55, 0);
    group.add(light);

    return group;
  }

  static _createWindMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: İki adet kıvrımlı, akışkan beyaz/camgöbeği hava akımı rüzgar çizgisi
    const windMat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.85,
      roughness: 0.2
    });

    const r1Geo = new THREE.TorusGeometry(0.6, 0.07, 12, 32, Math.PI * 1.5);
    const r1 = new THREE.Mesh(r1Geo, windMat);
    r1.position.y = 0.5;
    r1.rotation.x = Math.PI / 4;
    r1.add(this._createOutline(r1Geo, 0x0284c7, 0.035));
    group.add(r1);

    const r2Geo = new THREE.TorusGeometry(0.42, 0.055, 12, 28, Math.PI * 1.3);
    const r2 = new THREE.Mesh(r2Geo, windMat);
    r2.position.set(0.1, 0.65, 0);
    r2.rotation.y = Math.PI / 3;
    r2.rotation.z = Math.PI / 6;
    r2.add(this._createOutline(r2Geo, 0x0284c7, 0.035));
    group.add(r2);

    return group;
  }

  static _createStoneMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Gri renkli, yontulmuş fasetleri olan dik duran sert kaya
    const stoneGeo = new THREE.DodecahedronGeometry(0.62, 0);
    stoneGeo.scale(0.9, 1.15, 0.85);

    const stoneMat = new THREE.MeshToonMaterial({
      color: 0x64748b, // Keskin gri arduvaz kayası
      roughness: 0.7
    });

    const stone = new THREE.Mesh(stoneGeo, stoneMat);
    stone.position.y = 0.55;
    stone.add(this._createOutline(stoneGeo, 0x1e293b, 0.04));
    group.add(stone);

    // Ön kısımda açık gri parlama faseti
    const facetGeo = new THREE.TetrahedronGeometry(0.25, 0);
    const facetMat = new THREE.MeshToonMaterial({ color: 0x94a3b8 });
    const facet = new THREE.Mesh(facetGeo, facetMat);
    facet.position.set(0.2, 0.6, 0.38);
    facet.rotation.set(0.2, 0.5, 0.1);
    group.add(facet);

    return group;
  }

  static _createGlassMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Şeffaf cam küp/kristal prizma, parlak yansımaları olan kenarlar
    const glassGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      ior: 1.5,
      clearcoat: 1.0,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.25
    });

    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.y = 0.45;
    glass.rotation.y = Math.PI / 6;
    glass.add(this._createOutline(glassGeo, 0x0284c7, 0.035));
    group.add(glass);

    return group;
  }

  static _createCloudMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Bembeyaz, yumuşak pofuduk bulut yığını
    const cloudMat = new THREE.MeshToonMaterial({
      color: 0xffffff,
      roughness: 0.5
    });

    const puffs = [
      { r: 0.38, x: -0.3, y: 0.4, z: 0 },
      { r: 0.5, x: 0, y: 0.52, z: 0 },
      { r: 0.36, x: 0.32, y: 0.42, z: 0 },
      { r: 0.32, x: 0.1, y: 0.38, z: 0.2 }
    ];

    puffs.forEach(p => {
      const geo = new THREE.SphereGeometry(p.r, 16, 16);
      const mesh = new THREE.Mesh(geo, cloudMat);
      mesh.position.set(p.x, p.y, p.z);
      mesh.add(this._createOutline(geo, 0x94a3b8, 0.035));
      group.add(mesh);
    });

    return group;
  }

  static _createLightningMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Parlak sarı, zikzak çizen keskin çizgi roman yıldırımı
    const boltMat = new THREE.MeshBasicMaterial({ color: 0xffea00 });

    // Üst parça
    const p1Geo = new THREE.BoxGeometry(0.16, 0.55, 0.08);
    const p1 = new THREE.Mesh(p1Geo, boltMat);
    p1.position.set(-0.12, 0.75, 0);
    p1.rotation.z = -0.4;
    p1.add(this._createOutline(p1Geo, 0xca8a04, 0.04));
    group.add(p1);

    // Orta çapraz dirsek
    const p2Geo = new THREE.BoxGeometry(0.18, 0.4, 0.08);
    const p2 = new THREE.Mesh(p2Geo, boltMat);
    p2.position.set(0.08, 0.5, 0);
    p2.rotation.z = 0.7;
    p2.add(this._createOutline(p2Geo, 0xca8a04, 0.04));
    group.add(p2);

    // Alt sivri uç
    const p3Geo = new THREE.ConeGeometry(0.14, 0.55, 4);
    const p3 = new THREE.Mesh(p3Geo, boltMat);
    p3.position.set(0.05, 0.22, 0);
    p3.rotation.z = -0.25;
    p3.add(this._createOutline(p3Geo, 0xca8a04, 0.04));
    group.add(p3);

    const light = new THREE.PointLight(0xfff000, 2.5, 4);
    light.position.set(0, 0.5, 0.2);
    group.add(light);

    return group;
  }

  static _createPlantMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Çift yapraklı yeşil filiz ve minik kahverengi kök/toprak tabanı
    const leafMat = new THREE.MeshToonMaterial({
      color: 0x4ade80,
      roughness: 0.5
    });

    const stemGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.45, 8);
    const stemMat = new THREE.MeshToonMaterial({ color: 0x15803d });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.y = 0.25;
    stem.add(this._createOutline(stemGeo, 0x14532d, 0.04));
    group.add(stem);

    // Sol yaprak
    const leaf1Geo = new THREE.ConeGeometry(0.18, 0.48, 5);
    leaf1Geo.scale(1, 1, 0.3);
    const leaf1 = new THREE.Mesh(leaf1Geo, leafMat);
    leaf1.position.set(-0.16, 0.42, 0);
    leaf1.rotation.z = 0.65;
    leaf1.add(this._createOutline(leaf1Geo, 0x166534, 0.035));
    group.add(leaf1);

    // Sağ yaprak
    const leaf2Geo = new THREE.ConeGeometry(0.2, 0.52, 5);
    leaf2Geo.scale(1, 1, 0.3);
    const leaf2 = new THREE.Mesh(leaf2Geo, leafMat);
    leaf2.position.set(0.18, 0.48, 0);
    leaf2.rotation.z = -0.65;
    leaf2.add(this._createOutline(leaf2Geo, 0x166534, 0.035));
    group.add(leaf2);

    return group;
  }

  static _createTreeMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: 3 katmanlı koyu yeşil çam ağacı ve kahverengi gövde
    const trunkGeo = new THREE.CylinderGeometry(0.14, 0.18, 0.55, 8);
    const trunkMat = new THREE.MeshToonMaterial({ color: 0x78350f, roughness: 0.8 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 0.25;
    trunk.add(this._createOutline(trunkGeo, 0x451a03, 0.04));
    group.add(trunk);

    const foliageMat = new THREE.MeshToonMaterial({ color: 0x15803d, roughness: 0.5 });
    const coneTiers = [
      { r: 0.62, h: 0.5, y: 0.55 },
      { r: 0.48, h: 0.45, y: 0.8 },
      { r: 0.32, h: 0.4, y: 1.05 }
    ];

    coneTiers.forEach(t => {
      const cGeo = new THREE.ConeGeometry(t.r, t.h, 7);
      const cMesh = new THREE.Mesh(cGeo, foliageMat);
      cMesh.position.y = t.y;
      cMesh.add(this._createOutline(cGeo, 0x052e16, 0.035));
      group.add(cMesh);
    });

    return group;
  }

  static _createWoodMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Kabuklu kahverengi odun kütüğü, kesitinde halka desenli açık sarı ahşap
    const logGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.85, 12);
    const logMat = new THREE.MeshToonMaterial({ color: 0x854d0e, roughness: 0.7 });
    const log = new THREE.Mesh(logGeo, logMat);
    log.position.y = 0.35;
    log.rotation.z = Math.PI / 2;
    log.add(this._createOutline(logGeo, 0x451a03, 0.04));
    group.add(log);

    // Kütüğün iki ucundaki açık renk kesit halkası
    [-0.43, 0.43].forEach(x => {
      const capGeo = new THREE.CircleGeometry(0.3, 12);
      const capMat = new THREE.MeshToonMaterial({ color: 0xfde047 });
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(x, 0.35, 0);
      cap.rotation.y = x > 0 ? Math.PI / 2 : -Math.PI / 2;
      group.add(cap);
    });

    return group;
  }

  static _createSplinterMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Çapraz duran sivri ahşap kıymık parçaları
    const woodMat = new THREE.MeshToonMaterial({ color: 0xd97706 });
    const s1Geo = new THREE.ConeGeometry(0.12, 0.85, 4);
    const s1 = new THREE.Mesh(s1Geo, woodMat);
    s1.position.set(-0.1, 0.45, 0);
    s1.rotation.z = -0.4;
    s1.add(this._createOutline(s1Geo, 0x78350f, 0.04));
    group.add(s1);

    const s2Geo = new THREE.ConeGeometry(0.09, 0.65, 4);
    const s2 = new THREE.Mesh(s2Geo, woodMat);
    s2.position.set(0.15, 0.38, 0.05);
    s2.rotation.z = 0.5;
    s2.add(this._createOutline(s2Geo, 0x78350f, 0.035));
    group.add(s2);

    return group;
  }

  static _createFiberMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Açık sarı-yeşil bitki lifi demeti
    const fiberMat = new THREE.MeshToonMaterial({ color: 0xa3e635 });
    for (let i = 0; i < 4; i++) {
      const fGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.75, 6);
      const fiber = new THREE.Mesh(fGeo, fiberMat);
      fiber.position.set((i - 1.5) * 0.12, 0.4, (i % 2) * 0.06);
      fiber.rotation.z = (i - 1.5) * 0.18;
      fiber.add(this._createOutline(fGeo, 0x4d7c0f, 0.035));
      group.add(fiber);
    }
    return group;
  }

  static _createRopeMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Sarmal düğümlü kalın kahverengi halat
    const ropeMat = new THREE.MeshToonMaterial({ color: 0xd97706, roughness: 0.85 });
    const torusGeo = new THREE.TorusGeometry(0.38, 0.12, 12, 24);
    const rope = new THREE.Mesh(torusGeo, ropeMat);
    rope.position.y = 0.35;
    rope.rotation.x = Math.PI / 2.2;
    rope.add(this._createOutline(torusGeo, 0x78350f, 0.04));
    group.add(rope);

    // Halatın ucundan sarkan parça
    const tipGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.4, 8);
    const tip = new THREE.Mesh(tipGeo, ropeMat);
    tip.position.set(0.35, 0.25, 0.15);
    tip.rotation.z = 0.5;
    group.add(tip);

    return group;
  }

  static _createMushroomMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Kırmızı şapkalı, beyaz benekli orman mantarı
    const stalkGeo = new THREE.CylinderGeometry(0.14, 0.18, 0.45, 10);
    const stalkMat = new THREE.MeshToonMaterial({ color: 0xf8fafc, roughness: 0.4 });
    const stalk = new THREE.Mesh(stalkGeo, stalkMat);
    stalk.position.y = 0.22;
    stalk.add(this._createOutline(stalkGeo, 0x94a3b8, 0.04));
    group.add(stalk);

    // Kırmızı şapka kubbesi
    const capGeo = new THREE.SphereGeometry(0.48, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const capMat = new THREE.MeshToonMaterial({ color: 0xef4444, roughness: 0.3 });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 0.42;
    cap.add(this._createOutline(capGeo, 0x991b1b, 0.04));
    group.add(cap);

    // Beyaz benekler
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const dots = [
      [0, 0.88, 0.1], [0.25, 0.72, 0.25], [-0.25, 0.72, 0.25],
      [0.32, 0.65, -0.15], [-0.32, 0.65, -0.15]
    ];
    dots.forEach(([dx, dy, dz]) => {
      const dGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const dot = new THREE.Mesh(dGeo, dotMat);
      dot.position.set(dx, dy, dz);
      group.add(dot);
    });

    return group;
  }

  static _createYosunMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Zümrüt yeşili kadifemsi yosun kümesi
    const mossMat = new THREE.MeshToonMaterial({ color: 0x16a34a, roughness: 0.9 });
    const puffs = [
      { r: 0.35, x: 0, y: 0.22, z: 0 },
      { r: 0.28, x: 0.25, y: 0.2, z: 0.15 },
      { r: 0.24, x: -0.22, y: 0.18, z: 0.1 },
      { r: 0.22, x: 0.05, y: 0.38, z: -0.05 }
    ];

    puffs.forEach(p => {
      const geo = new THREE.SphereGeometry(p.r, 12, 12);
      geo.scale(1.2, 0.65, 1.1);
      const m = new THREE.Mesh(geo, mossMat);
      m.position.set(p.x, p.y, p.z);
      m.add(this._createOutline(geo, 0x14532d, 0.035));
      group.add(m);
    });

    return group;
  }

  static _createCottonMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Kahverengi çanak içinde bembeyaz pamuk kozası
    const cottonMat = new THREE.MeshToonMaterial({ color: 0xffffff, roughness: 0.5 });
    const puffs = [
      [0, 0.48, 0, 0.32],
      [-0.18, 0.4, 0.1, 0.24],
      [0.18, 0.4, 0.1, 0.24],
      [0, 0.38, -0.18, 0.24]
    ];

    puffs.forEach(([cx, cy, cz, cr]) => {
      const cGeo = new THREE.SphereGeometry(cr, 12, 12);
      const puff = new THREE.Mesh(cGeo, cottonMat);
      puff.position.set(cx, cy, cz);
      puff.add(this._createOutline(cGeo, 0x94a3b8, 0.035));
      group.add(puff);
    });

    // Alt kahverengi kabuk çanak yaprakları
    const calyxMat = new THREE.MeshToonMaterial({ color: 0x92400e });
    for (let i = 0; i < 4; i++) {
      const leafGeo = new THREE.ConeGeometry(0.14, 0.42, 4);
      const leaf = new THREE.Mesh(leafGeo, calyxMat);
      const ang = (i * Math.PI) / 2;
      leaf.position.set(Math.cos(ang) * 0.22, 0.28, Math.sin(ang) * 0.22);
      leaf.rotation.z = -Math.cos(ang) * 0.6;
      leaf.rotation.x = Math.sin(ang) * 0.6;
      group.add(leaf);
    }

    return group;
  }

  static _createFabricMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Katlanmış mavi kumaş rulosu
    const clothMat = new THREE.MeshToonMaterial({ color: 0x3b82f6, roughness: 0.6 });
    const geo = new THREE.BoxGeometry(0.72, 0.28, 0.52);
    const cloth = new THREE.Mesh(geo, clothMat);
    cloth.position.y = 0.25;
    cloth.rotation.y = 0.25;
    cloth.add(this._createOutline(geo, 0x1d4ed8, 0.04));
    group.add(cloth);

    return group;
  }

  static _createCoalMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Mat siyah, fasetli antrasit kömür parçası
    const coalGeo = new THREE.DodecahedronGeometry(0.55, 0);
    coalGeo.scale(1.1, 0.85, 1);
    const coalMat = new THREE.MeshToonMaterial({ color: 0x18181b, roughness: 0.95 });
    const coal = new THREE.Mesh(coalGeo, coalMat);
    coal.position.y = 0.4;
    coal.add(this._createOutline(coalGeo, 0x09090b, 0.04));
    group.add(coal);

    return group;
  }

  static _createAshMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Gri kül yığını ve üzerinde minik akkor kıvılcım
    const ashGeo = new THREE.SphereGeometry(0.6, 12, 12);
    ashGeo.scale(1.2, 0.4, 1.1);
    const ashMat = new THREE.MeshToonMaterial({ color: 0x64748b, roughness: 0.95 });
    const ash = new THREE.Mesh(ashGeo, ashMat);
    ash.position.y = 0.18;
    ash.add(this._createOutline(ashGeo, 0x334155, 0.035));
    group.add(ash);

    // Kül içindeki kırmızı parıltı
    const emberGeo = new THREE.SphereGeometry(0.1, 8, 8);
    const emberMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const ember = new THREE.Mesh(emberGeo, emberMat);
    ember.position.set(0.18, 0.25, 0.1);
    group.add(ember);

    return group;
  }

  static _createPaperMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Rulo biçimli, kenarları kıvrık bej parşömen kağıdı
    const paperMat = new THREE.MeshToonMaterial({ color: 0xfef3c7, roughness: 0.7 });
    const sheetGeo = new THREE.BoxGeometry(0.75, 0.04, 0.55);
    const paper = new THREE.Mesh(sheetGeo, paperMat);
    paper.position.y = 0.25;
    paper.rotation.y = 0.2;
    paper.rotation.z = 0.05;
    paper.add(this._createOutline(sheetGeo, 0xd97706, 0.035));
    group.add(paper);

    // Kıvrık rulo kenarı
    const rollGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.55, 12);
    const roll = new THREE.Mesh(rollGeo, paperMat);
    roll.position.set(0.38, 0.28, 0.08);
    roll.rotation.x = Math.PI / 2;
    roll.add(this._createOutline(rollGeo, 0xd97706, 0.035));
    group.add(roll);

    return group;
  }

  static _createLifeMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Parlak yeşil ruh küresi, içinde çift sarmal DNA sembolü ve enerji dalgası
    const coreGeo = new THREE.SphereGeometry(0.46, 20, 20);
    const coreMat = new THREE.MeshToonMaterial({
      color: 0x22c55e,
      emissive: 0x4ade80,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.88
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = 0.48;
    core.add(this._createOutline(coreGeo, 0x14532d, 0.04));
    group.add(core);

    // Çift sarmal dönen enerji halkası
    const helixMat = new THREE.MeshBasicMaterial({ color: 0xbbf7d0 });
    const ringGeo = new THREE.TorusGeometry(0.58, 0.04, 8, 24);
    const ring1 = new THREE.Mesh(ringGeo, helixMat);
    ring1.position.y = 0.48;
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, helixMat);
    ring2.position.y = 0.48;
    ring2.rotation.y = Math.PI / 3;
    group.add(ring2);

    const light = new THREE.PointLight(0x4ade80, 2.2, 3.5);
    light.position.set(0, 0.48, 0);
    group.add(light);

    return group;
  }

  static _createBirdMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Mavi gövdeli, sarı göğüslü/gagalı sevimli çizgi film kuşu
    const bodyGeo = new THREE.SphereGeometry(0.38, 14, 14);
    bodyGeo.scale(1, 0.9, 1.25);
    const bodyMat = new THREE.MeshToonMaterial({ color: 0x0ea5e9, roughness: 0.4 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.42;
    body.add(this._createOutline(bodyGeo, 0x0369a1, 0.04));
    group.add(body);

    // Sarı karın bölgesi
    const bellyGeo = new THREE.SphereGeometry(0.28, 12, 12);
    bellyGeo.scale(0.85, 0.9, 1.1);
    const bellyMat = new THREE.MeshToonMaterial({ color: 0xfef08a });
    const belly = new THREE.Mesh(bellyGeo, bellyMat);
    belly.position.set(0, 0.35, 0.15);
    group.add(belly);

    // Sarı gaga
    const beakGeo = new THREE.ConeGeometry(0.12, 0.28, 4);
    const beakMat = new THREE.MeshToonMaterial({ color: 0xf59e0b });
    const beak = new THREE.Mesh(beakGeo, beakMat);
    beak.rotation.x = Math.PI / 2;
    beak.position.set(0, 0.45, 0.52);
    beak.add(this._createOutline(beakGeo, 0xb45309, 0.035));
    group.add(beak);

    // Kanatlar
    [-0.35, 0.35].forEach(wx => {
      const wingGeo = new THREE.ConeGeometry(0.18, 0.5, 4);
      wingGeo.scale(0.3, 1, 1);
      const wing = new THREE.Mesh(wingGeo, bodyMat);
      wing.position.set(wx, 0.42, -0.05);
      wing.rotation.x = Math.PI / 2.5;
      wing.rotation.z = wx < 0 ? 0.3 : -0.3;
      wing.add(this._createOutline(wingGeo, 0x0369a1, 0.035));
      group.add(wing);
    });

    return group;
  }

  static _createAnimalMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Karasal sevimli geyik/hayvan, boynuzlu ve dört bacaklı
    const deerMat = new THREE.MeshToonMaterial({ color: 0xb45309, roughness: 0.6 });

    // Gövde
    const bodyGeo = new THREE.BoxGeometry(0.55, 0.42, 0.7);
    const body = new THREE.Mesh(bodyGeo, deerMat);
    body.position.y = 0.5;
    body.add(this._createOutline(bodyGeo, 0x78350f, 0.04));
    group.add(body);

    // Baş & boyun
    const headGeo = new THREE.BoxGeometry(0.28, 0.3, 0.38);
    const head = new THREE.Mesh(headGeo, deerMat);
    head.position.set(0, 0.75, 0.38);
    head.add(this._createOutline(headGeo, 0x78350f, 0.035));
    group.add(head);

    // Boynuzlar
    const hornMat = new THREE.MeshToonMaterial({ color: 0xfef3c7 });
    [-0.12, 0.12].forEach(hx => {
      const hornGeo = new THREE.ConeGeometry(0.05, 0.35, 4);
      const horn = new THREE.Mesh(hornGeo, hornMat);
      horn.position.set(hx, 0.98, 0.32);
      horn.rotation.x = -0.2;
      horn.rotation.z = hx < 0 ? -0.3 : 0.3;
      horn.add(this._createOutline(hornGeo, 0x78350f, 0.035));
      group.add(horn);
    });

    // 4 Bacak
    const legGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.45, 6);
    [[-0.2, -0.22], [0.2, -0.22], [-0.2, 0.22], [0.2, 0.22]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, deerMat);
      leg.position.set(lx, 0.22, lz);
      leg.add(this._createOutline(legGeo, 0x78350f, 0.035));
      group.add(leg);
    });

    return group;
  }

  static _createFishMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Parlak turuncu Japon balığı / sazan, sevimli yüzgeçler ve kuyruk
    const fishMat = new THREE.MeshToonMaterial({ color: 0xf97316, roughness: 0.3 });

    // Ana gövde
    const bodyGeo = new THREE.ConeGeometry(0.35, 0.85, 8);
    bodyGeo.scale(0.8, 1, 1.2);
    const body = new THREE.Mesh(bodyGeo, fishMat);
    body.position.y = 0.38;
    body.rotation.z = Math.PI / 2;
    body.add(this._createOutline(bodyGeo, 0xc2410c, 0.04));
    group.add(body);

    // Kuyruk yüzgeci
    const tailGeo = new THREE.ConeGeometry(0.28, 0.35, 3);
    tailGeo.scale(0.2, 1, 1);
    const tail = new THREE.Mesh(tailGeo, fishMat);
    tail.position.set(-0.52, 0.38, 0);
    tail.rotation.z = -Math.PI / 2;
    tail.add(this._createOutline(tailGeo, 0xc2410c, 0.035));
    group.add(tail);

    // Üst sırt yüzgeci
    const finGeo = new THREE.ConeGeometry(0.12, 0.32, 3);
    finGeo.scale(0.2, 1, 1);
    const fin = new THREE.Mesh(finGeo, fishMat);
    fin.position.set(0.05, 0.65, 0);
    fin.add(this._createOutline(finGeo, 0xc2410c, 0.035));
    group.add(fin);

    return group;
  }

  static _createPrimitiveKnifeMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Ahşap sapa sarılı keskin çakmaktaşı bıçak
    const handleGeo = new THREE.CylinderGeometry(0.07, 0.08, 0.55, 8);
    const handleMat = new THREE.MeshToonMaterial({ color: 0x854d0e });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.y = 0.22;
    handle.add(this._createOutline(handleGeo, 0x451a03, 0.035));
    group.add(handle);

    // Çakmaktaşı uç
    const bladeGeo = new THREE.ConeGeometry(0.16, 0.55, 4);
    bladeGeo.scale(0.4, 1, 1);
    const bladeMat = new THREE.MeshToonMaterial({ color: 0x475569, metalness: 0.3 });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.y = 0.65;
    blade.add(this._createOutline(bladeGeo, 0x1e293b, 0.04));
    group.add(blade);

    return group;
  }

  static _createFeatherMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Beyaz ve mavi tonlarında zarif kuş tüyü
    const featherGeo = new THREE.ConeGeometry(0.25, 0.95, 4);
    featherGeo.scale(1, 1, 0.15);
    const featherMat = new THREE.MeshToonMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.2
    });
    const feather = new THREE.Mesh(featherGeo, featherMat);
    feather.position.y = 0.45;
    feather.rotation.z = 0.25;
    feather.add(this._createOutline(featherGeo, 0x0369a1, 0.04));
    group.add(feather);

    // Beyaz orta damar şeridi
    const shaftGeo = new THREE.CylinderGeometry(0.02, 0.015, 1.05, 6);
    const shaftMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);
    shaft.position.y = 0.45;
    shaft.rotation.z = 0.25;
    group.add(shaft);

    return group;
  }

  static _createLeatherMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Kenarları pürüzlü, taba rengi işlenmemiş post/deri
    const peltGeo = new THREE.BoxGeometry(0.72, 0.05, 0.62);
    const peltMat = new THREE.MeshToonMaterial({ color: 0xa16207, roughness: 0.9 });
    const pelt = new THREE.Mesh(peltGeo, peltMat);
    pelt.position.y = 0.22;
    pelt.rotation.y = 0.2;
    pelt.add(this._createOutline(peltGeo, 0x713f12, 0.04));
    group.add(pelt);

    return group;
  }

  static _createCookedMeatMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Beyaz kemik saplı, kızarmış kahverengi et butu
    const meatGeo = new THREE.SphereGeometry(0.38, 14, 14);
    meatGeo.scale(1.25, 0.9, 0.9);
    const meatMat = new THREE.MeshToonMaterial({ color: 0xb45309, roughness: 0.5 });
    const meat = new THREE.Mesh(meatGeo, meatMat);
    meat.position.set(0.12, 0.38, 0);
    meat.add(this._createOutline(meatGeo, 0x78350f, 0.04));
    group.add(meat);

    // Kemik sapı
    const boneGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.75, 8);
    const boneMat = new THREE.MeshToonMaterial({ color: 0xf8fafc });
    const bone = new THREE.Mesh(boneGeo, boneMat);
    bone.position.set(-0.25, 0.28, 0);
    bone.rotation.z = Math.PI / 3.5;
    bone.add(this._createOutline(boneGeo, 0x94a3b8, 0.035));
    group.add(bone);

    // Kemik ucu yumruları
    const knobGeo = new THREE.SphereGeometry(0.09, 8, 8);
    [-0.08, 0.08].forEach(kz => {
      const knob = new THREE.Mesh(knobGeo, boneMat);
      knob.position.set(-0.52, 0.12, kz);
      group.add(knob);
    });

    return group;
  }

  static _createResinMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Damla formunda katılaşmış, bal sarısı şeffaf kehribar reçinesi
    const geo = new THREE.ConeGeometry(0.42, 0.85, 10);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      transmission: 0.85,
      opacity: 0.92,
      transparent: true,
      roughness: 0.12,
      ior: 1.54,
      emissive: 0xd97706,
      emissiveIntensity: 0.35
    });
    const resin = new THREE.Mesh(geo, mat);
    resin.position.y = 0.42;
    resin.rotation.x = Math.PI; // Damla sivri ucu yukarı
    resin.add(this._createOutline(geo, 0xb45309, 0.035));
    group.add(resin);

    return group;
  }

  static _createPotteryMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Pişmiş kilden yapılmış, kiremit kırmızısı rustik çömlek / vazo
    const potMat = new THREE.MeshToonMaterial({ color: 0xb45309, roughness: 0.65 });

    // Gövde
    const bellyGeo = new THREE.SphereGeometry(0.48, 14, 14);
    bellyGeo.scale(1.1, 1.1, 1.1);
    const belly = new THREE.Mesh(bellyGeo, potMat);
    belly.position.y = 0.42;
    belly.add(this._createOutline(bellyGeo, 0x78350f, 0.04));
    group.add(belly);

    // Boyun & ağız
    const neckGeo = new THREE.CylinderGeometry(0.24, 0.32, 0.32, 12);
    const neck = new THREE.Mesh(neckGeo, potMat);
    neck.position.y = 0.78;
    neck.add(this._createOutline(neckGeo, 0x78350f, 0.035));
    group.add(neck);

    return group;
  }

  static _createWaterJugMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Kulplu, ağzından su parıldayan mavi detaylı toprak sürahi/çömlek
    const jugMat = new THREE.MeshToonMaterial({ color: 0x9a3412, roughness: 0.6 });

    const bodyGeo = new THREE.SphereGeometry(0.45, 14, 14);
    bodyGeo.scale(1, 1.15, 1);
    const body = new THREE.Mesh(bodyGeo, jugMat);
    body.position.y = 0.42;
    body.add(this._createOutline(bodyGeo, 0x7c2d12, 0.04));
    group.add(body);

    const neckGeo = new THREE.CylinderGeometry(0.2, 0.28, 0.35, 12);
    const neck = new THREE.Mesh(neckGeo, jugMat);
    neck.position.y = 0.78;
    neck.add(this._createOutline(neckGeo, 0x7c2d12, 0.035));
    group.add(neck);

    // Kulp
    const handleGeo = new THREE.TorusGeometry(0.25, 0.05, 8, 16, Math.PI);
    const handle = new THREE.Mesh(handleGeo, jugMat);
    handle.position.set(-0.35, 0.55, 0);
    handle.rotation.z = -Math.PI / 2;
    handle.add(this._createOutline(handleGeo, 0x7c2d12, 0.03));
    group.add(handle);

    // Su yüzeyi
    const waterGeo = new THREE.CircleGeometry(0.18, 12);
    const waterMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.set(0, 0.94, 0);
    water.rotation.x = -Math.PI / 2;
    group.add(water);

    return group;
  }

  static _createBottleMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Şeffaf cam şişe, mantar tıpalı, parlayan cam dokusu
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      transmission: 0.88,
      opacity: 0.92,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.2
    });

    const bodyGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.65, 12);
    const body = new THREE.Mesh(bodyGeo, glassMat);
    body.position.y = 0.35;
    body.add(this._createOutline(bodyGeo, 0x0284c7, 0.035));
    group.add(body);

    const neckGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.28, 10);
    const neck = new THREE.Mesh(neckGeo, glassMat);
    neck.position.y = 0.72;
    neck.add(this._createOutline(neckGeo, 0x0284c7, 0.03));
    group.add(neck);

    // Mantar tıpa
    const corkGeo = new THREE.CylinderGeometry(0.13, 0.1, 0.16, 8);
    const corkMat = new THREE.MeshToonMaterial({ color: 0xb45309 });
    const cork = new THREE.Mesh(corkGeo, corkMat);
    cork.position.y = 0.9;
    cork.add(this._createOutline(corkGeo, 0x78350f, 0.03));
    group.add(cork);

    return group;
  }

  static _createFlintMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Keskin kenarlı antrasit gri yontma çakmaktaşı
    const geo = new THREE.ConeGeometry(0.32, 0.75, 4);
    geo.scale(1, 1, 0.4);
    const mat = new THREE.MeshToonMaterial({ color: 0x334155, roughness: 0.6, metalness: 0.3 });
    const flint = new THREE.Mesh(geo, mat);
    flint.position.y = 0.38;
    flint.rotation.z = -0.35;
    flint.add(this._createOutline(geo, 0x0f172a, 0.04));
    group.add(flint);

    return group;
  }

  static _createBowMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Kavisli ahşap yay ve gergin kiriş ipi
    const woodMat = new THREE.MeshToonMaterial({ color: 0x854d0e, roughness: 0.6 });
    const bowGeo = new THREE.TorusGeometry(0.55, 0.055, 8, 24, Math.PI);
    const bow = new THREE.Mesh(bowGeo, woodMat);
    bow.position.y = 0.45;
    bow.rotation.z = Math.PI / 2;
    bow.add(this._createOutline(bowGeo, 0x451a03, 0.035));
    group.add(bow);

    // Kiriş teli
    const stringGeo = new THREE.CylinderGeometry(0.012, 0.012, 1.1, 4);
    const stringMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
    const string = new THREE.Mesh(stringGeo, stringMat);
    string.position.set(0.45, 0.45, 0);
    group.add(string);

    return group;
  }

  static _createArrowMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Ahşap gövdeli, metal uçlu ve tüylü klasik ok
    const shaftGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.95, 6);
    const shaftMat = new THREE.MeshToonMaterial({ color: 0xd97706 });
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);
    shaft.position.y = 0.45;
    shaft.add(this._createOutline(shaftGeo, 0x78350f, 0.03));
    group.add(shaft);

    // Sivri uç
    const tipGeo = new THREE.ConeGeometry(0.08, 0.24, 4);
    const tipMat = new THREE.MeshToonMaterial({ color: 0x64748b, metalness: 0.5 });
    const tip = new THREE.Mesh(tipGeo, tipMat);
    tip.position.y = 0.98;
    tip.add(this._createOutline(tipGeo, 0x1e293b, 0.035));
    group.add(tip);

    // Arkadaki tüy yeleler
    const fletchMat = new THREE.MeshToonMaterial({ color: 0xef4444 });
    [-0.06, 0.06].forEach(fx => {
      const fGeo = new THREE.BoxGeometry(0.08, 0.2, 0.02);
      const f = new THREE.Mesh(fGeo, fletchMat);
      f.position.set(fx, 0.08, 0);
      group.add(f);
    });

    return group;
  }

  static _createTorchMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Ahşap meşale çubuğu ve ucunda yanan parlak alev
    const stickGeo = new THREE.CylinderGeometry(0.07, 0.06, 0.8, 8);
    const stickMat = new THREE.MeshToonMaterial({ color: 0x78350f });
    const stick = new THREE.Mesh(stickGeo, stickMat);
    stick.position.y = 0.35;
    stick.add(this._createOutline(stickGeo, 0x451a03, 0.035));
    group.add(stick);

    // Üst demir çember sargı
    const ringGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.12, 8);
    const ringMat = new THREE.MeshToonMaterial({ color: 0x334155, metalness: 0.6 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = 0.68;
    group.add(ring);

    // Alev tepeciği
    const flameGeo = new THREE.ConeGeometry(0.18, 0.45, 6);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.y = 0.92;
    group.add(flame);

    const light = new THREE.PointLight(0xff7700, 2.0, 3.5);
    light.position.set(0, 0.95, 0.1);
    group.add(light);

    return group;
  }

  static _createRawMetalMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Gri kaya içine gömülü parlak gümüş/metal damarları
    const geo = new THREE.DodecahedronGeometry(0.55, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.4,
      metalness: 0.8,
      emissive: 0x94a3b8,
      emissiveIntensity: 0.25
    });
    const ore = new THREE.Mesh(geo, mat);
    ore.position.y = 0.4;
    ore.add(this._createOutline(geo, 0x1e293b, 0.04));
    group.add(ore);

    return group;
  }

  static _createIronIngotMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Parlak çelik/demir külçe, eğimli kenarlar
    const geo = new THREE.BoxGeometry(0.78, 0.24, 0.42);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.15
    });
    const ingot = new THREE.Mesh(geo, mat);
    ingot.position.y = 0.22;
    ingot.add(this._createOutline(geo, 0x334155, 0.04));
    group.add(ingot);

    return group;
  }

  static _createMetalKnifeMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Çelik keskin bıçak, kahverengi ahşap sap
    const handleGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.45, 8);
    const handleMat = new THREE.MeshToonMaterial({ color: 0x854d0e });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.y = 0.18;
    handle.add(this._createOutline(handleGeo, 0x451a03, 0.035));
    group.add(handle);

    const bladeGeo = new THREE.BoxGeometry(0.12, 0.65, 0.03);
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.2, metalness: 0.9 });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.y = 0.62;
    blade.add(this._createOutline(bladeGeo, 0x475569, 0.04));
    group.add(blade);

    return group;
  }

  static _createPickaxeMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Ahşap uzun saplı, çift taraflı kavisli çelik kazma
    const handleGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.1, 8);
    const handleMat = new THREE.MeshToonMaterial({ color: 0x854d0e });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.y = 0.45;
    handle.add(this._createOutline(handleGeo, 0x451a03, 0.035));
    group.add(handle);

    // Kavisli çelik baş
    const headGeo = new THREE.TorusGeometry(0.35, 0.06, 8, 16, Math.PI * 0.85);
    const headMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.3, metalness: 0.85 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.rotation.z = Math.PI / 2.3;
    head.position.set(0, 0.88, 0);
    head.add(this._createOutline(headGeo, 0x334155, 0.04));
    group.add(head);

    return group;
  }

  static _createSwordMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Parlak çelik kılıç, balçak (crossguard) ve deri sarılı kabza
    const bladeGeo = new THREE.BoxGeometry(0.14, 0.95, 0.035);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.2,
      metalness: 0.95,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.2
    });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.y = 0.65;
    blade.add(this._createOutline(bladeGeo, 0x475569, 0.04));
    group.add(blade);

    // Altın sarısı balçak
    const guardGeo = new THREE.BoxGeometry(0.48, 0.08, 0.08);
    const guardMat = new THREE.MeshToonMaterial({ color: 0xf59e0b });
    const guard = new THREE.Mesh(guardGeo, guardMat);
    guard.position.y = 0.22;
    guard.add(this._createOutline(guardGeo, 0xb45309, 0.035));
    group.add(guard);

    // Kabza
    const hiltGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 8);
    const hiltMat = new THREE.MeshToonMaterial({ color: 0x78350f });
    const hilt = new THREE.Mesh(hiltGeo, hiltMat);
    hilt.position.y = 0.06;
    hilt.add(this._createOutline(hiltGeo, 0x451a03, 0.03));
    group.add(hilt);

    return group;
  }

  static _createWoodenShieldMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Yuvarlak ahşap kalkan, demir göbek ve dış çember
    const woodMat = new THREE.MeshToonMaterial({ color: 0x854d0e, roughness: 0.7 });
    const shieldGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 16);
    const shield = new THREE.Mesh(shieldGeo, woodMat);
    shield.rotation.x = Math.PI / 2;
    shield.position.y = 0.45;
    shield.add(this._createOutline(shieldGeo, 0x451a03, 0.035));
    group.add(shield);

    // Demir orta göbek
    const bossGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const bossMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85 });
    const boss = new THREE.Mesh(bossGeo, bossMat);
    boss.position.set(0, 0.45, 0.06);
    group.add(boss);

    return group;
  }

  static _createIronShieldMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Şövalye üçgen/uçlu çelik kalkanı, ortasında arma kabartması
    const shieldGeo = new THREE.BoxGeometry(0.72, 0.95, 0.08);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.25,
      metalness: 0.9,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.2
    });
    const shield = new THREE.Mesh(shieldGeo, shieldMat);
    shield.position.y = 0.48;
    shield.add(this._createOutline(shieldGeo, 0x1e293b, 0.04));
    group.add(shield);

    // Altın sarısı orta amblem şeridi
    const crestGeo = new THREE.BoxGeometry(0.24, 0.45, 0.1);
    const crestMat = new THREE.MeshToonMaterial({ color: 0xf59e0b });
    const crest = new THREE.Mesh(crestGeo, crestMat);
    crest.position.set(0, 0.55, 0.02);
    group.add(crest);

    return group;
  }

  static _createLeatherArmorMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Taba rengi dikişli deri yelek / zırh
    const armorGeo = new THREE.BoxGeometry(0.68, 0.78, 0.38);
    const armorMat = new THREE.MeshToonMaterial({ color: 0xa16207, roughness: 0.8 });
    const armor = new THREE.Mesh(armorGeo, armorMat);
    armor.position.y = 0.45;
    armor.add(this._createOutline(armorGeo, 0x713f12, 0.04));
    group.add(armor);

    // Omuzluklar
    [-0.38, 0.38].forEach(sx => {
      const spGeo = new THREE.SphereGeometry(0.16, 8, 8);
      spGeo.scale(1, 0.6, 1);
      const sp = new THREE.Mesh(spGeo, armorMat);
      sp.position.set(sx, 0.75, 0);
      group.add(sp);
    });

    return group;
  }

  static _createIronArmorMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Parlak çelik göğüs zırhı (cuirass)
    const cuirassGeo = new THREE.BoxGeometry(0.72, 0.82, 0.42);
    const cuirassMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.2,
      metalness: 0.95,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.25
    });
    const cuirass = new THREE.Mesh(cuirassGeo, cuirassMat);
    cuirass.position.y = 0.48;
    cuirass.add(this._createOutline(cuirassGeo, 0x334155, 0.04));
    group.add(cuirass);

    return group;
  }

  static _createBedMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Ahşap karyolalı, kırmızı örtülü ve beyaz yastıklı rahat yatak
    const frameGeo = new THREE.BoxGeometry(0.85, 0.22, 1.15);
    const frameMat = new THREE.MeshToonMaterial({ color: 0x78350f });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.y = 0.18;
    frame.add(this._createOutline(frameGeo, 0x451a03, 0.035));
    group.add(frame);

    // Kırmızı yatak örtüsü
    const blanketGeo = new THREE.BoxGeometry(0.78, 0.15, 0.8);
    const blanketMat = new THREE.MeshToonMaterial({ color: 0xef4444 });
    const blanket = new THREE.Mesh(blanketGeo, blanketMat);
    blanket.position.set(0, 0.32, 0.15);
    blanket.add(this._createOutline(blanketGeo, 0x991b1b, 0.035));
    group.add(blanket);

    // Beyaz yastık
    const pillowGeo = new THREE.BoxGeometry(0.65, 0.14, 0.28);
    const pillowMat = new THREE.MeshToonMaterial({ color: 0xf8fafc, roughness: 0.5 });
    const pillow = new THREE.Mesh(pillowGeo, pillowMat);
    pillow.position.set(0, 0.32, -0.36);
    pillow.add(this._createOutline(pillowGeo, 0x94a3b8, 0.03));
    group.add(pillow);

    return group;
  }

  // Kategori 5 3D Mesh Üreteçleri
  static _createZehirliSiviMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Parlak yeşil asidik zehir birikintisi ve kaynayan baloncuklar
    const slimeMat = new THREE.MeshToonMaterial({
      color: 0x22c55e,
      emissive: 0x16a34a,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.9
    });

    const poolGeo = new THREE.SphereGeometry(0.55, 14, 14);
    poolGeo.scale(1.25, 0.45, 1.15);
    const pool = new THREE.Mesh(poolGeo, slimeMat);
    pool.position.y = 0.2;
    pool.add(this._createOutline(poolGeo, 0x14532d, 0.04));
    group.add(pool);

    // Zehir kabarcıkları
    const bubbleGeo = new THREE.SphereGeometry(0.18, 10, 10);
    const bubbleMat = new THREE.MeshBasicMaterial({ color: 0x86efac });
    const b1 = new THREE.Mesh(bubbleGeo, bubbleMat);
    b1.position.set(0.15, 0.38, 0.1);
    group.add(b1);

    const b2 = new THREE.Mesh(bubbleGeo, bubbleMat);
    b2.scale.set(0.65, 0.65, 0.65);
    b2.position.set(-0.2, 0.32, -0.15);
    group.add(b2);

    return group;
  }

  static _createZehirSisesiMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Koyu yeşil zehir dolu mantar tıpalı iksir şişesi
    const bottleGeo = new THREE.CylinderGeometry(0.32, 0.38, 0.68, 12);
    const bottleMat = new THREE.MeshPhysicalMaterial({
      color: 0x22c55e,
      transmission: 0.75,
      opacity: 0.9,
      transparent: true,
      emissive: 0x15803d,
      emissiveIntensity: 0.45,
      roughness: 0.15
    });
    const bottle = new THREE.Mesh(bottleGeo, bottleMat);
    bottle.position.y = 0.36;
    bottle.add(this._createOutline(bottleGeo, 0x14532d, 0.04));
    group.add(bottle);

    const neckGeo = new THREE.CylinderGeometry(0.14, 0.18, 0.28, 10);
    const neck = new THREE.Mesh(neckGeo, bottleMat);
    neck.position.y = 0.75;
    neck.add(this._createOutline(neckGeo, 0x14532d, 0.035));
    group.add(neck);

    const corkGeo = new THREE.CylinderGeometry(0.15, 0.12, 0.15, 8);
    const corkMat = new THREE.MeshToonMaterial({ color: 0x854d0e });
    const cork = new THREE.Mesh(corkGeo, corkMat);
    cork.position.y = 0.92;
    group.add(cork);

    return group;
  }

  static _createZehirliKilicMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Yeşil zehir kaplı parıldayan çelik kılıç
    const bladeGeo = new THREE.BoxGeometry(0.14, 1.05, 0.035);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x86efac,
      emissive: 0x22c55e,
      emissiveIntensity: 0.65,
      metalness: 0.8,
      roughness: 0.2
    });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.y = 0.68;
    blade.add(this._createOutline(bladeGeo, 0x14532d, 0.04));
    group.add(blade);

    // Koyu yeşil balçak
    const guardGeo = new THREE.BoxGeometry(0.48, 0.08, 0.08);
    const guardMat = new THREE.MeshToonMaterial({ color: 0x166534 });
    const guard = new THREE.Mesh(guardGeo, guardMat);
    guard.position.y = 0.22;
    group.add(guard);

    // Kabza
    const hiltGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 8);
    const hiltMat = new THREE.MeshToonMaterial({ color: 0x14532d });
    const hilt = new THREE.Mesh(hiltGeo, hiltMat);
    hilt.position.y = 0.06;
    group.add(hilt);

    return group;
  }

  static _createSifaIksiriMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Kırmızı/pembe şifa iksiri dolu cam şişe
    const bottleGeo = new THREE.SphereGeometry(0.42, 16, 16);
    const bottleMat = new THREE.MeshPhysicalMaterial({
      color: 0xef4444,
      transmission: 0.8,
      opacity: 0.92,
      transparent: true,
      emissive: 0xdc2626,
      emissiveIntensity: 0.5,
      roughness: 0.1
    });
    const bottle = new THREE.Mesh(bottleGeo, bottleMat);
    bottle.position.y = 0.42;
    bottle.add(this._createOutline(bottleGeo, 0x991b1b, 0.04));
    group.add(bottle);

    const neckGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.26, 10);
    const neck = new THREE.Mesh(neckGeo, bottleMat);
    neck.position.y = 0.78;
    neck.add(this._createOutline(neckGeo, 0x991b1b, 0.035));
    group.add(neck);

    const corkGeo = new THREE.CylinderGeometry(0.13, 0.1, 0.14, 8);
    const corkMat = new THREE.MeshToonMaterial({ color: 0xb45309 });
    const cork = new THREE.Mesh(corkGeo, corkMat);
    cork.position.y = 0.94;
    group.add(cork);

    const light = new THREE.PointLight(0xef4444, 1.8, 3);
    light.position.set(0, 0.45, 0.1);
    group.add(light);

    return group;
  }

  static _createManaIksiriMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Saf gök mavisi mana iksiri dolu yuvarlak cam matara
    const bottleGeo = new THREE.SphereGeometry(0.42, 16, 16);
    const bottleMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      transmission: 0.8,
      opacity: 0.92,
      transparent: true,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.55,
      roughness: 0.1
    });
    const bottle = new THREE.Mesh(bottleGeo, bottleMat);
    bottle.position.y = 0.42;
    bottle.add(this._createOutline(bottleGeo, 0x0369a1, 0.04));
    group.add(bottle);

    const neckGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.26, 10);
    const neck = new THREE.Mesh(neckGeo, bottleMat);
    neck.position.y = 0.78;
    neck.add(this._createOutline(neckGeo, 0x0369a1, 0.035));
    group.add(neck);

    const corkGeo = new THREE.CylinderGeometry(0.13, 0.1, 0.14, 8);
    const corkMat = new THREE.MeshToonMaterial({ color: 0xb45309 });
    const cork = new THREE.Mesh(corkGeo, corkMat);
    cork.position.y = 0.94;
    group.add(cork);

    const light = new THREE.PointLight(0x38bdf8, 1.8, 3);
    light.position.set(0, 0.45, 0.1);
    group.add(light);

    return group;
  }

  static _createBarutMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: İple bağlı kumaş kese ve ağzından dökülen koyu gri barut tozu
    const pouchGeo = new THREE.CylinderGeometry(0.32, 0.45, 0.52, 12);
    const pouchMat = new THREE.MeshToonMaterial({ color: 0x475569, roughness: 0.85 });
    const pouch = new THREE.Mesh(pouchGeo, pouchMat);
    pouch.position.y = 0.26;
    pouch.add(this._createOutline(pouchGeo, 0x1e293b, 0.04));
    group.add(pouch);

    // Üstteki koyu gri barut yığını
    const heapGeo = new THREE.ConeGeometry(0.3, 0.24, 10);
    const heapMat = new THREE.MeshToonMaterial({ color: 0x1e293b, roughness: 0.95 });
    const heap = new THREE.Mesh(heapGeo, heapMat);
    heap.position.y = 0.58;
    group.add(heap);

    return group;
  }

  static _createBombaMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Klasik küresel siyah çizgi film bombası ve kıvılcım saçan fitil
    const sphereGeo = new THREE.SphereGeometry(0.46, 16, 16);
    const sphereMat = new THREE.MeshToonMaterial({ color: 0x1e293b, roughness: 0.3 });
    const bomb = new THREE.Mesh(sphereGeo, sphereMat);
    bomb.position.y = 0.46;
    bomb.add(this._createOutline(sphereGeo, 0x020617, 0.045));
    group.add(bomb);

    // Fitil yuvası
    const capGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.12, 8);
    const capMat = new THREE.MeshToonMaterial({ color: 0x64748b });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 0.94;
    group.add(cap);

    // Yanıp parlayan fitil kıvılcımı
    const sparkGeo = new THREE.SphereGeometry(0.09, 8, 8);
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const spark = new THREE.Mesh(sparkGeo, sparkMat);
    spark.position.y = 1.05;
    group.add(spark);

    const light = new THREE.PointLight(0xf59e0b, 2.0, 2.5);
    light.position.set(0, 1.05, 0.1);
    group.add(light);

    return group;
  }

  static _createBuyuParsomeniMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Mor kurdeleli sarılı büyü parşömeni ve eflatun ışıma
    const scrollGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.85, 12);
    const scrollMat = new THREE.MeshToonMaterial({
      color: 0xfef3c7,
      emissive: 0xa855f7,
      emissiveIntensity: 0.35,
      roughness: 0.5
    });
    const scroll = new THREE.Mesh(scrollGeo, scrollMat);
    scroll.rotation.z = Math.PI / 2.2;
    scroll.position.y = 0.35;
    scroll.add(this._createOutline(scrollGeo, 0x7c3aed, 0.04));
    group.add(scroll);

    // Ortadaki mor kurdele kuşağı
    const ribGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.16, 12);
    const ribMat = new THREE.MeshToonMaterial({ color: 0x9333ea });
    const ribbon = new THREE.Mesh(ribGeo, ribMat);
    ribbon.rotation.z = Math.PI / 2.2;
    ribbon.position.y = 0.35;
    group.add(ribbon);

    return group;
  }

  static _createYildirimParsomeniMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Altın sarısı elektrik enerjisiyle mühürlü şimşek parşömeni
    const scrollGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.85, 12);
    const scrollMat = new THREE.MeshToonMaterial({
      color: 0xfef08a,
      emissive: 0xeab308,
      emissiveIntensity: 0.6,
      roughness: 0.4
    });
    const scroll = new THREE.Mesh(scrollGeo, scrollMat);
    scroll.rotation.z = Math.PI / 2.2;
    scroll.position.y = 0.35;
    scroll.add(this._createOutline(scrollGeo, 0xca8a04, 0.04));
    group.add(scroll);

    // Altın sarısı mühür
    const ribGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.16, 12);
    const ribMat = new THREE.MeshToonMaterial({ color: 0xf59e0b });
    const ribbon = new THREE.Mesh(ribGeo, ribMat);
    ribbon.rotation.z = Math.PI / 2.2;
    ribbon.position.y = 0.35;
    group.add(ribbon);

    return group;
  }

  static _createAtesTopuKitabiMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Kırmızı deri kapaklı, altın işlemeli ve alev amblemli büyü kitabı
    const coverGeo = new THREE.BoxGeometry(0.72, 0.14, 0.92);
    const coverMat = new THREE.MeshToonMaterial({
      color: 0xdc2626,
      emissive: 0xf97316,
      emissiveIntensity: 0.35,
      roughness: 0.5
    });
    const cover = new THREE.Mesh(coverGeo, coverMat);
    cover.position.y = 0.22;
    cover.add(this._createOutline(coverGeo, 0x991b1b, 0.04));
    group.add(cover);

    // İç beyaz sayfalar
    const pagesGeo = new THREE.BoxGeometry(0.66, 0.1, 0.86);
    const pagesMat = new THREE.MeshToonMaterial({ color: 0xfef3c7 });
    const pages = new THREE.Mesh(pagesGeo, pagesMat);
    pages.position.set(0.02, 0.22, 0);
    group.add(pages);

    // Kapaktaki alev amblemi
    const gemGeo = new THREE.OctahedronGeometry(0.12, 0);
    const gemMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const gem = new THREE.Mesh(gemGeo, gemMat);
    gem.position.set(0, 0.3, 0);
    group.add(gem);

    return group;
  }

  // Kategori 6 3D Mesh Üreteçleri
  static _createBuharMotoruMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Çelik tabanlı, pirinç borulu ve duman bacalı buhar motoru
    const baseGeo = new THREE.BoxGeometry(0.85, 0.22, 0.65);
    const baseMat = new THREE.MeshToonMaterial({ color: 0x334155 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.12;
    base.add(this._createOutline(baseGeo, 0x0f172a, 0.035));
    group.add(base);

    // Ana silindirik kazan
    const boilerGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.6, 12);
    const boilerMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.85, roughness: 0.2 });
    const boiler = new THREE.Mesh(boilerGeo, boilerMat);
    boiler.position.set(-0.15, 0.42, 0);
    boiler.rotation.z = Math.PI / 2;
    boiler.add(this._createOutline(boilerGeo, 0x1e293b, 0.035));
    group.add(boiler);

    // Pirinç dikey baca
    const pipeGeo = new THREE.CylinderGeometry(0.08, 0.1, 0.45, 10);
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 });
    const pipe = new THREE.Mesh(pipeGeo, pipeMat);
    pipe.position.set(0.24, 0.55, 0);
    pipe.add(this._createOutline(pipeGeo, 0xb45309, 0.03));
    group.add(pipe);

    return group;
  }

  static _createTekerlekMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Ahşap parmaklıklı ve demir çemberli araba tekerleği
    const rimGeo = new THREE.TorusGeometry(0.48, 0.07, 10, 24);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.3 });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.position.y = 0.48;
    rim.add(this._createOutline(rimGeo, 0x1e293b, 0.035));
    group.add(rim);

    // Ahşap göbek
    const hubGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 10);
    const hubMat = new THREE.MeshToonMaterial({ color: 0x854d0e });
    const hub = new THREE.Mesh(hubGeo, hubMat);
    hub.position.y = 0.48;
    hub.rotation.x = Math.PI / 2;
    hub.add(this._createOutline(hubGeo, 0x451a03, 0.03));
    group.add(hub);

    // 4 ahşap parmaklık kolu
    for (let i = 0; i < 4; i++) {
      const spokeGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.85, 6);
      const spoke = new THREE.Mesh(spokeGeo, hubMat);
      spoke.position.y = 0.48;
      spoke.rotation.z = (i * Math.PI) / 4;
      group.add(spoke);
    }

    return group;
  }

  static _createElArabasiMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Ahşap kasalı, demir tekerlekli ve kollu el arabası
    const boxGeo = new THREE.BoxGeometry(0.68, 0.32, 0.48);
    const boxMat = new THREE.MeshToonMaterial({ color: 0xa16207, roughness: 0.75 });
    const box = new THREE.Mesh(boxGeo, boxMat);
    box.position.set(0.08, 0.4, 0);
    box.add(this._createOutline(boxGeo, 0x713f12, 0.04));
    group.add(box);

    // Ön tekerlek
    const wheelGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.08, 12);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.position.set(-0.35, 0.18, 0);
    wheel.rotation.z = Math.PI / 2;
    wheel.add(this._createOutline(wheelGeo, 0x0f172a, 0.035));
    group.add(wheel);

    // Tutma kolları
    const handleGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.5, 6);
    [-0.18, 0.18].forEach(hz => {
      const hMesh = new THREE.Mesh(handleGeo, boxMat);
      hMesh.position.set(0.48, 0.35, hz);
      hMesh.rotation.z = -0.4;
      group.add(hMesh);
    });

    return group;
  }

  static _createLokomotifMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Koyu gri/siyah gövdeli, kırmızı kabinli sevimli buharlı tren lokomotifi
    const boilerGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.75, 14);
    const boilerMat = new THREE.MeshToonMaterial({ color: 0x1e293b, roughness: 0.4 });
    const boiler = new THREE.Mesh(boilerGeo, boilerMat);
    boiler.rotation.z = Math.PI / 2;
    boiler.position.set(-0.08, 0.45, 0);
    boiler.add(this._createOutline(boilerGeo, 0x020617, 0.04));
    group.add(boiler);

    // Kırmızı arka makinist kabini
    const cabGeo = new THREE.BoxGeometry(0.42, 0.55, 0.52);
    const cabMat = new THREE.MeshToonMaterial({ color: 0xef4444 });
    const cab = new THREE.Mesh(cabGeo, cabMat);
    cab.position.set(-0.35, 0.58, 0);
    cab.add(this._createOutline(cabGeo, 0x991b1b, 0.04));
    group.add(cab);

    // Ön duman bacası
    const stackGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.35, 10);
    const stackMat = new THREE.MeshToonMaterial({ color: 0x0f172a });
    const stack = new THREE.Mesh(stackGeo, stackMat);
    stack.position.set(0.24, 0.78, 0);
    stack.add(this._createOutline(stackGeo, 0x020617, 0.035));
    group.add(stack);

    return group;
  }

  static _createAmpulMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Şeffaf sarı parıldayan cam küre ve gümüş vidalı duy
    const bulbGeo = new THREE.SphereGeometry(0.42, 16, 16);
    const bulbMat = new THREE.MeshPhysicalMaterial({
      color: 0xfacc15,
      emissive: 0xfef08a,
      emissiveIntensity: 0.9,
      transmission: 0.75,
      opacity: 0.95,
      transparent: true,
      roughness: 0.1
    });
    const bulb = new THREE.Mesh(bulbGeo, bulbMat);
    bulb.position.y = 0.58;
    bulb.add(this._createOutline(bulbGeo, 0xca8a04, 0.035));
    group.add(bulb);

    // Vidalı metal taban
    const baseGeo = new THREE.CylinderGeometry(0.16, 0.14, 0.28, 12);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.2;
    base.add(this._createOutline(baseGeo, 0x334155, 0.035));
    group.add(base);

    const light = new THREE.PointLight(0xffea00, 2.5, 3.5);
    light.position.set(0, 0.58, 0);
    group.add(light);

    return group;
  }

  static _createFenerMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Metal askılı, cam fanuslu ve içinde yanan ampul/mum olan el feneri
    const frameGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.65, 8);
    const frameMat = new THREE.MeshPhysicalMaterial({
      color: 0xfef08a,
      emissive: 0xfbbf24,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.85
    });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.y = 0.42;
    frame.add(this._createOutline(frameGeo, 0x78350f, 0.04));
    group.add(frame);

    // Üst metal şapka
    const capGeo = new THREE.ConeGeometry(0.35, 0.18, 8);
    const capMat = new THREE.MeshToonMaterial({ color: 0x854d0e });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 0.82;
    cap.add(this._createOutline(capGeo, 0x451a03, 0.035));
    group.add(cap);

    const light = new THREE.PointLight(0xffd700, 2.2, 3);
    light.position.set(0, 0.45, 0);
    group.add(light);

    return group;
  }

  static _createPusulaMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Altın/pirinç gövdeli, kırmızı-mavi ibreli denizci pusulası
    const caseGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.1, 16);
    const caseMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });
    const casing = new THREE.Mesh(caseGeo, caseMat);
    casing.position.y = 0.06;
    casing.add(this._createOutline(caseGeo, 0xb45309, 0.04));
    group.add(casing);

    // Beyaz kadran
    const dialGeo = new THREE.CircleGeometry(0.42, 16);
    const dialMat = new THREE.MeshToonMaterial({ color: 0xf8fafc });
    const dial = new THREE.Mesh(dialGeo, dialMat);
    dial.position.y = 0.12;
    dial.rotation.x = -Math.PI / 2;
    group.add(dial);

    // Kırmızı kuzey ibresi
    const needleNGeo = new THREE.ConeGeometry(0.08, 0.35, 4);
    needleNGeo.scale(1, 1, 0.2);
    const needleNMat = new THREE.MeshToonMaterial({ color: 0xef4444 });
    const needleN = new THREE.Mesh(needleNGeo, needleNMat);
    needleN.position.set(0, 0.14, 0.15);
    needleN.rotation.x = -Math.PI / 2;
    group.add(needleN);

    // Mavi güney ibresi
    const needleSMat = new THREE.MeshToonMaterial({ color: 0x3b82f6 });
    const needleS = new THREE.Mesh(needleNGeo, needleSMat);
    needleS.position.set(0, 0.14, -0.15);
    needleS.rotation.x = Math.PI / 2;
    group.add(needleS);

    return group;
  }

  static _createMiknatisMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Kırmızı at nalı U mıknatıs, uçlarında gümüş metal kutuplar
    const arcGeo = new THREE.TorusGeometry(0.38, 0.11, 10, 20, Math.PI);
    const redMat = new THREE.MeshToonMaterial({ color: 0xdc2626 });
    const magnet = new THREE.Mesh(arcGeo, redMat);
    magnet.position.y = 0.45;
    magnet.rotation.z = Math.PI;
    magnet.add(this._createOutline(arcGeo, 0x991b1b, 0.04));
    group.add(magnet);

    // İki uçtaki gümüş metal kutuplar
    const poleMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2 });
    [-0.38, 0.38].forEach(px => {
      const pGeo = new THREE.BoxGeometry(0.22, 0.22, 0.22);
      const pole = new THREE.Mesh(pGeo, poleMat);
      pole.position.set(px, 0.34, 0);
      pole.add(this._createOutline(pGeo, 0x475569, 0.035));
      group.add(pole);
    });

    return group;
  }

  static _createElektrikMotoruMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Mavi döküm gövde, bakır bobin sargıları ve dönen çelik mil
    const bodyGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.65, 14);
    const bodyMat = new THREE.MeshToonMaterial({ color: 0x0284c7 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.38;
    body.rotation.z = Math.PI / 2;
    body.add(this._createOutline(bodyGeo, 0x0369a1, 0.04));
    group.add(body);

    // Bakır sargı halkası
    const coilGeo = new THREE.TorusGeometry(0.37, 0.06, 8, 16);
    const coilMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.2 });
    const coil = new THREE.Mesh(coilGeo, coilMat);
    coil.position.set(0, 0.38, 0);
    coil.rotation.y = Math.PI / 2;
    group.add(coil);

    // Çelik mil
    const shaftGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.9, 8);
    const shaftMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95 });
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);
    shaft.position.y = 0.38;
    shaft.rotation.z = Math.PI / 2;
    group.add(shaft);

    return group;
  }

  // Kategori 7 3D Mesh Üreteçleri
  static _createCelikKulceMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Çelik parlaklığında, eğimli fasetli ve parıltılı çelik külçe
    const geo = new THREE.BoxGeometry(0.72, 0.22, 0.38);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.95,
      roughness: 0.18,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.25
    });
    const ingot = new THREE.Mesh(geo, mat);
    ingot.position.y = 0.12;
    ingot.add(this._createOutline(geo, 0x334155, 0.035));
    group.add(ingot);

    // Üstündeki damga / kabartma çizgisi
    const stampGeo = new THREE.BoxGeometry(0.4, 0.03, 0.16);
    const stampMat = new THREE.MeshToonMaterial({ color: 0x64748b });
    const stamp = new THREE.Mesh(stampGeo, stampMat);
    stamp.position.set(0, 0.24, 0);
    group.add(stamp);

    return group;
  }

  static _createOrsMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Ağır dövme demir örs, geniş boynuz ucu ve sağlam kütük/demir taban
    const baseGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.22, 4);
    const ironMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.85,
      roughness: 0.3
    });
    const base = new THREE.Mesh(baseGeo, ironMat);
    base.position.y = 0.11;
    base.rotation.y = Math.PI / 4;
    base.add(this._createOutline(baseGeo, 0x0f172a, 0.04));
    group.add(base);

    // Orta boyun sütunu
    const waistGeo = new THREE.BoxGeometry(0.32, 0.2, 0.28);
    const waist = new THREE.Mesh(waistGeo, ironMat);
    waist.position.y = 0.28;
    group.add(waist);

    // Üst tabla
    const topGeo = new THREE.BoxGeometry(0.68, 0.22, 0.36);
    const topAnvil = new THREE.Mesh(topGeo, ironMat);
    topAnvil.position.y = 0.46;
    topAnvil.add(this._createOutline(topGeo, 0x0f172a, 0.04));
    group.add(topAnvil);

    // Örsün sivri boynuz ucu (horn)
    const hornGeo = new THREE.ConeGeometry(0.16, 0.38, 8);
    hornGeo.scale(0.8, 1, 0.6);
    const horn = new THREE.Mesh(hornGeo, ironMat);
    horn.rotation.z = -Math.PI / 2;
    horn.position.set(0.48, 0.46, 0);
    horn.add(this._createOutline(hornGeo, 0x0f172a, 0.035));
    group.add(horn);

    return group;
  }

  static _createCiviMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Parlak çelik çivi, düz başlı ve sivri uçlu
    const shaftGeo = new THREE.CylinderGeometry(0.04, 0.015, 0.65, 8);
    const nailMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.25 });
    const shaft = new THREE.Mesh(shaftGeo, nailMat);
    shaft.position.y = 0.32;
    shaft.add(this._createOutline(shaftGeo, 0x334155, 0.03));
    group.add(shaft);

    // Geniş çivi başı
    const headGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.05, 12);
    const head = new THREE.Mesh(headGeo, nailMat);
    head.position.y = 0.65;
    head.add(this._createOutline(headGeo, 0x1e293b, 0.03));
    group.add(head);

    return group;
  }

  static _createTuglaMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Fırınlanmış pişmiş kil kırmızı tuğla, delikli ve dokulu
    const geo = new THREE.BoxGeometry(0.65, 0.26, 0.36);
    const brickMat = new THREE.MeshToonMaterial({ color: 0xc2410c, roughness: 0.75 });
    const brick = new THREE.Mesh(geo, brickMat);
    brick.position.y = 0.14;
    brick.add(this._createOutline(geo, 0x7c2d12, 0.035));
    group.add(brick);

    // Üstündeki 3 harç/hafif delik oyuğu
    const holeMat = new THREE.MeshToonMaterial({ color: 0x9a3412 });
    [-0.18, 0, 0.18].forEach(hx => {
      const hGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.05, 8);
      const hole = new THREE.Mesh(hGeo, holeMat);
      hole.position.set(hx, 0.27, 0);
      group.add(hole);
    });

    return group;
  }

  static _createHarcMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Çimento harcı yığını ve üzerinde metal mala
    const moundGeo = new THREE.ConeGeometry(0.48, 0.32, 10);
    moundGeo.scale(1.1, 0.8, 1);
    const moundMat = new THREE.MeshToonMaterial({ color: 0x94a3b8, roughness: 0.85 });
    const mound = new THREE.Mesh(moundGeo, moundMat);
    mound.position.y = 0.14;
    mound.add(this._createOutline(moundGeo, 0x475569, 0.035));
    group.add(mound);

    // İnşaat malası (metal üçgen bıçak + ahşap sap)
    const bladeGeo = new THREE.ConeGeometry(0.12, 0.32, 3);
    bladeGeo.scale(1, 0.1, 1);
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.9 });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.set(0.12, 0.32, 0.12);
    blade.rotation.set(0.6, 0.4, 0.8);
    group.add(blade);

    const handleGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.18, 6);
    const handleMat = new THREE.MeshToonMaterial({ color: 0x854d0e });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.set(0.24, 0.42, 0.22);
    handle.rotation.set(0.6, 0.4, 0.8);
    group.add(handle);

    return group;
  }

  static _createTuglaDuvarMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Harçlı düzgün örülmüş kırmızı tuğla duvar kesiti
    const wallGeo = new THREE.BoxGeometry(0.82, 0.65, 0.22);
    const wallMat = new THREE.MeshToonMaterial({ color: 0xb91c1c, roughness: 0.7 });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.y = 0.33;
    wall.add(this._createOutline(wallGeo, 0x7f1d1d, 0.04));
    group.add(wall);

    // Harç çizgileri
    const mortarMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0 });
    [-0.12, 0.12].forEach(my => {
      const lineGeo = new THREE.BoxGeometry(0.83, 0.03, 0.23);
      const line = new THREE.Mesh(lineGeo, mortarMat);
      line.position.set(0, 0.33 + my, 0);
      group.add(line);
    });

    return group;
  }

  static _createSaglamSandikMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Ağır meşe ağacı gövde, siyah dövme demir köşebentler ve kilit
    const chestGeo = new THREE.BoxGeometry(0.74, 0.45, 0.48);
    const chestMat = new THREE.MeshToonMaterial({ color: 0x78350f, roughness: 0.7 });
    const chest = new THREE.Mesh(chestGeo, chestMat);
    chest.position.y = 0.24;
    chest.add(this._createOutline(chestGeo, 0x451a03, 0.04));
    group.add(chest);

    // Dövme demir kuşak şeritleri
    const bandMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.85, roughness: 0.3 });
    [-0.22, 0.22].forEach(bx => {
      const bGeo = new THREE.BoxGeometry(0.06, 0.47, 0.5);
      const band = new THREE.Mesh(bGeo, bandMat);
      band.position.set(bx, 0.24, 0);
      group.add(band);
    });

    // Altın sarısı asma kilit
    const lockGeo = new THREE.BoxGeometry(0.08, 0.1, 0.04);
    const lockMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 });
    const lock = new THREE.Mesh(lockGeo, lockMat);
    lock.position.set(0, 0.24, 0.25);
    group.add(lock);

    return group;
  }

  static _createKristalMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Işıldayan çok yüzeyli gök mavisi prizmatik kristal kümesi
    const mainGeo = new THREE.OctahedronGeometry(0.42, 0);
    mainGeo.scale(0.8, 1.4, 0.8);
    const crysMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      transmission: 0.7,
      thickness: 0.5,
      transparent: true,
      opacity: 0.9
    });
    const crys = new THREE.Mesh(mainGeo, crysMat);
    crys.position.y = 0.45;
    crys.add(this._createOutline(mainGeo, 0x0369a1, 0.04));
    group.add(crys);

    // Yan küçük kristal çıkıntıları
    const sideGeo = new THREE.OctahedronGeometry(0.24, 0);
    sideGeo.scale(0.7, 1.3, 0.7);
    [[-0.22, 0.26, 0.12, 0.4], [0.2, 0.22, -0.1, -0.45]].forEach(([sx, sy, sz, rz]) => {
      const sideCrys = new THREE.Mesh(sideGeo, crysMat);
      sideCrys.position.set(sx, sy, sz);
      sideCrys.rotation.z = rz;
      group.add(sideCrys);
    });

    return group;
  }

  static _createTeleskopMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Pirinç/altın teleskop dürbünü ve üçayak ahşap tripod
    const scopeGeo = new THREE.CylinderGeometry(0.08, 0.14, 0.82, 14);
    const scopeMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });
    const scope = new THREE.Mesh(scopeGeo, scopeMat);
    scope.rotation.z = Math.PI / 4;
    scope.position.set(0, 0.55, 0);
    scope.add(this._createOutline(scopeGeo, 0xb45309, 0.035));
    group.add(scope);

    // Ön mercek camı
    const lensGeo = new THREE.CircleGeometry(0.13, 14);
    const lensMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.position.set(0.29, 0.84, 0);
    lens.rotation.y = Math.PI / 2;
    group.add(lens);

    // Tripod ayakları
    const legGeo = new THREE.CylinderGeometry(0.025, 0.02, 0.55, 6);
    const legMat = new THREE.MeshToonMaterial({ color: 0x78350f });
    [-0.3, 0, 0.3].forEach((angle, i) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(Math.sin(i * 2.1) * 0.18, 0.25, Math.cos(i * 2.1) * 0.18);
      leg.rotation.x = Math.cos(i * 2.1) * 0.3;
      leg.rotation.z = Math.sin(i * 2.1) * 0.3;
      group.add(leg);
    });

    return group;
  }

  static _createVincMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Sarı endüstriyel kule vinci, kafes gövde ve kablo kancası
    const towerGeo = new THREE.BoxGeometry(0.16, 0.85, 0.16);
    const craneMat = new THREE.MeshToonMaterial({ color: 0xeab308 });
    const tower = new THREE.Mesh(towerGeo, craneMat);
    tower.position.set(-0.15, 0.44, 0);
    tower.add(this._createOutline(towerGeo, 0xa16207, 0.035));
    group.add(tower);

    // Yatay bom kolu
    const jibGeo = new THREE.BoxGeometry(0.85, 0.12, 0.12);
    const jib = new THREE.Mesh(jibGeo, craneMat);
    jib.position.set(0.18, 0.82, 0);
    jib.add(this._createOutline(jibGeo, 0xa16207, 0.035));
    group.add(jib);

    // Çelik kablo ve kanca
    const cableGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.35, 4);
    const cableMat = new THREE.MeshBasicMaterial({ color: 0x334155 });
    const cable = new THREE.Mesh(cableGeo, cableMat);
    cable.position.set(0.48, 0.62, 0);
    group.add(cable);

    const hookGeo = new THREE.TorusGeometry(0.06, 0.02, 6, 12, Math.PI * 1.3);
    const hookMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 });
    const hook = new THREE.Mesh(hookGeo, hookMat);
    hook.position.set(0.48, 0.43, 0);
    group.add(hook);

    return group;
  }

  // Kategori VIII 3D Mesh Üreteçleri
  static _createYildizTozuMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Kozmik mor ve altın parıltılı, yıldız tozu fırtınası / küre
    const coreGeo = new THREE.IcosahedronGeometry(0.35, 2);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xa855f7,
      emissive: 0xc084fc,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.85
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = 0.4;
    core.add(this._createOutline(coreGeo, 0x6b21a8, 0.04));
    group.add(core);

    // Çevresinde dönen küçük altın sarısı yıldız parçacıkları
    const starGeo = new THREE.OctahedronGeometry(0.08, 0);
    const starMat = new THREE.MeshBasicMaterial({ color: 0xfde047 });
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const star = new THREE.Mesh(starGeo, starMat);
      star.position.set(Math.cos(angle) * 0.48, 0.4 + Math.sin(angle * 2) * 0.15, Math.sin(angle) * 0.48);
      group.add(star);
    }

    const light = new THREE.PointLight(0xc084fc, 1.8, 2.5);
    light.position.set(0, 0.4, 0);
    group.add(light);

    return group;
  }

  static _createPrizmaTasiMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Işığı gökkuşağı tayfına kıran parlak fasetli prizma piramidi
    const prismGeo = new THREE.ConeGeometry(0.38, 0.72, 3);
    const prismMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x818cf8,
      emissiveIntensity: 0.65,
      roughness: 0.08,
      transmission: 0.6,
      transparent: true,
      opacity: 0.85
    });
    const prism = new THREE.Mesh(prismGeo, prismMat);
    prism.position.y = 0.36;
    prism.add(this._createOutline(prismGeo, 0x4338ca, 0.035));
    group.add(prism);

    // Prizmanın altındaki oyma antik taş kaide
    const baseGeo = new THREE.CylinderGeometry(0.42, 0.46, 0.12, 6);
    const baseMat = new THREE.MeshToonMaterial({ color: 0x334155 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.06;
    base.add(this._createOutline(baseGeo, 0x0f172a, 0.035));
    group.add(base);

    return group;
  }

  static _createKahinKuresiMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Antik altın ejder/pençe ayaklı kaide ve içinde dönen mor sisli kristal küre
    const orbGeo = new THREE.SphereGeometry(0.38, 20, 20);
    const orbMat = new THREE.MeshPhysicalMaterial({
      color: 0x6366f1,
      emissive: 0xa855f7,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.88,
      transmission: 0.5
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.y = 0.52;
    orb.add(this._createOutline(orbGeo, 0x3730a3, 0.04));
    group.add(orb);

    // Altın kaide
    const standGeo = new THREE.CylinderGeometry(0.24, 0.38, 0.22, 12);
    const standMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });
    const stand = new THREE.Mesh(standGeo, standMat);
    stand.position.y = 0.11;
    stand.add(this._createOutline(standGeo, 0xb45309, 0.035));
    group.add(stand);

    const light = new THREE.PointLight(0xa855f7, 2.0, 2.5);
    light.position.set(0, 0.52, 0);
    group.add(light);

    return group;
  }

  static _createPortalRunuMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Pembe-macenta parlayan runik halka ve ortasında boyut girdabı
    const ringGeo = new THREE.TorusGeometry(0.42, 0.07, 10, 24);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xf43f5e,
      emissiveIntensity: 0.95,
      roughness: 0.2
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.22;
    ring.add(this._createOutline(ringGeo, 0x9d174d, 0.035));
    group.add(ring);

    // Ortadaki parlayan portal enerji diski
    const discGeo = new THREE.CircleGeometry(0.38, 16);
    const discMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, side: THREE.DoubleSide });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.rotation.x = Math.PI / 2;
    disc.position.y = 0.22;
    group.add(disc);

    return group;
  }

  static _createBoslukSisesiMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Koyu lacivert/mor esrarlı cam şişe, içinde parlayan minik galaksi yıldızları
    const bottleGeo = new THREE.CylinderGeometry(0.24, 0.36, 0.58, 14);
    const bottleMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e1b4b,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.85,
      roughness: 0.15,
      transparent: true,
      opacity: 0.85
    });
    const bottle = new THREE.Mesh(bottleGeo, bottleMat);
    bottle.position.y = 0.32;
    bottle.add(this._createOutline(bottleGeo, 0x0f172a, 0.035));
    group.add(bottle);

    // Mantar tıpa
    const corkGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.14, 8);
    const corkMat = new THREE.MeshToonMaterial({ color: 0xd97706 });
    const cork = new THREE.Mesh(corkGeo, corkMat);
    cork.position.y = 0.66;
    group.add(cork);

    return group;
  }

  static _createBoyutKapisiMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: İki kuleli kadim obsidyen kemer kapı ve içinde mor boyut perdesi
    const frameGeo = new THREE.BoxGeometry(0.85, 1.05, 0.16);
    const frameMat = new THREE.MeshToonMaterial({ color: 0x1e1b4b, roughness: 0.7 });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.y = 0.52;
    frame.add(this._createOutline(frameGeo, 0x0f172a, 0.04));
    group.add(frame);

    // İç portal geçidi
    const portalGeo = new THREE.PlaneGeometry(0.55, 0.82);
    const portalMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xc084fc,
      emissiveIntensity: 1.1,
      side: THREE.DoubleSide
    });
    const portal = new THREE.Mesh(portalGeo, portalMat);
    portal.position.set(0, 0.5, 0.02);
    group.add(portal);

    return group;
  }

  static _createAnkaKuluMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Kutsal altın/kırmızı anka vazosu ve içinden yükselen alevli korlar
    const urnGeo = new THREE.CylinderGeometry(0.24, 0.36, 0.48, 12);
    const urnMat = new THREE.MeshStandardMaterial({
      color: 0xb91c1c,
      metalness: 0.6,
      emissive: 0xe11d48,
      emissiveIntensity: 0.5
    });
    const urn = new THREE.Mesh(urnGeo, urnMat);
    urn.position.y = 0.25;
    urn.add(this._createOutline(urnGeo, 0x881337, 0.035));
    group.add(urn);

    // İçinden yükselen ebedi anka alevi
    const flameGeo = new THREE.ConeGeometry(0.18, 0.45, 8);
    const flameMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xef4444,
      emissiveIntensity: 1.0
    });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.y = 0.64;
    flame.add(this._createOutline(flameGeo, 0xb45309, 0.03));
    group.add(flame);

    return group;
  }

  static _createRunikZirhMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Mavi büyü damarlarıyla kaplı paladin göğüs zırhı
    const chestGeo = new THREE.CylinderGeometry(0.36, 0.28, 0.68, 10);
    const armorMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5
    });
    const armor = new THREE.Mesh(chestGeo, armorMat);
    armor.position.y = 0.4;
    armor.add(this._createOutline(chestGeo, 0x0369a1, 0.04));
    group.add(armor);

    // Omuzluk koruyucuları
    const pauldronGeo = new THREE.SphereGeometry(0.18, 8, 8);
    [-0.34, 0.34].forEach(px => {
      const pauldron = new THREE.Mesh(pauldronGeo, armorMat);
      pauldron.position.set(px, 0.6, 0);
      group.add(pauldron);
    });

    return group;
  }

  static _createFirtinaKiliciMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Elektrik ve fırtına saçan şimşek mavisi efsanevi çift elli kılıç
    const bladeGeo = new THREE.BoxGeometry(0.14, 1.1, 0.05);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.95
    });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.y = 0.72;
    blade.add(this._createOutline(bladeGeo, 0x0369a1, 0.035));
    group.add(blade);

    // Yıldırım motifli kabza & balçak
    const guardGeo = new THREE.BoxGeometry(0.48, 0.08, 0.1);
    const guardMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 });
    const guard = new THREE.Mesh(guardGeo, guardMat);
    guard.position.y = 0.22;
    guard.add(this._createOutline(guardGeo, 0xb45309, 0.03));
    group.add(guard);

    const handleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.25, 8);
    const handleMat = new THREE.MeshToonMaterial({ color: 0x1e293b });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.y = 0.08;
    group.add(handle);

    return group;
  }

  static _createYildizGecidiCekirdegiMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: İki eksende dönen parlayan halkalar ve ortada nabız gibi atan kozmik çekirdek
    const coreGeo = new THREE.SphereGeometry(0.36, 20, 20);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xd946ef,
      emissive: 0xf43f5e,
      emissiveIntensity: 1.1,
      roughness: 0.1
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = 0.45;
    core.add(this._createOutline(coreGeo, 0x9d174d, 0.04));
    group.add(core);

    // Dış turkuaz gyroskopik halka
    const ring1Geo = new THREE.TorusGeometry(0.55, 0.04, 8, 24);
    const ring1Mat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x38bdf8, emissiveIntensity: 0.85 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.position.y = 0.45;
    group.add(ring1);

    // İkinci altın halka
    const ring2Geo = new THREE.TorusGeometry(0.62, 0.035, 8, 24);
    const ring2Mat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xfbbf24, emissiveIntensity: 0.6 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    ring2.position.y = 0.45;
    group.add(ring2);

    return group;
  }

  // === 32 Yeni Eşya 3D Mesh Üreteçleri ===
  static _createKarMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: 6 kollu stilize kristal kar tanesi (Snowflake)
    const snowMat = new THREE.MeshToonMaterial({
      color: 0xf8fafc,
      emissive: 0xe2e8f0,
      emissiveIntensity: 0.3
    });

    // Merkez göbek
    const centerGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.08, 6);
    const center = new THREE.Mesh(centerGeo, snowMat);
    center.position.y = 0.45;
    center.rotation.x = Math.PI / 2;
    center.add(this._createOutline(centerGeo, 0x94a3b8, 0.04));
    group.add(center);

    // 6 radyal kar kristali kolu
    for (let i = 0; i < 6; i++) {
      const armGroup = new THREE.Group();
      armGroup.position.y = 0.45;
      armGroup.rotation.z = (i * Math.PI) / 3;

      const armGeo = new THREE.BoxGeometry(0.08, 0.65, 0.06);
      const arm = new THREE.Mesh(armGeo, snowMat);
      arm.position.y = 0.35;
      arm.add(this._createOutline(armGeo, 0x94a3b8, 0.035));
      armGroup.add(arm);

      // Kolların ucundaki yan V dalları
      const branchGeo = new THREE.BoxGeometry(0.05, 0.22, 0.05);
      const b1 = new THREE.Mesh(branchGeo, snowMat);
      b1.position.set(-0.08, 0.45, 0);
      b1.rotation.z = 0.6;
      armGroup.add(b1);

      const b2 = new THREE.Mesh(branchGeo, snowMat);
      b2.position.set(0.08, 0.45, 0);
      b2.rotation.z = -0.6;
      armGroup.add(b2);

      group.add(armGroup);
    }

    return group;
  }

  static _createBuzMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Buz mavisi, şeffaf, hafif yontulmuş fasetli buz bloğu
    const iceGeo = new THREE.BoxGeometry(0.68, 0.68, 0.68);
    const iceMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.85,
      opacity: 0.88,
      transparent: true,
      ior: 1.31,
      emissive: 0x7dd3fc,
      emissiveIntensity: 0.35
    });

    const ice = new THREE.Mesh(iceGeo, iceMat);
    ice.position.y = 0.42;
    ice.rotation.y = 0.2;
    ice.add(this._createOutline(iceGeo, 0x0284c7, 0.035));
    group.add(ice);

    // Üstte beyaz buz don faseti (Frost highlight)
    const frostGeo = new THREE.TetrahedronGeometry(0.25, 0);
    const frostMat = new THREE.MeshBasicMaterial({ color: 0xf0f9ff });
    const frost = new THREE.Mesh(frostGeo, frostMat);
    frost.position.set(0.2, 0.68, 0.2);
    group.add(frost);

    return group;
  }

  static _createColMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Sonsuz kum tepeleri (sand dunes), dalgalı kum sırtları ve minik kaktüs/taş
    const duneMat = new THREE.MeshToonMaterial({
      color: 0xf59e0b, // Canlı sıcak kum sarısı
      roughness: 0.85
    });

    // Ana kum tepeciği dalgası
    const d1Geo = new THREE.ConeGeometry(0.85, 0.45, 8);
    d1Geo.scale(1.3, 1, 0.8);
    const d1 = new THREE.Mesh(d1Geo, duneMat);
    d1.position.set(-0.15, 0.22, 0);
    d1.add(this._createOutline(d1Geo, 0xb45309, 0.04));
    group.add(d1);

    // İkinci arka kum tepeciği
    const d2Geo = new THREE.ConeGeometry(0.65, 0.38, 7);
    d2Geo.scale(1.1, 1, 0.7);
    const d2 = new THREE.Mesh(d2Geo, duneMat);
    d2.position.set(0.35, 0.18, -0.2);
    d2.add(this._createOutline(d2Geo, 0xb45309, 0.035));
    group.add(d2);

    // Ön sırt dalgası
    const ridgeGeo = new THREE.TorusGeometry(0.5, 0.05, 8, 16, Math.PI);
    const ridge = new THREE.Mesh(ridgeGeo, duneMat);
    ridge.position.set(0, 0.15, 0.25);
    ridge.rotation.x = Math.PI / 2.5;
    group.add(ridge);

    return group;
  }

  static _createTohumMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Yan yana duran parlak altın/kahve tohum taneleri kümesi
    const seedMat = new THREE.MeshToonMaterial({ color: 0xca8a04, roughness: 0.5 });
    const seeds = [
      { x: -0.15, y: 0.18, z: 0.08, r: 0.16, sy: 1.6 },
      { x: 0.12, y: 0.22, z: -0.05, r: 0.18, sy: 1.7 },
      { x: 0, y: 0.28, z: 0.15, r: 0.14, sy: 1.5 }
    ];

    seeds.forEach(s => {
      const sGeo = new THREE.SphereGeometry(s.r, 10, 10);
      sGeo.scale(1, s.sy, 0.85);
      const mesh = new THREE.Mesh(sGeo, seedMat);
      mesh.position.set(s.x, s.y, s.z);
      mesh.rotation.z = s.x * 0.8;
      mesh.add(this._createOutline(sGeo, 0x713f12, 0.04));
      group.add(mesh);
    });

    return group;
  }

  static _createBugdayMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Altın sarısı, taneleri dışa bakan buğday başağı ve sapı
    const wheatMat = new THREE.MeshToonMaterial({ color: 0xeab308, roughness: 0.4 });
    const stemGeo = new THREE.CylinderGeometry(0.035, 0.045, 0.95, 8);
    const stemMat = new THREE.MeshToonMaterial({ color: 0xca8a04 });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.y = 0.45;
    stem.rotation.z = -0.12;
    stem.add(this._createOutline(stemGeo, 0x854d0e, 0.035));
    group.add(stem);

    // Başaktaki taneler (6 çift simetrik tane)
    for (let i = 0; i < 6; i++) {
      [-0.12, 0.12].forEach(side => {
        const grainGeo = new THREE.ConeGeometry(0.08, 0.22, 5);
        const grain = new THREE.Mesh(grainGeo, wheatMat);
        grain.position.set(side, 0.45 + i * 0.1, 0);
        grain.rotation.z = side < 0 ? 0.6 : -0.6;
        grain.add(this._createOutline(grainGeo, 0x854d0e, 0.035));
        group.add(grain);
      });
    }

    return group;
  }

  static _createNaneMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Tırtıklı kenarlı, ferah yeşil nane yaprakları ve sapı
    const mintMat = new THREE.MeshToonMaterial({ color: 0x10b981, roughness: 0.4 });

    // Ana yaprak
    const leaf1Geo = new THREE.ConeGeometry(0.32, 0.7, 5);
    leaf1Geo.scale(1, 1, 0.2);
    const leaf1 = new THREE.Mesh(leaf1Geo, mintMat);
    leaf1.position.set(0, 0.45, 0);
    leaf1.rotation.z = 0.2;
    leaf1.add(this._createOutline(leaf1Geo, 0x065f46, 0.04));
    group.add(leaf1);

    // Yan küçük yaprak
    const leaf2Geo = new THREE.ConeGeometry(0.24, 0.52, 5);
    leaf2Geo.scale(1, 1, 0.2);
    const leaf2 = new THREE.Mesh(leaf2Geo, mintMat);
    leaf2.position.set(-0.2, 0.32, 0.08);
    leaf2.rotation.z = -0.65;
    leaf2.add(this._createOutline(leaf2Geo, 0x065f46, 0.035));
    group.add(leaf2);

    return group;
  }

  static _createAgacKabuguMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Kıvrık, çatlaklı dokusu olan kalın kavisli ağaç kabuğu
    const barkMat = new THREE.MeshToonMaterial({
      color: 0x78350f,
      roughness: 0.9,
      side: THREE.DoubleSide
    });

    const barkGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.75, 12, 1, true, 0, Math.PI * 0.9);
    const bark = new THREE.Mesh(barkGeo, barkMat);
    bark.position.y = 0.38;
    bark.rotation.y = 0.3;
    bark.add(this._createOutline(barkGeo, 0x451a03, 0.04));
    group.add(bark);

    return group;
  }

  static _createInekMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Beyaz gövdeli, siyah benekli, pembe burunlu şirin inek
    const cowMat = new THREE.MeshToonMaterial({ color: 0xf8fafc, roughness: 0.5 });
    const spotMat = new THREE.MeshToonMaterial({ color: 0x1e293b });

    // Gövde
    const bodyGeo = new THREE.BoxGeometry(0.55, 0.45, 0.72);
    const body = new THREE.Mesh(bodyGeo, cowMat);
    body.position.y = 0.48;
    body.add(this._createOutline(bodyGeo, 0x0f172a, 0.04));
    group.add(body);

    // Siyah leke
    const spotGeo = new THREE.BoxGeometry(0.24, 0.28, 0.73);
    const spot = new THREE.Mesh(spotGeo, spotMat);
    spot.position.set(0.12, 0.52, 0.05);
    group.add(spot);

    // Kafa
    const headGeo = new THREE.BoxGeometry(0.32, 0.32, 0.35);
    const head = new THREE.Mesh(headGeo, cowMat);
    head.position.set(0, 0.65, 0.42);
    head.add(this._createOutline(headGeo, 0x0f172a, 0.035));
    group.add(head);

    // Pembe burun
    const snoutGeo = new THREE.BoxGeometry(0.26, 0.16, 0.14);
    const snoutMat = new THREE.MeshToonMaterial({ color: 0xf472b6 });
    const snout = new THREE.Mesh(snoutGeo, snoutMat);
    snout.position.set(0, 0.58, 0.62);
    group.add(snout);

    // 4 Bacak
    const legGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.35, 6);
    [[-0.2, -0.22], [0.2, -0.22], [-0.2, 0.22], [0.2, 0.22]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, cowMat);
      leg.position.set(lx, 0.18, lz);
      leg.add(this._createOutline(legGeo, 0x0f172a, 0.03));
      group.add(leg);
    });

    return group;
  }

  static _createSutMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Beyaz süt dolu rustik çömlek / süt güğümü
    const jugGeo = new THREE.CylinderGeometry(0.28, 0.36, 0.55, 12);
    const jugMat = new THREE.MeshToonMaterial({ color: 0xb45309, roughness: 0.6 });
    const jug = new THREE.Mesh(jugGeo, jugMat);
    jug.position.y = 0.32;
    jug.add(this._createOutline(jugGeo, 0x78350f, 0.04));
    group.add(jug);

    // Beyaz süt üst yüzeyi
    const milkGeo = new THREE.CircleGeometry(0.26, 12);
    const milkMat = new THREE.MeshToonMaterial({ color: 0xffffff });
    const milk = new THREE.Mesh(milkGeo, milkMat);
    milk.position.set(0, 0.6, 0);
    milk.rotation.x = -Math.PI / 2;
    group.add(milk);

    return group;
  }

  static _createYumurtaMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Pürüzsüz açık bej yumurta formu
    const eggGeo = new THREE.SphereGeometry(0.35, 16, 16);
    eggGeo.scale(1, 1.35, 1);
    const eggMat = new THREE.MeshToonMaterial({ color: 0xfef3c7, roughness: 0.3 });
    const egg = new THREE.Mesh(eggGeo, eggMat);
    egg.position.y = 0.42;
    egg.add(this._createOutline(eggGeo, 0xd97706, 0.04));
    group.add(egg);

    return group;
  }

  static _createMercanMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Canlı pembe/mercan rengi çatallanan deniz mercanı dalı
    const coralMat = new THREE.MeshToonMaterial({ color: 0xf43f5e, roughness: 0.5 });

    // Ana gövde
    const stemGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.65, 8);
    const stem = new THREE.Mesh(stemGeo, coralMat);
    stem.position.y = 0.32;
    stem.add(this._createOutline(stemGeo, 0x9f1239, 0.035));
    group.add(stem);

    // Yan kollar
    [
      { ang: 0.45, x: 0.18, y: 0.45, z: 0 },
      { ang: -0.5, x: -0.16, y: 0.38, z: 0.05 },
      { ang: 0.3, x: 0.05, y: 0.62, z: -0.1 }
    ].forEach(b => {
      const bGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.4, 6);
      const branch = new THREE.Mesh(bGeo, coralMat);
      branch.position.set(b.x, b.y, b.z);
      branch.rotation.z = b.ang;
      branch.add(this._createOutline(bGeo, 0x9f1239, 0.03));
      group.add(branch);
    });

    return group;
  }

  static _createOltaMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: İnce ahşap olta kamışı, sarkan misina ve kavisli metal iğne
    const rodGeo = new THREE.CylinderGeometry(0.025, 0.04, 1.15, 8);
    const rodMat = new THREE.MeshToonMaterial({ color: 0x854d0e });
    const rod = new THREE.Mesh(rodGeo, rodMat);
    rod.position.set(-0.15, 0.45, 0);
    rod.rotation.z = -Math.PI / 4;
    rod.add(this._createOutline(rodGeo, 0x451a03, 0.035));
    group.add(rod);

    // Misina teli
    const lineGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.55, 4);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
    const line = new THREE.Mesh(lineGeo, lineMat);
    line.position.set(0.25, 0.55, 0);
    group.add(line);

    // Kanca / iğne
    const hookGeo = new THREE.TorusGeometry(0.06, 0.015, 6, 12, Math.PI * 1.3);
    const hookMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 });
    const hook = new THREE.Mesh(hookGeo, hookMat);
    hook.position.set(0.25, 0.28, 0);
    group.add(hook);

    return group;
  }

  static _createYelkenMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Ahşap direk ve rüzgarla şişmiş beyaz üçgen yelken bezi
    const mastGeo = new THREE.CylinderGeometry(0.045, 0.045, 1.05, 8);
    const mastMat = new THREE.MeshToonMaterial({ color: 0x78350f });
    const mast = new THREE.Mesh(mastGeo, mastMat);
    mast.position.set(-0.25, 0.52, 0);
    mast.add(this._createOutline(mastGeo, 0x451a03, 0.035));
    group.add(mast);

    // Üçgen beyaz yelken
    const sailGeo = new THREE.ConeGeometry(0.42, 0.75, 4);
    sailGeo.scale(1, 1, 0.12);
    const sailMat = new THREE.MeshToonMaterial({ color: 0xf8fafc, roughness: 0.4 });
    const sail = new THREE.Mesh(sailGeo, sailMat);
    sail.position.set(0.12, 0.52, 0);
    sail.rotation.z = -Math.PI / 2.2;
    sail.add(this._createOutline(sailGeo, 0x94a3b8, 0.035));
    group.add(sail);

    return group;
  }

  static _createSalMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Halatlarla birbirine bağlanmış yan yana kütükler
    const logGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.85, 10);
    const logMat = new THREE.MeshToonMaterial({ color: 0x854d0e, roughness: 0.75 });

    for (let i = -2; i <= 2; i++) {
      const log = new THREE.Mesh(logGeo, logMat);
      log.rotation.x = Math.PI / 2;
      log.position.set(i * 0.18, 0.15, 0);
      log.add(this._createOutline(logGeo, 0x451a03, 0.035));
      group.add(log);
    }

    // Bağlama halatları
    const bindGeo = new THREE.BoxGeometry(0.95, 0.04, 0.06);
    const bindMat = new THREE.MeshToonMaterial({ color: 0xd97706 });
    [-0.25, 0.25].forEach(bz => {
      const bMesh = new THREE.Mesh(bindGeo, bindMat);
      bMesh.position.set(0, 0.26, bz);
      group.add(bMesh);
    });

    return group;
  }

  static _createObsidyenBicakMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: İple sarılı ahşap sap ve yontulmuş keskin siyah obsidyen namlu
    const handleGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.45, 8);
    const handleMat = new THREE.MeshToonMaterial({ color: 0x854d0e });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.y = 0.2;
    handle.add(this._createOutline(handleGeo, 0x451a03, 0.035));
    group.add(handle);

    // Koyu mor-siyah keskin obsidyen uç
    const bladeGeo = new THREE.ConeGeometry(0.14, 0.65, 4);
    bladeGeo.scale(0.35, 1, 1);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.15,
      metalness: 0.7,
      emissive: 0x3b0764,
      emissiveIntensity: 0.4
    });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.y = 0.68;
    blade.add(this._createOutline(bladeGeo, 0x020617, 0.04));
    group.add(blade);

    return group;
  }

  static _createPeynirMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Delikli, canlı sarı üçgen peynir dilimi
    const cheeseMat = new THREE.MeshToonMaterial({ color: 0xfacc15, roughness: 0.4 });
    const cheeseGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.28, 3);
    const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
    cheese.position.y = 0.2;
    cheese.add(this._createOutline(cheeseGeo, 0xb45309, 0.04));
    group.add(cheese);

    // Üzerindeki küçük delikler
    const holeMat = new THREE.MeshToonMaterial({ color: 0xeab308 });
    const holes = [[0.15, 0.28, 0.1], [-0.12, 0.28, 0.05], [0, 0.28, -0.15]];
    holes.forEach(([hx, hy, hz]) => {
      const hGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 8);
      const hole = new THREE.Mesh(hGeo, holeMat);
      hole.position.set(hx, hy, hz);
      group.add(hole);
    });

    return group;
  }

  static _createUnMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: İple bağlı bej un çuvalı ve taşan beyaz un
    const sackGeo = new THREE.CylinderGeometry(0.35, 0.42, 0.55, 12);
    const sackMat = new THREE.MeshToonMaterial({ color: 0xfef3c7, roughness: 0.8 });
    const sack = new THREE.Mesh(sackGeo, sackMat);
    sack.position.y = 0.28;
    sack.add(this._createOutline(sackGeo, 0xd97706, 0.035));
    group.add(sack);

    // Üstten dökülen bembeyaz un tepeciği
    const flourGeo = new THREE.ConeGeometry(0.28, 0.22, 10);
    const flourMat = new THREE.MeshToonMaterial({ color: 0xffffff, roughness: 0.9 });
    const flour = new THREE.Mesh(flourGeo, flourMat);
    flour.position.y = 0.62;
    group.add(flour);

    return group;
  }

  static _createHamurMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Yumuşak puf gibi kabarmış yuvarlak ekmek hamuru
    const doughGeo = new THREE.SphereGeometry(0.42, 14, 14);
    doughGeo.scale(1.25, 0.75, 1.15);
    const doughMat = new THREE.MeshToonMaterial({ color: 0xfef08a, roughness: 0.7 });
    const dough = new THREE.Mesh(doughGeo, doughMat);
    dough.position.y = 0.25;
    dough.add(this._createOutline(doughGeo, 0xca8a04, 0.035));
    group.add(dough);

    return group;
  }

  static _createEkmekMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Altın rengi kızarmış, üstü kesikli somun ekmek
    const breadGeo = new THREE.BoxGeometry(0.68, 0.35, 0.42);
    const breadMat = new THREE.MeshToonMaterial({ color: 0xd97706, roughness: 0.6 });
    const bread = new THREE.Mesh(breadGeo, breadMat);
    bread.position.y = 0.22;
    bread.add(this._createOutline(breadGeo, 0x78350f, 0.04));
    group.add(bread);

    // Üstteki fırın kesikleri
    const slitMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    [-0.15, 0.15].forEach(sx => {
      const slitGeo = new THREE.BoxGeometry(0.04, 0.04, 0.3);
      const slit = new THREE.Mesh(slitGeo, slitMat);
      slit.position.set(sx, 0.4, 0);
      slit.rotation.y = 0.2;
      group.add(slit);
    });

    return group;
  }

  static _createDisliCarkMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Çelik/bronz endüstriyel dişli çark, orta delik ve dış dişler
    const bodyGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.1, 16);
    const gearMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.85,
      roughness: 0.25
    });
    const gear = new THREE.Mesh(bodyGeo, gearMat);
    gear.position.y = 0.25;
    gear.rotation.x = Math.PI / 2;
    gear.add(this._createOutline(bodyGeo, 0x1e293b, 0.035));
    group.add(gear);

    // 8 adet dış diş
    const toothGeo = new THREE.BoxGeometry(0.1, 0.12, 0.12);
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const tooth = new THREE.Mesh(toothGeo, gearMat);
      tooth.position.set(Math.cos(angle) * 0.42, 0.25 + Math.sin(angle) * 0.42, 0);
      tooth.rotation.z = angle;
      group.add(tooth);
    }

    // Ortadaki mil deliği
    const holeGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 10);
    const holeMat = new THREE.MeshToonMaterial({ color: 0x0f172a });
    const hole = new THREE.Mesh(holeGeo, holeMat);
    hole.position.y = 0.25;
    hole.rotation.x = Math.PI / 2;
    group.add(hole);

    return group;
  }

  static _createDegirmenMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Taş/ahşap konik kule gövdesi, konik çatı ve 4 kanatlı dönen pervane
    const towerGeo = new THREE.CylinderGeometry(0.24, 0.38, 0.65, 10);
    const towerMat = new THREE.MeshToonMaterial({ color: 0x78350f, roughness: 0.8 });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.y = 0.32;
    tower.add(this._createOutline(towerGeo, 0x451a03, 0.04));
    group.add(tower);

    // Kırmızı kiremit konik çatı
    const roofGeo = new THREE.ConeGeometry(0.32, 0.26, 10);
    const roofMat = new THREE.MeshToonMaterial({ color: 0xb91c1c });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 0.76;
    roof.add(this._createOutline(roofGeo, 0x7f1d1d, 0.035));
    group.add(roof);

    // 4 adet yelken kanadı
    const bladeGeo = new THREE.BoxGeometry(0.08, 0.58, 0.02);
    const bladeMat = new THREE.MeshToonMaterial({ color: 0xfef3c7 });
    [0, Math.PI / 2].forEach(angle => {
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.position.set(0, 0.52, 0.3);
      blade.rotation.z = angle;
      blade.add(this._createOutline(bladeGeo, 0xd97706, 0.025));
      group.add(blade);
    });

    return group;
  }

  static _createAynaMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Süslü altın çerçeveli, pürüzsüz parlayan oval/dikdörtgen ayna
    const frameGeo = new THREE.BoxGeometry(0.52, 0.72, 0.06);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.85, roughness: 0.25 });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.y = 0.38;
    frame.add(this._createOutline(frameGeo, 0xb45309, 0.04));
    group.add(frame);

    // Parlak yansıtıcı cam yüzey
    const glassGeo = new THREE.PlaneGeometry(0.42, 0.62);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      metalness: 0.95,
      roughness: 0.05,
      reflectivity: 1.0,
      clearcoat: 1.0
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.set(0, 0.38, 0.032);
    group.add(glass);

    // Üst süs taç detayı
    const crestGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const crest = new THREE.Mesh(crestGeo, frameMat);
    crest.position.set(0, 0.76, 0);
    group.add(crest);

    return group;
  }

  static _createSaatMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Yuvarlak altın cep saati, cam kapak, beyaz kadran ve akrep/yelkovan
    const caseGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.1, 16);
    const caseMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });
    const casing = new THREE.Mesh(caseGeo, caseMat);
    casing.position.y = 0.1;
    casing.add(this._createOutline(caseGeo, 0xb45309, 0.04));
    group.add(casing);

    // Kadran
    const dialGeo = new THREE.CircleGeometry(0.36, 16);
    const dialMat = new THREE.MeshToonMaterial({ color: 0xffffff });
    const dial = new THREE.Mesh(dialGeo, dialMat);
    dial.position.y = 0.16;
    dial.rotation.x = -Math.PI / 2;
    group.add(dial);

    // Akrep ve yelkovan
    const handMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const hand1Geo = new THREE.BoxGeometry(0.03, 0.02, 0.16);
    const hand1 = new THREE.Mesh(hand1Geo, handMat);
    hand1.position.set(0, 0.17, 0.08);
    group.add(hand1);

    const hand2Geo = new THREE.BoxGeometry(0.02, 0.02, 0.24);
    const hand2 = new THREE.Mesh(hand2Geo, handMat);
    hand2.position.set(0.08, 0.17, 0);
    hand2.rotation.y = Math.PI / 3;
    group.add(hand2);

    // Üst kurma tepesi halkası
    const ringGeo = new THREE.TorusGeometry(0.1, 0.025, 6, 12);
    const ring = new THREE.Mesh(ringGeo, caseMat);
    ring.position.set(0, 0.1, -0.48);
    group.add(ring);

    return group;
  }

  static _createDemirParmaklikMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Ağır siyah dökme demir zindan parmaklıkları, sivri uçlu dikey miller
    const frameGeo = new THREE.BoxGeometry(0.72, 0.08, 0.08);
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.25 });
    
    // Üst ve alt yatay bağlantı kirişleri
    [-0.28, 0.28].forEach(fy => {
      const fMesh = new THREE.Mesh(frameGeo, ironMat);
      fMesh.position.y = 0.38 + fy;
      fMesh.add(this._createOutline(frameGeo, 0x0f172a, 0.035));
      group.add(fMesh);
    });

    // 4 adet sivri uçlu dikey parmaklık
    const barGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.72, 8);
    const tipGeo = new THREE.ConeGeometry(0.045, 0.12, 6);
    [-0.24, -0.08, 0.08, 0.24].forEach(bx => {
      const bar = new THREE.Mesh(barGeo, ironMat);
      bar.position.set(bx, 0.38, 0);
      bar.add(this._createOutline(barGeo, 0x0f172a, 0.03));
      group.add(bar);

      const tip = new THREE.Mesh(tipGeo, ironMat);
      tip.position.set(bx, 0.78, 0);
      group.add(tip);
    });

    return group;
  }

  static _createSavasBaltasiMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Çift taraflı hilal çelik ağızlı, deri sargılı barbar savaş baltası
    const handleGeo = new THREE.CylinderGeometry(0.045, 0.04, 0.95, 8);
    const handleMat = new THREE.MeshToonMaterial({ color: 0x78350f });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.y = 0.46;
    handle.add(this._createOutline(handleGeo, 0x451a03, 0.035));
    group.add(handle);

    // Çift taraflı çelik balta başı
    const bladeGeo = new THREE.CylinderGeometry(0.24, 0.32, 0.05, 3);
    bladeGeo.scale(1.2, 0.8, 1);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.95,
      roughness: 0.2
    });

    // Sol ağız
    const bladeL = new THREE.Mesh(bladeGeo, bladeMat);
    bladeL.rotation.z = Math.PI / 2;
    bladeL.position.set(-0.24, 0.75, 0);
    bladeL.add(this._createOutline(bladeGeo, 0x1e293b, 0.035));
    group.add(bladeL);

    // Sağ ağız
    const bladeR = new THREE.Mesh(bladeGeo, bladeMat);
    bladeR.rotation.z = -Math.PI / 2;
    bladeR.position.set(0.24, 0.75, 0);
    bladeR.add(this._createOutline(bladeGeo, 0x1e293b, 0.035));
    group.add(bladeR);

    return group;
  }

  static _createGozetlemeKulesiMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Taş kule gövdesi, ahşap gözetleme balkonu ve konik bayraklı çatı
    const towerGeo = new THREE.CylinderGeometry(0.28, 0.38, 0.65, 8);
    const towerMat = new THREE.MeshToonMaterial({ color: 0x94a3b8, roughness: 0.8 });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.y = 0.32;
    tower.add(this._createOutline(towerGeo, 0x334155, 0.04));
    group.add(tower);

    // Ahşap gözetleme sahanlığı
    const deckGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.08, 8);
    const deckMat = new THREE.MeshToonMaterial({ color: 0x78350f });
    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.position.y = 0.68;
    deck.add(this._createOutline(deckGeo, 0x451a03, 0.035));
    group.add(deck);

    // Kırmızı kiremit kule çatısı
    const roofGeo = new THREE.ConeGeometry(0.38, 0.35, 8);
    const roofMat = new THREE.MeshToonMaterial({ color: 0xb91c1c });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 0.9;
    roof.add(this._createOutline(roofGeo, 0x7f1d1d, 0.035));
    group.add(roof);

    return group;
  }

  static _createKaleKapisiMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: İki yanı taş burç kuleli, ortası demir parmaklıklı & ahşap kanatlı kale kapısı
    const archGeo = new THREE.BoxGeometry(0.85, 0.82, 0.18);
    const stoneMat = new THREE.MeshToonMaterial({ color: 0x64748b, roughness: 0.8 });
    const arch = new THREE.Mesh(archGeo, stoneMat);
    arch.position.y = 0.42;
    arch.add(this._createOutline(archGeo, 0x1e293b, 0.04));
    group.add(arch);

    // Ortadaki koyu meşe ahşap kapı kanatları
    const doorGeo = new THREE.BoxGeometry(0.48, 0.62, 0.2);
    const doorMat = new THREE.MeshToonMaterial({ color: 0x78350f });
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(0, 0.32, 0);
    door.add(this._createOutline(doorGeo, 0x451a03, 0.035));
    group.add(door);

    // Dövme demir menteşe ve çiviler
    const studMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 });
    [-0.15, 0.15].forEach(dx => {
      const studGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.22, 6);
      const stud = new THREE.Mesh(studGeo, studMat);
      stud.position.set(dx, 0.32, 0);
      stud.rotation.x = Math.PI / 2;
      group.add(stud);
    });

    return group;
  }

  static _createBuzRunuMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Buzdan yontulmuş rünik tablet, ortasında neon parlayan kar kristali motifi
    const tabletGeo = new THREE.BoxGeometry(0.46, 0.62, 0.12);
    const iceMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.75,
      roughness: 0.1,
      transmission: 0.7,
      transparent: true,
      opacity: 0.9
    });
    const tablet = new THREE.Mesh(tabletGeo, iceMat);
    tablet.position.y = 0.35;
    tablet.add(this._createOutline(tabletGeo, 0x0369a1, 0.04));
    group.add(tablet);

    // Yüzeydeki parlak buz rünü sembolü
    const runeGeo = new THREE.RingGeometry(0.12, 0.16, 6);
    const runeMat = new THREE.MeshBasicMaterial({ color: 0xe0f2fe, side: THREE.DoubleSide });
    const rune = new THREE.Mesh(runeGeo, runeMat);
    rune.position.set(0, 0.35, 0.065);
    group.add(rune);

    const light = new THREE.PointLight(0x7dd3fc, 1.8, 2.2);
    light.position.set(0, 0.35, 0.1);
    group.add(light);

    return group;
  }

  static _createCehennemTasiMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: İçinden kızıl lav sızan, kor alevli volkanik cehennem taşı
    const geo = new THREE.DodecahedronGeometry(0.42, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x450a0a,
      emissive: 0xef4444,
      emissiveIntensity: 0.9,
      roughness: 0.4
    });
    const stone = new THREE.Mesh(geo, mat);
    stone.position.y = 0.42;
    stone.add(this._createOutline(geo, 0x1f0303, 0.04));
    group.add(stone);

    // Çevresindeki kor damarları / sivri kor kristalleri
    const spikeGeo = new THREE.ConeGeometry(0.1, 0.28, 4);
    const spikeMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
    [[0, 0.7, 0, 0], [0.35, 0.4, 0.2, 0.6], [-0.35, 0.4, -0.2, -0.6]].forEach(([sx, sy, sz, rz]) => {
      const spike = new THREE.Mesh(spikeGeo, spikeMat);
      spike.position.set(sx, sy, sz);
      spike.rotation.z = rz;
      group.add(spike);
    });

    const light = new THREE.PointLight(0xef4444, 2.2, 2.5);
    light.position.set(0, 0.42, 0);
    group.add(light);

    return group;
  }

  static _createZamanKumSaatiMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Altın/pirinç çerçeveli, parıldayan altın kumların aktığı mistik kum saati
    // Üst ve alt altın tablalar
    const capGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.06, 14);
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });
    
    const topCap = new THREE.Mesh(capGeo, goldMat);
    topCap.position.y = 0.72;
    topCap.add(this._createOutline(capGeo, 0xb45309, 0.035));
    group.add(topCap);

    const btmCap = new THREE.Mesh(capGeo, goldMat);
    btmCap.position.y = 0.04;
    btmCap.add(this._createOutline(capGeo, 0xb45309, 0.035));
    group.add(btmCap);

    // İki cam koni (kum saati haznesi)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      roughness: 0.1,
      transparent: true,
      opacity: 0.6
    });

    const bulbTopGeo = new THREE.ConeGeometry(0.26, 0.32, 12);
    const bulbTop = new THREE.Mesh(bulbTopGeo, glassMat);
    bulbTop.rotation.x = Math.PI;
    bulbTop.position.y = 0.54;
    group.add(bulbTop);

    const bulbBtmGeo = new THREE.ConeGeometry(0.26, 0.32, 12);
    const bulbBtm = new THREE.Mesh(bulbBtmGeo, glassMat);
    bulbBtm.position.y = 0.22;
    group.add(bulbBtm);

    // İçindeki parıldayan altın kum
    const sandGeo = new THREE.ConeGeometry(0.2, 0.2, 8);
    const sandMat = new THREE.MeshStandardMaterial({
      color: 0xfde047,
      emissive: 0xeab308,
      emissiveIntensity: 0.8
    });
    const sand = new THREE.Mesh(sandGeo, sandMat);
    sand.position.y = 0.14;
    group.add(sand);

    // 3 adet yan altın destek sütunu
    const colGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.68, 6);
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2;
      const col = new THREE.Mesh(colGeo, goldMat);
      col.position.set(Math.cos(angle) * 0.28, 0.38, Math.sin(angle) * 0.28);
      group.add(col);
    }

    return group;
  }

  static _createIlluzyonAynasiMesh(def) {
    const group = new THREE.Group();
    // 2D görsel: Gotik mora çalan süslemeli aynanın içinde dönen fantezi yanılsama perdesi
    const frameGeo = new THREE.BoxGeometry(0.58, 0.78, 0.08);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x4a044e,
      metalness: 0.75,
      roughness: 0.25,
      emissive: 0xa21caf,
      emissiveIntensity: 0.4
    });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.y = 0.42;
    frame.add(this._createOutline(frameGeo, 0x2e1065, 0.04));
    group.add(frame);

    // İllüzyon girdap yüzeyi
    const vortexGeo = new THREE.PlaneGeometry(0.46, 0.66);
    const vortexMat = new THREE.MeshStandardMaterial({
      color: 0xd946ef,
      emissive: 0xf43f5e,
      emissiveIntensity: 1.0,
      side: THREE.DoubleSide
    });
    const vortex = new THREE.Mesh(vortexGeo, vortexMat);
    vortex.position.set(0, 0.42, 0.042);
    group.add(vortex);

    const light = new THREE.PointLight(0xf43f5e, 2.0, 2.5);
    light.position.set(0, 0.42, 0.1);
    group.add(light);

    return group;
  }

  static _createDefaultMesh(def) {
    const geo = new THREE.IcosahedronGeometry(0.6, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: def.colorPalette.primary,
      roughness: 0.4
    });
    return new THREE.Mesh(geo, mat);
  }

  static _generateFracturePieces(def) {
    const pieces = [];
    const mat = new THREE.MeshStandardMaterial({
      color: def.colorPalette.primary,
      roughness: 0.6,
      emissive: def.colorPalette.emissive || '#000000',
      emissiveIntensity: 0.2
    });

    for (let i = 0; i < 5; i++) {
      const pieceGeo = new THREE.TetrahedronGeometry(0.25 + Math.random() * 0.15, 0);
      const piece = new THREE.Mesh(pieceGeo, mat);
      // Random offset direction for breaking explosion simulation
      piece.userData.breakVelocity = new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        Math.random() * 3 + 1,
        (Math.random() - 0.5) * 4
      );
      pieces.push(piece);
    }
    return pieces;
  }
  static _createSiberKristalMesh(def) {
    const group = new THREE.Group();
    // Çift piramit siber kristal ve parlak iç çekirdek
    const crysGeo = new THREE.OctahedronGeometry(0.5, 0);
    crysGeo.scale(0.8, 1.6, 0.8);
    const crysMat = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      transmission: 0.8,
      transparent: true,
      opacity: 0.85
    });
    const crys = new THREE.Mesh(crysGeo, crysMat);
    crys.position.y = 0.45;
    crys.add(this._createOutline(crysGeo, 0x0284c7, 0.035));
    group.add(crys);

    const coreGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = 0.45;
    group.add(core);

    const light = new THREE.PointLight(0x38bdf8, 2.5, 3.0);
    light.position.set(0, 0.45, 0.1);
    group.add(light);
    return group;
  }

  static _createHologramKupuMesh(def) {
    const group = new THREE.Group();
    // Dış koruyucu siber çerçeve
    const frameGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.85,
      roughness: 0.25
    });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.y = 0.42;
    frame.add(this._createOutline(frameGeo, 0x0f172a, 0.035));
    group.add(frame);

    // İçte parlayan neon yeşil holografik çekirdek
    const holoGeo = new THREE.BoxGeometry(0.56, 0.56, 0.56);
    const holoMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.9,
      transparent: true,
      opacity: 0.85
    });
    const holo = new THREE.Mesh(holoGeo, holoMat);
    holo.position.y = 0.42;
    group.add(holo);

    const light = new THREE.PointLight(0x34d399, 2.0, 2.5);
    light.position.set(0, 0.42, 0.2);
    group.add(light);
    return group;
  }

  static _createBuharJeneratoruMesh(def) {
    const group = new THREE.Group();
    // Bronz buhar silindiri ve pirinç borular
    const tankGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.55, 16);
    const tankMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      metalness: 0.8,
      roughness: 0.3
    });
    const tank = new THREE.Mesh(tankGeo, tankMat);
    tank.position.set(0.12, 0.38, 0);
    tank.add(this._createOutline(tankGeo, 0x78350f, 0.035));
    group.add(tank);

    // Yan dişli çark
    const gearGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.1, 12);
    gearGeo.rotateZ(Math.PI / 2);
    const gearMat = new THREE.MeshStandardMaterial({
      color: 0x78716c,
      metalness: 0.85,
      roughness: 0.2
    });
    const gear = new THREE.Mesh(gearGeo, gearMat);
    gear.position.set(-0.22, 0.38, 0);
    group.add(gear);

    // Üst boru çıkışı
    const pipeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.22, 10);
    const pipe = new THREE.Mesh(pipeGeo, tankMat);
    pipe.position.set(0.12, 0.72, 0);
    group.add(pipe);

    return group;
  }

  static _createMekaZirhiMesh(def) {
    const group = new THREE.Group();
    // Ağır göğüs zırhı plakası
    const chestGeo = new THREE.BoxGeometry(0.72, 0.65, 0.32);
    const chestMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.85,
      roughness: 0.3
    });
    const chest = new THREE.Mesh(chestGeo, chestMat);
    chest.position.y = 0.42;
    chest.add(this._createOutline(chestGeo, 0x1e293b, 0.04));
    group.add(chest);

    // Omuzluklar
    const shoulderGeo = new THREE.BoxGeometry(0.25, 0.28, 0.34);
    const leftShoulder = new THREE.Mesh(shoulderGeo, chestMat);
    leftShoulder.position.set(-0.44, 0.6, 0);
    group.add(leftShoulder);
    const rightShoulder = new THREE.Mesh(shoulderGeo, chestMat);
    rightShoulder.position.set(0.44, 0.6, 0);
    group.add(rightShoulder);

    // Merkez reaktör çekirdeği
    const reactorGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.12, 16);
    reactorGeo.rotateX(Math.PI / 2);
    const reactorMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xea580c,
      emissiveIntensity: 1.2
    });
    const reactor = new THREE.Mesh(reactorGeo, reactorMat);
    reactor.position.set(0, 0.42, 0.15);
    group.add(reactor);

    const light = new THREE.PointLight(0xf97316, 2.2, 2.0);
    light.position.set(0, 0.42, 0.25);
    group.add(light);
    return group;
  }

  static _createPlazmaTufegiMesh(def) {
    const group = new THREE.Group();
    // Ana gövde
    const bodyGeo = new THREE.BoxGeometry(0.85, 0.24, 0.14);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.3
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(0, 0.38, 0);
    body.add(this._createOutline(bodyGeo, 0x0f172a, 0.035));
    group.add(body);

    // Namlu ve plazma kanalı
    const barrelGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.45, 12);
    barrelGeo.rotateZ(Math.PI / 2);
    const barrelMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x2563eb,
      emissiveIntensity: 0.8
    });
    const barrel = new THREE.Mesh(barrelGeo, barrelMat);
    barrel.position.set(0.48, 0.38, 0);
    group.add(barrel);

    // Dürbün / Scope
    const scopeGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.35, 10);
    scopeGeo.rotateZ(Math.PI / 2);
    const scope = new THREE.Mesh(scopeGeo, bodyMat);
    scope.position.set(0.05, 0.54, 0);
    group.add(scope);

    // Lazer namlu ucu ışığı
    const light = new THREE.PointLight(0xec4899, 2.0, 2.0);
    light.position.set(0.72, 0.38, 0);
    group.add(light);
    return group;
  }

  static _createFelsefeTasiMesh(def) {
    const group = new THREE.Group();
    // Altın sarma süsleme ve yakut damla
    const stoneGeo = new THREE.DodecahedronGeometry(0.42, 1);
    stoneGeo.scale(0.85, 1.3, 0.85);
    const stoneMat = new THREE.MeshPhysicalMaterial({
      color: 0xdc2626,
      emissive: 0xb91c1c,
      emissiveIntensity: 0.7,
      roughness: 0.1,
      transmission: 0.75,
      transparent: true,
      opacity: 0.9
    });
    const stone = new THREE.Mesh(stoneGeo, stoneMat);
    stone.position.y = 0.42;
    stone.add(this._createOutline(stoneGeo, 0x7f1d1d, 0.035));
    group.add(stone);

    // Altın taç/yuva
    const goldGeo = new THREE.TorusGeometry(0.36, 0.06, 10, 24);
    goldGeo.rotateX(Math.PI / 2);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.2
    });
    const goldRing = new THREE.Mesh(goldGeo, goldMat);
    goldRing.position.y = 0.38;
    group.add(goldRing);

    const light = new THREE.PointLight(0xef4444, 2.5, 2.8);
    light.position.set(0, 0.45, 0.1);
    group.add(light);
    return group;
  }

  static _createGunesPaneliMesh(def) {
    const group = new THREE.Group();
    // Eğimli fotovoltaik panel
    const panelGeo = new THREE.BoxGeometry(0.76, 0.58, 0.06);
    panelGeo.rotateX(0.45);
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.4,
      metalness: 0.6,
      roughness: 0.1
    });
    const panel = new THREE.Mesh(panelGeo, panelMat);
    panel.position.y = 0.42;
    panel.add(this._createOutline(panelGeo, 0x0c4a6e, 0.035));
    group.add(panel);

    // Ayak/Kaide
    const standGeo = new THREE.CylinderGeometry(0.05, 0.07, 0.35, 10);
    const standMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.7 });
    const stand = new THREE.Mesh(standGeo, standMat);
    stand.position.set(0, 0.16, -0.08);
    group.add(stand);

    const light = new THREE.PointLight(0xfde047, 1.8, 2.0);
    light.position.set(0, 0.6, 0.2);
    group.add(light);
    return group;
  }

  static _createYercekimsizPlatformMesh(def) {
    const group = new THREE.Group();
    // Metal dairesel iniş diski
    const discGeo = new THREE.CylinderGeometry(0.48, 0.42, 0.12, 24);
    const discMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.85,
      roughness: 0.25
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.position.y = 0.28;
    disc.add(this._createOutline(discGeo, 0x0f172a, 0.035));
    group.add(disc);

    // Üstündeki mor parıldayan anti-yerçekimi ışık halkası
    const glowGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.03, 24);
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x9333ea,
      emissiveIntensity: 1.2
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.y = 0.35;
    group.add(glow);

    // Yukarı uzanan hüzme konisi
    const beamGeo = new THREE.ConeGeometry(0.45, 0.5, 16, 1, true);
    beamGeo.rotateX(Math.PI);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.y = 0.62;
    group.add(beam);

    const light = new THREE.PointLight(0xa855f7, 2.4, 2.5);
    light.position.set(0, 0.45, 0);
    group.add(light);
    return group;
  }

  static _createBiyonikKolMesh(def) {
    const group = new THREE.Group();
    // Kol ana gövdesi
    const armGeo = new THREE.CylinderGeometry(0.14, 0.18, 0.58, 12);
    armGeo.rotateZ(-0.4);
    const armMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.85,
      roughness: 0.25
    });
    const arm = new THREE.Mesh(armGeo, armMat);
    arm.position.set(-0.08, 0.38, 0);
    arm.add(this._createOutline(armGeo, 0x1e293b, 0.035));
    group.add(arm);

    // Eklemli el ve parmaklar
    const handGeo = new THREE.BoxGeometry(0.22, 0.24, 0.12);
    handGeo.rotateZ(-0.4);
    const hand = new THREE.Mesh(handGeo, armMat);
    hand.position.set(0.14, 0.62, 0);
    group.add(hand);

    // Mavi siber sinir hattı ışığı
    const light = new THREE.PointLight(0x06b6d4, 1.8, 2.0);
    light.position.set(0.05, 0.45, 0.15);
    group.add(light);
    return group;
  }

  static _createUsturlapMesh(def) {
    const group = new THREE.Group();
    // Altın kaide
    const baseGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.08, 16);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      metalness: 0.9,
      roughness: 0.2
    });
    const base = new THREE.Mesh(baseGeo, goldMat);
    base.position.y = 0.08;
    group.add(base);

    // İç gök küresi
    const sphereGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.3
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.y = 0.45;
    group.add(sphere);

    // 2 adet çapraz altın yörünge halkası
    const ringGeo = new THREE.TorusGeometry(0.42, 0.03, 10, 32);
    const ring1 = new THREE.Mesh(ringGeo, goldMat);
    ring1.position.y = 0.45;
    ring1.rotation.x = 0.6;
    group.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, goldMat);
    ring2.position.y = 0.45;
    ring2.rotation.y = 0.8;
    ring2.rotation.z = 0.5;
    group.add(ring2);

    const light = new THREE.PointLight(0xfacc15, 2.0, 2.2);
    light.position.set(0, 0.45, 0.1);
    group.add(light);
    return group;
  }

  static _createTeslaBobiniMesh(def) {
    const group = new THREE.Group();
    // Taban standı
    const baseGeo = new THREE.CylinderGeometry(0.32, 0.38, 0.12, 16);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.7,
      roughness: 0.3
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.08;
    base.add(this._createOutline(baseGeo, 0x0f172a, 0.035));
    group.add(base);

    // Bakır sarımlı sütun
    const colGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.48, 16);
    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      metalness: 0.85,
      roughness: 0.25
    });
    const col = new THREE.Mesh(colGeo, copperMat);
    col.position.y = 0.38;
    group.add(col);

    // Tepe küresi (Torus & Sphere)
    const orbGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.0,
      metalness: 0.9,
      roughness: 0.1
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.y = 0.68;
    group.add(orb);

    const light = new THREE.PointLight(0x38bdf8, 2.8, 3.0);
    light.position.set(0, 0.68, 0.1);
    group.add(light);
    return group;
  }

  static _createEnerjiKalkaniMesh(def) {
    const group = new THREE.Group();
    // Emitör tabanı
    const baseGeo = new THREE.CylinderGeometry(0.42, 0.46, 0.1, 20);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.1;
    base.add(this._createOutline(baseGeo, 0x0f172a, 0.035));
    group.add(base);

    // Heksagonal şeffaf kuvvet alanı kubbesi
    const domeGeo = new THREE.SphereGeometry(0.44, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      transmission: 0.85,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide
    });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.y = 0.15;
    group.add(dome);

    const light = new THREE.PointLight(0x22d3ee, 2.2, 2.5);
    light.position.set(0, 0.35, 0);
    group.add(light);
    return group;
  }

  static _createKuantumIslemciMesh(def) {
    const group = new THREE.Group();
    // Kare çip substratı
    const chipGeo = new THREE.BoxGeometry(0.68, 0.12, 0.68);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.2
    });
    const chip = new THREE.Mesh(chipGeo, chipMat);
    chip.position.y = 0.32;
    chip.add(this._createOutline(chipGeo, 0x0284c7, 0.035));
    group.add(chip);

    // Merkezde parlayan kristal çekirdek
    const coreGeo = new THREE.BoxGeometry(0.38, 0.16, 0.38);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0ea5e9,
      emissiveIntensity: 1.1
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = 0.34;
    group.add(core);

    // Dışarı uzanan metalik pinler
    const pinGeo = new THREE.BoxGeometry(0.78, 0.04, 0.78);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.95
    });
    const pins = new THREE.Mesh(pinGeo, pinMat);
    pins.position.y = 0.3;
    group.add(pins);

    const light = new THREE.PointLight(0x38bdf8, 2.4, 2.8);
    light.position.set(0, 0.42, 0.1);
    group.add(light);
    return group;
  }

  static _createMinyaturYildizMesh(def) {
    const group = new THREE.Group();
    // Dış manyetik muhafaza halkası / kafesi
    const ringGeo = new THREE.TorusGeometry(0.48, 0.04, 12, 32);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.9,
      roughness: 0.2
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.position.y = 0.45;
    group.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.position.y = 0.45;
    ring2.rotation.x = Math.PI / 2;
    group.add(ring2);

    // İçte alev alev parıldayan mikro süpernova çekirdeği
    const starGeo = new THREE.SphereGeometry(0.28, 20, 20);
    const starMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xef4444,
      emissiveIntensity: 1.6,
      roughness: 0.1
    });
    const star = new THREE.Mesh(starGeo, starMat);
    star.position.y = 0.45;
    group.add(star);

    const light = new THREE.PointLight(0xf97316, 3.2, 3.5);
    light.position.set(0, 0.45, 0.1);
    group.add(light);
    return group;
  }

  // ================= KATEGORİ 10: DOĞA & COĞRAFYA 3D MODELLERİ ================
  static _createDagMesh(def) {
    const group = new THREE.Group();
    // Dağ ana konisi (kaba tetra/koni)
    const mntGeo = new THREE.ConeGeometry(0.55, 0.75, 5);
    const mntMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.8,
      flatShading: true
    });
    const mnt = new THREE.Mesh(mntGeo, mntMat);
    mnt.position.y = 0.38;
    mnt.add(this._createOutline(mntGeo, 0x1e293b, 0.035));
    group.add(mnt);

    // Karlı zirve şapkası
    const snowGeo = new THREE.ConeGeometry(0.26, 0.32, 5);
    const snowMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.3,
      flatShading: true
    });
    const snow = new THREE.Mesh(snowGeo, snowMat);
    snow.position.y = 0.6;
    group.add(snow);

    return group;
  }

  static _createKayaMesh(def) {
    const group = new THREE.Group();
    // Düzensiz yontulmuş monolit kaya
    const rockGeo = new THREE.DodecahedronGeometry(0.48, 1);
    rockGeo.scale(1.0, 0.85, 0.9);
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x78716c,
      roughness: 0.85,
      flatShading: true
    });
    const rock = new THREE.Mesh(rockGeo, rockMat);
    rock.position.y = 0.38;
    rock.add(this._createOutline(rockGeo, 0x292524, 0.035));
    group.add(rock);

    // Üzerindeki yosun lekesi
    const mossGeo = new THREE.SphereGeometry(0.24, 8, 8);
    const mossMat = new THREE.MeshStandardMaterial({ color: 0x65a30d, roughness: 0.9 });
    const moss = new THREE.Mesh(mossGeo, mossMat);
    moss.position.set(0.18, 0.52, 0.2);
    group.add(moss);

    return group;
  }

  static _createGunesMesh(def) {
    const group = new THREE.Group();
    // Parlak sarı güneş küresi
    const sunGeo = new THREE.SphereGeometry(0.38, 18, 18);
    const sunMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xeab308,
      emissiveIntensity: 1.2,
      roughness: 0.1
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    sun.position.y = 0.45;
    sun.add(this._createOutline(sunGeo, 0xb45309, 0.035));
    group.add(sun);

    // Çevresindeki 8 adet ışın sivrisi
    const rayGeo = new THREE.ConeGeometry(0.08, 0.22, 6);
    const rayMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.8
    });
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const ray = new THREE.Mesh(rayGeo, rayMat);
      ray.position.set(Math.cos(angle) * 0.48, 0.45 + Math.sin(angle) * 0.48, 0);
      ray.rotation.z = angle - Math.PI / 2;
      group.add(ray);
    }

    const light = new THREE.PointLight(0xfde047, 2.8, 3.5);
    light.position.set(0, 0.45, 0.1);
    group.add(light);
    return group;
  }

  static _createOkyanusMesh(def) {
    const group = new THREE.Group();
    // Kıvrılan devasa turkuaz dalga
    const waveGeo = new THREE.TorusGeometry(0.42, 0.18, 12, 24, Math.PI * 1.25);
    const waveMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.4,
      roughness: 0.1,
      transmission: 0.6,
      transparent: true,
      opacity: 0.9
    });
    const wave = new THREE.Mesh(waveGeo, waveMat);
    wave.position.set(0, 0.42, 0);
    wave.rotation.z = -0.6;
    wave.add(this._createOutline(waveGeo, 0x0c4a6e, 0.035));
    group.add(wave);

    // Beyaz köpük tepesi
    const foamGeo = new THREE.SphereGeometry(0.14, 10, 10);
    const foamMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
    const foam = new THREE.Mesh(foamGeo, foamMat);
    foam.position.set(0.24, 0.65, 0);
    group.add(foam);

    return group;
  }

  static _createVolkanMesh(def) {
    const group = new THREE.Group();
    // Koni yanardağ
    const volcanoGeo = new THREE.CylinderGeometry(0.18, 0.58, 0.65, 12);
    const volcanoMat = new THREE.MeshStandardMaterial({
      color: 0x44403c,
      roughness: 0.85,
      flatShading: true
    });
    const volcano = new THREE.Mesh(volcanoGeo, volcanoMat);
    volcano.position.y = 0.35;
    volcano.add(this._createOutline(volcanoGeo, 0x1c1917, 0.035));
    group.add(volcano);

    // Kraterdeki kızgın lav havuzu
    const craterGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.05, 12);
    const lavaMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 1.4
    });
    const lava = new THREE.Mesh(craterGeo, lavaMat);
    lava.position.y = 0.68;
    group.add(lava);

    const light = new THREE.PointLight(0xf97316, 2.5, 2.5);
    light.position.set(0, 0.72, 0);
    group.add(light);
    return group;
  }

  static _createAdaMesh(def) {
    const group = new THREE.Group();
    // Turkuaz su halkası ve kumlu tepe
    const waterGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.06, 24);
    const waterMat = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      roughness: 0.1,
      transmission: 0.7,
      transparent: true,
      opacity: 0.85
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.y = 0.12;
    group.add(water);

    const sandGeo = new THREE.CylinderGeometry(0.38, 0.44, 0.14, 16);
    const sandMat = new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.7 });
    const sand = new THREE.Mesh(sandGeo, sandMat);
    sand.position.y = 0.2;
    group.add(sand);

    // Palmiye ağacı (gövde + yapraklar)
    const trunkGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.38, 8);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.set(0, 0.42, 0);
    group.add(trunk);

    const leafGeo = new THREE.ConeGeometry(0.24, 0.16, 6);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.6 });
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    leaf.position.set(0, 0.62, 0);
    group.add(leaf);

    return group;
  }

  static _createNehirMesh(def) {
    const group = new THREE.Group();
    // Yeşil çimen zemin
    const groundGeo = new THREE.BoxGeometry(0.72, 0.12, 0.72);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x65a30d, roughness: 0.8 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = 0.2;
    ground.add(this._createOutline(groundGeo, 0x365314, 0.035));
    group.add(ground);

    // Kıvrılarak geçen mavi nehir yatağı
    const riverGeo = new THREE.BoxGeometry(0.32, 0.14, 0.74);
    const riverMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
      roughness: 0.1,
      transmission: 0.6,
      transparent: true,
      opacity: 0.9
    });
    riverGeo.rotateY(0.4);
    const river = new THREE.Mesh(riverGeo, riverMat);
    river.position.y = 0.22;
    group.add(river);

    return group;
  }

  static _createOrmanMesh(def) {
    const group = new THREE.Group();
    // 3 adet yan yana çam ağacı
    const createTree = (x, z, scale) => {
      const treeGroup = new THREE.Group();
      const trunkGeo = new THREE.CylinderGeometry(0.04 * scale, 0.05 * scale, 0.25 * scale, 6);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c4033 });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 0.12 * scale;
      treeGroup.add(trunk);

      const foilGeo = new THREE.ConeGeometry(0.24 * scale, 0.45 * scale, 6);
      const foilMat = new THREE.MeshStandardMaterial({
        color: 0x15803d,
        roughness: 0.7,
        flatShading: true
      });
      const foil = new THREE.Mesh(foilGeo, foilMat);
      foil.position.y = 0.38 * scale;
      foil.add(this._createOutline(foilGeo, 0x14532d, 0.035));
      treeGroup.add(foil);

      treeGroup.position.set(x, 0.1, z);
      return treeGroup;
    };

    group.add(createTree(0, 0, 1.2));
    group.add(createTree(-0.25, 0.05, 0.9));
    group.add(createTree(0.25, -0.05, 0.95));

    return group;
  }

  static _createFirtinaBulutuMesh(def) {
    const group = new THREE.Group();
    // Koyu gri bulut gövdesi
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.8,
      flatShading: true
    });
    const c1 = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 10), cloudMat);
    c1.position.set(0, 0.48, 0);
    group.add(c1);

    const c2 = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), cloudMat);
    c2.position.set(-0.24, 0.42, 0);
    group.add(c2);

    const c3 = new THREE.Mesh(new THREE.SphereGeometry(0.24, 8, 8), cloudMat);
    c3.position.set(0.24, 0.44, 0);
    group.add(c3);

    // Aşağı sarkan sarı şimşek oku
    const boltGeo = new THREE.ConeGeometry(0.08, 0.32, 4);
    const boltMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xeab308,
      emissiveIntensity: 1.4
    });
    const bolt = new THREE.Mesh(boltGeo, boltMat);
    bolt.position.set(0, 0.16, 0.05);
    bolt.rotation.z = Math.PI;
    group.add(bolt);

    const light = new THREE.PointLight(0xfef08a, 2.4, 2.5);
    light.position.set(0, 0.2, 0.1);
    group.add(light);
    return group;
  }

  static _createMagaraMesh(def) {
    const group = new THREE.Group();
    // Dış kaya kemeri
    const archGeo = new THREE.TorusGeometry(0.38, 0.16, 10, 16, Math.PI);
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.9,
      flatShading: true
    });
    const arch = new THREE.Mesh(archGeo, rockMat);
    arch.position.y = 0.28;
    arch.add(this._createOutline(archGeo, 0x1e293b, 0.035));
    group.add(arch);

    // İçteki zifiri karanlık boşluk
    const holeGeo = new THREE.CircleGeometry(0.32, 16);
    const holeMat = new THREE.MeshBasicMaterial({ color: 0x09090b, side: THREE.DoubleSide });
    const hole = new THREE.Mesh(holeGeo, holeMat);
    hole.position.set(0, 0.28, -0.02);
    group.add(hole);

    return group;
  }

  static _createGokkusagiMesh(def) {
    const group = new THREE.Group();
    // Renkli gökkuşağı yay halkası
    const rainbowGeo = new THREE.TorusGeometry(0.48, 0.08, 10, 24, Math.PI);
    const rainbowMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.7,
      roughness: 0.2
    });
    const rainbow = new THREE.Mesh(rainbowGeo, rainbowMat);
    rainbow.position.y = 0.26;
    rainbow.add(this._createOutline(rainbowGeo, 0x831843, 0.03));
    group.add(rainbow);

    // İki uçtaki beyaz puf bulutlar
    const cloudMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 });
    const cLeft = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), cloudMat);
    cLeft.position.set(-0.48, 0.26, 0);
    group.add(cLeft);

    const cRight = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), cloudMat);
    cRight.position.set(0.48, 0.26, 0);
    group.add(cRight);

    const light = new THREE.PointLight(0xf472b6, 2.0, 2.5);
    light.position.set(0, 0.45, 0.1);
    group.add(light);
    return group;
  }

  static _createKanyonMesh(def) {
    const group = new THREE.Group();
    // İki tarafı dik kızıl kaya bloğu
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x9a3412,
      roughness: 0.85,
      flatShading: true
    });
    const wallGeo = new THREE.BoxGeometry(0.28, 0.65, 0.6);
    const leftWall = new THREE.Mesh(wallGeo, rockMat);
    leftWall.position.set(-0.25, 0.38, 0);
    leftWall.add(this._createOutline(wallGeo, 0x431407, 0.035));
    group.add(leftWall);

    const rightWall = new THREE.Mesh(wallGeo, rockMat);
    rightWall.position.set(0.25, 0.38, 0);
    rightWall.add(this._createOutline(wallGeo, 0x431407, 0.035));
    group.add(rightWall);

    return group;
  }

  static _createFayHattiMesh(def) {
    const group = new THREE.Group();
    // İkiye ayrılmış çatlak zemin
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x57534e,
      roughness: 0.9,
      flatShading: true
    });
    const p1Geo = new THREE.BoxGeometry(0.34, 0.15, 0.68);
    const p1 = new THREE.Mesh(p1Geo, groundMat);
    p1.position.set(-0.2, 0.25, 0);
    p1.rotation.y = 0.15;
    p1.add(this._createOutline(p1Geo, 0x1c1917, 0.035));
    group.add(p1);

    const p2Geo = new THREE.BoxGeometry(0.34, 0.15, 0.68);
    const p2 = new THREE.Mesh(p2Geo, groundMat);
    p2.position.set(0.2, 0.25, 0);
    p2.rotation.y = -0.15;
    p2.add(this._createOutline(p2Geo, 0x1c1917, 0.035));
    group.add(p2);

    return group;
  }

  static _createBulutMesh(def) {
    const group = new THREE.Group();
    // Pamuksu beyaz bulut kümeleri
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      flatShading: true
    });
    const c1 = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), cloudMat);
    c1.position.set(0, 0.42, 0);
    group.add(c1);

    const c2 = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 10), cloudMat);
    c2.position.set(-0.24, 0.38, 0);
    group.add(c2);

    const c3 = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 10), cloudMat);
    c3.position.set(0.24, 0.4, 0);
    group.add(c3);

    return group;
  }

  // ================= KATEGORİ 3 & 2: CANLILAR, FAUNA & DOĞA 3D MODELLERİ ================
  static _createAtMesh(def) {
    const group = new THREE.Group();
    // Gövde ve bacaklar
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.7 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.32, 0.28), bodyMat);
    body.position.set(0, 0.38, 0);
    body.add(this._createOutline(new THREE.BoxGeometry(0.5, 0.32, 0.28), 0x451a03, 0.035));
    group.add(body);

    // Boyun ve kafa
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.28, 0.2), bodyMat);
    head.position.set(0.28, 0.58, 0);
    group.add(head);

    // Yele ve kuyruk
    const maneMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.8 });
    const mane = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.32, 0.08), maneMat);
    mane.position.set(0.2, 0.62, 0);
    group.add(mane);

    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.02, 0.3, 6), maneMat);
    tail.position.set(-0.28, 0.32, 0);
    tail.rotation.z = 0.5;
    group.add(tail);

    return group;
  }

  static _createKoyunMesh(def) {
    const group = new THREE.Group();
    // Kabarık beyaz yün gövde
    const woolMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.9, flatShading: true });
    const wool = new THREE.Mesh(new THREE.DodecahedronGeometry(0.38, 1), woolMat);
    wool.position.set(0, 0.38, 0);
    wool.add(this._createOutline(new THREE.DodecahedronGeometry(0.38, 1), 0x94a3b8, 0.035));
    group.add(wool);

    // Sevimli siyah/bej kafa
    const faceMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6 });
    const face = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), faceMat);
    face.position.set(0.32, 0.42, 0);
    group.add(face);

    return group;
  }

  static _createKurtMesh(def) {
    const group = new THREE.Group();
    // Vahşi gri gövde
    const furMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8, flatShading: true });
    const body = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.6, 6), furMat);
    body.position.set(0, 0.36, 0);
    body.rotation.z = -0.4;
    body.add(this._createOutline(new THREE.ConeGeometry(0.32, 0.6, 6), 0x1e293b, 0.035));
    group.add(body);

    // Uluyan kafa
    const head = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.35, 5), furMat);
    head.position.set(0.18, 0.62, 0);
    head.rotation.z = -1.1;
    group.add(head);

    return group;
  }

  static _createAriMesh(def) {
    const group = new THREE.Group();
    // Sarı-siyah çizgili arı gövdesi
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.3 });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.28, 8, 12), bodyMat);
    body.position.set(0, 0.4, 0);
    body.rotation.z = Math.PI / 4;
    body.add(this._createOutline(new THREE.CapsuleGeometry(0.2, 0.28, 8, 12), 0x713f12, 0.035));
    group.add(body);

    // Şeffaf kanatlar
    const wingMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.8,
      transparent: true,
      opacity: 0.7
    });
    const wingGeo = new THREE.CircleGeometry(0.18, 10);
    const leftWing = new THREE.Mesh(wingGeo, wingMat);
    leftWing.position.set(-0.06, 0.58, 0.14);
    leftWing.rotation.x = -0.6;
    group.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeo, wingMat);
    rightWing.position.set(-0.06, 0.58, -0.14);
    rightWing.rotation.x = 0.6;
    group.add(rightWing);

    return group;
  }

  static _createYilanMesh(def) {
    const group = new THREE.Group();
    // Kıvrılmış yeşil yılan sarmalı
    const snakeMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.5 });
    const coilGeo = new THREE.TorusGeometry(0.34, 0.1, 10, 24);
    coilGeo.rotateX(Math.PI / 2);
    const coil = new THREE.Mesh(coilGeo, snakeMat);
    coil.position.y = 0.22;
    coil.add(this._createOutline(coilGeo, 0x14532d, 0.035));
    group.add(coil);

    // Dikilen kafa
    const head = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.26, 8), snakeMat);
    head.position.set(0.18, 0.45, 0.12);
    head.rotation.x = -0.3;
    group.add(head);

    return group;
  }

  static _createBaykusMesh(def) {
    const group = new THREE.Group();
    // Kahverengi tüylü gövde
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 12), bodyMat);
    body.scale.set(0.9, 1.2, 0.85);
    body.position.y = 0.42;
    body.add(this._createOutline(new THREE.SphereGeometry(0.32, 12, 12), 0x451a03, 0.035));
    group.add(body);

    // Kocaman parlak sarı gözler
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const leftEye = new THREE.Mesh(new THREE.CircleGeometry(0.09, 10), eyeMat);
    leftEye.position.set(0.12, 0.54, 0.28);
    group.add(leftEye);

    const rightEye = new THREE.Mesh(new THREE.CircleGeometry(0.09, 10), eyeMat);
    rightEye.position.set(-0.12, 0.54, 0.28);
    group.add(rightEye);

    return group;
  }

  static _createKaplumbagaMesh(def) {
    const group = new THREE.Group();
    // Sert kubbe kabuk
    const shellMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.8, flatShading: true });
    const shellGeo = new THREE.SphereGeometry(0.36, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    const shell = new THREE.Mesh(shellGeo, shellMat);
    shell.position.y = 0.22;
    shell.add(this._createOutline(shellGeo, 0x3f2005, 0.035));
    group.add(shell);

    // Yeşil kafa ve yüzgeçler
    const skinMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.6 });
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), skinMat);
    head.position.set(0.38, 0.26, 0);
    group.add(head);

    return group;
  }

  static _createBalMesh(def) {
    const group = new THREE.Group();
    // Kil bal çömleği
    const potMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.7 });
    const pot = new THREE.Mesh(new THREE.SphereGeometry(0.36, 14, 14), potMat);
    pot.position.y = 0.36;
    pot.add(this._createOutline(new THREE.SphereGeometry(0.36, 14, 14), 0x78350f, 0.035));
    group.add(pot);

    // Ağzından taşan amber rengi bal damlası
    const honeyMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      transmission: 0.7,
      transparent: true,
      opacity: 0.9
    });
    const honey = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.08, 12), honeyMat);
    honey.position.y = 0.68;
    group.add(honey);

    const light = new THREE.PointLight(0xfde047, 2.0, 2.0);
    light.position.set(0, 0.68, 0.1);
    group.add(light);
    return group;
  }

  static _createNiluferMesh(def) {
    const group = new THREE.Group();
    // Yeşil nilüfer yaprağı tabanı
    const padMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.04, 16), padMat);
    pad.position.y = 0.12;
    group.add(pad);

    // Pembe çiçek taç yaprakları
    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xdb2777,
      emissiveIntensity: 0.5,
      roughness: 0.3
    });
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const petal = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.34, 5), petalMat);
      petal.position.set(Math.cos(angle) * 0.18, 0.28, Math.sin(angle) * 0.18);
      petal.rotation.z = Math.cos(angle) * 0.4;
      petal.rotation.x = Math.sin(angle) * -0.4;
      group.add(petal);
    }

    return group;
  }

  static _createElmaMesh(def) {
    const group = new THREE.Group();
    // Kırmızı parlak elma
    const appleMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      emissive: 0x991b1b,
      emissiveIntensity: 0.3,
      roughness: 0.2
    });
    const apple = new THREE.Mesh(new THREE.SphereGeometry(0.36, 16, 16), appleMat);
    apple.scale.set(1.0, 0.92, 1.0);
    apple.position.y = 0.38;
    apple.add(this._createOutline(new THREE.SphereGeometry(0.36, 16, 16), 0x7f1d1d, 0.035));
    group.add(apple);

    // Sap ve yeşil yaprak
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x451a03 });
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.16, 6), stemMat);
    stem.position.set(0, 0.72, 0);
    group.add(stem);

    const leafMat = new THREE.MeshStandardMaterial({ color: 0x22c55e });
    const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.18, 4), leafMat);
    leaf.position.set(0.08, 0.74, 0);
    leaf.rotation.z = -1.0;
    group.add(leaf);

    return group;
  }

  static _createKurbagaMesh(def) {
    const group = new THREE.Group();
    // Yeşil göbekli sevimli kurbağa
    const frogMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.6 });
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 12), frogMat);
    body.scale.set(1.0, 0.8, 0.9);
    body.position.y = 0.3;
    body.add(this._createOutline(new THREE.SphereGeometry(0.32, 12, 12), 0x14532d, 0.035));
    group.add(body);

    // Tepe gözleri
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), frogMat);
    leftEye.position.set(0.16, 0.54, 0.12);
    group.add(leftEye);

    const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), frogMat);
    rightEye.position.set(-0.16, 0.54, 0.12);
    group.add(rightEye);

    return group;
  }

  static _createSincapMesh(def) {
    const group = new THREE.Group();
    // Oturan sincap ve devasa kıvrık kuyruk
    const furMat = new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.8 });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.25, 8, 12), furMat);
    body.position.set(0, 0.34, 0);
    body.add(this._createOutline(new THREE.CapsuleGeometry(0.18, 0.25, 8, 12), 0x713f12, 0.035));
    group.add(body);

    // Arkadaki kabarık kuyruk
    const tail = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.12, 10, 16, Math.PI * 1.2), furMat);
    tail.position.set(-0.16, 0.44, 0);
    tail.rotation.z = -0.8;
    group.add(tail);

    // Elindeki palamut
    const nutMat = new THREE.MeshStandardMaterial({ color: 0x451a03 });
    const nut = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 6), nutMat);
    nut.position.set(0.16, 0.36, 0);
    group.add(nut);

    return group;
  }

  static _createGeyikMesh(def) {
    const group = new THREE.Group();
    // Heybetli geyik gövdesi
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.7 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.32, 0.26), bodyMat);
    body.position.set(0, 0.4, 0);
    body.add(this._createOutline(new THREE.BoxGeometry(0.48, 0.32, 0.26), 0x451a03, 0.035));
    group.add(body);

    // Zarif kafa ve boynuzlar
    const head = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.3, 6), bodyMat);
    head.position.set(0.26, 0.62, 0);
    head.rotation.z = -0.5;
    group.add(head);

    // Çatallı boynuzlar
    const hornMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.6 });
    const leftHorn = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.35, 6), hornMat);
    leftHorn.position.set(0.24, 0.82, 0.08);
    leftHorn.rotation.z = 0.3;
    group.add(leftHorn);

    const rightHorn = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.35, 6), hornMat);
    rightHorn.position.set(0.24, 0.82, -0.08);
    rightHorn.rotation.z = 0.3;
    group.add(rightHorn);

    return group;
  }

  static _createKelebekMesh(def) {
    const group = new THREE.Group();
    // İnce gövde
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.45, 6), bodyMat);
    body.position.y = 0.42;
    group.add(body);

    // Rengarenk kanatlar (Mavi & Turuncu)
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0xf97316,
      emissiveIntensity: 0.5,
      side: THREE.DoubleSide
    });
    const wingGeo = new THREE.CircleGeometry(0.26, 12);
    const leftWing = new THREE.Mesh(wingGeo, wingMat);
    leftWing.position.set(0.22, 0.46, 0);
    leftWing.rotation.y = 0.3;
    leftWing.add(this._createOutline(wingGeo, 0x1d4ed8, 0.035));
    group.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeo, wingMat);
    rightWing.position.set(-0.22, 0.46, 0);
    rightWing.rotation.y = -0.3;
    rightWing.add(this._createOutline(wingGeo, 0x1d4ed8, 0.035));
    group.add(rightWing);

    const light = new THREE.PointLight(0x60a5fa, 2.0, 2.2);
    light.position.set(0, 0.45, 0.1);
    group.add(light);
    return group;
  }
}



