import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={8} className="mx-auto text-center">
              <h1 className="display-5 display-md-4 mb-4">AI-Powered Article Generator</h1>
              <p className="lead mb-4">
                Create high-quality articles in minutes using advanced AI technology.
                Save time and focus on what matters most.
              </p>
              {!isAuthenticated ? (
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <Button
                    variant="light"
                    size="lg"
                    className="w-100 w-sm-auto"
                    onClick={() => navigate('/register')}
                  >
                    Get Started Free
                  </Button>
                  <Button
                    variant="outline-light"
                    size="lg"
                    className="w-100 w-sm-auto"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </Button>
                </div>
              ) : (
                <Button
                  variant="light"
                  size="lg"
                  onClick={() => navigate('/generate')}
                >
                  Generate Article Now
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <h2 className="text-center mb-5">Features</h2>
        <Row className="g-4">
          <Col xs={12} sm={6} md={4}>
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="mb-3">
                  <i className="bi bi-lightning-charge-fill text-primary" style={{ fontSize: '3rem' }}></i>
                </div>
                <Card.Title>Fast Generation</Card.Title>
                <Card.Text>
                  Generate complete, well-structured articles in under a minute using GPT-4 technology.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} md={4}>
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="mb-3">
                  <i className="bi bi-cloud-upload-fill text-primary" style={{ fontSize: '3rem' }}></i>
                </div>
                <Card.Title>Easy Publishing</Card.Title>
                <Card.Text>
                  Save and manage your articles in one place. Publish when you're ready.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} md={4}>
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="mb-3">
                  <i className="bi bi-pencil-square text-primary" style={{ fontSize: '3rem' }}></i>
                </div>
                <Card.Title>Full Control</Card.Title>
                <Card.Text>
                  Edit and customize articles before publishing. Control tone, length, and keywords.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* How It Works */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5">How It Works</h2>
          <Row className="justify-content-center">
            <Col xs={12} md={3} className="text-center mb-4 d-flex flex-column align-items-center">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-3" 
                   style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                1
              </div>
              <h5>Describe Your Topic</h5>
              <p className="text-muted text-center">Tell us what you want to write about</p>
            </Col>
            <Col xs={12} md={3} className="text-center mb-4 d-flex flex-column align-items-center">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-3" 
                   style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                2
              </div>
              <h5>AI Generates Content</h5>
              <p className="text-muted text-center">Our AI creates a complete article</p>
            </Col>
            <Col xs={12} md={3} className="text-center mb-4 d-flex flex-column align-items-center">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-3" 
                   style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                3
              </div>
              <h5>Review & Edit</h5>
              <p className="text-muted text-center">Make any changes you want</p>
            </Col>
            <Col xs={12} md={3} className="text-center mb-4 d-flex flex-column align-items-center">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-3" 
                   style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                4
              </div>
              <h5>Publish</h5>
              <p className="text-muted text-center">Save and manage your articles</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
