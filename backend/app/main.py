from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.router.v1 import router as v1_router
from app.core.database import engine, Base
import app.models  # VERY IMPORTANT


app = FastAPI(title="E-Commerce Marketplace API (MVP)")
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(v1_router, prefix="/api/v1")


@app.get("/")
def root():
    return {"message": "E-Commerce Marketplace API - use /api/v1"}
