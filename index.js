import App from './config/config.js'

const port = process.env.APP_PORT || 8081; //default port listen


App.http.listen(port, () =>console.log(`API IS RUNNING. PORT: ${port}`));

