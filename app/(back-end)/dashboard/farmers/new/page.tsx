'use client';
import React, { useState } from 'react';
import Heading from '@/components/backend/Heading';
import { useForm,Resolver } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X } from 'lucide-react';
import FromHeader from '@/components/backend/FromHeader';
import TextInput from '@/components/backend/Form/TextInput';
import { SubmitButton } from '@/components/backend/Form/SubmitButton';
import TextArea from '@/components/backend/Form/TextArea';
import { generateUniqueCode } from '@/lib/generateUniqueCode';
import { makePostRequest } from '@/lib/apiRequest';
import ImageUpload from '@/components/backend/Form/ImageInput';
import { DatePickerDemo } from '@/components/backend/Form/DatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FormContainer from '@/components/backend/FormContainer';
import OnboardingFarmer from '@/components/frontend/OnboardingFarmer';
import useSessionData from '../../../../../hooks/useSessionData';
import { SessionData } from '../../../../../typescript';


const NewFarmer = () => {
 const session = useSessionData() as SessionData
  
  return (
    <div className="w-full">
      <FromHeader title="New Farmer" href={'/dashboard/farmers'} />
      <FormContainer>
      <OnboardingFarmer role="Farmer" user={session?.user}/>
      </FormContainer>
    </div>
  );
};

export default NewFarmer;
