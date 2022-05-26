import { createModel } from '@rematch/core';
import { RootModel } from '.';

interface walletState {
	current: any;
	address?: string;
	visibleConnectModal: boolean;
}

const initialWalletState = {
	address: undefined,
	visibleConnectModal: false,
};

export const wallet = createModel<RootModel>()({
	state: initialWalletState as walletState,
	reducers: {
		setConnectModal(state, visible: boolean) {
			state.visibleConnectModal = visible;
			return state;
		},
	},
});
