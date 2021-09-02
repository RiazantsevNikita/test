import Company from '../models/Company';
import Country from '../models/Countries';
import Catalog from '../models/Catalogs';
import Page from '../models/Page';
import { ICompany, ICountry, ICatalog, IPage } from '../models/types';
import { IPageService } from './types';
import mongoose from "mongoose";
import * as models from '../models/types';

export default class PageService implements IPageService {
    public async add(
            title: string,
            metaTitle: string,
            metaDescription: string,
            href: string, 
            catalogId: string | null, 
            companyId: string, 
            countryId: string, 
            text: string): Promise<boolean> {
        console.log(companyId);
        let company: ICompany & mongoose.Document = await Company.findOne({ '_id': companyId });
        if (company === null) {
            throw new Error("This company is not found");
        }
        let country: ICountry & mongoose.Document = await Country.findOne({ '_id': countryId });
        if (country === null) {
            throw new Error("This country is not found");
        }
        let catalog: (ICatalog & mongoose.Document) | null = null;
        if (catalogId.length !== 0 && catalogId !== null) {
            catalog = await Catalog.findOne({ '_id': catalogId });
        }
        let page: IPage = {
            title: title,
            metaTitle: metaTitle,
            metaDescription: metaDescription,
            href: href,
            company: company._id,
            country: country._id,
            catalog: null,
            text: text
        };
        if (catalog !== null) {
            page.catalog = catalog._id;
        }
        let newPage = new Page(page);
        return await newPage.save()
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            })
    }
    public async update(
            id: string, 
            title: string,
            metaTitle: string,
            metaDescription: string, 
            href: string, 
            catalogId: string | null, 
            companyId: string, 
            countryId: string, 
            text: string): Promise<boolean> {
        let company: ICompany & mongoose.Document = await Company.findOne({ '_id': companyId });
        if (company === null) {
            throw new Error("This company is not found");
        }
        let country: ICountry & mongoose.Document = await Country.findOne({ '_id': countryId });
        if (country === null) {
            throw new Error("This country is not found");
        }
        let catalog: (ICatalog & mongoose.Document) | null = null;
        if (catalogId.length !== 0 && catalogId !== null) {
            catalog = await Catalog.findOne({ '_id': catalogId });
            if (country === null) {
                throw new Error("This catalog is not found");
            }
        }
        try {
            if (catalog === null) {
                await Page.findOneAndUpdate({ '_id': id }, {
                    $set:
                    {
                        "title": title,
                        "metaTitle": metaTitle,
                        "metaDescription": metaDescription,
                        "href": href,
                        "company": company._id,
                        "country": country._id,
                        "catalog": null,
                        "text": text
                    }
                });
            } else {
                await Page.findOneAndUpdate({ '_id': id }, {
                    $set:
                    {
                        "title": title,
                        "metaTitle": metaTitle,
                        "metaDescription": metaDescription,
                        "href": href,
                        "company": company._id,
                        "country": country._id,
                        "catalog": catalog._id,
                        "text": text
                    }
                });
            }
            return true;
        } catch (error) {
            throw new Error(error);
        }
    }
    public async getAll(): Promise<Array<models.IPage>> {
        let res = await Page.find({}).populate("country").populate("company").populate("catalog");
        return res;
    }
    public async getById(id: string): Promise<models.IPage> {
        let res = await Page.findOne({ "_id": id }).populate("country").populate("company").populate("catalog");
        return res;
    }
    public async remove(id: string): Promise<boolean> {
        try {
            await Page.findOneAndRemove({ '_id': id });
            return true;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getByHref(href: string): Promise<Array<models.IPage>> {
        let res = await Page.find({ "href": href}).populate("country").populate("company").populate("catalog");
        return res;
    }
}