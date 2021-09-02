import express from 'express';
import { IController } from "./types";
import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

import ImageService from '../services/ImageService';
import CountryService from '../services/CountryService';
import CatalogService from '../services/CatalogService';
import CompanyService from '../services/CompanyService';
import PageService from '../services/PageService';
import MenuService from '../services/MenuService';
import SliderService from '../services/SliderService';

export default class MainController implements IController {
    public path = '/api/admin';
    public router = express.Router();
    private pass = "";
    private login: string = "";
    private salt: string = ``; 
    private token: string;
    public uploadData;

    constructor() {
        this.token = crypto.pbkdf2Sync(this.pass, this.salt, 10000, 64, `sha512`).toString(`hex`);

        const format = [
            'png',
            'jpg',
            'jpeg'
        ];
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path.join(__dirname, '../../static/originals'))
            },
            filename: function (req, file, cb) {
                let NumChar = -1;
                for (let i = 0; i < format.length; i++) {
                    let char = file.originalname.toLowerCase().lastIndexOf(format[i]);
                    if (char != -1) {
                        NumChar = char;
                        break;
                    }
                }
                let memetipe = file.originalname.slice(NumChar - 1);
                cb(null, Date.now() + memetipe)
            }
        });

        this.uploadData = multer({ storage: storage });

        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.all('*', function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', '*');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        });
        this.router.post(`${this.path}/authorization`, this.authorization.bind(this));
        this.router.post(`${this.path}/add-image`, this.uploadData.any(), this.addImage.bind(this));
        this.router.post(`${this.path}/add-image-text`, this.uploadData.any(), this.addImageText.bind(this));
        this.router.post(`${this.path}/add-country`, this.addCountry.bind(this));
        this.router.post(`${this.path}/add-company`, this.addCompany.bind(this));
        this.router.post(`${this.path}/add-catalog`, this.addCatalog.bind(this));
        this.router.post(`${this.path}/add-menu`, this.addMenu.bind(this));
        this.router.post(`${this.path}/add-page`, this.addPage.bind(this));
        this.router.post(`${this.path}/update-menu`, this.updateMenu.bind(this));
        this.router.post(`${this.path}/update-slider`, this.updateSlider.bind(this));
        this.router.post(`${this.path}/update-country`, this.updateCountry.bind(this));
        this.router.post(`${this.path}/update-page`, this.updatePage.bind(this));
        this.router.post(`${this.path}/update-company`, this.updateCompany.bind(this));
        this.router.post(`${this.path}/update-catalog`, this.updateCatalog.bind(this));
        this.router.post(`${this.path}/delete-country`, this.deleteCountry.bind(this));
        this.router.post(`${this.path}/delete-company`, this.deleteCompany.bind(this));
        this.router.post(`${this.path}/delete-catalog`, this.deleteCatalog.bind(this));
        this.router.post(`${this.path}/delete-page`, this.deletePage.bind(this));
        this.router.post(`${this.path}/delete-menu`, this.deletePage.bind(this));
    }

    private checkAuth(token: string) {
        return (token === ('Bearer ' + this.token)) ? true : false;
    }

    private authorization(request: express.Request, response: express.Response) {
        if ((request.body.login === this.login) && (request.body.pass === this.pass)) {
            response.status(200).send({ "token": this.token });
        }
        else {
            response.status(216).send({ "Status": "Отказано в доступе" });
        }
    }

    private async addImage(request: express.Request, response: express.Response) {
        if (this.checkAuth(request.headers.authorization)) {
            await new ImageService(request.files[0].path).resize(request.files[0].filename);
            response.status(200).send(request.files[0].filename);
        } else {
            response.status(216).send({ "Status": "Отказано в доступе" });
        }
    }

    private async addImageText(request: express.Request, response: express.Response) {
        if (this.checkAuth(request.headers.authorization)) {
            response.status(200).send( await new ImageService(request.files[0].path).resizeToText(request.files[0].filename));
        } else {
            response.status(216).send({ "Status": "Отказано в доступе" });
        }
    }

    private async addCountry(request: express.Request, response: express.Response) {
        if (this.checkAuth(request.headers.authorization)) {
            if (await new CountryService().add(request.body.name, request.body.code)) {
                response.status(200).send();
            } else {
                response.status(500).send();
            }
        } else {
            response.status(216).send({ "Status": "Отказано в доступе" });
        }
    }

    private async addCompany(request: express.Request, response: express.Response) {
        if (this.checkAuth(request.headers.authorization)) {
            if (await new CompanyService().add(request.body.name)) {
                response.status(200).send();
            } else {
                response.status(500).send();
            }
        } else {
            response.status(216).send({ "Status": "Отказано в доступе" });
        }
    }
    private async addCatalog(request: express.Request, response: express.Response) {
        if (this.checkAuth(request.headers.authorization)) {
            let body = request.body;
            if (await new CatalogService().add(
                body.countryId,
                body.companyId,
                body.startDate,
                body.endDate,
                body.pages,
                body.name

            )) {
                response.status(200).send();
            } else {
                response.status(500).send();
            }
        } else {
            response.status(216).send({ "Status": "Отказано в доступе" });
        }
    }

    private async addMenu(request: express.Request, response: express.Response) {
        if (this.checkAuth(request.headers.authorization)) {
            let body = request.body;
            if (await new MenuService().add(
                body.mobile,
                body.menu,
                body.countryId,
                body.companyId
            )) {
                response.status(200).send();
            } else {
                response.status(500).send();
            }
        } else {
            response.status(216).send({ "Status": "Отказано в доступе" });
        }
    }

    private async addPage(request: express.Request, response: express.Response) {
        if (this.checkAuth(request.headers.authorization)) {
            let body = request.body;
            if (await new PageService().add(
                body.title,
                body.metaTitle,
                body.metaDescription,
                body.href,
                body.catalogId,
                body.companyId,
                body.countryId,
                body.text

            )) {
                response.status(200).send();
            } else {
                response.status(500).send();
            }
        } else {
            response.status(216).send({ "Status": "Отказано в доступе" });
        }
    }

    private async updateMenu(request: express.Request, response: express.Response) {
        if (this.checkAuth(request.headers.authorization)) {
            if (await new MenuService().update(request.body.menu, request.body.id)) {
                response.status(200).send();
            } else {
                response.status(500).send();
            }
        } else {
            response.status(216).send({ "Status": "Отказано в доступе" });
        }
    }

    private async updateSlider(request: express.Request, response: express.Response) {
        if (this.checkAuth(request.headers.authorization)) {
            if (await new SliderService().update(request.body.id, request.body.slides)) {
                response.status(200).send();
            } else {
                response.status(500).send();
            }
        } else {
            response.status(216).send({ "Status": "Отказано в доступе" });
        }
    }

    private async updateCountry(request: express.Request, response: express.Response) {
        if (this.checkAuth(request.headers.authorization)) {
            if (await new CountryService().update(request.body.name, request.body.code, request.body.id)) {
                response.status(200).send();
            } else {
                response.status(500).send();
            }
        } else {
            response.status(216).send({ "Status": "Отказано в доступе" });
        }
    }

    private async updatePage(request: express.Request, response: express.Response) {
        if (this.checkAuth(request.headers.authorization)) {
            let body = request.body;
            if (await new PageService().update(
                body.id,
                body.title,
                body.metaTitle,
                body.metaDescription,
                body.href,
                body.catalogId,
                body.companyId,
                body.countryId,
                body.text

            )) {
                response.status(200).send();
            } else {
                response.status(500).send();
            }
        } else {
            response.status(216).send({ "Status": "Отказано в доступе" });
        }
    }

    private async updateCompany(request: express.Request, response: express.Response) {
        if (this.checkAuth(request.headers.authorization)) {
            if (await new CompanyService().update(request.body.name, request.body.id)) {
                response.status(200).send();
            } else {
                response.status(500).send();
            }
        } else {
            response.status(216).send({ "Status": "Отказано в доступе" });
        }
    }

    private async updateCatalog(request: express.Request, response: express.Response) {
        if (this.checkAuth(request.headers.authorization)) {
            let body = request.body;
            if (await new CatalogService().update(
                body.id,
                body.countryId,
                body.companyId,
                body.startDate,
                body.endDate,
                body.pages,
                body.name

            )) {
                response.status(200).send();
            } else {
                response.status(500).send();
            }
        } else {
            response.status(216).send({ "Status": "Отказано в доступе" });
        }
    }

    private async deleteCompany(request: express.Request, response: express.Response) {
        if (this.checkAuth(request.headers.authorization)) {
            if (await new CompanyService().remove(request.body.id)) {
                response.status(200).send();
            } else {
                response.status(500).send();
            }
        } else {
            response.status(216).send({ "Status": "Отказано в доступе" });
        }
    }

    private async deleteCountry(request: express.Request, response: express.Response) {
        if (this.checkAuth(request.headers.authorization)) {
            if (await new CountryService().remove(request.body.id)) {
                response.status(200).send();
            } else {
                response.status(500).send();
            }
        } else {
            response.status(216).send({ "Status": "Отказано в доступе" });
        }
    }

    private async deleteCatalog(request: express.Request, response: express.Response) {
        if (this.checkAuth(request.headers.authorization)) {
            if (await new CatalogService().remove(request.body.id)) {
                response.status(200).send();
            } else {
                response.status(500).send();
            }
        } else {
            response.status(216).send({ "Status": "Отказано в доступе" });
        }
    }

    private async deletePage(request: express.Request, response: express.Response) {
        if (this.checkAuth(request.headers.authorization)) {
            if (await new PageService().remove(request.body.id)) {
                response.status(200).send();
            } else {
                response.status(500).send();
            }
        } else {
            response.status(216).send({ "Status": "Отказано в доступе" });
        }
    }

    private async deleteMenu(request: express.Request, response: express.Response) {
        if (this.checkAuth(request.headers.authorization)) {
            if (await new MenuService().remove(request.body.id)) {
                response.status(200).send();
            } else {
                response.status(500).send();
            }
        } else {
            response.status(216).send({ "Status": "Отказано в доступе" });
        }
    }
}
