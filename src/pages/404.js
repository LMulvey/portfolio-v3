import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { Container, Row, Col } from 'react-grid-system';
import Layout from '../components/Layout';

class ErrorPage extends Component {
  render() {
    const {
      data: { site },
    } = this.props;

    return (
      <Layout site={site}>
        <Helmet
          title={`Oops! You've got served a 404 | ${site.siteMetadata.title}`}
        />
        <Container>
          <Row>
            <Col xs={12} align="center">
              <h1>You've hit a 404. Go back, or stay if you want.</h1>
              <img
                src="https://res.cloudinary.com/leemulvey/image/upload/v1559232803/Portfolio/404.jpg"
                alt="Life finds a way... you did not"
              />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default ErrorPage;

export const query = graphql`
  query {
    site {
      ...site
    }
  }
`;
