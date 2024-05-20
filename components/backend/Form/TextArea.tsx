import React from 'react';
import { Label } from '@/components/ui/label';
import { TextAreaProps } from "../../../typescript";

const TextArea = ({
  label,
  name,
  register,
  errors,
  type = "text",
  isRequired = true,
  className = "sm:col-span-2",
  defaultValue = "",
  placeholder = "",
}: TextAreaProps) => {
  return (
    <div className="flex flex-col gap-y-2 my-2">
      <Label className="text-md text-white dark:text-slate-900 capitalize" htmlFor={name}>{label}</Label>
      <textarea
        // type={type}
        defaultValue={defaultValue}
        className={`${className} rounded-md text-sm text-white ${errors && "placeholder:text-red-500 capitalize"} dark:text-slate-900 bg-transparent`}
        id={name}
        autoComplete={name}
        placeholder={errors ? String(errors) : placeholder}
        {...register(`${name}`, { required: isRequired })}
        rows={5} 
      />
    </div>
  );
};

export default TextArea;
