function generateID(type) {
    const albumID = `id-${type}-` + Math.random().toString(16).slice(2);
    return albumID;
}

export default generateID;