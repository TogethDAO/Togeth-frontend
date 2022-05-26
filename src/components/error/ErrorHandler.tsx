import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '@/store';
import { BaseError } from '@/utils/errors';
import { i18n } from '@/locales/i18n';

export const ErrorHandler: FC = () => {
	const lastTime = useRef<number | null>(null);
	const lastLocalMessage = useRef<string | null>(null);

	const error = useSelector(rootState => rootState.errors.lastError);

	const dispatch = useDispatch();

	const toast = (option: any) => {
		console.log('ErrorHandler:toast', option);
	};

	useEffect(() => {
		dispatch.errors.registerGlobalHandler();
	}, [dispatch]);

	useEffect(() => {
		if (error != null) {
			dispatch.errors.clearError(error);
			if (error instanceof BaseError) {
				if (error.expose) {
					const localMessage = error.getLocalMessage(i18n);
					const now = Date.now();
					if (localMessage) {
						if (
							localMessage !== lastLocalMessage.current ||
							lastTime.current == null ||
							now - lastTime.current > 1000
						) {
							toast({ description: localMessage, position: 'top', status: 'error' });
							lastLocalMessage.current = localMessage;
							lastTime.current = now;
						}
					}
					error.printTraceStack();
				}
				return;
			}
			console.error(error);
		}
	}, [dispatch, toast, error]);

	return null;
};
