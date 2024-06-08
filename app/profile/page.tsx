import React from 'react';
import Container from '../components/Container';
import getCurrentUser from '../actions/getCurrentUser';
import ProfileForm from '../components/profile/ProfileForm';
import NoSpotsView from '../components/NoSpotsView';
import { Diversity2Sharp } from '@mui/icons-material';
import { TbContainerOff } from 'react-icons/tb';
import Heading from '../components/Heading';

const ProfilePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return <NoSpotsView />;
  }

  return (
    <Container>
      <div className="
        py-8
        md:py-20
        flex
        items-center
        flex-col
        min-h-[70vh]
      ">
        <div>
          <Heading 
            title={`Your Profile`}
          />
        </div>
        <div 
        className="
          p-4 
          xl:max-w-[80%]">
          <ProfileForm user={user} />
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
