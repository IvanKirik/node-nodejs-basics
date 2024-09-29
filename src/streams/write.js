import readline from 'readline';
import {fileURLToPath} from "url";
import {dirname, join} from "path";
import { createWriteStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
    const pathToFile = join(__dirname, 'files', 'fileToWrite.txt')
    const readLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const writeStream = createWriteStream(pathToFile)

    console.log('Enter text to write to file:');

    readLine.on('line', (input) => {
        if (input.toLowerCase() === 'exit') {
            writeStream.end();
            readLine.close();
            process.exit();
        } else {
            writeStream.write(input + '\n');
        }
    });

    process.on('SIGINT', () => {
        writeStream.end();
        readLine.close();
        process.exit();
    });

    process.on('exit', () => {
        console.log('Bye. Process interrupted. Writing to file is complete.');
    });
};

await write();
