import React from 'react'
import  {FormContainerProps} from "../../typescript"
const FormContainer = ({children,className}:FormContainerProps) => {
  return (
    <div className={`${className} flex max-auto justify-center w-full `}>
      <div className=" w-full min-w-[70vw]">

      {children}
      </div>
    </div>
  )
}

export default FormContainer
