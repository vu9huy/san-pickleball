const toSlug = (str) => {
    return str
        .toLowerCase()
        .normalize("NFD") // Normalize to decomposed form
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
        .replace(/đ/g, "d") // Replace Vietnamese đ with d
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .trim() // Trim whitespace from start and end
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-"); // Remove duplicate hyphens
};

export default toSlug;