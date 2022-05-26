import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import zh from './zh';
import en from './en';
import { IN_PRODUCTION } from '@/utils/env';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en,
			zh,
		},
		ns: ['shared_header', 'common', 'shared_wallet'],
		fallbackLng: 'en',
		debug: !IN_PRODUCTION,

		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		saveMissing: true,
	});

export { i18n };
