const routes = module.exports = require('next-routes')()

routes
  .add('about', '/about/', 'About')
  .add('homepage', '/', 'Explorer')
  .add('block', '/block/:index', 'Block')
  .add('transfer', '/transfer/', 'Transfer')
  .add('account', '/account/:address', 'Account')
