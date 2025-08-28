const generateMapUrl = (lat, lng) => {
    return `https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d3449.2366772093865!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e0!4m0!4m3!3m2!1d${lat}!2d${lng}!5e0!3m2!1sen!2s!4v1725883198360!5m2!1sen!2s`;
};
export default generateMapUrl;