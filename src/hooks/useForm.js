import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const onInputChange = (eventOrValue) => {
    if (eventOrValue.target) {
      if (Array.isArray(eventOrValue.target)) {
        const updatedState = { ...formState };
        eventOrValue.target.forEach(({ name, value }) => {
          if (value instanceof Object && value.value !== undefined) {
            updatedState[name] = value.value;
          } else {
            updatedState[name] = value;
          }
        });
        setFormState(updatedState);
      } else {
        const { name, value } = eventOrValue.target;
        if (value instanceof Object && value.value !== undefined) {
          setFormState({
            ...formState,
            [name]: value.value,
          });
        } else {
          setFormState({
            ...formState,
            [name]: value,
          });
        }
      }
    } else {
      const formattedDate = eventOrValue.toDate().toISOString();
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
    setFormState,
  };
};
