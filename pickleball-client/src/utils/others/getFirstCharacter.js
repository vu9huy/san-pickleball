const getFirstCharacter = (name) => {
    const firstCharacter = name?.slice(0, 1);
    return firstCharacter || "";
};

export default getFirstCharacter;