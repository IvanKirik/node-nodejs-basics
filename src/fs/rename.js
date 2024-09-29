import {fileURLToPath} from "url";
import {dirname, join} from "path";
import {dirExist} from "./copy.js";
import {promises} from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
    const srcFilePAth = join(__dirname, 'files', 'wrongFilename.txt');
    const renameFilePath = join(__dirname, 'files', 'properFilename.md');

    const existSrcFile = await dirExist(srcFilePAth);
    const existRenameFile = await dirExist(renameFilePath);

    if (!existSrcFile || existRenameFile) {
        throw new Error('FS operation failed');
    }

    try {
        await promises.rename(srcFilePAth, renameFilePath)
    } catch (e) {
        console.error(e);
    }
};

await rename();
