import dayjs from "dayjs";
import * as yup from "yup";

export const accountSetupSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

export const personalInformationSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  identification: yup.string().required("Identification is required"),
  dateOfBirth: yup
    .mixed()
    .required("Date of birth is required")
    .test("is-adult", "You must be at least 18 years old", (value) => {
      if (!dayjs.isDayjs(value)) return false;
      return value.isBefore(dayjs().subtract(17, "year"), "day");
    }),
  // gender: yup.string().required("Gender es required"),
  phoneNumber: yup.string().required("Phone number is required"),
  emergencyPhoneNumber: yup
    .string()
    .required("Emergency phone number is required"),
  city: yup.string().required("City is required"),
  address: yup.string().required("Address is required"),
});

export const healthInformationSchema = yup.object({
  bloodType: yup.string().required("Blood type is required"),
  knownAllergies: yup
    .array()
    .of(
      yup.object({
        label: yup.string().required("Label is required"),
        value: yup.string().required("Value is required"),
      })
    )
    .min(1, "You must add at least one allergy"),
  medicalConditions: yup
    .array()
    .of(
      yup.object({
        label: yup.string().required("Label is required"),
        value: yup.string().required("Value is required"),
      })
    )
    .min(1, "You must add at least one medical condition"),
});

export const professionalInformationSchema = yup.object({
  medicalLicenseNumber: yup
    .string()
    .required("Medical license number is required"),
  yearsOfExperience: yup.string().required("Years of experience are required"),
  speciality: yup
    .array()
    .of(
      yup.object({
        label: yup.string().required("Label is required"),
        value: yup.string().required("Value is required"),
      })
    )
    .min(1, "You must add at least one specialty"),
  university: yup.string().required("University is required"),
  workplace: yup.string().required("Workplace is required"),
});
