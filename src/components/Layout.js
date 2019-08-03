import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import 'prismjs/themes/prism-okaidia.css';

import Header from './Header';
import { GlobalStyles, PageWrapper } from './styles'
import { MDXLayoutComponents, MDXGlobalComponents } from './mdx';

export default ({ site, frontmatter = {}, children }) => {
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
          <Header />
          <PageWrapper>
      <MDXProvider
        components={{
          ...MDXLayoutComponents,
          ...MDXGlobalComponents,
        }}>
          {children}
      </MDXProvider>
      </PageWrapper>
    </>
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