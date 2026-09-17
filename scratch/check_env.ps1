Get-Content 'D:\github\artemis\.env' | Select-String -Pattern '^[A-Za-z0-9_]+=' | ForEach-Object { $_.Line.Split('=')[0] }
