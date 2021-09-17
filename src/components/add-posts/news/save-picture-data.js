export function savePicturedata(selectedFile, setIsLoading, setFileData) {
  const reader = new FileReader();
  reader.readAsDataURL(selectedFile);
  reader.onload = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.result.split(",").pop());
    setIsLoading(true);
    fetch(
      "https://api.imgbb.com/1/upload?key=c8cb2996c6019fd0def1c3b85e2e4073",
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
