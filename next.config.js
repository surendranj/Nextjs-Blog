/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["source.unsplash.com"],
    },
    env: {
        GRAPHCMS_ENDPOINT: process.env.GRAPHCMS_ENDPOINT,
        GRAPHCMS_TOKEN: process.env.GRAPHCMS_TOKEN,
    },
};

module.exports = nextConfig;
