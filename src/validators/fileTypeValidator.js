function checkImageFileType(file) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (
      fileType === "jpg" ||
      fileType === "jpeg" ||
      fileType === "png" ||
      fileType === "webp"
    ) {
      return true;
    }
  }
  return false;
}
