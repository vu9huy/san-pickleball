// import googlePlaces from "../../../data/google_place_courts.json" assert { type: "json" };
import fs from "fs";
import path from "path";

const filePath = path.resolve(process.cwd(), "src/data/google_place_courts.json");
const googlePlaces = JSON.parse(fs.readFileSync(filePath, "utf8"));
// const googlePlaces = JSON.parse(
//     fs.readFileSync("../../../data/google_place_courts.json", "utf8")
// );
import googlePlaceServices from "../../../api/services/googlePlace.services.js";

const addGooglePlace = async () => {
    for (const place of googlePlaces) {
        const googlePlaces = await googlePlaceServices.createGooglePlace(place);
    }
}
export default addGooglePlace;