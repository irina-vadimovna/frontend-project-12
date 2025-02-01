import { toast } from 'react-toastify';
import i18next from 'i18next';

const customBaseQuery = (baseQuery) => async (args, api, extraOptions) => {
  try {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error) {
      if (result.error.status === 'FETCH_ERROR') {
        toast.error(i18next.t('toastify.error.connectionError'));
      }
    }
    return result;
  } catch (error) {
    toast.error(i18next.t('toastify.error.error'));
  }
};

export default customBaseQuery;
