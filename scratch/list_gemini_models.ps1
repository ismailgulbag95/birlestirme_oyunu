Set-Location 'D:\github\artemis'
.\.venv\Scripts\python.exe -c "
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()
client = genai.Client(api_key=os.environ.get('GOOGLE_API_KEY'))
try:
    for m in client.models.list():
        if 'flash' in m.name.lower() or 'gemini' in m.name.lower():
            print(m.name)
except Exception as e:
    print('ERROR:', e)
"
