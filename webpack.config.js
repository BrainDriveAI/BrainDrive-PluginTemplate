const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

// =============================================================================
// TEMPLATE: Customize these values for your plugin
// CRITICAL: PLUGIN_NAME and PLUGIN_MODULE_NAME must be DIFFERENT!
// See RENAME_CHECKLIST.md for complete renaming instructions
// =============================================================================
const PLUGIN_NAME = "PluginTemplate"; // TODO: Change to your plugin name
const PLUGIN_MODULE_NAME = "PluginTemplateModule"; // TODO: Change to your module name (MUST differ from PLUGIN_NAME!)
const PLUGIN_PORT = 3003; // TODO: Change to an available port

module.exports = {
  mode: "development",
  entry: "./src/index",
  output: {
    //path: path.resolve(__dirname, '/Your BrainDrive Dev/BrainDrive/backend/plugins/shared/PluginTemplate/v1.0.0/dist'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: "auto",
    clean: true,
    library: {
      type: 'var',
      name: PLUGIN_NAME
    }
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: PLUGIN_NAME,
      library: { type: "var", name: PLUGIN_NAME },
      filename: "remoteEntry.js",
      exposes: {
        // TEMPLATE: Must match module name from lifecycle_manager.py (not plugin name)
        [`./` + PLUGIN_MODULE_NAME]: "./src/index",
        "./SettingsExample": "./src/components/SettingsExample",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
          eager: true
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
          eager: true
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    port: PLUGIN_PORT,
    static: {
      directory: path.join(__dirname, "public"),
    },
    hot: true,
  },
};
