const dotenv = require("dotenv-extended");
const EnvironmentPlugin = require("webpack").EnvironmentPlugin;

module.exports = DotenvPlugin;

function DotenvPlugin(options) {
  this.options = options || {};

  // Load into process.env, and keep track of all the
  // keys we care about for webpack serialization.
  this.config = dotenv.load(options) || {};
}

DotenvPlugin.prototype.apply = function(compiler) {
  if (this.options.verbose) {
    const definitions = {};

    Object.keys(this.config).forEach(key => {
      if (this.config.hasOwnProperty(key)) {
        definitions[key] = process.env[key];
      }
    });

    console.log(
      "Applying dotenv configuration",
      JSON.stringify(definitions, null, 2)
    );
  }

  new EnvironmentPlugin(Object.keys(this.config)).apply(compiler);
};
