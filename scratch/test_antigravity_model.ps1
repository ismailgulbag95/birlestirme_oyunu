Set-Location 'D:\github\artemis'
.\.venv\Scripts\python.exe -c "
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()
client = genai.Client(api_key=os.environ.get('GOOGLE_API_KEY'))
try:
    response = client.models.generate_content(
        model='antigravity',
        contents='Merhaba, calisiyor musun?'
    )
    print('SUCCESS:', response.text)
except Exception as e:
    print('ERROR:', e)
"
