'use client'

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import {
    FieldValues, 
    SubmitHandler, 
    useForm
} from 'react-hook-form';
import { useToast } from "@/components/ui/use-toast"
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast()

    const { 
        handleSubmit,
        register,
        formState: { errors } 
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post("/api/register", data)
        .then(() => {
            // if success
            registerModal.onClose();
        })
        .catch((err) => {
            console.log(err);
            toast({
                variant: "destructive",
                title: "Failed to connect",
                description: "There was a problem with your request.",
              })
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const toggleLogin = useCallback(() => {
        registerModal.onClose;
        loginModal.onOpen;
    }, [registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-3">
            <Heading
                title="Welcome to Study Spotter"
                subtitle="Create an account!"
            />

            {/* FORM */}
            <Input 
                id="email"
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input 
                id="name"
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

                <Input 
                id="password"
                type="password"
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="
            flex 
            flex-col 
            gap-4
            mt-2">
            <hr />
            <Button 
                outline
                icon={FcGoogle}
                label="Continue with Google"
                onClick={() => signIn('google')}
            />
            <Button 
                outline
                icon={AiFillGithub}
                label="Continue with Github"
                onClick={() => signIn('github')}
            />
            <div
                className="
                text-neutral-400
                text-center
                mt-4
                font-light
                "
            >
                <div className="
                    flex 
                    flex-row 
                    items-center 
                    justify-center
                    gap-2"
                >
                    <div>
                        Already have an account?
                    </div>
                    <div 
                    onClick={toggleLogin}
                    className="
                        cursor-pointer
                        text-neutral-600
                        hover:underline
                    ">
                        Log In
                    </div>
                </div>
            </div>
        </div>
    )

  return (
    <Modal
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        title="Register"
        actionLabel="Continue"
        disabled={isLoading}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal