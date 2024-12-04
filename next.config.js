const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.NEXT_PUBLIC_ANALYZE === 'true',
    openAnalyzer: false,
});

const runtimeCaching = require('next-pwa/cache');

const withPWA = require('next-pwa')({
    buildExcludes: [/middleware-manifest.json$/u],
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    runtimeCaching,
    skipWaiting: true,
});

const nextConfig = {
    basePath: '/test',
    async headers() {
        return [
            {
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store, max-age=0',
                    },
                ],
                source: '/api/auth/:slug',
            },
        ];
    },
};

module.exports = {
    ...nextConfig,
    ...withPWA({}),
    ...withBundleAnalyzer(),
};
