import {ISliderService} from './types';
import mongoose from "mongoose";
import * as models from '../models/types';
import Slider from '../models/Slider';

export default class SliderService implements ISliderService {
    public async update (id: string, slides: Array<string>): Promise<boolean> {
        try {
            await Slider.findOneAndUpdate({'_id': id}, {$set: { "slides": slides }});
            return true;
        } catch(error) {
            throw new Error(error);
        }
    }
    public async get (): Promise<models.ISlider> {
        let res = await Slider.findOne({});
        return res;
    }
}