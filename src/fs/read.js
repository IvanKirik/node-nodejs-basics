import {fileURLToPath} from "url";
import {dirname, join} from "path";
import {dirExist} from "./copy.js";
import { createReadStream } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    const targetFile = join(__dirname, 'files', 'fileToRead.txt');

    const existFile = await dirExist(targetFile);
    if (!existFile) {
        throw new Error('FS operation failed');
    }

    try {
        const file = await readFile(targetFile);
        console.log(file)
    } catch (e) {
        console.error(e);
    }
};

await read();

function readFile(pathToFile) {
    return new Promise((resolve, reject) => {
        const data = [];
        const readStream = createReadStream(pathToFile, 'utf8');

        readStream.on('data', (chunk) => {
            data.push(chunk);
        });

        readStream.on('end', () => {
            resolve(data.join(''));
        });

        readStream.on('error', (error) => {
            reject(error);
        });
    });
}
