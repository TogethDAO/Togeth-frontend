import { ConnectorNames } from '@/utils/types';

export interface Config {
	title: string;
	icon: string;
	connectorId: ConnectorNames;
	priority: number;
	mobileOnly?: boolean;
	href?: string;
}
