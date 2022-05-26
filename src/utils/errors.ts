import { i18n as I18n } from 'i18next';

export interface BaseErrorOptions {
	cause?: any;
	data?: Record<string, any>;
	expose?: boolean;
}

export class BaseError extends Error {
	cause: any;
	data: Record<string, any>;
	expose: boolean;

	constructor(message?: string, options: BaseErrorOptions = {}) {
		super(message);
		this.cause = options.cause;
		this.data = options.data ?? {};
		this.expose = options.expose ?? true;
	}

	getLocalMessage(_i18n: I18n): string {
		return this.message;
	}

	printTraceStack(): void {
		console.error(this);
		for (
			let error = this.cause;
			error != null;
			error = error instanceof BaseError ? error.cause : undefined
		) {
			console.error('Caused by:', error);
		}
	}
}
