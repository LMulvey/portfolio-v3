import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { Row, Col } from 'react-grid-system';
import Img from 'gatsby-image';

import Layout from '../components/Layout';
import Link from '../components/Layout/mdx/Link';
import { CategoryList } from './post';

const createRangeArray = (from = 0, to = 1) => {
  const array = [];
  for (let i = from; i <= to; i++) {
    array.push(i);
  }

  return array;
}

const Blog = ({
  location: { pathname },
  data: { site, allMdx },
  pageContext: { pagination },
}) => {
  const { page, pageCount, nextPagePath, previousPagePath } = pagination;
  const isNextAndPrev = nextPagePath && previousPagePath;
  const pages = createRangeArray(1, (pageCount - 1));
  const posts = page
  .map((id) => allMdx.edges.find((edge) => edge.node.id === id))
  .filter(
    ({
      node: {
        fields: { static: isStatic },
      },
    }) => !isStatic,
  );

  return (
    <Layout site={site} pathname={pathname}>
      {posts.map(({ node: post }) => (
        <Post key={post.id} align="center">
          {post.frontmatter.banner && (
            <ImageContainer md={12} lg={4}>
              <Img
                fluid={post.frontmatter.banner.childImageSharp.fluid}
              />
            </ImageContainer>
          )}

          <Col md={12} lg={post.frontmatter.banner ? 8 : 12}>
            <StyledTitle>
              <Link
                aria-label="Read the post"
                to={`/${post.frontmatter.slug}`}
              >
                {post.frontmatter.title}
              </Link>
            </StyledTitle>
            <small>{post.frontmatter.date}</small>
            <p>{post.frontmatter.description}</p>
            <CategoryList
              list={post.frontmatter.categories}
              isSmall
            />
          </Col>
        </Post>
      ))}

      {nextPagePath || previousPagePath ? (
        <Row style={{ marginTop: '25px' }}>
          {nextPagePath && (
            <Link
              style={{
                ...(isNextAndPrev ? { marginRight: '10px' } : {}),
              }}
              to={nextPagePath}
            >
              Next Page
            </Link>
          )}
          {isNextAndPrev && '|'}
          {previousPagePath && (
            <Link
              style={{
                ...(isNextAndPrev ? { marginLeft: '10px' } : {}),
              }}
              to={previousPagePath}
            >
              Previous Page
            </Link>
          )}
        </Row>
      ) : null}
      <Row style={{ marginTop: '15px' }}>
        {pages.map((p) => p !== page ? <Link style={{ padding: '5px' }} to={p === 1 ? `/blog` : `/blog/${p}`}>{p}</Link> : <p>{p}</p>)}
      </Row>
    </Layout>
  );
};

export default Blog;

const Post = styled(Row)`
  padding: 25px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  transition: all 150ms ease-in-out;
  transition-property: background-color, transform, box-shadow;

  &:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15);
    transform: scale(1.02);
    border-radius: 6px;
    background-color: #b2cfe0;
  }
`;

const ImageContainer = styled(Col)`
  width: 100%;
  max-width: 300px;
  padding: 15px 0;
  height: 100%;
  max-height: 300px;
  object-fit: contain;
  overflow: hidden;
`;

const StyledTitle = styled.h2`
  line-height: 2rem;
  margin-bottom: 0.5rem;

  @media screen and (max-width: 640px) {
    font-size: 1.3rem;
  }
`;

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
    allMdx {
      edges {
        node {
          id
          fields {
            static
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            banner {
              childImageSharp {
                fluid(maxWidth: 720) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            slug
            description
            categories
            keywords
          }
        }
      }
    }
  }
`;
