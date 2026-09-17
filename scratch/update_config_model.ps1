$path = 'D:\github\artemis\config\artemis.jsonc'
$text = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$text = $text.Replace('"model": "gemini-3.8-flash"', '"model": "gemini-2.5-flash"')
$text = $text.Replace('"model": "gemini-3.7-flash"', '"model": "gemini-2.0-flash"')
[System.IO.File]::WriteAllText($path, $text, [System.Text.UTF8Encoding]::new($false))
Write-Host "artemis.jsonc updated to gemini-2.5-flash and gemini-2.0-flash"
