<#
.SYNOPSIS
  Awesome DESIGN.md Yönetim Aracı
.DESCRIPTION
  Projeye 74+ popüler tasarım sisteminden birini uygulamak ve yönetmek için kullanılır.
.EXAMPLE
  .\design.ps1 list
  .\design.ps1 search linear
  .\design.ps1 apply linear.app
  .\design.ps1 info raycast
  .\design.ps1 current
#>

param (
    [Parameter(Position=0)]
    [string]$Command = "help",

    [Parameter(Position=1)]
    [string]$Target
)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$LocalDesignDir = Join-Path $ScriptDir "design-md"
$GlobalDesignDir = "C:\Users\ismai\.gemini\config\awesome-design-md\design-md"
$DesignDir = if (Test-Path $LocalDesignDir) { $LocalDesignDir } else { $GlobalDesignDir }
$RootDesignFile = Join-Path $ScriptDir "DESIGN.md"

function Show-Help {
    Write-Host "`n=== Awesome DESIGN.md Yonetim Araci ===" -ForegroundColor Cyan
    Write-Host "Kullanim:" -ForegroundColor Yellow
    Write-Host "  .\design.ps1 list                 - Mevcut tum tasarim dillerini listeler"
    Write-Host "  .\design.ps1 search <kelime>       - Tasarimlar arasinda arama yapar"
    Write-Host "  .\design.ps1 apply <tema-adi>      - Secilen temayi projenin aktif DESIGN.md dosyasi yapar"
    Write-Host "  .\design.ps1 info <tema-adi>       - Belirtilen temanin ozet bilgilerini gosterir"
    Write-Host "  .\design.ps1 current               - Su an aktif olan DESIGN.md bilgisini gosterir"
    Write-Host "`nPopuler Ornekler: linear.app, vercel, raycast, apple, stripe, cursor, supabase`n" -ForegroundColor DarkGray
}

switch ($Command.ToLower()) {
    "list" {
        $themes = Get-ChildItem -Directory $DesignDir | Select-Object -ExpandProperty Name | Sort-Object
        Write-Host "`n[+] Mevcut Tasarim Sistemleri ($($themes.Count) Adet):`n" -ForegroundColor Green
        $themes -join ", " | Write-Host -ForegroundColor White
        Write-Host ""
    }

    "search" {
        if (-not $Target) {
            Write-Host "Hata: Arama kelimesi belirtmelisiniz. Ornek: .\design.ps1 search linear" -ForegroundColor Red
            return
        }
        $matches = Get-ChildItem -Directory $DesignDir | Where-Object { $_.Name -like "*$Target*" } | Select-Object -ExpandProperty Name
        if ($matches) {
            Write-Host "`n[+] '$Target' ile eslesen temalar:" -ForegroundColor Green
            $matches | ForEach-Object { Write-Host " - $_" -ForegroundColor Cyan }
            Write-Host ""
        } else {
            Write-Host "Eslesen tasarim bulunamadi." -ForegroundColor Yellow
        }
    }

    "info" {
        if (-not $Target) {
            Write-Host "Hata: Tema adi belirtmelisiniz. Ornek: .\design.ps1 info linear.app" -ForegroundColor Red
            return
        }
        $targetPath = Join-Path $DesignDir $Target
        $targetFile = Join-Path $targetPath "DESIGN.md"
        if (-not (Test-Path $targetFile)) {
            Write-Host "Hata: '$Target' temasi bulunamadi!" -ForegroundColor Red
            return
        }
        Write-Host "`n=== $Target Tasarim Sistemi Ozeti ===" -ForegroundColor Cyan
        Get-Content $targetFile -TotalCount 40 | Write-Host -ForegroundColor Gray
        Write-Host "`n... (Devami icin: $targetFile)`n" -ForegroundColor DarkGray
    }

    "apply" {
        if (-not $Target) {
            Write-Host "Hata: Uygulanacak tema adini belirtmelisiniz. Ornek: .\design.ps1 apply linear.app" -ForegroundColor Red
            return
        }
        $targetPath = Join-Path $DesignDir $Target
        $targetFile = Join-Path $targetPath "DESIGN.md"
        if (-not (Test-Path $targetFile)) {
            Write-Host "Hata: '$Target' temasi bulunamadi! '.\design.ps1 list' ile tum temalari gorebilirsiniz." -ForegroundColor Red
            return
        }

        # Kök dizine kopyala
        Copy-Item -Path $targetFile -Destination $RootDesignFile -Force

        # Meta dosyasina kaydedelim
        $metaPath = Join-Path $ScriptDir ".active_design"
        Set-Content -Path $metaPath -Value $Target -Force

        Write-Host "`n[BASARILI] '$Target' tasarim sistemi projeye uygulandi!" -ForegroundColor Green
        Write-Host "Aktif dosya: $RootDesignFile" -ForegroundColor Cyan
        Write-Host "Yapay zeka artik arayuz gelistirirken bu tasarim diline sadik kalacaktir.`n" -ForegroundColor Yellow
    }

    "current" {
        $metaPath = Join-Path $ScriptDir ".active_design"
        if (Test-Path $metaPath) {
            $current = Get-Content $metaPath
            Write-Host "`n[i] Aktif Tasarim: $current" -ForegroundColor Green
        } elseif (Test-Path $RootDesignFile) {
            Write-Host "`n[i] Kok dizinde DESIGN.md mevcut." -ForegroundColor Yellow
        } else {
            Write-Host "`n[!] Henuz projeye aktif bir DESIGN.md uygulanmamis. Uygulamak icin: .\design.ps1 apply <tema-adi>" -ForegroundColor Yellow
        }
    }

    default {
        Show-Help
    }
}
