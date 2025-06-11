//custom hook to combine - zod +react-hook-form + useMutataion
// zod - for validation through schema & rules and type saefty by infer type
//react hook form for managing form states , submission , error , etc
//combined with zod for validation using resolver
//useMutataion- for api call to update db on success

import {z, ZodTypeAny  } from "zod";
import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';


const useZodForm = (
  schema: ZodTypeAny ,
  mutation: UseMutateFunction,
  defaultValue?: any
) => {
  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValue },
  });

  const onSubmit=handleSubmit(async (values) => mutation({ ...values }))

  return {
    register,
    handleSubmit: onSubmit,
    watch,
    errors,
    reset
  };
};

export default useZodForm;
