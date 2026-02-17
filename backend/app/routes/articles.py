from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models.user import User
from ..models.article import Article
from ..schemas.article import Article as ArticleSchema, ArticleCreate, ArticleUpdate, ArticleGenerate
from ..services.auth_service import get_current_user
from ..services.openai_service import generate_article

router = APIRouter(prefix="/articles", tags=["Articles"])


@router.post("/generate", response_model=ArticleSchema, status_code=status.HTTP_201_CREATED)
def create_article_with_ai(
    article_data: ArticleGenerate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Generate an article using AI and save it"""
    # Generate article using OpenAI
    result = generate_article(
        prompt=article_data.prompt,
        keywords=article_data.keywords,
        tone=article_data.tone,
        length=article_data.length
    )
    
    if not result.get("success"):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate article: {result.get('error', 'Unknown error')}"
        )
    
    # Save to database
    new_article = Article(
        title=result["title"],
        content=result["content"],
        prompt=article_data.prompt,
        keywords=article_data.keywords,
        user_id=current_user.id,
        status="draft"
    )
    
    db.add(new_article)
    db.commit()
    db.refresh(new_article)
    
    return new_article


@router.get("/", response_model=List[ArticleSchema])
def get_articles(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all articles for the current user"""
    articles = db.query(Article).filter(
        Article.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    
    return articles


@router.get("/{article_id}", response_model=ArticleSchema)
def get_article(
    article_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific article"""
    article = db.query(Article).filter(
        Article.id == article_id,
        Article.user_id == current_user.id
    ).first()
    
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found"
        )
    
    return article


@router.put("/{article_id}", response_model=ArticleSchema)
def update_article(
    article_id: int,
    article_update: ArticleUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update an article"""
    article = db.query(Article).filter(
        Article.id == article_id,
        Article.user_id == current_user.id
    ).first()
    
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found"
        )
    
    # Update fields
    update_data = article_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(article, field, value)
    
    db.commit()
    db.refresh(article)
    
    return article


@router.delete("/{article_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_article(
    article_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete an article"""
    article = db.query(Article).filter(
        Article.id == article_id,
        Article.user_id == current_user.id
    ).first()
    
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found"
        )
    
    db.delete(article)
    db.commit()
    
    return None
