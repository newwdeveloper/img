import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
      validate: {
        validator: function (emailValue) {
          return /([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/.test(emailValue);
        },
        message: "invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      unique: true,
      minlength: 8, // Correct syntax for Mongoose minlength validator
      validate: {
        validator: function (passwordValue) {
          // Regex checks:
          // - At least one uppercase letter
          // - At least one lowercase letter
          // - At least one number or special character
          // - Minimum 8 characters
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|(?=.*\W)).{8,}$/.test(
            passwordValue
          );
        },
        message: function (props) {
          const value = props.value;
          if (value.length < 8) {
            return "Password should have at least 8 characters.";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password should have at least one uppercase letter.";
          }
          if (!/[a-z]/.test(value)) {
            return "Password should have at least one lowercase letter.";
          }
          if (!/\d|[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            return "Password should have at least one number or special character.";
          }
          return "Invalid password format.";
        },
      },
    },
  },
  { timestamps: true }
);

export default userSchema;
