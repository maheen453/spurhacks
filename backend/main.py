import os
import requests
import json
import base64
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from dotenv import load_dotenv
import traceback
from typing import Optional

# Load environment variables from .env file
load_dotenv()

# --- Configuration from environment variables ---
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("Missing GEMINI_API_KEY environment variable. Check your .env file.")

# Gemini API configuration
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

slang_instructions = """
Make the response length approppriate to the question, so not too long if not needed.
Respond to everything like you are Gen Z, using updated slang and even emojis when appropriate. Here is also a list of new updated slang I want you to use:
Joking about how scary a j*b is, and how scary empl*yment is. So censoring the words j*b or empl*yment are funny.
Gambling jokes are very funny, or drinking and driving. Aka just jokes about bad life habits. E.g just put it all on red
Phrases like "what the helly" "what the hallyburton" instead of "what the hell"
A lot of sexual jokes in inappropriate contexts, e.g "bounce on it crazy style" or "you don't want this dih", where dih is slang for a male private part and clih is slang for a woman's private part
A lot of feet jokes, about being into feet sexually
Jokes about men being dominated by goth or muscular women
Calling attractive women "fine shyt", and coming up with clever variants for it as well. E.g ugly women would be called "chopped shyt" where chopped means ugly.
"Huzz" refers to women, with variants as well. So "chuzz" is like chopped huzz, again where chopped means ugly. Bruzz is like bro huzz, so male huzz.
"Crashing out" refers to losing your mind
Words ending in ahh instead of ass. So goofy ahh instead of goofy ass.
"Cooked" refers to doomed. I'm so cooked means I'm doomed.
"Rizz" refers to charisma, a person's ability to flirt with and hit on the other gender.
"Mommy" calling women that as a joke of submission. Or Sexualizing certain women with funny adjectives, like "thunder thighs"
"The ocky way" refers to a creator that got famous because of that catch phrase. Just used randomly in conversation.
Men calling themselves submissive, breedable etc as a joke admitting they are submissive to women
Men making fun of periods and claiming their own version called a "deriod". Similar words are also translated like "birth control" becomes "girth control", "ovulating" becomes "ballvulating", "period cramps" become "deriod cramps"
SYBAU, which translates to shut your b*tch ahh up, so similar variants like syfau, shut your freaky ahh up
The word "freaky", is used very common these days e.g wow he's so freaky.
"""


class Message(BaseModel):
    message: str

def call_gemini_api(messages):
    headers = {
        'Content-Type': 'application/json'
    }
    
    contents = []
    for msg_text, role in messages:
        contents.append({
            "role": role,
            "parts": [{"text": msg_text}]
        })
    
    payload = {
        "contents": contents
    }
    
    params = {
        'key': GEMINI_API_KEY
    }
    
    try:
        response = requests.post(GEMINI_API_URL, headers=headers, json=payload, params=params)
        response.raise_for_status()
        result = response.json()
        if 'candidates' in result and len(result['candidates']) > 0:
            return result['candidates'][0]['content']['parts'][0]['text']
        else:
            raise Exception("No response from Gemini API or unexpected response format.")
            
    except requests.exceptions.RequestException as e:
        raise Exception(f"API request failed: {e}")
    except json.JSONDecodeError as e:
        raise Exception(f"Failed to parse API response as JSON: {e}. Raw response: {response.text if 'response' in locals() else 'N/A'}")
    except Exception as e:
        raise Exception(f"An unexpected error occurred while calling Gemini API: {e}")


@app.post("/chat/")
async def chat_with_slang_model(message_data: Message):
    user_message = message_data.message

    try:
        messages_for_api = [
            (slang_instructions, "user"),
            (user_message, "user") 
        ]
        
        model_response = call_gemini_api(messages_for_api)
        return {"response": model_response} 
        
    except Exception as e:
        print(f"Error during chat: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal server error while processing message: {e}")

if __name__ == "__main__":
    print("Starting FastAPI server with Gemini API...")
    uvicorn.run(app, host="0.0.0.0", port=8000)