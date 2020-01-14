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
        cssModules: true,
        env: {
            RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY || "6LfHvc4UAAAAAI275hg7EJ1PTh306xm_5R9PyKoO"
        }
    })
