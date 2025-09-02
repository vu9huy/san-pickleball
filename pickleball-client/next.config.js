/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";
import createMDX from '@next/mdx';

const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "**",
            },
            {
                protocol: "http",
                hostname: "res.cloudinary.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "cdn.shopify.com",
                pathname: "**",

            },
        ],
        // unoptimized: true,
    },
    output: 'standalone',

    // Config svgr package
    // webpack(config) {
    //     config.module.rules.push({
    //         test: /\.svg$/,
    //         use: ["@svgr/webpack"]
    //     });
    //     return config;
    // },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Referrer-Policy",
                        value: "no-referrer-when-downgrade",
                    },
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin-allow-popups",
                    },
                    // {
                    //     key: "Cross-Origin-Embedder-Policy",
                    //     value: "require-corp", // Optional: only needed if you want to handle COEP as well
                    // },
                ],
            },
        ];
    },

    // Config MDX
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

    compiler: {
        styledComponents: true
    }
};

const withMDX = createMDX({
    // Add markdown plugins here, as desired
})


// export default bundleAnalyzer(nextConfig);
// export default withMDX(nextConfig);

export default bundleAnalyzer(withMDX(nextConfig));

