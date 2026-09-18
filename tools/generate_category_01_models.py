import os
import math
from pathlib import Path
from build123d import *

OUTPUT_DIR = Path('d:/github/birlestirme_oyunu/public/models/01_elements')
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def save_model(name, shape):
    out_path = OUTPUT_DIR / f'{name}.glb'
    export_gltf(shape, str(out_path), binary=True)
    print(f'[OK] Generated: {out_path.name}')

print('--- Starting Category 01 3D Model Generation ---')

# ==============================================================================
# 1. ATEŞ (Fire)
# ==============================================================================
with BuildSketch(Plane.XZ) as flame_sketch:
    with BuildLine():
        p0 = (0, 36)
        p1 = (3, 28)
        p2 = (11, 14)
        p3 = (8, 4)
        p4 = (0, 0.5)
        Spline(p0, p1, p2, p3, p4)
        Line(p4, p0)
    make_face()

flame_core = revolve(flame_sketch.sketch, axis=Axis.Z)
flame_core.color = Color(1.0, 0.45, 0.1, 0.95)

# Side flame tongues
with BuildSketch(Plane.XZ) as flame_s1:
    with BuildLine():
        p0 = (0, 24)
        p1 = (2, 18)
        p2 = (7.5, 9)
        p3 = (5, 3)
        p4 = (0, 0.5)
        Spline(p0, p1, p2, p3, p4)
        Line(p4, p0)
    make_face()
flame_t1 = Pos(4, 2, 8) * Rot(15, 10, 20) * revolve(flame_s1.sketch, axis=Axis.Z)
flame_t1.color = Color(0.95, 0.20, 0.10, 0.90)

flame_t2 = Pos(-3, -2, 6) * Rot(-20, -15, -30) * scale(flame_core, by=0.55)
flame_t2.color = Color(1.0, 0.70, 0.10, 0.95)

embers = [
    Pos(6, 5, 4) * Sphere(1.4),
    Pos(-5, 4, 3) * Sphere(1.2),
    Pos(0, -6, 2) * Sphere(1.5),
]
for em in embers:
    em.color = Color(0.8, 0.1, 0.1, 0.9)

save_model('ates', Compound(children=[flame_core, flame_t1, flame_t2] + embers))

# ==============================================================================
# 2. SU (Water)
# ==============================================================================
with BuildSketch(Plane.XZ) as water_sketch:
    with BuildLine():
        p0 = (0, 35)
        p1 = (2.5, 26)
        p2 = (12.5, 12)
        p3 = (8.5, 3)
        p4 = (0, 0.5)
        Spline(p0, p1, p2, p3, p4)
        Line(p4, p0)
    make_face()

water_drop = revolve(water_sketch.sketch, axis=Axis.Z)
water_drop.color = Color(0.00, 0.75, 1.00, 0.85)

water_ring1 = Pos(0, 0, 14) * Rot(22, -14, 25) * Torus(major_radius=18, minor_radius=1.8)
water_ring1.color = Color(0.44, 1.00, 0.90, 0.90)

water_ring2 = Pos(0, 0, 9) * Rot(-16, 20, -20) * Torus(major_radius=24, minor_radius=1.5)
water_ring2.color = Color(0.85, 0.95, 1.00, 0.90)

water_beads = [
    Pos(14, 10, 20) * Sphere(1.8),
    Pos(-16, -9, 12) * Sphere(1.5),
    Pos(6, -18, 8) * Sphere(1.3),
]
for wb in water_beads:
    wb.color = Color(0.95, 0.98, 1.00, 0.95)

save_model('su', Compound(children=[water_drop, water_ring1, water_ring2] + water_beads))

# ==============================================================================
# 3. TOPRAK (Earth)
# ==============================================================================
toprak_parts = []
crystals_data = [
    (0, 0, 0, 8.0, 32.0, Color(0.55, 0.32, 0.08)),
    (-7, -4, 0, 6.0, 24.0, Color(0.63, 0.38, 0.12)),
    (6, -5, 0, 5.5, 21.0, Color(0.48, 0.28, 0.06)),
    (5, 6, 0, 6.5, 26.0, Color(0.68, 0.42, 0.14)),
    (-6, 5, 0, 5.0, 18.0, Color(0.52, 0.30, 0.07)),
]
for cx, cy, cz, cr, ch, ccol in crystals_data:
    hex_p = Pos(cx, cy, ch/2) * RegularPolygon(radius=cr, side_count=6)
    c_prism = Pos(cx, cy, 0) * extrude(hex_p, amount=ch)
    c_prism.color = ccol
    toprak_parts.append(c_prism)

base_rock = Pos(0, 0, 1.5) * Cylinder(radius=20, height=3.0)
base_rock.color = Color(0.38, 0.22, 0.06)
toprak_parts.append(base_rock)

save_model('toprak', Compound(children=toprak_parts))

# ==============================================================================
# 4. HAVA (Air)
# ==============================================================================
with BuildSketch(Plane.XZ) as air_sketch:
    with BuildLine():
        p0 = (1.5, 2.0)
        p1 = (3.5, 9.0)
        p2 = (8.0, 19.0)
        p3 = (14.0, 29.0)
        p4 = (17.0, 36.0)
        p5 = (13.0, 36.0)
        p6 = (9.0, 27.0)
        p7 = (4.0, 15.0)
        p8 = (1.0, 4.0)
        Spline(p0, p1, p2, p3, p4)
        Line(p4, p5)
        Spline(p5, p6, p7, p8)
        Line(p8, p0)
    make_face()

vortex = revolve(air_sketch.sketch, axis=Axis.Z)
vortex.color = Color(0.88, 0.97, 0.98, 0.70)

air_core = Pos(0, 0, 14) * Sphere(radius=5.0)
air_core.color = Color(0.00, 1.00, 0.64, 0.95)

air_ring1 = Pos(0, 0, 12) * Rot(20, -15, 30) * Torus(major_radius=13, minor_radius=1.8)
air_ring1.color = Color(0.00, 0.90, 1.00, 0.88)

air_ring2 = Pos(0, 0, 24) * Rot(-22, 18, -35) * Torus(major_radius=21, minor_radius=1.9)
air_ring2.color = Color(0.00, 0.90, 1.00, 0.85)

air_pearls = [
    Pos(13, 10, 16) * Sphere(1.7),
    Pos(-15, -8, 26) * Sphere(1.9),
]
for ap in air_pearls:
    ap.color = Color(1.0, 1.0, 1.0, 0.98)

save_model('hava', Compound(children=[vortex, air_core, air_ring1, air_ring2] + air_pearls))

# ==============================================================================
# 5. ÇAMUR (Mud)
# ==============================================================================
mud_base = Pos(0, 0, 2.0) * Cylinder(radius=19, height=4.0)
mud_base.color = Color(0.40, 0.45, 0.52)

with BuildSketch(Plane.XZ) as mud_sketch:
    with BuildLine():
        m0 = (0, 28)
        m1 = (4, 22)
        m2 = (14, 10)
        m3 = (10, 3)
        m4 = (0, 0.5)
        Spline(m0, m1, m2, m3, m4)
        Line(m4, m0)
    make_face()

mud_drop = revolve(mud_sketch.sketch, axis=Axis.Z)
mud_drop.color = Color(0.48, 0.52, 0.60)

mud_bubbles = [
    Pos(6, 5, 8) * Sphere(2.8),
    Pos(-7, 4, 6) * Sphere(2.4),
    Pos(3, -7, 5) * Sphere(2.2),
]
for mb in mud_bubbles:
    mb.color = Color(0.58, 0.64, 0.72)

save_model('camur', Compound(children=[mud_base, mud_drop] + mud_bubbles))

# ==============================================================================
# 6. LAV (Lava)
# ==============================================================================
lava_core = Pos(0, 0, 16) * Sphere(radius=12.0)
lava_core.color = Color(1.00, 0.35, 0.05, 0.98)

lava_ring = Pos(0, 0, 16) * Rot(25, -15, 20) * Torus(major_radius=18, minor_radius=2.2)
lava_ring.color = Color(0.95, 0.15, 0.05, 0.90)

crust_plates = [
    Pos(0, -10.5, 17) * Box(7.0, 2.0, 6.0),
    Pos(9.0, 4.5, 18) * Box(2.0, 6.5, 5.5),
    Pos(-8.5, 5.0, 16) * Box(2.0, 6.0, 6.0),
    Pos(0, 0, 27) * Box(6.0, 6.0, 2.0),
]
for cp in crust_plates:
    cp.color = Color(0.20, 0.12, 0.12)

save_model('lav', Compound(children=[lava_core, lava_ring] + crust_plates))

# ==============================================================================
# 7. BUHAR (Steam)
# ==============================================================================
steam_puffs = [
    Pos(0, 0, 8) * Sphere(6.5),
    Pos(-4, 3, 15) * Sphere(7.5),
    Pos(4, -2, 22) * Sphere(8.0),
    Pos(-2, -3, 30) * Sphere(6.8),
]
for i, sp in enumerate(steam_puffs):
    sp.color = Color(0.88, 0.92, 0.96, 0.70 + i * 0.05)

steam_ring = Pos(0, 0, 18) * Rot(15, 20, 10) * Torus(major_radius=15, minor_radius=2.0)
steam_ring.color = Color(0.95, 0.98, 1.00, 0.80)

save_model('buhar', Compound(children=steam_puffs + [steam_ring]))

# ==============================================================================
# 8. YAĞMUR (Rain)
# ==============================================================================
rain_cloud = Pos(0, 0, 25) * Box(24, 14, 7)
rain_cloud.color = Color(0.35, 0.45, 0.55, 0.92)

rain_cloud_puffs = [
    Pos(-8, 0, 26) * Sphere(5.0),
    Pos(0, 0, 28) * Sphere(6.0),
    Pos(8, 0, 26) * Sphere(5.0),
]
for rcp in rain_cloud_puffs:
    rcp.color = Color(0.40, 0.50, 0.62)

rain_drops = []
drop_positions = [
    (-6, -2, 14), (0, 3, 12), (6, -2, 15),
    (-4, 2, 7), (4, 1, 8), (0, -3, 6)
]
for dx, dy, dz in drop_positions:
    d = Pos(dx, dy, dz) * Cylinder(radius=0.9, height=4.5)
    d.color = Color(0.20, 0.70, 0.98, 0.90)
    rain_drops.append(d)

save_model('yagmur', Compound(children=[rain_cloud] + rain_cloud_puffs + rain_drops))

# ==============================================================================
# 9. ENERJİ (Energy)
# ==============================================================================
energy_core = Pos(0, 0, 16) * Sphere(radius=7.5)
energy_core.color = Color(1.00, 0.90, 0.20, 0.98)

energy_ring1 = Pos(0, 0, 16) * Rot(45, 0, 30) * Torus(major_radius=16, minor_radius=1.8)
energy_ring1.color = Color(0.92, 0.70, 0.05)

energy_ring2 = Pos(0, 0, 16) * Rot(-45, 30, -30) * Torus(major_radius=16, minor_radius=1.8)
energy_ring2.color = Color(0.98, 0.82, 0.15)

energy_ring3 = Pos(0, 0, 16) * Rot(0, 75, 60) * Torus(major_radius=16, minor_radius=1.8)
energy_ring3.color = Color(1.00, 0.95, 0.35)

save_model('enerji', Compound(children=[energy_core, energy_ring1, energy_ring2, energy_ring3]))

# ==============================================================================
# 10. RÜZGÂR (Wind)
# ==============================================================================
wind_ribbons = [
    Pos(0, 0, 8) * Rot(25, -15, 45) * Torus(major_radius=12, minor_radius=1.6),
    Pos(0, 0, 18) * Rot(-20, 30, -40) * Torus(major_radius=18, minor_radius=1.9),
    Pos(0, 0, 28) * Rot(35, -20, 60) * Torus(major_radius=22, minor_radius=1.6),
]
for i, wr in enumerate(wind_ribbons):
    wr.color = Color(0.22, 0.74, 0.97, 0.85)

wind_whirl = Pos(0, 0, 18) * Sphere(radius=4.5)
wind_whirl.color = Color(0.65, 0.92, 1.00, 0.90)

save_model('ruzgar', Compound(children=wind_ribbons + [wind_whirl]))

# ==============================================================================
# 11. BUZ (Ice)
# ==============================================================================
ice_spires = []
ice_data = [
    (0, 0, 0, 6.0, 32.0, Color(0.02, 0.71, 0.83, 0.88)),
    (-6, -3, 0, 4.5, 22.0, Color(0.40, 0.91, 0.98, 0.85)),
    (5, -4, 0, 4.0, 18.0, Color(0.20, 0.80, 0.92, 0.85)),
    (4, 5, 0, 5.0, 25.0, Color(0.05, 0.75, 0.88, 0.85)),
    (-4, 5, 0, 3.8, 16.0, Color(0.50, 0.95, 1.00, 0.85)),
]
for ix, iy, iz, ir, ih, icol in ice_data:
    poly = Pos(ix, iy, ih/2) * RegularPolygon(radius=ir, side_count=4)
    spire = Pos(ix, iy, 0) * extrude(poly, amount=ih)
    spire.color = icol
    ice_spires.append(spire)

save_model('buz', Compound(children=ice_spires))

# ==============================================================================
# 12. YILDIRIM (Lightning)
# ==============================================================================
bolt_parts = []
bolt_core = Pos(0, 0, 16) * Sphere(radius=6.0)
bolt_core.color = Color(1.00, 0.95, 0.40, 0.98)
bolt_parts.append(bolt_core)

z_segments = [
    (0, 0, 32, 2.0, 2.0, 8.0, 25),
    (2, 0, 25, 2.0, 2.0, 8.0, -35),
    (-1, 0, 18, 2.0, 2.0, 8.0, 30),
    (1, 0, 10, 2.0, 2.0, 8.0, -25),
    (-1, 0, 3, 2.0, 2.0, 8.0, 15),
]
for bx, by, bz, bw, bd, bh, bang in z_segments:
    seg = Pos(bx, by, bz) * Rot(0, bang, 0) * Box(bw, bd, bh)
    seg.color = Color(0.98, 0.75, 0.14)
    bolt_parts.append(seg)

save_model('yildirim', Compound(children=bolt_parts))

# ==============================================================================
# 13. BULUT (Cloud)
# ==============================================================================
cloud_spheres = [
    (0, 0, 14, 9.0),
    (-8, -2, 12, 7.5),
    (8, -1, 12, 7.5),
    (-4, 5, 14, 7.0),
    (5, 5, 14, 7.0),
    (0, 2, 21, 7.0),
]
cloud_parts = []
for cx, cy, cz, cr in cloud_spheres:
    cs = Pos(cx, cy, cz) * Sphere(radius=cr)
    cs.color = Color(0.97, 0.98, 1.00)
    cloud_parts.append(cs)

save_model('bulut', Compound(children=cloud_parts))

# ==============================================================================
# 14. FIRTINA (Storm)
# ==============================================================================
storm_funnel = Pos(0, 0, 16) * Cylinder(radius=18, height=12)
storm_funnel.color = Color(0.28, 0.33, 0.41, 0.92)

storm_cloud1 = Pos(-5, 0, 24) * Sphere(8.0)
storm_cloud1.color = Color(0.22, 0.26, 0.33)

storm_cloud2 = Pos(5, 0, 24) * Sphere(8.0)
storm_cloud2.color = Color(0.22, 0.26, 0.33)

storm_spark = Pos(0, 0, 16) * Box(2.5, 2.5, 16)
storm_spark.color = Color(0.98, 0.80, 0.08)

save_model('firtina', Compound(children=[storm_funnel, storm_cloud1, storm_cloud2, storm_spark]))

print('--- All Category 01 Models Successfully Generated! ---')
