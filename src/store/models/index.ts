import { Models } from '@rematch/core';
import { errors } from './errors';
import { wallet } from './wallet';

export interface RootModel extends Models<RootModel> {
	errors: typeof errors;
	wallet: typeof wallet;
}
export const models: RootModel = {
	errors,
	wallet,
};
