import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);
  /*   const [formValidation, setFormValidation] = useState({});
   */
  const onInputChange = (eventOrValue) => {
    if (eventOrValue.target) {
      const { name, value } = eventOrValue.target;

      if (value instanceof Object) {
        setFormState({
          ...formState,
          [name]: value.value,
        });
        return;
      }

      setFormState({
        ...formState,
        [name]: value,
      });
    } else {
      const formattedDate = eventOrValue.toDate().toISOString();;
      setFormState({
        ...formState,
        dateOfBirth: eventOrValue,
        dateOfBirthFormated: formattedDate,
      });
    }
  };

  const onMultipleSelectChange = (event) => {
    const { name, value } = event.target;

    const filteredValue = [
      ...new Map(value.map((item) => [item.value, item])).values(),
    ];
    setFormState({
      ...formState,
      [name]: filteredValue,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onMultipleSelectChange,
    onResetForm,
  };
};
