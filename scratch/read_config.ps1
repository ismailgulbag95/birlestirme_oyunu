$lines = Get-Content -Path 'D:\github\artemis\config\artemis.jsonc'
$lines[0..70] | ForEach-Object { $_ }
