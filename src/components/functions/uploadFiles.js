import '../../style/addAlbumForm.scss';
import axios from "axios";


function uploadFiles(albumID, data) {
    const reqBody = {
        id: 2,
        name: data.name,
        artist: data.artist,
        genre: data.genre[0],
        mood: data.mood[0],
        cover: data.cover,
        label: data.label,
        year: data.year,
    }

    // try {
    //     const data = new FormData();
    //     data.append('song', data.cover)
    // } catch (error) {

    // }
    
}

export default uploadFiles;