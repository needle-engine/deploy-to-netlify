import * as path from 'path';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig(async ({ command }) => {

    const { needlePlugins, useGzip, loadConfig } = await import("@needle-tools/engine/plugins/vite/index.js");
    const needleConfig = await loadConfig();

    return {
        base: "./",
        assetsInclude: ['*'],
        plugins: [
            basicSsl(),
            // make sure to NOT use gzip when deploying to netlify
            // useGzip(needleConfig) ? viteCompression({ deleteOriginFile: true }) : null,
            needlePlugins(command, needleConfig),
        ],

        server: {
            // hmr: false,
            // watch: ["generated/**"]
            https: true,
            proxy: { // workaround: specifying a proxy skips HTTP2 which is currently problematic in Vite since it causes session memory timeouts.
                'https://localhost:3000': 'https://localhost:3000'
            },
            watch: {
                awaitWriteFinish: {
                    stabilityThreshold: 500,
                    pollInterval: 1000
                }
            },
            strictPort: true,
            port: 3000,
        },
        build: {
            outDir: "./dist",
            emptyOutDir: true,
            keepNames: true,
        }
    }
});
