/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nadiabaptista.pt',
  generateRobotsTxt: true, // Optional: generate robots.txt file
  sitemapSize: 7000, // Split sitemap if it exceeds this limit
  exclude: ['/admin/*', '/secret-page'], // Optional: pages to exclude
};
