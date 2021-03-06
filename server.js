const express = require('express');
const path = require('path');
const fs = require('fs');
const vueServerRenderer = require('vue-server-renderer');
const setupDevServer = require('./config/setup-dev-server');

require('dotenv').config();

const port = 3010;
const app = express();

const createRenderer = (bundle) =>
    vueServerRenderer.createBundleRenderer(bundle, {
        runInNewContext: false,
        template: fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
    });
let renderer;

// you may want to serve static files with nginx or CDN in production
// app.use('/dist', express.static(path.resolve(__dirname, './dist')));

if (process.env.NODE_ENV === 'development') {
    setupDevServer(app, (serverBundle) => {
        renderer = createRenderer(serverBundle);
    });
} else {
    renderer = createRenderer(require('./dist/vue-ssr-server-bundle.json'));
}

app.get('*', async (req, res) => {
    const context = {
        url: req.params['0'] || '/',
        state: {
            country: {}
        }
    };
    let html;

    try {
        html = await renderer.renderToString(context);
    } catch (error) {
        console.log(error);
        if (error.code === 404) {
            return res.status(404).send('404 | Page Not Found');
        }
        return res.status(500).send('500 | Internal Server Error');
    }

    res.end(html);
});

app.listen(port, () => console.log(`Listening on: ${port}`));