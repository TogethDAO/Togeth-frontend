import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { models, RootModel } from './models';
import immerPlugin from '@rematch/immer';
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading';
import { IN_PRODUCTION } from '@/utils/env';
import { useStore as useReduxStore, useSelector as useReduxSelector } from 'react-redux';

type FullModel = ExtraModelsFromLoading<RootModel>;

export const store = init<RootModel, FullModel>({
	models,
	plugins: [immerPlugin(), loadingPlugin()],
	redux: {
		devtoolOptions: {
			disabled: IN_PRODUCTION,
		},
	},
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;
export type Selector<R> = (rootState: RootState) => R;

export function useStore(): Store {
	return useReduxStore() as Store;
}

export function useDispatch(): Store['dispatch'] {
	return useStore().dispatch;
}

export function useSelector<R>(
	selector: Selector<R>,
	equalityFn?: (left: R, right: R) => boolean,
): R {
	return useReduxSelector(selector, equalityFn);
}
