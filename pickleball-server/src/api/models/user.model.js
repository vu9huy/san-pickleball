import mongoose from "mongoose";
import { roles } from "../../config/roles.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import { queryAndPaginate, toJSON } from "./plugin/index.js";

const { Schema } = mongoose;
const objectId = Schema.Types.ObjectId;

const status = [
    "online",
    "offline"
]

const gender = [
    "male",
    "female"
]

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    gender: { type: String, enum: gender, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error("Password must contain at least one letter and one number");
            }
        },
        private: true
    },
    images: {
        avatar: { type: String, required: false, trim: true },
        banner: { type: String, required: false, trim: true }
    },
    role: { type: String, enum: roles, default: "user" },
    isVerifiedEmail: { type: Boolean, default: false },
    contact: {
        facebook: { type: String, required: false, trim: true },
        zalo: { type: String, required: false, trim: true },
        phone: { type: String, required: false, trim: true }
    },
    courts: [
        { type: objectId, ref: "Court", required: false }
    ],
    maxCourt: { type: Number, required: true, default: 1 },
    marketItems: [
        { id: { type: objectId, ref: "Market", required: false } }
    ],
    maxMarketItem: { type: Number, required: true, default: 3 },
    level: { type: Number, required: true, default: 2 },
    status: { type: String, enum: status, default: "offline"},
    location: {
        isShowLocation: { type: Boolean, required: false, default: false },
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number]
        },
        displayName: { type: String, required: false, trim: true },
        address: {
            amenity: { type: String, required: false, trim: true },
            house_number: { type: String, required: false, trim: true },
            office: { type: String, required: false, trim: true },
            road: { type: String, required: false, trim: true },
            quarter: { type: String, required: false, trim: true },
            suburb: { type: String, required: false, trim: true },
            city: { type: String, required: false, trim: true },
            "ISO3166-2-lvl4": { type: String, required: false, trim: true },
            postcode: { type: String, required: false, trim: true },
            country: { type: String, required: false, trim: true },
            country_code: { type: String, required: false, trim: true },
        },
        selectedLocation: {
            province: { type: String, required: false, trim: true },
            district: { type: String, required: false, trim: true },
            detailAddress: { type: String, required: false, trim: true },
        }
    },
    isDeleted: { type: Boolean, required: true, default: false, private: true },
}, { timestamps: true });

userSchema.plugin(toJSON);
userSchema.plugin(queryAndPaginate);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

userSchema.pre(/^find/, function (next) {
    this.where({ isDeleted: false });
    next();
});

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// userSchema.index({ location: "2dsphere" });
const User = mongoose.model("User", userSchema);
export default User;