'use client'

import { signIn } from "next-auth/react";
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import useLoginModal from '@/app/hooks/useLoginModal';
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
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast()

    const { 
        handleSubmit,
        register,
        formState: { errors } 
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', { // using credentials provider
            ...data,            // option of form input values
            redirect: false     // option specifies manual redirect
        })
        .then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast({
                    title: "Successfully logged in!",
                })
                router.refresh();
                loginModal.onClose();
            }

            if(callback?.error) {
                toast({
                    variant: "destructive",
                    title: "Something went wrong."
                })
            }
        })
    }

    const toggleRegister = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-3">
            <Heading
                title="Welcome back"
                subtitle="Login to your account"
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
                        First time using Study Spotter?
                    </div>
                    <div 
                    onClick={toggleRegister}
                    className="
                        cursor-pointer
                        text-neutral-600
                        hover:underline
                    ">
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )

  return (
    <Modal
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        title="Login"
        actionLabel="Continue"
        disabled={isLoading}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal