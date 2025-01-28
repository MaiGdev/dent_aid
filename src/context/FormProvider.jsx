import dayjs from "dayjs";
import { useForm } from "../hooks/useForm";
import { FormContext } from "./FormContext";

const formData = {
  addressLine: "",
  bloodType: [],
  city: "",
  dateOfBirth: new dayjs(),
  dateOfBirthFormated: new Date(),
  email: "",
  emergencyContact: "",
  fullName: "",
  genre: "genre",
  identification: "",
  knownAllergies: [],
  medicalConditions: [],
  medicalLicenseNumber: "",
  password: "",
  phoneNumber: "",
  university: "",
  workplace: "",
  yearsOfExperience: "",
};

export const FormProvider = ({ children }) => {
  const formMethods = useForm(formData);

  return (
    <FormContext.Provider value={formMethods}>{children}</FormContext.Provider>
  );
};
