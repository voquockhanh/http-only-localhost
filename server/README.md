# install
- yarn install
- yarn dev
- browse: localhost:8080

# config nextjs rewrite
- follow main page: https://nextjs.org/docs/api-reference/next.config.js/rewrites
- config next.config.js following:
```
module.exports = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: "http://api.{your-domain}.com:8080/:path*",
        },
      ],
    };
  },
};
```

# testing with your nextjs
- config /etc/hosts following
- 
```
127.0.0.1 {your-domain}.com
127.0.0.1 api.{your-domain}.com
```
- run both nextjs and this test server
