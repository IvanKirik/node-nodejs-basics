import { spawn } from 'child_process';
import {fileURLToPath} from "url";
import {dirname, join} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
    const childProcess = spawn('node', [join(__dirname, 'files', 'script.js'), ...args]);

    process.stdin.pipe(childProcess.stdin);

    childProcess.stdout.pipe(process.stdout);

    childProcess.stderr.on('data', (data) => {
        console.error(`Ошибка в дочернем процессе: ${data}`);
    });

    childProcess.on('close', (code) => {
        console.log(`Дочерний процесс завершен с кодом ${code}`);
    });
};

const args = process.argv.slice(2);

// Put your arguments in function call to test this functionality
spawnChildProcess(args);
