import React, { useState, useRef } from 'react';
import { graphql } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import Img from 'gatsby-image';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { Disqus } from 'gatsby-plugin-disqus';

import Layout from '../components/Layout';
import Link from '../components/Layout/mdx/Link';

const AuthorAndDate = styled.p`
  text-align: right;
  align-self: flex-end;
  margin: 0;
  flex-shrink: 0;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-bottom: 22px;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  position: relative;
  border-bottom: 0;
  padding: 0;
  margin: 0;
  &:hover {
    cursor: pointer;
  }
`;

const copiedAnimation = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const CopiedMessage = styled.div`
  display: block;
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 6px;
  padding: 5px 25px;
  font-size: 16px;
  color: white;
  font-weight: 700;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  animation: ${copiedAnimation}
    ${({ copyAnimMs }) => `${copyAnimMs}ms`} ease-in;
`;

const BannerContainer = styled.div`
  position: relative;
`;

const CreditBadge = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: block;
  margin: 0 15px 15px 0;
  background: rgba(0, 0, 0, 0.3);
  padding: 5px 10px;
  font-size: 12px;
  color: white;
  border: 1px solid rgba(50, 0, 0, 0.5);
  border-radius: 6px;
  transition: transform 75ms ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.04);
  }
`;

export const CategoryList = ({ list, isSmall }) =>
  list && list.length ? (
    <div style={{ ...(isSmall ? { fontSize: '14px' } : {}) }}>
      Tags:{' '}
      {list.map((category, i) => {
        const lowerCaseCat = category.toLowerCase();
        return (
          <div
            key={lowerCaseCat}
            style={{
              display: 'inline-block',
              marginRight: '5px',
              marginBottom: '15px',
            }}
          >
            <Link
              className="category-link"
              to={`categories/${lowerCaseCat}`}
            >
              {category}
            </Link>
            {i < list.length - 1 ? ', ' : ''}
          </div>
        );
      })}
    </div>
  ) : null;

export default function Post({
  data: { site, mdx },
  pageContext: { next, prev },
  location: { pathname },
}) {
  const { siteUrl } = site.siteMetadata;
  const [copyAnim, setCopyAnim] = useState(false);
  const copyAnimMs = 1300;
  const timerRef = useRef(null);
  const startCopyAnim = () => {
    if (timerRef.current) {
      setCopyAnim(false);
      clearTimeout(timerRef.current);
    }

    setCopyAnim(true);
    timerRef.current = setTimeout(
      () => setCopyAnim(false),
      copyAnimMs,
    );
  };

  const copyToClipboard = () => {
    startCopyAnim();
    const textArea = document.createElement('textarea');
    textArea.value = `${siteUrl}/${mdx.frontmatter.slug}`.replace(
      '//',
      '/',
    );
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  };

  const disqusConfig = {
    identifier: mdx.fields.id,
    title: mdx.frontmatter.title,
  };
  return (
    <Layout
      pathname={pathname}
      site={site}
      frontmatter={mdx.frontmatter}
      useWhitePageWrapper
    >
      <TitleContainer>
        <Title>
          {copyAnim ? (
            <CopiedMessage copyAnimMs={copyAnimMs}>
              Copied Post URL to Clipboard!
            </CopiedMessage>
          ) : null}
          <a
            role="button"
            aria-label="Copy Post URI to Clipboard"
            onClick={copyToClipboard}
          >
            {mdx.frontmatter.title}
          </a>
        </Title>
        <AuthorAndDate>
          {!mdx.fields.static ? (
            <em>{mdx.frontmatter.date}</em>
          ) : null}
        </AuthorAndDate>
      </TitleContainer>

      {mdx.frontmatter.banner && (
        <BannerContainer>
          <Img
            sizes={mdx.frontmatter.banner.childImageSharp.sizes}
            alt={site.siteMetadata.keywords.join(', ')}
          />
          {mdx.frontmatter.photographer && (
            <Link to={mdx.frontmatter.photographerUrl}>
              <CreditBadge>
                Photo by {mdx.frontmatter.photographer}
              </CreditBadge>
            </Link>
          )}
        </BannerContainer>
      )}

      <MDXRenderer>{mdx.code.body}</MDXRenderer>

      <div>
        <CategoryList list={mdx.fields.categories} />
        <hr />
        {!mdx.fields.static ? (
          <>
            <Disqus config={disqusConfig} />
            <hr />
            {prev && (
              <span>
                Previous:{' '}
                <Link to={prev.fields.slug}>{prev.fields.title}</Link>
              </span>
            )}
            {next && prev && ' | '}
            {next && (
              <span>
                Next:{' '}
                <Link to={next.fields.slug}>{next.fields.title}</Link>
              </span>
            )}
          </>
        ) : null}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      ...site
      siteMetadata {
        siteUrl
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        author
        photographer
        photographerUrl
        date(formatString: "MMMM DD, YYYY")
        banner {
          childImageSharp {
            sizes(maxWidth: 720) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        slug
      }
      fields {
        id
        static
        categories
        keywords
      }
      code {
        body
      }
    }
  }
`;
