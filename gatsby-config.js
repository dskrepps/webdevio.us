const resolveConfig = require('tailwindcss/resolveConfig');
const tailwindConfig = require('./tailwind.config.js');

const fullConfig = resolveConfig(tailwindConfig);

module.exports = {
  siteMetadata: {
    title: 'Dylan Krepps | Web Developer in York, PA',
    description: 'Portfolio of Dylan Krepps, Web Developer in York, PA',
    author: '@DSKrepps',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/portfolio`,
        name: 'portfolio',
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-anchor-links',
    'gatsby-plugin-eslint',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Dylan Krepps',
        short_name: 'starter',
        start_url: '/',
        background_color: fullConfig.theme.colors.white,
        theme_color: fullConfig.theme.colors.blue["700"],
        display: 'minimal-ui',
        icon: 'src/images/site-icon.jpg',
      },
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          require('tailwindcss')(tailwindConfig),
          require('autoprefixer'),
          ...(process.env.NODE_ENV === 'production'
            ? [require('cssnano')]
            : []),
        ],
      },
    },
  ],
};
