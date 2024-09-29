import {fileURLToPath} from "url";
import {dirname, join} from "path";
import {dirExist} from "./copy.js";
import fs, {promises} from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
    const targetDir = join(__dirname, 'files');

    const existDir = await dirExist(targetDir);
    if (!existDir) {
        throw new Error('FS operation failed');
    }

    try {
        const files = await fs.promises.readdir(targetDir);
        console.log(files.join(', '))
    } catch (e) {
        console.error(e);
    }
};

await list();
