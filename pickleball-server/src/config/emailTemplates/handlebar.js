
import path from "path";

const handlebarOptions = {
    viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("./src/"),
        defaultLayout: false
    },
    viewPath: path.resolve("./src/config/emailTemplates"),
    extName: ".handlebars"
};

export {
    handlebarOptions
};