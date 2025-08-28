import mongoose from "mongoose";
import { tokenTypes } from "../../config/token.js";
import { toJSON } from "./plugin/index.js";

const { Schema } = mongoose;
const objectId = Schema.Types.ObjectId;

const tokenSchema = new Schema({
    token: { type: String, required: true, trim: true },
    user: { type: objectId, ref: "User", required: true },
    type: { type: String, enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL], required: true },
    expires: { type: Date, required: true },
    blacklisted: { type: Boolean, default: false }
}, { timestamps: true });

tokenSchema.plugin(toJSON);

const Token = mongoose.model("Token", tokenSchema);

export default Token;