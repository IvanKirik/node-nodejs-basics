import { fileURLToPath } from 'url';
import fs, { promises } from 'fs';
import path, { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
    const srcFolderPath = join(__dirname, 'files');
    const targetFolderPath = join(__dirname, 'files_copy');

    const existSrcFolder = await dirExist(srcFolderPath);
    const targetSrcFolder = await dirExist(targetFolderPath);

    if (!existSrcFolder || targetSrcFolder) {
        throw new Error('FS operation failed');
    }
    await promises.mkdir(targetFolderPath, { recursive: true });
    await copyDir(srcFolderPath, targetFolderPath);
};

async function copyDir(sourceDir, targetDir) {
    try {
        const files = await fs.promises.readdir(sourceDir);
        for (const file of files) {
            const sourcePath = path.join(sourceDir, file);
            const targetPath = path.join(targetDir, file);
            if ((await promises.lstat(sourcePath)).isDirectory()) {
                await copyDir(sourcePath, targetPath);
            } else {
                await promises.copyFile(sourcePath, targetPath);
            }
        }
        console.log('Copying complete!');
    } catch (err) {
        console.error('Error while copying:', err);
    }
}

async function dirExist(src) {
    return await promises
        .access(src, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);
}

await copy();
