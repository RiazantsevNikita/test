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

export default function imageHelper(image, width = '1080p/', notAvif = false) {
    let href = 'http://orinice.pp.ua/static/';
    href += width;
    let supportAvif = false;
    if (!notAvif) {
        let parser = new UAParser();
        let browser = parser.getBrowser();
        for (let i = 0; i < supportedBrowserAvif.length; i++) {
            if (supportedBrowserAvif[i].name == browser.name) {
                if (supportedBrowserAvif[i].version <= Number(browser.major)) {
                    supportAvif = true;
                }
            }
        }
    }
    if (supportAvif) {
        return href += "avif/" + image.split(".")[0] + ".avif";
    } else {
        return href += "webp/" + image.split(".")[0] + ".webp";
    }
}
