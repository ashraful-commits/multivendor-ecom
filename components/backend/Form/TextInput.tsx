import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TextInputProps } from '../../../typescript';

const TextInput = ({
  label,
  name,
  register,
  errors,
  type = "text",
  isRequired = false,
  className = "sm:col-span-2",
  defaultValue = "",
  placeholder
}: TextInputProps) => {
  
  return (
    <div className="flex flex-col gap-y-2 my-2">
      <Label className="text-md capitalize" htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        className={`${className} text-sm  ${errors && "placeholder:text-red-500 capitalize"} bg-transparent w-full`}
        id={name}
        autoComplete={name}
        defaultValue={defaultValue}
        placeholder={errors ? errors : placeholder}
        {...register(`${name}`, { required: isRequired })}
      />
    </div>
  );
};

export default TextInput;
