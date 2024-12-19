import { Buffer } from 'buffer';

function bufferToBase(data) {
    const buffer = Buffer.from(data).toString("base64");
    const base64String = buffer.toString('base64');
    const dataURL = `data:image/jpeg;base64,${base64String}`;
    
    return dataURL;
}

export default bufferToBase;