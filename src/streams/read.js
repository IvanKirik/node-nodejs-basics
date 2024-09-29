import {fileURLToPath} from "url";
import {dirname, join} from "path";
import {createReadStream} from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    const pathToFile = join(__dirname, 'files', 'fileToRead.txt')

    const data = [];
    const readStream = createReadStream(pathToFile, 'utf8');

    readStream.on('data', (chunk) => {
        data.push(chunk);
    });

    readStream.on('end', () => {
        console.log(data.join(''));
    });

    readStream.on('error', (error) => {
        console.log(error);
    });
};

await read();
