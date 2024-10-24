import React, { useRef, useState } from 'react'
import '../../style/addAlbumForm.scss';


function decodeImage(b64Data, contentType = '', sliceSize = 512) {
    const cleanedBase64Data = b64Data.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

    const byteCharacters = atob(cleanedBase64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    console.log(blob);
    
    return blob;
}

export default decodeImage;