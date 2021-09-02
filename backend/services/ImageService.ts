import webp from 'webp-converter';
import { exec } from 'child_process';
import sharp from 'sharp';
import path from 'path';

webp.grant_permission();

export default class ImageService {
    private inputPath: string;
    private dirName: string;

    constructor(inputPath) {
        this.inputPath = inputPath;
        this.dirName = path.join(__dirname + '../../../static');
    }

    public async resize(filename: string) {
        let p1080 = path.join(this.dirName + '/1080p/original/') + filename;
        sharp(this.inputPath)
            .resize(1080)
            .toFile(
                p1080, (err) => {
                    let outputPath = this.webpOutputPath(p1080, filename);
                    this.convertWebp(outputPath, p1080);
                }
            );
        let p1440 = path.join(this.dirName + '/1440p/original/') + filename;
        sharp(this.inputPath)
            .resize(1440)
            .toFile(
                p1440, (err) => {
                    let outputPath = this.webpOutputPath(p1440, filename);
                    this.convertWebp(outputPath, p1440);
                }
            );
        let p720 = path.join(this.dirName + '/720p/original/') + filename;
        return await sharp(this.inputPath)
            .resize(720)
            .toFile(p720)
            .then(async (err) => {
                    let outputPath = this.webpOutputPath(p720, filename);
                    await this.convertWebp(outputPath, p720);
                    this.convertAvif(p720);
                    return;
                }
            );
    }

    public async resizeToText(filename: string) {
        let p1080 = path.join(this.dirName + '/1080p/original/') + filename;

        let href;

        const format = [
            'png',
            'jpg',
            'jpeg'
        ];

        return await sharp(this.inputPath)
            .resize(1080)
            .toFile(p1080)
            .then(async s => {
                let outputPath = this.webpOutputPath(p1080, filename);
                await this.convertWebp(outputPath, p1080);
                let NumChar = -1;
                for (let i = 0; i < format.length; i++) {
                    let char = filename.toLowerCase().lastIndexOf(format[i]);
                    if (char != -1) {
                        NumChar = char;
                        break;
                    }
                }

                if (NumChar != -1) {
                    return `http://orinice.pp.ua/static/1080p/webp/${filename.slice(0, NumChar)}webp`;
                } else {
                    return `http://orinice.pp.ua/static/1080p/original/${filename}`;
                }
            }
            );
    }

    private webpOutputPath(inputPath, filename) {
        const format = [
            'png',
            'jpg',
            'jpeg'
        ];

        let pth = inputPath.toLowerCase().lastIndexOf('/');
        if (pth == -1) {
            pth = inputPath.toLowerCase().lastIndexOf('\\');
        }
        let webpInput = path.join(inputPath.slice(0, pth) + '/../webp/') + filename;

        let NumChar = -1;
        for (let i = 0; i < format.length; i++) {
            let char = webpInput.toLowerCase().lastIndexOf(format[i]);
            if (char != -1) {
                NumChar = char;
                break;
            }
        }

        if (NumChar != -1) {
            return `${webpInput.slice(0, NumChar)}webp`;
        }
        return -1;
    }

    private async convertWebp(outputPath, inputPath) {
        const result = webp.cwebp(inputPath, outputPath, "-q 80");
        await result.then((response) => {
        });
    }

    private convertAvif(inputPath) {
        let pth = inputPath.toLowerCase().lastIndexOf('/');
        if (pth == -1) {
            pth = inputPath.toLowerCase().lastIndexOf('\\');
        }
        let webpInput = path.join(inputPath.slice(0, pth) + '/../avif');

        exec(`npx avif --input="${inputPath}" --output="${webpInput}" --overwrite --verbose`,
            (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
    }
}