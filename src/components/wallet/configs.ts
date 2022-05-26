import { ConnectorNames } from '@/utils/types';
import { Config } from './types';

export const connectors: Config[] = [
	{
		title: 'Metamask',
		icon: '/static/img/icon/metamask.svg',
		connectorId: ConnectorNames.Injected,
		priority: 1,
		href: 'https://metamask.app.link/dapp/pancakeswap.finance/',
	},
];
