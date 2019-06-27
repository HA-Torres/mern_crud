module.exports = {
    entry: './src/views/index.js',
    output: {
        path: __dirname + '/src/public',
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};