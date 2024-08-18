const fileFormat = (url = "") => {
  const fileExtension = url.split(".").pop();
  if (
    fileExtension === "mp4" ||
    fileExtension === "webm" ||
    fileExtension === "ogg"
  )
    return "video";
  if (fileExtension === "mp3" || fileExtension === "wav") return "audio";
  if (
    fileExtension === "png" ||
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "gif"
  )
    return "image";

  return "file";
};

//https://res.cloudinary.com/dtvythcul/image/upload/v1721910481/6812b961-2594-4a2a-9e9c-bfaae3beb31e.jpg
const transformImage = (url = "", width = 100) => {
  return url, width;
  // const newUrl = url.replace("upload", `upload/dpr_auto/w_${width}`);
  // return newUrl;
};

const getOrSaveFromLocalStorage = ({ key, value, get }) => {
  if (get)
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  else localStorage.setItem(key, JSON.stringify(value));
};

export { fileFormat, transformImage, getOrSaveFromLocalStorage };
