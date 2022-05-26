const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	basePath: process.env.BASE_PATH,
	i18n,
	swcMinify: false,
	images: {
		domains: ['lh3.googleusercontent.com', 'img.seadn.io'],
	},
};

module.exports = nextConfig;
