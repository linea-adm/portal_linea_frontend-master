module.exports = {
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }, 

  
    resolve: {
        fallback: {
          "http": require.resolve("stream-http"),
          "https": require.resolve("https-browserify"),
          "util": require.resolve("util/"),
          "zlib": require.resolve("browserify-zlib"),
          "stream": require.resolve("stream-browserify"),
          "url": require.resolve("url/"),
          "assert": require.resolve("assert/")
        }
      }

  };

  