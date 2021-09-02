import UAParser from "ua-parser-js";


const supportedBrowserAvif = [
    {
        name: "Chrome",
        version: 85
    },
    {
        name: "Android Browser",
        version: 91
    },
    {
        name: "Samsung Browser",
        version: 14
    },
    {
        name: "Opera",
        version: 71
    },
]

export default function imageHelper(image, width = '1080p/') {
    let href = 'http://orinice.pp.ua/static/';
    href += width;
    return href += "webp/"+image.split(".")[0] + ".webp";
}
