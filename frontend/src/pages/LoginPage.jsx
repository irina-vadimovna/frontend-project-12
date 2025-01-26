import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from '../components/Pages/Container';
import Image from '../components/Pages/Image';
import loginImage from '../assets/loginImage.jpg';
import LoginForm from '../components/Pages/LoginForm';
import routes from '../utils/routes';

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <Image src={loginImage} alt={t('image.login')} />
        </div>
        <LoginForm />
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>{t('loginPage.question')}</span>
          <Link to={routes.signUpPagePath()}>{t('loginPage.registration')}</Link>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
