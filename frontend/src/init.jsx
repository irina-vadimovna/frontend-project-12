import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { setupListeners } from '@reduxjs/toolkit/query';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import filter from 'leo-profanity';
import resources from './locales/index';
import App from './App';
import store from './store/store';
import setupWebSocketListeners from './store/api/webSocketHandler';

const init = async () => {
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const options = {
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  };

  await i18next.use(initReactI18next).init(options);

  setupWebSocketListeners(store);
  setupListeners(store.dispatch);

  const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROLLBAR_TOKEN,
    environment: 'production',
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18next}>
          <App />
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
