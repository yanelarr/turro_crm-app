/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // declare here all your variables
    API_URL: "http://127.0.0.1:5000/api/",
    TOKEN_SECRET: "MyS3cr3ctKey=3.141596",
    ROW_PER_PAGE: 12
  }  
}

module.exports = nextConfig
