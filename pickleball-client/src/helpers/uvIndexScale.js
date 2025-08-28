
const uvIndexScale = (uv) => {
    if (uv <= 2) {
        return "Thấp";
    }
    if (uv > 2 && uv <= 5) {
        return "Vừa";
    }
    if (uv > 5 && uv <= 7) {
        return "Cao";
    }
    if (uv > 7 && uv <= 9) {
        return "Rất cao";
    }
    if (uv > 9 && uv <= 11) {
        return "Nguy hiểm";
    }
};
export default uvIndexScale;
