import { createModel } from '@rematch/core';
import { RootModel } from '.';

export const errors = createModel<RootModel>()({
	state: {
		lastError: null as Error | null,
	},
	reducers: {
		publishError(state, error: Error) {
			state.lastError = error;
			return state;
		},
		clearError(state, error: Error) {
			if (state.lastError === error) {
				state.lastError = null;
			}
			return state;
		},
	},
	effects: {
		registerGlobalHandler() {
			window.addEventListener('error', event => {
				event.preventDefault();
				if (event.error instanceof Error) {
					this.publishError(event.error);
				}
			});
			window.addEventListener('unhandledrejection', event => {
				event.preventDefault();
				if (event.reason instanceof Error) {
					this.publishError(event.reason);
				}
			});
		},
	},
});
