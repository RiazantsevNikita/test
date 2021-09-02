import mongoose from 'mongoose';
import {IPage} from './types';

const MySchema: typeof mongoose.Schema  = mongoose.Schema;

const pageSchema = new MySchema({
    title: String,
    metaTitle: String,
    metaDescription: String,
    href: String,
    catalog: {
        type: mongoose.Schema.Types.ObjectId || null, 
        ref: 'Catalog',
        require: false
    },
    company: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company',
        require: true
    },
    country: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Countries',
        require: true
    },
    text: String
})

export default mongoose.model<IPage & mongoose.Document>('Page', pageSchema);