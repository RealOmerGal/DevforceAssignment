import { useState } from "react";

//Hook used to fill forms and control their state
export const useForm = <T>(callback: () => void, initialState: T) => {
  const [values, setValues] = useState(initialState);

  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return { onChange, onSubmit, values, };
};