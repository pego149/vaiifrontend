module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === 'production' ? '/pokec/' : '/',
  devServer: {
    proxy: {
      '/': {
        logLevel: 'debug',
        target: 'http://pego149.pythonanywhere.com/'
      }
    }
  }
}
