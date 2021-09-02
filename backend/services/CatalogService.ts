import Company from '../models/Company';
import Country from '../models/Countries';
import Catalog from '../models/Catalogs';
import {ICompany, ICountry, ICatalog} from '../models/types';
import {ICatalogService} from './types';
import mongoose from "mongoose";
import * as models from '../models/types';

export default class CatalogService implements ICatalogService {
    public async add(countryId: string, companyId: string, startDate: Date, endDate: Date, pages: Array<string>, name: string): Promise<boolean> {
        let company: ICompany & mongoose.Document = await Company.findOne({'_id': companyId})
        if (company === null) {
            throw new Error("This country is not found")
        }
        let country : ICountry & mongoose.Document = await Country.findOne({'_id': countryId})
        if (country === null) {
            throw new Error("This country is not found")
        }
        let catalog : ICatalog = {
            name: name,
            country: country._id,
            company: company._id,
            startDate: startDate,
            endDate: endDate,
            pages: pages
        };
        let newCatalog = new Catalog(catalog);
        return await newCatalog.save()
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            })
    }
    public async update (id: string, countryId: string, companyId: string, startDate: Date, endDate: Date, pages: Array<string>, name: string): Promise<boolean> {
        let company: ICompany & mongoose.Document = await Company.findOne({'_id': companyId})
        if (company === null) {
            throw new Error("This country is not found")
        }
        let country : ICountry & mongoose.Document = await Country.findOne({'_id': countryId})
        if (country === null) {
            throw new Error("This country is not found")
        }
        try {
            await Catalog.findOneAndUpdate({'_id': id}, {$set: 
                {   "name": name,
                    "country": country._id,
                    "company": company._id,
                    "startDate": startDate,
                    "endDate": endDate,
                    "pages": pages
                }
            });
            return true;
        } catch(error) {
            throw new Error(error);
        }
    }
    public async getAll (): Promise<Array<models.ICatalog>> {
        let res = await Catalog.find({}).populate("country").populate("company");
        return res;
    }
    public async getById (id: string): Promise<models.ICatalog> {
        let res: ICatalog & mongoose.Document = await Catalog.findOne({"_id": id}).populate("country").populate("company");
        return res;
    }
    public async remove (id: string): Promise<boolean> {
        try {
            await Catalog.findOneAndRemove({'_id': id});
            return true;
        } catch(error) {
            throw new Error(error);
        }
    }
}