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
    output: 'standalone',
    eslint: {
        // Отключаем ESLint во время сборки для Docker
        ignoreDuringBuilds: process.env.DISABLE_ESLINT_PLUGIN === 'true',
    },
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
