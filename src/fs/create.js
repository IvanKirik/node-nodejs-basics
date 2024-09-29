import { fileURLToPath } from 'url';
import { promises } from 'fs';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
    const folderPath = join(__dirname, 'files');
    const filePath = join(folderPath, 'fresh.txt');

    try {
        await promises.access(filePath);
        console.error('Error: FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            try {
                await promises.mkdir(folderPath, { recursive: true });
                await promises.writeFile(filePath, 'I am fresh and young', 'utf8');
                console.log('File created successfully');
            } catch (writeErr) {
                console.error('Error writing file or creating directory', writeErr);
            }
        } else {
            console.error('Error accessing the file', err);
        }
    }
};

await create();
