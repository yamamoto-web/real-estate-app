from fastapi import FastAPI
from app.api.v1 import session, result, chat_intro
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# v1のルーター登録
app.include_router(session.router, prefix="/v1/session", tags=["session"])
app.include_router(result.router, prefix="/v1", tags=["result"])
app.include_router(chat_intro.router, prefix="/v1", tags=["chat_intro"])

@app.get("/")
def root():
    return {"message": "API is running"}

app.add_middleware(
    CORSMiddleware,
     allow_origins=[
        "http://localhost:5173",  # ローカル開発用
        "https://real-estate-app-zeta-eight.vercel.app", # ← 実機確認用URL
        "https://real-estate-ffd0layq4-yamamoto-webs-projects.vercel.app",
        "https://real-estate-app-g76z.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)