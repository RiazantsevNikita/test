import mongoose from "mongoose";

export interface ICountry {
    name: string,
    code: string
}

export interface ICompany {
    name: string
}

export interface IMenu {
    mobile: boolean,
    menu: Array<any>,
    country: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Countries'
    },
    company: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company'
    }
}

export interface ISlider {
    slides: Array<string>
}

export interface ICatalog {
    name: string,
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
    pages: Array<string>
}

export interface IPage {
    title: string,
    metaTitle: string,
    metaDescription: string,
    href: string,
    catalog?: {
        type: mongoose.Schema.Types.ObjectId | null, 
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
    text: string
}

// const enum types {
//     private = 1,
//     group,
//     temp
// }