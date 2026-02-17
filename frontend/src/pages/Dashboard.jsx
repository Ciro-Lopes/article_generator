import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ArticleList from '../components/ArticleList';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-4 px-3">
      <Row className="mb-4">
        <Col>
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
            <h2 className="mb-0">My Articles</h2>
            <Button
              variant="primary"
              className="w-100 w-sm-auto"
              onClick={() => navigate('/generate')}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Generate New Article
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <ArticleList />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
