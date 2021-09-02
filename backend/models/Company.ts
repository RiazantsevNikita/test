import mongoose from 'mongoose';
import {ICompany} from './types';

const MySchema: typeof mongoose.Schema  = mongoose.Schema;

const companySchema = new MySchema({
    name: String
})

export default mongoose.model<ICompany & mongoose.Document>('Company', companySchema);