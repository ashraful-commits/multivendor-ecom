"use client"
import React, { useState, useEffect } from 'react';
import OnboardingFarmer from './../../../../components/frontend/OnboardingFarmer';
import FromHeader from './../../../../components/backend/FromHeader';
import FormContainer from './../../../../components/backend/FormContainer';
import { getData } from "../../../../lib/apiRequest";
interface SellerOnboardingProps {
  params: {
    id: any;
  };
}
const SellerOnboarding = ({ params}:SellerOnboardingProps) => {
  const {id} = params
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = await getData( `users/${id}`);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <FromHeader title="Tell More About Your Self" href="/dashboard/farmers/new" />
      <FormContainer>
        {loading ? (
          <p>Loading...</p>
        ) : (
          user && <OnboardingFarmer role="FARMER"  user={user} />
        )}
      </FormContainer>
    </>
  );
};

export default SellerOnboarding;
