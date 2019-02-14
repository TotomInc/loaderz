import rollupPluginNodeResolve from 'rollup-plugin-node-resolve';
import rollupPluginCommonjs from 'rollup-plugin-commonjs';
import rollupPluginSourcemaps from 'rollup-plugin-sourcemaps';
import lodashCamelcase from 'lodash.camelcase';
import rollupPluginTypescript2 from 'rollup-plugin-typescript2';
import rollupPluginJson from 'rollup-plugin-json';

const pkg = require('./package.json');

const libraryName = 'loaderz';

export default {
  input: `src/${libraryName}.ts`,
  output: [
    { file: pkg.main, name: lodashCamelcase(libraryName), format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],

  watch: {
    include: 'src/**',
  },

  plugins: [
    // Allow json resolution
    rollupPluginJson(),

    // Compile TypeScript files
    rollupPluginTypescript2({
      useTsconfigDeclarationDir: true,
      // By default we use `commonjs` in the `tsconfig`, we must use `es2015`
      // or `esnext` when bundling the module
      tsconfigOverride: {
        compilerOptions: {
          module: 'es2015',
        },
      },
    }),

    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    rollupPluginCommonjs(),

    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    rollupPluginNodeResolve(),

    // Resolve source maps to the original source
    rollupPluginSourcemaps(),
  ],
};
