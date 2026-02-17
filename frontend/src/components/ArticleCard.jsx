import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ article, onDelete }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'secondary';
      default:
        return 'info';
    }
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2 gap-2 flex-wrap">
          <Card.Title className="mb-0" style={{ minWidth: 0, flex: 1 }}>{article.title}</Card.Title>
          <Badge bg={getStatusVariant(article.status)} className="flex-shrink-0">{article.status}</Badge>
        </div>
        
        <Card.Text className="text-muted small mb-2">
          Created: {formatDate(article.created_at)}
        </Card.Text>
        
        {article.keywords && (
          <Card.Text className="mb-2">
            <small>
              <strong>Keywords:</strong> {article.keywords}
            </small>
          </Card.Text>
        )}
        
        <Card.Text className="mb-3">
          {stripHtml(article.content).substring(0, 150)}...
        </Card.Text>
        
        <div className="d-flex gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/article/${article.id}`)}
          >
            View
          </Button>
          
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(article.id)}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard;
