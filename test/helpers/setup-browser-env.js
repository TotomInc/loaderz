import browserEnv from 'browser-env';

/**
 * browser-env will add all global browser variables to the Node.js global
 * scope, creating a full browser environment. We can pass an array of global
 * browser globals if we know exactly what we need as a parameter of
 * `browserEnv`.
 */
browserEnv(['window', 'document'], {
  resources: 'usable',
});
