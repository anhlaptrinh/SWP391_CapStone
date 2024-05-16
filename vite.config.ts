import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  esbuild: {
    // drop: ['console', 'debugger'],
  },
  plugins: [
    react(),
    tsconfigPaths(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
    visualizer({
      open: false,
    }),
  ],
  build: {
    target: 'esnext',
    minify: 'terser',
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //       }
    //       return null;
    //     },
    //   },
    // },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
