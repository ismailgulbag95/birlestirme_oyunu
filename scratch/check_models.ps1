$content = Get-Content -Path 'D:\github\artemis\config\artemis.jsonc' -Raw
$content | Select-String -Pattern "model|planner|gemini" -AllMatches | ForEach-Object { $_.Matches }
