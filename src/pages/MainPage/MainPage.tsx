import './mainPage.scss';
import LoginPage from '@pages/LoginPage/LoginPage';

function MainPage() {
  return (
    <div data-testid="main-page">
      <LoginPage/>
    </div>
  );
}

export default MainPage;
