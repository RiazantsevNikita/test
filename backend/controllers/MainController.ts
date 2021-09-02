import express from 'express';
import {IController} from "./types";

import CountryService from '../services/CountryService';
import CatalogService from '../services/CatalogService';
import CompanyService from '../services/CompanyService';
import PageService from '../services/PageService';
import MenuService from '../services/MenuService';
import SliderService from '../services/SliderService';

export default class MainController implements IController {
    public path = '/api';
    public router = express.Router();

    constructor() {    
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.all('*', function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', '*');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        });
        this.router.post(`${this.path}/get-all-contries`, this.getAllCountries);
        this.router.post(`${this.path}/get-all-companies`, this.getAllCompanies);
        this.router.post(`${this.path}/get-all-catalogs`, this.getAllCatalogs);
        this.router.post(`${this.path}/get-all-pages`, this.getAllPages);
        this.router.post(`${this.path}/get-all-menu`, this.getAllMenu);
        this.router.post(`${this.path}/get-menu`, this.getMenu);
        this.router.post(`${this.path}/get-id-catalog`, this.getCatalogsById);
        this.router.post(`${this.path}/get-id-page`, this.getPageById);
        this.router.post(`${this.path}/get-href-page`, this.getPageByHref);
        this.router.post(`${this.path}/get-slider`, this.getSlider);
    }

    private async getAllCountries(request: express.Request, response: express.Response) {
        let res = await new CountryService().getAll();
        response.status(200).send(res);
    }

    private async getAllCompanies(request: express.Request, response: express.Response) {
        let res = await new CompanyService().getAll();
        response.status(200).send(res);
    }

    private async getAllCatalogs(request: express.Request, response: express.Response) {
        let res = await new CatalogService().getAll();
        response.status(200).send(res);
    }

    private async getAllMenu(request: express.Request, response: express.Response) {
        let res = await new MenuService().getAll();
        response.status(200).send(res);
    }

    private async getMenu(request: express.Request, response: express.Response) {
        let res = await new MenuService().getOne(request.body.id);
        response.status(200).send(res);
    }

    private async getSlider(request: express.Request, response: express.Response) {
        let res = await new SliderService().get();
        response.status(200).send(res);
    }

    private async getCatalogsById(request: express.Request, response: express.Response) {
        let res = await new CatalogService().getById(request.body.id);
        response.status(200).send(res);
    }

    private async getAllPages(request: express.Request, response: express.Response) {
        let res = await new PageService().getAll();
        response.status(200).send(res);
    }

    private async getPageById(request: express.Request, response: express.Response) {
        let res = await new PageService().getById(request.body.id);
        response.status(200).send(res);
    }

    private async getPageByHref(request: express.Request, response: express.Response) {
        let res = await new PageService().getByHref(request.body.href);
        response.status(200).send(res);
    }
}

