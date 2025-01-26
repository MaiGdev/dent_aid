import dayjs from "dayjs";
import { useForm } from "../hooks/useForm";
import { FormContext } from "./FormContext"; 

const formData = {
  email: "",
  password: "",
  fullName: "",
  genre: "genre",
  dateOfBirth: new dayjs(),
  dateOfBirthFormated: new Date(),
  identification: "",
  city: "",
  addressLine: "",
  medicalConditions: [],
  knownAllergies: [],
  bloodType: [],
  emergencyContact: "",
};

export const FormProvider = ({ children }) => {
  const formMethods = useForm(formData);

  return (
    <FormContext.Provider value={formMethods}>{children}</FormContext.Provider>
  );
};
