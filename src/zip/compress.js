import {fileURLToPath} from "url";
import {dirname, join} from "path";
import {createReadStream, createWriteStream} from "fs";
import { createGzip } from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
    const srcPathToFile = join(__dirname, 'files', 'fileToCompress.txt');
    const distPathToFile = join(__dirname, 'files', 'archive.gz');

    const inputStream = createReadStream(srcPathToFile);
    const gzip = createGzip();
    const outputStream = createWriteStream(distPathToFile);

    inputStream.pipe(gzip).pipe(outputStream)
        .on('finish', () => {
            console.log('File successfully compressed');
        })
        .on('error', (err) => {
            console.error(err);
        });
};

await compress();
