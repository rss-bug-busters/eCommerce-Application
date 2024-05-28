import { FC } from 'react';
import Profile from '@components/Profile/Profile';

const ProfilePage: FC = function () {
  return (
    <div data-testid="profile-page">
      <h1>Profile</h1>
      <Profile />
    </div>
  );
};

export default ProfilePage;
