import { FC } from 'react';
import Profile from '@components/Profile/Profile';

const ProfilePage: FC = function () {
  return (
    <div data-testid="profile-page">
      <Profile />
    </div>
  );
};

export default ProfilePage;
