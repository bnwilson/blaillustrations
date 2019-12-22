const withCss = require('@zeit/next-css');
// Handle raw-loader for markdown files
module.exports = 
    withCss({
        webpack: function(config) {
            config.module.rules.push({
                test: /\.md$/i,
                use: 'raw-loader'
            })
            return config;
        },
        cssModules: true
    })
