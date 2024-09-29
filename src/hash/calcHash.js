import { createHash } from 'crypto';
import {createReadStream} from "fs";
import {fileURLToPath} from "url";
import {dirname, join} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
    const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt')

    const hash = createHash('sha256');

    const readStream = createReadStream(filePath);

    readStream.on('data', (chunk) => {
        hash.update(chunk);
    });

    readStream.on('end', () => {
        console.log(`SHA256 hash: ${hash.digest('hex')}`);
    });

    readStream.on('error', (err) => {
        console.error('Error reading file:', err);
    });
};

await calculateHash();
