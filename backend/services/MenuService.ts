import Menu from '../models/Menu'
import Company from '../models/Company';
import mongoose  from 'mongoose';
import Country from '../models/Countries';
import {IMenuService} from './types'
import * as models from '../models/types';

export default class MenuService implements IMenuService {
    public async add(mobile: boolean, menu: Array<any>, countryId: string, companyId: string): Promise<boolean> {
        let company: models.ICompany & mongoose.Document = await Company.findOne({'_id': companyId})
        if (company === null) {
            throw new Error("This country is not found")
        }
        let country : models.ICountry & mongoose.Document = await Country.findOne({'_id': countryId})
        if (country === null) {
            throw new Error("This country is not found")
        }
        let nMenu: models.IMenu = {
            mobile: mobile,
            menu: menu,
            company: company._id,
            country: country._id
        };
        let newMenu = new Menu(nMenu);
        return await newMenu.save()
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            })
    }
    public async update (menu: Array<any>, id: string): Promise<boolean> {
        try {
            await Menu.findOneAndUpdate({'_id': id}, {$set: { "menu": menu }});
            return true;
        } catch(error) {
            throw new Error(error);
        }
    }
    public async getAll (): Promise<Array<models.IMenu>> {
        let res = await Menu.find({}).populate("country").populate("company");
        return res;
    }
    public async getOne (id: string): Promise<models.IMenu> {
        let res = await Menu.findOne({"_id": id}).populate("country").populate("company");
        return res;
    }
    public async remove (id: string): Promise<boolean> {
        try {
            await Menu.findOneAndRemove({'_id': id});
            return true;
        } catch(error) {
            throw new Error(error);
        }
    }
}