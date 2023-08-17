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

module.exports = config;
