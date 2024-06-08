'use client'

import React, { useEffect } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import Avatar from '../Avatar';
import Input from '../inputs/Input';
import { User } from '@prisma/client';

interface ProfileFormProps {
  user: User;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const router = useRouter();
  const { toast } = useToast();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      image: user.image || '',
      institutionId: user.institutionId || '',
      name: user.name || '',
    }
  });

  useEffect(() => {
    setValue('image', user.image || '');
    setValue('institutionId', user.institutionId || '');
    setValue('name', user.name || '');
  }, [user, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axios.post(`/api/user/${user.id}/update`, data);
      router.refresh();
      toast({
        variant: 'default',
        title: 'Profile updated successfully!'
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to update.'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div 
        className="
            w-full
            flex 
            flex-col 
            md:flex-row 
            md:justify-between
            md:items-start 
            justify-center 
            py-4 
            gap-y-12
            gap-x-20
        ">
        <div className="
            hover:opacity-[80%]
            flex
            justify-center
            min-w-[240px]
        ">
            <Avatar
            src={user.image}
            height={240}
            width={240}
            alt="my profile picture"
            />
        </div>
        <div 
        className="
            max-w-[700px]
            min-w-[400px]
            flex 
            flex-col 
            gap-y-4
        ">
          <Input
            id="name"
            label="Name"
            register={register}
            errors={errors}
          />
          <Input
            id="email"
            label="Email"
            disabled
            register={register}
            errors={errors}
          />
          <Input
            id="institutionId"
            label="Institution"
            type="text"
            register={register}
            errors={errors}
          />
            <button
                type="submit" 
                className="
                    font-semibold
                    rounded-lg
                    outline
                    border-1
                    w-full
                    p-2
                    transition-transform-shadow
                    duration-250 ease
                    hover:shadow-push-shadow
                    hover:-translate-x-1
                    hover:-translate-y-1
                    transform 
                    active:shadow-none
                    active:translate-y-1
                    active:translate-x-1
                ">
                    Update Profile
            </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
