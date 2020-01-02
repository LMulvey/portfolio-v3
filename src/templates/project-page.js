import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import {
  Container,
  Row,
  Col,
  ScreenClassRender,
} from 'react-grid-system';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import { sortByDate } from '../helpers/sort';

const resolveStatus = status => {
  switch (status) {
    case 'ongoing':
      return 'Ongoing';
    case 'inprogress':
      return 'In Progress';
    case 'contributor':
      return 'Contributor (open source)';
    case 'complete':
    default:
      return 'Completed';
  }
};

export default ({ data }) => {
  const {
    allMdx: { edges: projects },
    mdx: {
      frontmatter: {
        title,
        status,
        url,
        banner,
        technologies,
        photos,
      },
      body,
    },
    site,
  } = data;
  const resolvedStatus = resolveStatus(status);

  return (
    <Layout site={site}>
      <Helmet title={`${title} | ${site.siteMetadata.title}`} />
      <ScreenClassRender
        render={screenClass => (
          <Container>
            <RowWithBottomBorder justify="between" align="center">
              <TitleContainer
                xs={12}
                md={10}
                align={
                  ['xs', 'sm'].includes(screenClass)
                    ? 'center'
                    : 'start'
                }
              >
                <ProjectTitle>{title}</ProjectTitle>
                <StatusBadge status={status}>
                  {resolvedStatus}
                </StatusBadge>
              </TitleContainer>
            </RowWithBottomBorder>
            <MarginRow
              justify={
                ['xs', 'sm'].includes(screenClass) ? 'center' : 'end'
              }
            >
              <Col
                xs={12}
                md={6}
                align={
                  ['xs', 'sm'].includes(screenClass)
                    ? 'center'
                    : 'right'
                }
              >
                {technologies.map(tech => (
                  <TechBadge>{tech}</TechBadge>
                ))}
              </Col>
            </MarginRow>
            {url ? (
              <MarginRow justify="center">
                <Col
                  align={
                    ['xs', 'sm'].includes(screenClass)
                      ? 'center'
                      : 'start'
                  }
                >
                  <ProjectLinkWrapper>
                    <span
                      role="img"
                      aria-label="Link to project website"
                    >
                      📎
                    </span>{' '}
                    <a href={url}>View {title}</a>
                  </ProjectLinkWrapper>
                </Col>
              </MarginRow>
            ) : null}
            <Row>
              <Col align="center">
                <Carousel
                  wrapAround
                  renderCenterLeftControls={({ previousSlide }) =>
                    photos.length ? (
                      <CarouselButton
                        title="Previous slide"
                        onClick={previousSlide}
                      >
                        <i className="fas fa-angle-left fa-3x" />
                      </CarouselButton>
                    ) : null
                  }
                  renderCenterRightControls={({ nextSlide }) =>
                    photos.length ? (
                      <CarouselButton
                        title="Next slide"
                        onClick={nextSlide}
                      >
                        <i className="fas fa-angle-right fa-3x" />
                      </CarouselButton>
                    ) : null
                  }
                >
                  <Img alt={title} fluid={banner.childImageSharp.fluid} loading="eager" />
                  {photos.map(src => (
                    <Img alt={title} fluid={src.childImageSharp.fluid} loading="eager" />
                  ))}
                </Carousel>
              </Col>
            </Row>
            <MarginRow justify="center">
              <Col
                align={
                  ['xs', 'sm'].includes(screenClass)
                    ? 'center'
                    : 'start'
                }
              >
                <MDXRenderer>{body}</MDXRenderer>
              </Col>
            </MarginRow>

            <OtherProjects>Other Projects</OtherProjects>
            <Row
              justify={
                ['xs', 'sm'].includes(screenClass)
                  ? 'center'
                  : 'start'
              }
            >
              {projects
                .sort(sortByDate)
                .slice(0, 4)
                .map(
                  ({
                    node: {
                      frontmatter: { title, banner },
                      fields: { slug },
                    },
                  }) => (
                    <Col
                      md={6}
                      lg={4}
                      xl={3}
                      key={title + Math.random() * 4400}
                    >
                      <Link to={`/projects${slug}`}>
                        <ProjectWrapper imageSrc={banner.childImageSharp.fluid.src}>
                          <ProjectTileTitle>{title}</ProjectTileTitle>
                        </ProjectWrapper>
                      </Link>
                    </Col>
                  ),
                )}
            </Row>
          </Container>
        )}
      />
    </Layout>
  );
};

const ProjectWrapper = styled.div`
  background: url(${({ imageSrc }) => imageSrc}) center center;
  background-size: cover;
  border: 1px solid #f3f3f3;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 10px 5px;
  border-radius: 6px;
  min-height: 75px;
  height: 75px;
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

const ProjectTileTitle = styled.h4`
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

const OtherProjects = styled.h3`
  color: white;
  padding: 15px 0;
  margin-top: 25px;
  margin-bottom: 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
`;

const StatusBadge = styled.h6`
  background-color: ${({ status }) =>
    status === 'completed' ? 'springgreen' : '#BADA55'};
  color: white;
  font-weight: bold;
  display: inline-block;
  padding: 5px 10px;
  margin: 5px 0;
  border-radius: 10px;
  text-align: center;
`;

const TechBadge = styled.h6`
  background-color: #e74c3c;
  color: white;
  font-weight: bold;
  margin: none;
  border-radius: 10px;
  max-width: 100px;
  padding: 5px 10px;
  text-align: center;
  display: inline-block;
  margin: 5px;
`;

const ProjectTitle = styled.h1`
  border: 0px;
  display: inline-block;
  color: white;
  margin: 0 15px 0 0;
  padding-bottom: 0;
`;

const ProjectLinkWrapper = styled.h2`
  padding: 15px;
  font-weight: 700;
  background-color: rgba(0, 0, 0, 0.15);
  a {
    color: #ffffff;
    font-weight: normal;
  }
`;

const RowWithBottomBorder = styled(Row)`
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  margin-bottom: 25px;
`;
const MarginRow = styled(Row)`
  margin-bottom: 25px;
`;

const TitleContainer = styled(Col)`
  display: flex;
  align-items: center;
  margin-top: 50px;
`;

const CarouselButton = styled.button`
  color: white;
  padding: 10px 15px;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  border: 0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  transition: all 120ms ease-in-out;
  transition-property: background, transform;
  outline: none;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }

  &:first-of-type {
    margin-left: 5px;
  }

  &:last-of-type {
    margin-right: 5px;
  }
`;

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        status
        url
        banner {
          childImageSharp {
            fluid(maxWidth: 1088) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        technologies
        photos {
          childImageSharp {
            fluid(maxWidth: 1088) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
      body
    }
    allMdx(
      filter: {
        fields: { slug: { ne: $slug }, isProject: { eq: true } }
      }
    ) {
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
