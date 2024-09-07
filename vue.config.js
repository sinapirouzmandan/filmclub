module.exports = {
    pwa: {
        workboxPluginMode: "InjectManifest",
        workboxOptions: {
            swSrc: "src/service-worker.js"
        }
    },
    configureWebpack: {
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        }
    }
}