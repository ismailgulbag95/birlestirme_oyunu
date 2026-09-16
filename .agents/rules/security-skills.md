# Güvenli Beceri (Skill) Kurulum Kuralı

## Kapsam ve İlke
1. Yeni bir yapay zeka becerisi (skill) sisteme eklenirken (ister global `~/.gemini/config/skills` ister proje `.agents/skills` olsun), dosyalar asla doğrudan hedef dizine yazılmamalıdır.
2. Tüm beceri kurulumları, güncellemeleri veya dış kaynak indirmeleri **NVIDIA SkillSpector** güvenlik motorunu kullanan `tools/safe_install_skill.py` (veya `C:\Users\ismai\.gemini\tools\safe_install_skill.py`) aracılığıyla gerçekleştirilmelidir.
3. Taramada `CRITICAL` veya `HIGH` seviyesinde bir güvenlik açığı (prompt injection, data exfiltration, yetkisiz kod çalıştırma vb.) tespit edilirse veya Risk Skoru izin verilen eşiğin üzerindeyse, **kullanıcı açıkça talep etse bile kurulum yapılmamalıdır (Fail-Safe Hard Gate)**.
