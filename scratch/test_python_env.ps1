Set-Location 'D:\github\artemis'
.\.venv\Scripts\python.exe -c "import os; from dotenv import load_dotenv, find_dotenv; load_dotenv(); print('GEMINI_API_KEY in os.environ:', 'GEMINI_API_KEY' in os.environ); print('GOOGLE_API_KEY in os.environ:', 'GOOGLE_API_KEY' in os.environ)"
