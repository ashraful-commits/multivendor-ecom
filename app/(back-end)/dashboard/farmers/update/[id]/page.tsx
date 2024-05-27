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
import {useParams} from "next/navigation"
import FormContainer from '@/components/backend/FormContainer';
import OnboardingFarmerEdit from '@/components/frontend/OnboardingFarmerEdit';
import useSessionData from './../../../../../../hooks/useSessionData';
import { SessionData } from '../../../../../../typescript';


const EditNewFarmer = () => {
  const {id} = useParams<{id:string}>()

  return (
    <div className="w-full">
      <FromHeader title="Edit Farmer" href={'/dashboard/farmers'} />
      <FormContainer>
      <OnboardingFarmerEdit role="Farmer" id={id} />
      </FormContainer>
    </div>
  );
};

export default EditNewFarmer;
