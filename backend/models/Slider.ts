import mongoose from 'mongoose';
import {ISlider} from './types';

const MySchema: typeof mongoose.Schema  = mongoose.Schema;

const sliderSchema = new MySchema({
    slides: Array
})

export default mongoose.model<ISlider & mongoose.Document>('Slider', sliderSchema);