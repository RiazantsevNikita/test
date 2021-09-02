import Country from '../models/Countries'
import {ICountry} from '../models/types'
import {ICountryService} from './types'
import * as models from '../models/types';

export default class CounryService implements ICountryService {
    public async add(name: string, code: string): Promise<boolean> {
        let country: ICountry = {
            name: name,
            code: code
        };
        let newCountry = new Country(country);
        return await newCountry.save()
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            })
    }
    public async update (name: string, code: string, id: string): Promise<boolean> {
        try {
            await Country.findOneAndUpdate({'_id': id}, {$set: { "name": name, "code": code }});
            return true;
        } catch(error) {
            throw new Error(error);
        }
    }
    public async getAll (): Promise<Array<models.ICountry>> {
        let res = await Country.find({});
        return res;
    }
    public async remove (id: string): Promise<boolean> {
        try {
            await Country.findOneAndRemove({'_id': id});
            return true;
        } catch(error) {
            throw new Error(error);
        }
    }
}