import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import notFoundImage from '../assets/notFoundImage.jpg';
import routes from '../utils/routes.js';
import Image from '../components/Pages/Image.jsx';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <Image
        src={notFoundImage}
        alt={t('image.NotFound')}
      />
      <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
      <p className="text-muted">
        {t('notFoundPage.text')}
        <Link to={routes.mainPagePath()}>{t('notFoundPage.link')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
