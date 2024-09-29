import {dirname, join} from "path";
import {createReadStream, createWriteStream, promises} from "fs";
import {createGunzip} from "zlib";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
    const srcPathToFile = join(__dirname, 'files', 'archive.gz');
    const distPathToFile = join(__dirname, 'files', 'fileToCompress.txt');

    const inputStream = createReadStream(srcPathToFile);
    const gunzip = createGunzip();
    const outputStream = createWriteStream(distPathToFile);

    inputStream.pipe(gunzip).pipe(outputStream)
        .on('finish', async () => {
            await promises.rm(srcPathToFile)
            console.log('The file was successfully unpacked');
        })
        .on('error', (err) => {
            console.error(err);
        });
};

await decompress();
