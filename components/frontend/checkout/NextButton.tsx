import React from "react";
import { Button } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import {setCurrentStep} from "../../../lib/features/stepSlice"
import {ChevronRight,ChevronLeft} from "lucide-react"
import { RootState } from '../../../lib/store';
const NextButton = () => {
    const steps = useSelector((state:RootState)=>state.checkout.currentStep)
    const dispatch = useDispatch()
  return <div className="flex gap-x-5 justify-between items-center">
    {steps >1 &&<Button onClick={()=>dispatch(setCurrentStep(steps-1))}><ChevronLeft />Prev </Button>}
    <Button>Next<ChevronRight/> </Button>
  </div>;
};

export default NextButton;
