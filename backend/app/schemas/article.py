from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ArticleBase(BaseModel):
    title: str
    content: str
    keywords: Optional[str] = None


class ArticleCreate(BaseModel):
    prompt: str
    keywords: Optional[str] = None


class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    keywords: Optional[str] = None
    status: Optional[str] = None


class Article(ArticleBase):
    id: int
    prompt: Optional[str] = None
    status: str
    created_at: datetime
    updated_at: datetime
    user_id: int
    
    class Config:
        from_attributes = True


class ArticleGenerate(BaseModel):
    prompt: str
    keywords: Optional[str] = None
    tone: Optional[str] = "professional"
    length: Optional[str] = "medium"  # short, medium, long
