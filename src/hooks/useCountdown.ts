import moment from 'moment';
import { useEffect, useState } from 'react';

export const useCountdown = (deadline?: string) => {
	const end = deadline ? moment(deadline, 'X') : moment();

	const [duration, setDuration] = useState<moment.Duration>(() => {
		let duration;
		if (deadline != null) {
			const now = moment(Date.now(), 'x');
			duration = moment.duration(end.diff(now));
		} else {
			duration = moment.duration(0);
		}
		return duration;
	});

	useEffect(() => {
		const intervalId = setInterval(() => {
			const now = moment(Date.now(), 'x');
			const diff = end.diff(now);
			setDuration(moment.duration(diff > 0 ? diff : 0));
		}, 1000);
		return () => {
			clearInterval(intervalId);
		};
	}, [end]);

	const hour = duration.hours().toString().padStart(2, '0');
	const minute = duration.minutes().toString().padStart(2, '0');
	const second = duration.seconds().toString().padStart(2, '0');
	return `${hour}:${minute}:${second}`;
};
