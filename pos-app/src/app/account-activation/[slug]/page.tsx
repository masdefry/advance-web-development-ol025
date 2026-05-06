'use client';
import { axiosInstance } from '@/utils/axiosInstance';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AccountActivationPage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [verificationResponse, setVerificationResponse] = useState<string>('');

  const onAccountVerification = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.post(
        `/auth/account-verification/${slug}`,
      );

      setVerificationResponse(res?.data?.message);
    } catch (error: any) {
      setVerificationResponse(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onAccountVerification();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center mt-32'>
        <h1 className='text-3xl text-blue-500'>
          Account Activation in Process. Please Wait!
        </h1>
      </div>
    );
  }

  return (
    <div className='flex justify-center mt-32'>
      <h1 className='text-3xl text-blue-500'>{verificationResponse}</h1>
    </div>
  );
}
