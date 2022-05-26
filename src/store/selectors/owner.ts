import { createSelector } from 'reselect';
import { RootState } from '..';

const selectOwner = (rootState: RootState) => rootState.domain.owner;
const selectWalletCurrent = (rootState: RootState) => rootState.wallet.current;
const hashToAddress = (o: any) => o;

export const selectIsOwner = createSelector(
	selectOwner,
	selectWalletCurrent,
	(owner, currentWallet) => {
		return owner ? hashToAddress(owner) === currentWallet?.address : false;
	},
);
