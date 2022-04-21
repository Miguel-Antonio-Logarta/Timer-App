import React, { useState } from 'react'
import { setEnvironmentData } from 'worker_threads';
import { setSubmitting } from '../state/slice/todoSlice';

const useForm = ({ }) => {
	// const [submitting, setSubmitting] = useState<boolean>(false);
  
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const {name, value} = event.target;
  //   setData({
  //     ...data,
  //     [name]: value
  //   });
  // }

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setErrors(validate(data));
  //   setSubmitting(true);
  // }
}

export default useForm