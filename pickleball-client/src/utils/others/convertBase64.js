import { isImageFile } from "@/components/imageElementSelected/ImageElementSelected";

const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

const convertImageToBase64 = async (images, courtName) => {
    const base64s = [];
    for (var i = 0; i < images.length; i++) {
        const image = images[i];
        const checkImageFile = isImageFile(image);
        let base = image;
        if (checkImageFile) {
            base = {
                alt: courtName || "sân pickleball",
                url: await convertBase64(image)
            };
        }
        base64s.push(base);
    }
    return base64s;
};

export {
    convertBase64,
    convertImageToBase64
};