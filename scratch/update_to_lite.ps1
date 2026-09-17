$path = 'D:\github\artemis\config\artemis.jsonc'
$text = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$text = $text.Replace('"model": "gemini-2.5-flash"', '"model": "gemini-3.5-flash-lite"')
$text = $text.Replace('"model": "gemini-2.0-flash"', '"model": "gemini-3.6-flash"')
[System.IO.File]::WriteAllText($path, $text, [System.Text.UTF8Encoding]::new($false))
Write-Host "Updated to gemini-3.5-flash-lite and gemini-3.6-flash"
