import math
import struct
import wave
import random

SAMPLE_RATE = 44100
DURATION = 48.0  # 48 saniyelik döngü (seamless loop)
NUM_SAMPLES = int(SAMPLE_RATE * DURATION)

# Müzikal frekans tablosu (Valheim D Dorian / D Minor & Celtic pastoral acoustic vibe)
NOTE_FREQS = {
    'D2': 73.42, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'C3': 130.81,
    'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94, 'C4': 261.63,
    'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25,
    'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'A5': 880.00
}

left_channel = [0.0] * NUM_SAMPLES
right_channel = [0.0] * NUM_SAMPLES

def add_pad_chord(start_sec, dur_sec, chord_notes, vol=0.10):
    start_sample = int(start_sec * SAMPLE_RATE)
    num_s = int(dur_sec * SAMPLE_RATE)
    for note in chord_notes:
        base_freq = NOTE_FREQS[note]
        pan = random.uniform(0.35, 0.65)
        for i in range(num_s):
            idx = (start_sample + i) % NUM_SAMPLES
            t = i / SAMPLE_RATE
            # Yumuşak kabuk (Attack: 2.5s, Release: 3.0s)
            att = min(1.0, t / 2.5)
            rel = min(1.0, (dur_sec - t) / 3.0)
            env = att * rel
            
            # Zengin analog sıcaklığı: Çift detuned sine + hafif testere ve koro vibrato
            detune = math.sin(2 * math.pi * 0.18 * t) * 0.4
            vib = math.sin(2 * math.pi * 4.2 * t) * 0.25
            
            s1 = math.sin(2 * math.pi * (base_freq + detune) * t)
            s2 = math.sin(2 * math.pi * (base_freq * 2.002 + vib) * t) * 0.28
            s3 = math.sin(2 * math.pi * (base_freq * 0.5) * t) * 0.35
            s4 = math.sin(2 * math.pi * (base_freq * 3.0) * t) * 0.08
            
            sig = (s1 + s2 + s3 + s4) * env * vol
            left_channel[idx] += sig * (1.0 - pan)
            right_channel[idx] += sig * pan

def add_pluck(start_sec, note, vol=0.18, pan=0.5):
    """Akustik lavta / arp tınısı (Karplus-Strong benzeri zengin harmonikler ve hızlı sönümleme)"""
    start_sample = int(start_sec * SAMPLE_RATE)
    base_freq = NOTE_FREQS[note]
    dur = 4.2
    num_s = int(dur * SAMPLE_RATE)
    
    for i in range(num_s):
        idx = (start_sample + i) % NUM_SAMPLES
        t = i / SAMPLE_RATE
        
        att = min(1.0, t / 0.006)
        decay = math.exp(-3.2 * t)
        env = att * decay
        if env < 0.0001:
            break
            
        h1 = math.sin(2 * math.pi * base_freq * t)
        h2 = math.sin(2 * math.pi * (base_freq * 2.0) * t) * 0.52 * math.exp(-4.5 * t)
        h3 = math.sin(2 * math.pi * (base_freq * 3.0) * t) * 0.32 * math.exp(-6.0 * t)
        h4 = math.sin(2 * math.pi * (base_freq * 4.0) * t) * 0.16 * math.exp(-8.0 * t)
        click = (random.random() - 0.5) * 0.12 * math.exp(-50.0 * t)
        
        sig = (h1 + h2 + h3 + h4 + click) * env * vol
        
        left_channel[idx] += sig * (1.0 - pan)
        right_channel[idx] += sig * pan
        
        # 280ms stereo gecikme (delay)
        echo_idx = (idx + int(0.28 * SAMPLE_RATE)) % NUM_SAMPLES
        left_channel[echo_idx] += sig * 0.22 * pan
        right_channel[echo_idx] += sig * 0.22 * (1.0 - pan)

def add_flute(start_sec, dur_sec, note, vol=0.09, pan=0.52):
    """İskandinav tahta flütü ezgisi (hafif nefes gürültüsü ve lirik vibrato)"""
    start_sample = int(start_sec * SAMPLE_RATE)
    base_freq = NOTE_FREQS[note]
    num_s = int(dur_sec * SAMPLE_RATE)
    
    for i in range(num_s):
        idx = (start_sample + i) % NUM_SAMPLES
        t = i / SAMPLE_RATE
        
        att = min(1.0, t / 0.45)
        rel = min(1.0, (dur_sec - t) / 0.5)
        env = att * rel
        
        vib = math.sin(2 * math.pi * 5.0 * t) * 1.8 * min(1.0, max(0.0, (t - 0.3) / 0.5))
        freq = base_freq + vib
        
        f1 = math.sin(2 * math.pi * freq * t)
        f2 = math.sin(2 * math.pi * freq * 2.0 * t) * 0.18
        breath = (random.random() - 0.5) * 0.05
        
        sig = (f1 + f2 + breath) * env * vol
        left_channel[idx] += sig * (1.0 - pan)
        right_channel[idx] += sig * pan

print("1. Ambiyans rüzgarı ve sıcak doğa pad'leri oluşturuluyor...")
chords = [
    (0, 7.5, ['D2', 'D3', 'A3', 'F4']),     # D minor
    (6, 7.5, ['D2', 'A3', 'C4', 'E4']),     # Dm9 / C
    (12, 7.5, ['G2', 'D3', 'G3', 'B3']),    # G major (Dorian)
    (18, 7.5, ['A2', 'E3', 'A3', 'C4']),    # A minor
    (24, 7.5, ['D2', 'F3', 'A3', 'D4']),    # D minor
    (30, 7.5, ['C3', 'G3', 'C4', 'E4']),    # C major
    (36, 7.5, ['G2', 'D3', 'B3', 'D4']),    # G major
    (42, 7.5, ['A2', 'E3', 'A3', 'C4'])     # A minor / D geçişi
]

for start, dur, ch in chords:
    add_pad_chord(start, dur, ch, vol=0.075)

# Hafif rüzgar / doğa fısıltısı
noise_val_l = 0.0
noise_val_r = 0.0
for i in range(NUM_SAMPLES):
    t = i / SAMPLE_RATE
    gust = (math.sin(2 * math.pi * 0.04 * t) * 0.5 + 0.5) * 0.015
    nl = (random.random() - 0.5) * gust
    nr = (random.random() - 0.5) * gust
    noise_val_l = noise_val_l * 0.96 + nl * 0.04
    noise_val_r = noise_val_r * 0.96 + nr * 0.04
    left_channel[i] += noise_val_l
    right_channel[i] += noise_val_r

print("2. Akustik Lavta/Arp melodileri ekleniyor (Meadows teması)...")
arpeggios = [
    (0.5, 'D3', 0.16, 0.42), (1.2, 'A3', 0.14, 0.55), (1.8, 'D4', 0.17, 0.38), (2.5, 'F4', 0.18, 0.62), (3.6, 'A4', 0.19, 0.48), (4.5, 'F4', 0.14, 0.52),
    (6.5, 'D3', 0.16, 0.45), (7.2, 'A3', 0.14, 0.58), (7.9, 'C4', 0.16, 0.40), (8.6, 'E4', 0.18, 0.60), (9.8, 'D4', 0.17, 0.45), (10.8, 'A3', 0.13, 0.50),
    (12.5, 'G3', 0.16, 0.35), (13.2, 'D4', 0.15, 0.65), (14.0, 'B4', 0.19, 0.50), (15.2, 'A4', 0.17, 0.42), (16.2, 'G4', 0.15, 0.58),
    (18.5, 'A3', 0.15, 0.52), (19.2, 'E4', 0.15, 0.40), (20.0, 'C5', 0.18, 0.60), (21.2, 'B4', 0.16, 0.45), (22.2, 'A4', 0.14, 0.55),
    (24.5, 'D3', 0.18, 0.44), (25.2, 'A3', 0.14, 0.56), (25.8, 'D4', 0.17, 0.40), (26.5, 'F4', 0.20, 0.60), (27.5, 'A4', 0.21, 0.48), (28.8, 'D5', 0.22, 0.52),
    (30.5, 'C4', 0.17, 0.42), (31.3, 'E4', 0.16, 0.58), (32.2, 'G4', 0.18, 0.46), (33.5, 'C5', 0.20, 0.54), (34.8, 'B4', 0.16, 0.48),
    (36.5, 'G3', 0.16, 0.38), (37.2, 'D4', 0.15, 0.62), (38.0, 'B4', 0.19, 0.50), (39.5, 'A4', 0.17, 0.45), (40.8, 'G4', 0.15, 0.55),
    (42.5, 'A3', 0.16, 0.50), (43.2, 'E4', 0.15, 0.42), (44.0, 'F4', 0.17, 0.58), (45.2, 'E4', 0.15, 0.46), (46.5, 'D4', 0.18, 0.50)
]

for start, note, vol, pan in arpeggios:
    add_pluck(start, note, vol=vol, pan=pan)

print("3. Nordik Tahta Flütü ezgileri ekleniyor...")
flute_melodies = [
    (13.8, 2.4, 'B4', 0.08, 0.46),
    (16.4, 2.8, 'A4', 0.08, 0.54),
    (26.6, 2.2, 'F4', 0.09, 0.48),
    (28.8, 3.2, 'D5', 0.10, 0.52),
    (33.6, 2.6, 'C5', 0.09, 0.46),
    (36.4, 2.8, 'B4', 0.08, 0.54),
    (39.4, 2.5, 'A4', 0.08, 0.50),
    (44.0, 3.2, 'D4', 0.09, 0.52)
]

for start, dur, note, vol, pan in flute_melodies:
    add_flute(start, dur, note, vol=vol, pan=pan)

print("4. Normalizasyon ve WAV yazımı...")
max_peak = 0.0001
for i in range(NUM_SAMPLES):
    max_peak = max(max_peak, abs(left_channel[i]), abs(right_channel[i]))

gain = 0.82 / max_peak
print(f"Max peak: {max_peak:.4f}, Uygulanan Gain: {gain:.4f}")

out_path = 'public/audio/valheim_ambient.wav'
with wave.open(out_path, 'wb') as wav_file:
    wav_file.setnchannels(2)       # Stereo
    wav_file.setsampwidth(2)      # 16-bit
    wav_file.setframerate(SAMPLE_RATE)
    
    frames = bytearray()
    for i in range(NUM_SAMPLES):
        l_samp = int(max(-1.0, min(1.0, left_channel[i] * gain)) * 32767)
        r_samp = int(max(-1.0, min(1.0, right_channel[i] * gain)) * 32767)
        frames.extend(struct.pack('<hh', l_samp, r_samp))
    wav_file.writeframes(frames)

print(f"Tamamlandı! Dosya oluşturuldu: {out_path}")
