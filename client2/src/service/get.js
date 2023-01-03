// import { APIURL } from "../config";

export const get = async (details) => {
  let formData = new FormData();
  formData.append("language", details.language);
  formData.append("code", details.code);
  
  const response = await fetch("http://localhost:6000/run", {
    method: "POST",
    body: formData,
  },)
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
};
