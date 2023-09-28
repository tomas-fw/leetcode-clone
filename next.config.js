/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals = [...config.externals, 'jsdom'];
        return config;
    },
};

module.exports = nextConfig;
