import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner, Badge } from 'react-bootstrap';
import { articlesAPI } from '../services/api';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    keywords: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await articlesAPI.getOne(id);
      setArticle(response.data);
      setFormData({
        title: response.data.title,
        content: response.data.content,
        keywords: response.data.keywords || '',
      });
    } catch (err) {
      setError('Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await articlesAPI.update(id, formData);
      setArticle(response.data);
      setEditing(false);
      setSuccessMessage('Article updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to update article');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await articlesAPI.delete(id);
        navigate('/dashboard');
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

  if (!article) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Article not found</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <Button variant="outline-secondary" onClick={() => navigate('/dashboard')}>
            <i className="bi bi-arrow-left me-2"></i>
            Back to Dashboard
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {successMessage && <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>{successMessage}</Alert>}

      <Row>
        <Col xs={12} lg={8} className="mx-auto">
          <Card>
            <Card.Body className="p-3 p-md-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
                <Badge bg={article.status === 'published' ? 'success' : 'secondary'}>
                  {article.status}
                </Badge>
                <div className="d-flex gap-2">
                  {!editing && (
                    <>
                      <Button variant="outline-primary" size="sm" onClick={() => setEditing(true)}>
                        <i className="bi bi-pencil me-1"></i>
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={handleDelete}>
                        <i className="bi bi-trash me-1"></i>
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {editing ? (
                <Form onSubmit={handleUpdate}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Keywords</Form.Label>
                    <Form.Control
                      type="text"
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={15}
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                    <Button variant="secondary" onClick={() => setEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  <h1 className="mb-3">{article.title}</h1>
                  
                  {article.keywords && (
                    <div className="mb-3">
                      <strong>Keywords:</strong> {article.keywords}
                    </div>
                  )}

                  {article.prompt && (
                    <Alert variant="info">
                      <strong>Original Prompt:</strong> {article.prompt}
                    </Alert>
                  )}

                  <div
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />

                  <div className="text-muted mt-4">
                    <small>
                      Created: {new Date(article.created_at).toLocaleString()}
                      {article.published_to_wordpress && (
                        <> | <Badge bg="info">Published to WordPress</Badge></>
                      )}
                    </small>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ArticleDetail;
