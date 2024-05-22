import React from "react";
import Steps from './../../../components/frontend/checkout/Steps';
import CartBanner from '../../../components/frontend/checkout/CartBanner';
import StepForm from './../../../components/frontend/checkout/StepForm';
import ContainerBox from "@/components/frontend/ContainerBox";

const page = () => {
    const steps =[
        "Personal Details",
        "Shipping Details",
        "Payment Method",
        "Order Summary",
    ]
  return (
    <ContainerBox>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
       <Steps steps={steps}/>
       <CartBanner/>
       <StepForm/>
      </section>
    </ContainerBox>
  );
};

export default page;
