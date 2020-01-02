import React from 'react';
import { graphql } from 'gatsby';
import { Col, ScreenClassRender, Row } from 'react-grid-system';
import styled from 'styled-components';

import { sortByDate } from '../helpers/sort';
import Layout from '../components/Layout';
import Link from '../components/Layout/mdx/Link';

export default function Index(props) {
  const {
    data: { site, allMdx },
  } = props;
  const { edges: projects } = allMdx;

  return (
    <Layout site={site}>
      <Row>
        <Col md={12}>
          <BioContainer>
            <h2>Hey, I'm Lee!</h2>
            <p>
              I’m a Senior Web Developer with{' '}
              <Link to="https://www.criticalmass.com" target="_blank" rel="noreferrer">
                Critical Mass
              </Link>{' '}
              and a mentor/instructor with{' '}
              <Link
                to="https://www.lighthouselabs.ca"
                target="_blank"
                rel="noreferrer"
              >
                Lighthouse Labs
              </Link>
              .
            </p>
            <p>
              An avid cycle commuter with a keen interest in social
              issues, civic design, and learning about how we interact
              with the cities we love. While I'm semi-active on{' '}
              <Link to="https://www.twitter.com/leemulvey">
                Twitter
              </Link>{' '}
              and my <Link to="/blog">blog</Link>, don’t follow me if
              you don’t want to read my opinions{' '}
              <span role="img" aria-label="Peace Emoji">
                ✌🏻
              </span>
            </p>
          </BioContainer>
        </Col>
      </Row>
      <ScreenClassRender
        render={screenClass => (
          <StyledRow
            justify={
              ['xs', 'sm'].includes(screenClass) ? 'center' : 'start'
            }
          >
            {projects
              .sort(sortByDate)
              .map(
                ({
                  node: {
                    frontmatter: { title, bannerurl, banner },
                    fields: { slug },
                  },
                }) => (
                  <Col
                    sm={12}
                    md={6}
                    lg={4}
                    xl={3}
                    key={title + Math.random() * 4400}
                  >
                    <Link to={`/projects${slug}`}>
                      <ProjectWrapper imageSrc={banner.childImageSharp.fluid.src}>
                        <ProjectTitle>{title}</ProjectTitle>
                      </ProjectWrapper>
                    </Link>
                  </Col>
                ),
              )}
          </StyledRow>
        )}
      />
    </Layout>
  );
}

const StyledRow = styled(Row)`
  a {
    color: white;
    text-decoration: none;
  }
`;

const ProjectWrapper = styled.div`
  background: url(${({ imageSrc }) => imageSrc}) center center;
  background-size: cover;
  border: 1px solid #f3f3f3;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 25px 5px;
  border-radius: 6px;
  min-height: 150px;
  height: 150px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
  transition: all 250ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

  :hover {
    box-shadow: 3px 3px 25px rgba(0, 0, 0, 0.4);
    transform: scale(1.08);
  }

  &:after {
    opacity: 0;
    &:hover {
      opacity: 1;
    }
  }
`;

const ProjectTitle = styled.h4`
  color: #f3f3f3;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.8);
  user-select: none;
  margin: 0;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  text-align: center;

  a {
    color: white;
  }

  :hover {
    text-decoration: none !important;
  }
`;

const BioContainer = styled.div`
  font-size: 18px;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`;

export const pageQuery = graphql`
  query siteQuery {
    allMdx(filter: { fields: { isProject: { eq: true } } }) {
      edges {
        node {
          frontmatter {
            title
            banner {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            date
          }
          fields {
            slug
          }
        }
      }
    }

    site {
      ...site
    }
  }
`;
