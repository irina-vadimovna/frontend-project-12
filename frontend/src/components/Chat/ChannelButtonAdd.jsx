import { useTranslation } from 'react-i18next';
import ChannelIcon from '../../assets/icons/ChannelIcon';

const ChannelButtonAdd = ({ openModal }) => {
  const { t } = useTranslation();

  return (
    <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => openModal('adding')}>
      <ChannelIcon />
      <span className="visually-hidden">{t('channelTitle.addButton')}</span>
    </button>
  );
};

export default ChannelButtonAdd;
