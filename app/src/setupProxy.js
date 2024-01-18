const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/post",
    createProxyMiddleware({
      target: "http://172.31.22.148:4100",
      changeOrigin: true,
    })
  );
  app.use(
    "/auth/twitter",
    createProxyMiddleware({
      target: "https://api.twitter.com/oauth",
      changeOrigin: true,
    })
  );
};
