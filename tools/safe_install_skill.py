#!/usr/bin/env python3
"""
SkillSpector Safe Skill Installer (Hard Gate)
---------------------------------------------
Bu betik, yeni bir AI Agent becerisini (skill) izole bir karantina alanına indirir,
NVIDIA SkillSpector ile güvenlik taramasından geçirir.
CRITICAL / HIGH risk, tehlikeli güvenlik açığı veya risk skoru eşiği aşıldığında
kurulumu KESİNLİKLE reddeder ve indirilen geçici dosyaları tamamen imha eder.
"""

import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

# Windows konsol UTF-8 çıktı desteği
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if sys.stderr.encoding != 'utf-8':
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

SKILLSPECTOR_BIN = Path(r"C:\Users\ismai\.gemini\tools\skillspector_env\Scripts\skillspector.exe")
DEFAULT_GLOBAL_SKILLS_DIR = Path(r"C:\Users\ismai\.gemini\config\skills")
DEFAULT_WORKSPACE_SKILLS_DIR = Path(r".agents\skills")

def run_skillspector(target_path: Path, use_llm: bool = False) -> dict:
    if not SKILLSPECTOR_BIN.exists():
        print(f"[!] HATA: SkillSpector çalıştırılabilir dosyası bulunamadı: {SKILLSPECTOR_BIN}")
        sys.exit(1)

    cmd = [str(SKILLSPECTOR_BIN), "scan", str(target_path), "--format", "json"]
    if not use_llm:
        cmd.append("--no-llm")

    result = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    stdout = result.stdout.strip()

    try:
        json_start = stdout.find("{")
        if json_start != -1:
            return json.loads(stdout[json_start:])
        else:
            return {"error": "JSON çıktısı bulunamadı", "raw": stdout, "stderr": result.stderr}
    except Exception as e:
        return {"error": f"JSON ayrıştırma hatası: {e}", "raw": stdout, "stderr": result.stderr}

def main():
    parser = argparse.ArgumentParser(description="SkillSpector Güvenli Beceri (Skill) Kurucusu")
    parser.add_argument("source", help="Git repo URL'si, yerel klasör veya dosya yolu")
    parser.add_argument("--name", help="Kurulacak becerinin klasör adı (opsiyonel)")
    parser.add_argument("--scope", choices=["global", "workspace"], default="global", help="Kurulum hedefi: 'global' veya 'workspace'")
    parser.add_argument("--target-dir", help="Özel hedef dizin")
    parser.add_argument("--max-risk", type=int, default=20, help="İzin verilen maksimum risk puanı (0-100, varsayılan: 20)")
    parser.add_argument("--use-llm", action="store_true", help="LLM anlamsal güvenlik analizini aç")

    args = parser.parse_args()

    print("=" * 75)
    print(" 🛡️  SKILLSPECTOR GÜVENLİK KAPISI: AI BECERİ DENETİMİ VE KURULUMU")
    print("=" * 75)
    print(f"[*] Kaynak: {args.source}")
    print(f"[*] Hedef Kapsam: {args.scope}")
    print(f"[*] İzin Verilen Maksimum Risk Puanı: {args.max_risk}")

    # Geçici karantina dizini
    temp_dir = Path(tempfile.mkdtemp(prefix="skillspector_quarantine_"))
    try:
        source_path = Path(args.source)
        staged_path = temp_dir / "skill_candidate"

        if args.source.startswith("http://") or args.source.startswith("https://") or args.source.startswith("git@"):
            print("[*] Kaynak Git deposundan izole karantinaya klonlanıyor...")
            clone_res = subprocess.run(["git", "clone", "--depth", "1", args.source, str(staged_path)], capture_output=True, text=True)
            if clone_res.returncode != 0:
                print(f"[!] Git klonlama başarısız:\n{clone_res.stderr}")
                sys.exit(1)
            derived_name = args.name or Path(args.source.rstrip("/").split("/")[-1]).stem
        elif source_path.exists():
            print("[*] Yerel kaynak karantina alanına kopyalanıyor...")
            if source_path.is_dir():
                shutil.copytree(source_path, staged_path)
            else:
                staged_path.mkdir(parents=True, exist_ok=True)
                shutil.copy2(source_path, staged_path / source_path.name)
            derived_name = args.name or source_path.name
        else:
            print(f"[!] HATA: Kaynak bulunamadı: {args.source}")
            sys.exit(1)

        # SkillSpector taraması
        print("[*] NVIDIA SkillSpector güvenlik analizi çalıştırılıyor...")
        report = run_skillspector(staged_path, use_llm=args.use_llm)

        if "error" in report:
            print(f"[!] Tarama hatası: {report['error']}")
            if "stderr" in report and report["stderr"]:
                print(f"[!] Hata Ayrıntısı: {report['stderr']}")
            print("[!] Güvenlik doğrulaması yapılamadığı için işlem DURDURULDU.")
            sys.exit(1)

        # SkillSpector veri alanları
        risk_meta = report.get("risk_assessment", {})
        risk_score = risk_meta.get("score", 0)
        risk_severity = risk_meta.get("severity", "UNKNOWN")
        recommendation = risk_meta.get("recommendation", "UNKNOWN")
        issues = report.get("issues", [])

        # Seviye sayaçları
        critical_count = sum(1 for i in issues if str(i.get("severity", "")).upper() == "CRITICAL")
        high_count = sum(1 for i in issues if str(i.get("severity", "")).upper() == "HIGH")
        medium_count = sum(1 for i in issues if str(i.get("severity", "")).upper() == "MEDIUM")
        low_count = sum(1 for i in issues if str(i.get("severity", "")).upper() == "LOW")

        print("\n" + "-" * 75)
        print(f"📊 ANALİZ RAPORU: Risk Puanı: {risk_score}/100 | Seviye: {risk_severity} | Tavsiye: {recommendation}")
        print(f"🔴 Kritik: {critical_count} | 🟠 Yüksek: {high_count} | 🟡 Orta: {medium_count} | 🟢 Düşük: {low_count}")
        print("-" * 75)

        # Bulguları listele
        if issues:
            print("\n[!] TESPİT EDİLEN GÜVENLİK AÇIKLARI VE TEHDİTLER:")
            for idx, issue in enumerate(issues, 1):
                sev = issue.get("severity", "INFO")
                cat = issue.get("category", "")
                pattern = issue.get("pattern", "")
                finding = issue.get("finding", "")
                loc = issue.get("location", {})
                loc_file = loc.get("file", "")
                loc_line = loc.get("start_line", "")
                loc_str = f" [{loc_file}:{loc_line}]" if loc_file else ""
                print(f"  {idx}. [{sev}] {cat} -> {pattern}{loc_str}")
                if finding:
                    print(f"     Açıklama: {finding}")

        # Engelleme Mekanizması (FAIL-SAFE HARD GATE)
        is_blocked = False
        block_reasons = []

        if critical_count > 0:
            is_blocked = True
            block_reasons.append(f"{critical_count} adet KRİTİK (CRITICAL) açık tespit edildi.")
        if high_count > 0:
            is_blocked = True
            block_reasons.append(f"{high_count} adet YÜKSEK (HIGH) riskli açık tespit edildi.")
        if risk_score > args.max_risk:
            is_blocked = True
            block_reasons.append(f"Risk puanı ({risk_score}/100), belirlenen maksimum eşiği ({args.max_risk}) aşıyor.")
        if recommendation == "DO_NOT_INSTALL":
            is_blocked = True
            block_reasons.append("SkillSpector motoru 'DO_NOT_INSTALL' (KURULMASI TEHLİKELİ) kararı verdi.")

        if is_blocked:
            print("\n" + "=" * 75)
            print(" 🚫 GÜVENLİK KAPISI DEVREYE GİRDİ: KURULUM KESİNLİKLE REDDEDİLDİ!")
            print("=" * 75)
            for r in block_reasons:
                print(f" ❌ {r}")
            print("\n[!] Bu beceri güvenlik standartlarına uymadığı için sisteme dahil edilemez.")
            print("[*] Karantina dizini ve geçici dosyalar tamamen siliniyor...")
            sys.exit(1)

        # Temiz ve güvenli - Kurulumu tamamla
        if args.target_dir:
            dest_base = Path(args.target_dir)
        elif args.scope == "global":
            dest_base = DEFAULT_GLOBAL_SKILLS_DIR
        else:
            dest_base = DEFAULT_WORKSPACE_SKILLS_DIR

        dest_dir = dest_base / derived_name
        dest_base.mkdir(parents=True, exist_ok=True)

        if dest_dir.exists():
            print(f"[*] Mevcut sürüm güncelleniyor: {dest_dir}")
            shutil.rmtree(dest_dir)

        shutil.copytree(staged_path, dest_dir)

        print("\n" + "=" * 75)
        print(" ✅ GÜVENLİK ONAYI VERİLDİ - KURULUM BAŞARIYLA TAMAMLANDI")
        print("=" * 75)
        print(f"[*] Kurulan Beceri: {derived_name}")
        print(f"[*] Hedef Dizin: {dest_dir}")
        print(f"[*] Onaylanan Risk Puanı: {risk_score}/100")
        print("=" * 75)

    finally:
        if temp_dir.exists():
            shutil.rmtree(temp_dir, ignore_errors=True)

if __name__ == "__main__":
    main()
