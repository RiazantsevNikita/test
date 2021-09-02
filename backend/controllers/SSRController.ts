import express from 'express';
import {IController} from "./types";
import path from 'path';
import fs from 'fs';
import * as vueServerRenderer from 'vue-server-renderer';
import setupDevServer from '../../config/setup-dev-server.js';


export default class SSRController implements IController {
    public path = '/';
    public router = express.Router();
    public renderer: vueServerRenderer.BundleRenderer;

    constructor() {
        this.intializeRoutes();
        if (process.env.NODE_ENV === 'development') {
            setupDevServer(this.router, (serverBundle: any) => {
                this.renderer = this.createRenderer(serverBundle);
            });
        } else {
            this.renderer = this.createRenderer(require('../../dist/vue-ssr-server-bundle.json'));
        }
    }

    public intializeRoutes() {
        this.router.all('*', function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', '*');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        });
        this.router.get(`*`, this.SSRRender.bind(this));
    }

    public createRenderer = (bundle: string | object) => 
        vueServerRenderer.createBundleRenderer(bundle, {
            runInNewContext: false,
            template: fs.readFileSync(path.join(__dirname, '../../index.html'), 'utf-8')
        });

    public async SSRRender (req: express.Request, res: express.Response) {
        const context = {
            url: req.params['0'] || '/',
            state: {
                country: {}
            }
        };
        let html;
        try {
            html = await this.renderer.renderToString(context);
        } catch (error) {
            console.log(error);
            if (error.code === 404) {
                return res.status(404).send('404 | Page Not Found');
            }
            return res.status(500).send('500 | Internal Server Error');
        }
    
        return res.end(html);
    }
}