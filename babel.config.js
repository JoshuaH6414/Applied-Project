module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    overrides: [
      {
        test: ['./node_modules/firebase/firestore/dist/index.esm.js'],
        presets: [['@babel/preset-env', { modules: 'commonjs' }]],
      },
    ],
  };
};

