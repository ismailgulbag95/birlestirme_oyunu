#!/usr/bin/env python3
"""
Mevcut Yüklü Becerileri (Skills) Toplu Güvenlik Denetim Aracı
------------------------------------------------------------
Workspace (.agents/skills) ve Global (~/.gemini/config/skills)
dizinlerindeki tüm becerileri NVIDIA SkillSpector ile tarar.
"""

import json
import os
import subprocess
import sys
from pathlib import Path

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if sys.stderr.encoding != 'utf-8':
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

SKILLSPECTOR_BIN = Path(r"C:\Users\ismai\.gemini\tools\skillspector_env\Scripts\skillspector.exe")
WORKSPACE_SKILLS = Path(r"d:\github\birlestirme_oyunu\.agents\skills")
GLOBAL_SKILLS = Path(r"C:\Users\ismai\.gemini\config\skills")

def scan_skill(skill_dir: Path) -> dict:
    cmd = [str(SKILLSPECTOR_BIN), "scan", str(skill_dir), "--format", "json", "--no-llm"]
    res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    stdout = res.stdout.strip()
    try:
        json_start = stdout.find("{")
        if json_start != -1:
            return json.loads(stdout[json_start:])
        return {"error": "JSON çıktısı bulunamadı", "raw": stdout}
    except Exception as e:
        return {"error": str(e)}

def main():
    print("=" * 80)
    print(" 🛡️  MEVCUT BECERİLERİN (SKILLS) TOPLU GÜVENLİK DENETİMİ")
    print("=" * 80)

    targets = []
    if WORKSPACE_SKILLS.exists():
        for d in sorted(WORKSPACE_SKILLS.iterdir()):
            if d.is_dir() and not d.name.startswith("."):
                targets.append(("Workspace", d))

    if GLOBAL_SKILLS.exists():
        for d in sorted(GLOBAL_SKILLS.iterdir()):
            if d.is_dir() and not d.name.startswith("."):
                targets.append(("Global", d))

    total = len(targets)
    print(f"[*] Toplam taranacak beceri sayısı: {total}\n")

    results = []
    for idx, (scope, skill_path) in enumerate(targets, 1):
        print(f"[{idx}/{total}] Taranıyor: [{scope}] {skill_path.name}...", end=" ", flush=True)
        report = scan_skill(skill_path)

        risk_meta = report.get("risk_assessment", {})
        score = risk_meta.get("score", 0)
        severity = risk_meta.get("severity", "SAFE")
        issues = report.get("issues", [])

        crit = sum(1 for i in issues if str(i.get("severity", "")).upper() == "CRITICAL")
        high = sum(1 for i in issues if str(i.get("severity", "")).upper() == "HIGH")
        med = sum(1 for i in issues if str(i.get("severity", "")).upper() == "MEDIUM")
        low = sum(1 for i in issues if str(i.get("severity", "")).upper() == "LOW")

        status_icon = "🟢" if score <= 20 and high == 0 and crit == 0 else ("🟡" if score <= 50 else "🔴")
        print(f"{status_icon} (Skor: {score}/100, Yüksek: {high}, Orta: {med})")

        results.append({
            "scope": scope,
            "name": skill_path.name,
            "path": str(skill_path),
            "score": score,
            "severity": severity,
            "critical": crit,
            "high": high,
            "medium": med,
            "low": low,
            "issues": issues
        })

    # Özet Rapor Çıktısı
    print("\n" + "=" * 80)
    print(" 📋 TOPLU GÜVENLİK TARAMASI ÖZETİ")
    print("=" * 80)
    print(f"{'KAPSAM':<12} | {'BECERİ ADI':<32} | {'SKOR':<8} | {'DURUM':<10} | {'BULGULAR (C/H/M/L)'}")
    print("-" * 80)

    clean_count = 0
    warning_count = 0

    for r in results:
        status_text = "GÜVENLİ" if r["score"] <= 20 and r["high"] == 0 and r["critical"] == 0 else "RİSKLİ"
        if status_text == "GÜVENLİ":
            clean_count += 1
        else:
            warning_count += 1

        findings_str = f"C:{r['critical']} H:{r['high']} M:{r['medium']} L:{r['low']}"
        print(f"{r['scope']:<12} | {r['name'][:32]:<32} | {r['score']:<8} | {status_text:<10} | {findings_str}")

    print("-" * 80)
    print(f"Toplam: {total} | Güvenli: {clean_count} | İnceleme Gereken: {warning_count}")
    print("=" * 80)

    # Varsa riskli bulguları detaylandır
    issues_found = [r for r in results if r["high"] > 0 or r["critical"] > 0 or r["score"] > 20]
    if issues_found:
        print("\n⚠️  DİKKAT GEREKTİREN BECERİLER VE BULGULAR:")
        for r in issues_found:
            print(f"\n▶ [{r['scope']}] {r['name']} (Risk: {r['score']}/100 - {r['severity']}):")
            for i, issue in enumerate(r["issues"], 1):
                sev = issue.get("severity", "INFO")
                cat = issue.get("category", "")
                pattern = issue.get("pattern", "")
                loc = issue.get("location", {}).get("file", "")
                line = issue.get("location", {}).get("start_line", "")
                loc_str = f" [{loc}:{line}]" if loc else ""
                print(f"   {i}. [{sev}] {cat} -> {pattern}{loc_str}")
                if issue.get("finding"):
                    print(f"      Bulgu: {issue.get('finding')}")

    # JSON Raporunu da kaydet
    out_json = Path(r"d:\github\birlestirme_oyunu\scratch\skills_security_audit.json")
    out_json.parent.mkdir(parents=True, exist_ok=True)
    out_json.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n[*] Ayrıntılı JSON denetim raporu kaydedildi: {out_json}")

if __name__ == "__main__":
    main()
