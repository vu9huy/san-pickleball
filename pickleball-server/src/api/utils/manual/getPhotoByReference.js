import axios from "axios";

const apiKey = "AIzaSyCaef-4F8_pKcj_DkiPAj0grPqzTWdvfVs";

const getPhotoByReference = async (photoReference, width) => {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&photo_reference=${photoReference}&key=${apiKey}`;
  
    try {
      const response = await axios.get(url, {
        responseType: "arraybuffer", // Ensures the image data is returned as binary
      });
      
      const imageBase64 = Buffer.from(response.data, "binary").toString("base64");  
      return imageBase64;
    } catch (error) {
      console.error("Error fetching place photo:", error.response?.data || error.message);
    }
}
export default getPhotoByReference;