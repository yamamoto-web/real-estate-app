from fastapi import FastAPI
from app.api.v1 import session  # sessionルーターを読み込む
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# v1のルーター登録
app.include_router(session.router, prefix="/v1/session", tags=["session"])

@app.get("/")
def root():
    return {"message": "API is running"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # フロントのURL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)