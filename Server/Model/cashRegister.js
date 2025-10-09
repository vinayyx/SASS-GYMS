import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      // required: true,
      trim: true,
    },
    fatherName: {
      type: String,
      // required: true,
      trim: true,
    },
    city: {
      type: String,
      // required: true,
    },
    address: {
      type: String,
      // required: true,
    },
    livePhoto: {
      type: String, // Cloudinary ka URL
      // required: true,
    },
    contactNumber: {
      type: String,
      //  required: true,
      validate: {
        validator: (v) => /^\d{10}$/.test(v),
        message: "Contact number must be exactly 10 digits",
      },
    },
    alternativeNumber: {
      type: String,
      validate: {
        validator: (v) => !v || /^\d{10}$/.test(v),
        message: "Alternative number must be exactly 10 digits",
      },
    },
    email: {
      type: String,
      //  required: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    emailVerifyOtp: {
      type: String,
    },
    aadhaarNumber: {
      type: String,
      //  required: true,
      validate: {
        validator: (v) => /^\d{12}$/.test(v),
        message: "Aadhaar number must be exactly 12 digits",
      },
    },
    dateOfBirth: {
      type: Date,
      // required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      //  required: true,
    },
    plan: [
      {
        Plan: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Plan",
        },
        paidAmount: {
          type: Number,
          default: 0,
        },
        isFullPaid: {
          type: Boolean,
          default: false,
        },
        expireDate: {
          type: Date,
          required: true,
        },
        startedDate: {
          type: Date,
          required: true,
        },
        method: {
          type: String,
          enum: ["UPI", "Cash"],
          //  required: true,
        },
        transactionId: {
          type: String, // UPI Transaction ID
        },

        razorpayOrderId: {
          type: String,
        },
        razorpayPaymentId: {
          type: String,
        },
        razorpaySignature: {
          type: String,
        },
        renewedOn: { type: Date, default: Date.now },
      },
    ],

    admissionDate: {
      type: Date,
      //  required: true,
    },
    occupation: {
      type: String,
    },
    medicalHistory: {
      type: String,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "Unknown"],
      default: "Unknown",
    },
    referral: {
      type: String,
    },
    memberId: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const cashregister = mongoose.model("cashregister", memberSchema);

export default cashregister;
