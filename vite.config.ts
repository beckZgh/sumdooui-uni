import path            from 'path'
import { defineConfig } from 'vite'

import uni     from '@dcloudio/vite-plugin-uni'
import inject  from '@rollup/plugin-inject'
import resolve from '@rollup/plugin-node-resolve'

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '#': path.resolve(__dirname, 'typings'),
        },
    },
    plugins: [
        uni(),
        resolve() as any,
        inject({
            $utils: path.resolve('./src/utils/index.ts'),
        }),
    ],
})
