import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider } from 'styled-components';
import 'prismjs/themes/prism-okaidia.css';

import Header from '../Header';
import Footer from '../Footer';
import { GlobalStyles, PageWrapper } from './styles';
import { MDXLayoutComponents, MDXGlobalComponents } from './mdx';

export default ({
  site,
  frontmatter = {},
  pathname,
  children,
  useWhitePageWrapper,
}) => {
  const {
    title,
    description: siteDescription,
    keywords: siteKeywords,
  } = site.siteMetadata;

  const {
    keywords: frontmatterKeywords,
    description: frontmatterDescription,
  } = frontmatter;

  const keywords = (frontmatterKeywords || siteKeywords).join(', ');
  const description = frontmatterDescription || siteDescription;

  return (
    <ThemeProvider
      theme={{
        colours: {
          ORANGE: '#e2662c',
        },
      }}
    >
      <>
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: description },
            { name: 'keywords', content: keywords },
          ]}
        >
          <html lang="en" />
          <link
            rel="stylesheet"
            href="https://use.typekit.net/mxs6bub.css"
          />
          <script
            defer
            src="https://pro.fontawesome.com/releases/v5.0.10/js/all.js"
            integrity="sha384-+1nLPoB0gaUktsZJP+ycZectl3GX7wP8Xf2PE/JHrb7X1u7Emm+v7wJMbAcPr8Ge"
            crossorigin="anonymous"
          />
        </Helmet>
        <GlobalStyles />
        <Header pathname={pathname} />
        <PageWrapper useWhitePageWrapper={useWhitePageWrapper}>
          <MDXProvider
            components={{
              ...MDXLayoutComponents,
              ...MDXGlobalComponents,
            }}
          >
            {children}
          </MDXProvider>
        </PageWrapper>
        <Footer
          links={[
            {
              href: 'mailto:hello@leemulvey.com',
              label: '💌 contact',
            },
            {
              href: 'https://www.leemulvey.com/blog',
              label: '📓 blog',
            },
            {
              href: 'https://www.twitter.com/leemulvey',
              label: '🐦 twitter',
              target: '_blank',
            },
            {
              href: 'https://www.github.com',
              label: '👨🏼‍💻 github',
              target: '_blank',
            },
          ]}
        />
      </>
    </ThemeProvider>
  );
};

export const pageQuery = graphql`
  fragment site on Site {
    siteMetadata {
      title
      description
      author
      keywords
    }
  }
`;
