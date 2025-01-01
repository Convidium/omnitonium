function blobToBase64(blob) {
  if (blob == null) {
    return;
  }
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export default blobToBase64;