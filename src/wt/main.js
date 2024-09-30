import { Worker } from 'worker_threads'
import { cpus } from 'os'
import {fileURLToPath} from "url";
import path, {dirname, join} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cpusCount = cpus().length;

const runWorkerThread = (workerData) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(join(__dirname, 'worker.js'), { workerData });

        worker.on('message', (result) => {
            resolve(result);
        })

        worker.on('error', (error) => {
            reject({ status: 'error', data: null })
        })

        worker.on('exit', (code) => {
            if (code !== 0) reject({ status: 'error', data: null });
        })
    })
}

const performCalculations = async () => {
    const promises = [];

    for (let i = 0; i < cpusCount; i++) {
        promises.push(runWorkerThread(10 + i));
    }

    try {
        const results = await Promise.allSettled(promises);
        const formatted = results.map((item) => {
            if (item.status === 'fulfilled') {
                return item.value;
            } else {
                return { status: 'error', data: null };
            }
        })
        console.log(formatted);
    } catch (e) {
        console.error(e);
    }
};

await performCalculations();