const dotenvExteneded = require('dotenv-extended');
const EnvironmentPlugin = require('webpack').EnvironmentPlugin;

module.exports = WebpackDotenvExtendedPlugin;

function WebpackDotenvExtendedPlugin(options) {
  this.options = options || {};

  console.log(options);
  // Load into process.env, and keep track of all the
  // keys we care about for webpack serialization. 
  this.config = dotenvExteneded.load(options) || {};
}

WebpackDotenvExtendedPlugin.prototype.apply = function(compiler) {
  if (this.options.verbose) {
    const definitions = {};

    Object.keys(this.config).forEach((key) => {
      if (this.config.hasOwnProperty(key)) {
        definitions[key] = process.env[key];
      }
    });

    console.log('Applying dotenv configuration', JSON.stringify(definitions, null, 2));
  }

  compiler.apply(new EnvironmentPlugin(Object.keys(this.config)));
};
