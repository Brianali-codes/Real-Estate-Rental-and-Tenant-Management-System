import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const TenantUserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
      maxLength: 20,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Please provide an address"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide a phone number"],
      unique: true,
      match: [/^[9]+[7-8]+\d{8}$/, "Please provide a valid phone number"],
    },
    age: {
      type: String,
      required: [true, "Please provide an age"],
      match: [
        /^(1[6789]|[2-9][0-9]|[1][0-1][0-9])$/,
        "Only 16 and above allowed",
      ],
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "{VALUE} is not supported",
      },
    },
    profileImage: {
      type: String,
      required: [true, "Please provide a profile image"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 5,
      select: false,
    },
  },
  { timestamps: true }
);

// Hash password before saving to database
TenantUserSchema.pre("save", async function () {
  if (!this.isModified("password")) return; //avoid re-hashing of password

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with hashed password in database
TenantUserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create JWT and return it to the client for authentication
TenantUserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_KEY_TENANT, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default mongoose.model("TenantUser", TenantUserSchema);
