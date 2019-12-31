module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    siteUrl: 'http://www.leemulvey.com',
    author: 'Lee Mulvey',
    title: 'Lee Mulvey | Web Developer',
    description:
      'Lee Mulvey is a web developer from Calgary, Alberta with experience in full-stack development including JavaScript, React, Redux, ES6, HTML, CSS, NextJS, GraphQL',
    keywords: [
      'web developer',
      'developer',
      'freelance',
      'react',
      'redux',
      'node',
      'javascript',
      'css',
      'html',
      'ruby',
      'rails',
      'postgresql',
      'mongodb',
      'gatsby',
      'graphql',
      'gql',
      'software engineer',
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/projects`,
        name: 'projects',
      },
    },
    {
      resolve: 'gatsby-plugin-disqus',
      options: {
        shortname: 'leemulvey-com',
      },
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name:
          'Lee Mulvey is a web developer from Calgary, Alberta with experience in full-stack development including JavaScript, React, Redux, ES6, HTML, CSS, NextJS, GraphQL',
        short_name: 'LMulvey',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#525dce',
        display: 'standalone',
        icon: 'assets/icon.png',
      },
    },
    'gatsby-plugin-offline',
  ],
};
