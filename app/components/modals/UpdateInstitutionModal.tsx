import { useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import Modal from './Modal'; // Import your Modal component
import InstitutionSelect from '../inputs/InstitutionSelect';
import useUpdateInstitutionModal from '@/app/hooks/useUpdateInstitutionModal';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { useToast } from '@/components/ui/use-toast';
import Heading from '../Heading';

const UpdateInstitutionModal = async () => {
  const updateInstitutionModal = useUpdateInstitutionModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
    watch
  } = useForm<FieldValues>({
    defaultValues: {
      institutionId: ''
    }
  });

  const institutionId = watch('institutionId');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      // await axios.post(`/api/user/${currentUser.id}`, data);
      toast({
        title: 'Profile updated.'
      });
      router.push(`/institution/${data.institutionId}`);
      updateInstitutionModal.onClose();
    } catch (error) {
      toast({ 
        variant: "destructive",
        title: "Update failed."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectInstitution = (id: string | null) => {
    setValue('institutionId', id, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  let bodyContent = (
    <div className="flex flex-col gap-3">
      <Heading 
        title='No affliated institution'
        subtitle='Update your profile'
      />
      <InstitutionSelect 
        onSelectInstitution={handleSelectInstitution}
        selectedInstitutionId={institutionId}
      />
    </div>
  );

  return (
    <Modal
      onSubmit={handleSubmit(onSubmit)}
      onClose={updateInstitutionModal.onClose}
      actionLabel="Update"
      body={bodyContent}
    />
  );
};

export default UpdateInstitutionModal;
