import { useTranslation } from 'react-i18next';
import Container from '../components/Pages/Container';
import Image from '../components/Pages/Image';
import registrationImage from '../assets/registrationImage.jpg';
import RegistrationForm from '../components/Pages/RegistrationForm';

const SignUpPage = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
        <div>
          <Image
            src={registrationImage}
            alt={t('image.signup')}
          />
        </div>
        <RegistrationForm />
      </div>
    </Container>
  );
};

export default SignUpPage;
