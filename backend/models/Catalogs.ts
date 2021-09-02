import mongoose from 'mongoose';
import {ICatalog} from './types';

const MySchema: typeof mongoose.Schema  = mongoose.Schema;

const catalogSchema = new MySchema({
    name: String,
    country: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Countries'
    },
    company: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company'
    },
    startDate: Date,
    endDate: Date,
    pages: Array,
})

export default mongoose.model<ICatalog & mongoose.Document>('Catalog', catalogSchema);