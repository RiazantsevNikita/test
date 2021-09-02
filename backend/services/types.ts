import * as models from '../models/types';

export interface ICountryService {
    add: (name: string, code: string) => Promise<boolean>,
    update: (name: string, code: string, id: string) => Promise<boolean>,
    remove: (id: string) => Promise<boolean>,
    getAll: () => Promise<Array<models.ICountry>>,
}

export interface IMenuService {
    add: (mobile: boolean, menu: Array<any>, countryId: string, companyId: string) => Promise<boolean>,
    update: (menu: Array<any>, id: string) => Promise<boolean>,
    remove: (id: string) => Promise<boolean>,
    getAll: () => Promise<Array<models.IMenu>>,
}

export interface ICompanyService {
    add: (name: string) => Promise<boolean>,
    update: (name: string, id: string) => Promise<boolean>,
    remove: (id: string) => Promise<boolean>,
    getAll: () => Promise<Array<models.ICompany>>,
}

export interface ICatalogService {
    add: (
        countryId: string, 
        companyId: string, 
        startDate: Date, 
        endDate: Date, 
        pages: Array<string>, 
        name: string) => Promise<boolean>,
    update: (
        id: string, 
        countryId: string, 
        companyId: string, 
        startDate: Date, 
        endDate: Date, 
        pages: Array<string>, 
        name: string) => Promise<boolean>,
    remove: (id: string) => Promise<boolean>,
    getAll: () => Promise<Array<models.ICatalog>>,
    getById: (id: string) => Promise<models.ICatalog>
}

export interface IPageService {
    add: (
        title: string,
        metaTitle: string,
        metaDescription: string, 
        href: string, 
        catalogId: string | null, 
        companyId: string, 
        countryId: string, 
        text: string) => Promise<boolean>,
    update: (
        id: string, 
        title: string,
        metaTitle: string,
        metaDescription: string, 
        href: string, 
        catalogId: string | null, 
        companyId: string, 
        countryId: string, 
        text: string) => Promise<boolean>,
    remove: (id: string) => Promise<boolean>,
    getAll: () => Promise<Array<models.IPage>>
    getById: (id: string) => Promise<models.IPage>
    getByHref: (href: string) => Promise<Array<models.IPage>>
}

export interface ISliderService {
    update: (id: string, slides: Array<string>) => Promise<boolean>,
    get: () => Promise<models.ISlider>
}