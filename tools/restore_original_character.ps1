# Orijinal 87.7 MB'lik yedek modeli geri yukleme betigi
$backupPath = "public\models\character.glb.original_backup"
$targetPath = "public\models\character.glb"

if (Test-Path $backupPath) {
    Copy-Item -Path $backupPath -Destination $targetPath -Force
    Write-Host "Orijinal karakter modeli basariyla geri yuklendi (87.7 MB)." -ForegroundColor Green
    Write-Host "Geri yuklemenin web'e yansimasi icin 'npm run build' calistiriniz." -ForegroundColor Yellow
} else {
    Write-Host "Yedek dosya ($backupPath) bulunamadi!" -ForegroundColor Red
}
