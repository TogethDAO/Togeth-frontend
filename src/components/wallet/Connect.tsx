import { useDispatch, useSelector } from '@/store';
import { connectorsByName, useEagerConnect, useInactiveListener } from '@/utils/web3React';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NextImage from 'next/image';
import { connectors } from './configs';

const Connect = () => {
	const { t } = useTranslation('');
	const context = useWeb3React<Web3Provider>();
	const visibleConnectModal = useSelector(s => s.wallet.visibleConnectModal);
	const dispatch = useDispatch();
	const { connector, library, chainId, account, activate, deactivate, active, error } = context;

	// handle logic to recognize the connector currently being activated
	const [activatingConnector, setActivatingConnector] = useState<any>();
	useEffect(() => {
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined);
		}
	}, [activatingConnector, connector]);

	// handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
	const triedEager = useEagerConnect();

	// handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
	useInactiveListener(!triedEager || !!activatingConnector);

	const onConnect = async () => {
		setActivatingConnector(connectorsByName.Injected);
		try {
			await activate(connectorsByName.Injected);
			dispatch.wallet.setConnectModal(false);
		} catch (error) {
			if (error) {
				setActivatingConnector(undefined);
			}
		}
	};

	const onDisConnect = async () => {
		deactivate();
	};

	const connected = connectorsByName.Injected === connector;

	return (
		<>
			<Button
				className={`ml-16 bg-[#FFE502] border-2 border-[#0D2C4D] hover:bg-[#FFE502]/50 focus:bg-[#FFE502]/50 hover:text-current focus:text-current hover:border-current focus:border-[#0D2C4D]`}
				shape={'round'}
				onClick={() => {
					connected ? onDisConnect() : dispatch.wallet.setConnectModal(true);
				}}
			>
				{connected ? (
					<div>
						{account}: {chainId}
					</div>
				) : (
					t('shared_wallet:connectWallet')
				)}
			</Button>
			<Modal
				visible={visibleConnectModal}
				onOk={() => {
					('');
				}}
				onCancel={() => {
					dispatch.wallet.setConnectModal(false);
				}}
				title={null}
				footer={null}
				centered
			>
				<div>
					<p className="text-center text-[32px]">{t('shared_wallet:connectWallet')}</p>
					<div className="mt-4 py-4">
						{connectors.map(config => {
							return (
								<div
									key={config.title}
									className="flex flex-col items-center hover:cursor-pointer"
									onClick={onConnect}
								>
									<NextImage src={config.icon} width="48px" height={'48px'}></NextImage>
									<p className="mt-2 text-2xl">{config.title}</p>
								</div>
							);
						})}
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Connect;
