import mongoose from 'mongoose';
import {ICountry} from './types';

const MySchema: typeof mongoose.Schema  = mongoose.Schema;

const CountrySchema = new MySchema({
    name: String,
    code: String
})

export default mongoose.model<ICountry & mongoose.Document>('Countries', CountrySchema);