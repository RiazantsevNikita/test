import Company from '../models/Company'
import {ICompany} from '../models/types'
import {ICompanyService} from './types'
import * as models from '../models/types';

export default class CounryService implements ICompanyService {
    public async add(name: string): Promise<boolean> {
        let company: ICompany = {
            name: name
        };
        let newCompany = new Company(company);
        return await newCompany.save()
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            })
    }
    public async update (name: string, id: string): Promise<boolean> {
        try {
            await Company.findOneAndUpdate({'_id': id}, {$set: { "name": name }});
            return true;
        } catch(error) {
            throw new Error(error);
        }
    }
    public async getAll (): Promise<Array<models.ICompany>> {
        let res = await Company.find({});
        return res;
    }
    public async remove (id: string): Promise<boolean> {
        try {
            await Company.findOneAndRemove({'_id': id});
            return true;
        } catch(error) {
            throw new Error(error);
        }
    }
}