import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { articlesAPI } from '../services/api';
import ArticleCard from '../components/ArticleCard';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await articlesAPI.getAll();
      setArticles(response.data);
    } catch (err) {
      setError('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await articlesAPI.delete(id);
        setArticles(articles.filter((article) => article.id !== id));
        setSuccessMessage('Article deleted successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        setError('Failed to delete article');
      }
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {successMessage && <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>{successMessage}</Alert>}

      {articles.length === 0 ? (
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <div className="p-5">
              <h3>No Articles Yet</h3>
              <p className="text-muted">Start creating articles with AI!</p>
              <Button variant="primary" onClick={() => navigate('/generate')}>
                Generate Your First Article
              </Button>
            </div>
          </Col>
        </Row>
      ) : (
        <Row className="g-3">
          {articles.map((article) => (
            <Col key={article.id} xs={12}>
              <ArticleCard
                article={article}
                onDelete={handleDelete}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ArticleList;
