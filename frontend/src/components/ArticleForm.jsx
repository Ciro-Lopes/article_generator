import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { articlesAPI } from '../services/api';

const ArticleForm = () => {
  const [formData, setFormData] = useState({
    prompt: '',
    keywords: '',
    tone: 'professional',
    length: 'medium',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await articlesAPI.generate(formData);
      navigate(`/article/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={10} lg={8}>
          <Card>
            <Card.Body className="p-4">
              <h2 className="mb-4">Generate New Article</h2>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Article Topic / Prompt *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="prompt"
                    value={formData.prompt}
                    onChange={handleChange}
                    required
                    placeholder="Describe what you want to write about. Be specific for better results."
                  />
                  <Form.Text className="text-muted">
                    Example: "Write an article about the benefits of meditation for mental health"
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Keywords (optional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    placeholder="meditation, mindfulness, mental health, stress relief"
                  />
                  <Form.Text className="text-muted">
                    Comma-separated keywords to include in the article
                  </Form.Text>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tone</Form.Label>
                      <Form.Select
                        name="tone"
                        value={formData.tone}
                        onChange={handleChange}
                      >
                        <option value="professional">Professional</option>
                        <option value="casual">Casual</option>
                        <option value="formal">Formal</option>
                        <option value="friendly">Friendly</option>
                        <option value="informative">Informative</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Length</Form.Label>
                      <Form.Select
                        name="length"
                        value={formData.length}
                        onChange={handleChange}
                      >
                        <option value="short">Short (500-700 words)</option>
                        <option value="medium">Medium (1000-1500 words)</option>
                        <option value="long">Long (2000-3000 words)</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Generating Article...
                      </>
                    ) : (
                      'Generate Article'
                    )}
                  </Button>
                </div>
              </Form>

              {loading && (
                <Alert variant="info" className="mt-3">
                  <strong>Please wait...</strong> AI is creating your article. This may take 30-60 seconds.
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ArticleForm;
