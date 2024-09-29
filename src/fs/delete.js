import {fileURLToPath} from "url";
import {dirname, join} from "path";
import {dirExist} from "./copy.js";
import {promises} from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
    const targetFile = join(__dirname, 'files', 'fileToRemove.txt');

    const existFile = await dirExist(targetFile);
    if (!existFile) {
        throw new Error('FS operation failed');
    }

    try {
        await promises.rm(targetFile)
    } catch (e) {
        console.error(e);
    }
};

await remove();
