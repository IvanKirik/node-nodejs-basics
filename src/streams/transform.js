import { Transform } from 'stream';


class ReverseTransform extends Transform {
    _transform(chunk, encoding, callback) {
        const reversed = chunk.toString().split('').reverse().join('');
        this.push(reversed);
        callback();
    }
}

const transform = async () => {
    const reverseStream = new ReverseTransform();
    process.stdin.pipe(reverseStream).pipe(process.stdout);
    console.log('Enter you text:');
};

await transform();
