import mongoose from 'mongoose';
import {IMenu} from './types';

const MySchema: typeof mongoose.Schema  = mongoose.Schema;

const MenuSchema = new MySchema({
    mobile: Boolean,
    menu: Array,
    country: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Countries'
    },
    company: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company'
    },
})

export default mongoose.model<IMenu & mongoose.Document>('menu', MenuSchema);