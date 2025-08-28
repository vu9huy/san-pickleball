import hbs from "nodemailer-express-handlebars";
import globalConfig from "../../config/globalConfig.js";
import nodemailer from "nodemailer";
import { handlebarOptions } from "../../config/emailTemplates/handlebar.js";

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: globalConfig.email.emailAddress,
        pass: globalConfig.email.emailPassword,
        clientId: globalConfig.google.oauthClientId,
        clientSecret: globalConfig.google.oauthClientSecret,
        refreshToken: globalConfig.google.oauthRefreshToken
    }
});

transporter.use(
    "compile",
    hbs(handlebarOptions)
);

const templates = {
    "verify-email": {
        template: "verify-mail",
        subject: "Xác thực tài khoản",
        context: (user, token) => {
            return {
                username: user.name,
                verifyUrl: `${globalConfig.domain}/api/v1/auth/verify-email?token=${token}` };
        }
    },
    "reset-password": {
        template: "reset-password",
        subject: "Đặt lại mật khẩu",
        context: (user, token) => {
            return {
                username: user.name,
                verifyUrl: `${globalConfig.frontendDomain}/dat-lai-mat-khau?token=${token}` };
        }
    }
};

const sendEmail = async (userEmail, template, context, subject) => {
    let mailOptions = {
        from: globalConfig.email.emailAddress,
        to: userEmail,
        subject: `Sân Pickleball | ${subject}`,
        template: template,
        context: context
    };
    const response = await transporter.sendMail(mailOptions);
    return response;
};

const sendVerificationEmail = async (user, token, type) => {
    const subject = templates[type].subject;
    const template = templates[type].template;
    const context = templates[type].context(user, token);
    const response = await sendEmail(user.email, template, context, subject);
    return response;
};

export default {
    sendEmail,
    sendVerificationEmail
};