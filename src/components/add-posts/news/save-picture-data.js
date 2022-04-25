export function savePicturedata(selectedFile, setIsLoading, setFileData) {
  const reader = new FileReader();
  reader.readAsDataURL(selectedFile);
  reader.onload = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.result.split(",").pop());
    setIsLoading(true);
    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMAGES_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => setFileData((prev) => [...prev, data]))
      .finally(() => {
        setIsLoading(false);
      });
  };
}
