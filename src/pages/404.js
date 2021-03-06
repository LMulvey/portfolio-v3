import React, { Component } from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { Container, Row, Col } from 'react-grid-system';
import Layout from '../components/Layout';

class ErrorPage extends Component {
  render() {
    const {
      data: { site, image },
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
              <Img
                fluid={image.childImageSharp.fluid}
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
    image: file(relativePath: { eq: "404.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    site {
      ...site
    }
  }
`;
