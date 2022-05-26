import classNames from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pagination } from 'antd';

enum List {
	MY_PARTICIPATES = 1,
	PARTICIPATES = 2,
}

const ParticipateList = () => {
	const { t } = useTranslation('proposal');

	const [type, setType] = useState(List.MY_PARTICIPATES);

	const option = [
		{
			key: List.MY_PARTICIPATES,
			label: t('myParticipates', 'My Participates'),
		},
		{
			key: List.PARTICIPATES,
			label: t('participates', 'Participates'),
		},
	];

	const list = [
		{
			timestamp: 123,
			amount: 1000,
			address: '0xhhoihihnkjnkjnhc167IUHUHNiknlkn',
		},
		{
			timestamp: 23,
			amount: 1000,
			address: '0xhhoihihnkjnkjnhc167IUHUH',
		},
	];

	return (
		<div className="mt-10">
			<div className="bg-black px-16 py-[28px] rounded-lg flex justify-between text-[22px] text-white">
				<div className="space-x-10">
					{option.map(({ key, label }) => {
						return (
							<span
								key={key}
								className={classNames('font-bold hover:cursor-pointer', {
									'text-[#FDBD00]': key === type,
								})}
								onClick={() => {
									setType(key);
								}}
							>
								{label}
							</span>
						);
					})}
				</div>
				<div>
					<span>Total</span>
					<span>2290</span>
				</div>
			</div>
			<div className="px-12 py-6 text-lg">
				<table className="w-full">
					<tbody>
						{list.map(({ timestamp, amount, address }) => {
							return (
								<tr key={timestamp} className="">
									<td className="w-1/3 p-4 font-light">{address}</td>
									<td className="w-1/5 text-right p-4 font-bold">{amount}</td>
									<td className="w-1/5 text-right p-4">{timestamp}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<div className="flex justify-center py-4">
					<Pagination total={500} className="ant"></Pagination>
				</div>
			</div>
		</div>
	);
};

export default ParticipateList;
