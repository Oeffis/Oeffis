const config = {
  files: {
    babelRegister: {
      enabled: true,
      options: {
        presets: ["@babel/env", "@babel/preset-typescript"]
      }
    }
  },
  mock: {
    collections: {
      selected: "base"
    }
  }
};

// eslint-disable-next-line no-undef
module.exports = config;
