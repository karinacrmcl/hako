export function savePicturedata(
  selectedFile,
  setStrokeWidth,
  setUploadProgress,
  setFileData
) {
  const reader = new FileReader();
  reader.readAsDataURL(selectedFile);
  reader.onprogress = (e) => {
    setStrokeWidth(4);
    setUploadProgress(parseInt(Math.round(e.loaded * 100) / e.total));
  };
  reader.onload = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.result.split(",").pop());
    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMAGES_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    ).then((response) => response.json().then(setFileData));
  };
}
