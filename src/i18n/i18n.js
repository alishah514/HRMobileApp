import I18n from 'react-native-i18n';
import en from '../languages/en.json';
import ja from '../languages/ja.json';

I18n.translations = {
  en,
  ja,
};

I18n.fallbacks = true;
I18n.defaultLocale = 'en';

export default I18n;
