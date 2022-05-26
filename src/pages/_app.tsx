import '../styles/globals.css';
import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps as InitialAppProps } from 'next/app';
import '@/locales/i18n';
import { i18n } from '@/locales/i18n';
import { useRouter } from 'next/router';
import { ErrorHandler } from '@/components/error/ErrorHandler';
import { FC, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import '@/styles/fonts';
import { getLibrary } from '@/utils/web3React';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
import { useMemo } from 'react';
import moment from 'moment';

interface AppProps extends InitialAppProps {
	Component: InitialAppProps['Component'] & { getLayout?: FC };
}

const NoWrapper: FC = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
	const Wrapper = Component.getLayout || NoWrapper;
	const { locale } = useRouter();

	if (locale !== i18n.language) {
		i18n.changeLanguage(locale);
	}

	useEffect(() => {
		if (locale === 'zh') {
			moment.locale('zh-cn');
		} else {
			moment.locale('en');
		}
	}, [locale]);

	const antdLocale = useMemo(() => {
		const antdLocaleConfig: Record<string, typeof enUS> = {
			zh: zhCN,
			en: enUS,
		};
		return antdLocaleConfig[locale ?? 'en'] ?? antdLocaleConfig.en;
	}, [locale]);

	return (
		<>
			<Web3ReactProvider getLibrary={getLibrary}>
				<Provider store={store}>
					<ConfigProvider locale={antdLocale}>
						<ErrorHandler></ErrorHandler>
						<Wrapper>
							<Component {...pageProps} />
						</Wrapper>
					</ConfigProvider>
				</Provider>
			</Web3ReactProvider>
		</>
	);
}

export default MyApp;
