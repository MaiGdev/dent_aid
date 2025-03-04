import dayjs from "dayjs";
import { useForm } from "../hooks/";
import { FormContext } from "./FormContext";

const formData = {
  /* Generic user */
  email: "",
  password: "",
  identification: "",
  fullName: "",
  city: "",
  address: "",
  phoneNumber: "",
  emergencyPhoneNumber: "",
  dateOfBirth: new dayjs(),
  dateOfBirthFormated: new Date(),
  /* Patient */
  bloodType: "",
  gender: "Male",
  knownAllergies: [],
  medicalConditions: [],
  /* Doctor */
  medicalLicenseNumber: "",
  speciality: [],
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
