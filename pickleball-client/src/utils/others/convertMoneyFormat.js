const convertNumberFormat = ({ number, locale }) => {
    return Number(number)?.toLocaleString(locale, { style: "decimal" }) || number;
};

export const convertVietNamMoneyFormat = (number) => {
    const locale = "vi-VN";
    const result = convertNumberFormat({ number, locale });
    return result;
};