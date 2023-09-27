const express = require('express');
// const authRoute = require('/routes/v1/auth.route');
// const userRoute = require('/routes/v1/user.route');
// const docsRoute = require('/routes/v1/docs.route');
const urlRoute = require('./shortenedUrl.route')
const config = require('../../config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/urls',
    route: urlRoute,
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/urls',
    route: urlRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.NODE_ENV === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
