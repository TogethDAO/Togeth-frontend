import classNames from 'classnames';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface FilterBarProps {
	optionList: Array<{ label: string; key: string }>;
	className?: string;
	btnClassName?: string;
}

const FilterBar: FC<FilterBarProps> = ({ optionList, className = '', btnClassName = '' }) => {
	const router = useRouter();

	const onFilter = (key: string) => {
		router.replace(
			{
				query: {
					...router.query,
					status: key,
				},
			},
			undefined,
			{
				scroll: false,
			},
		);
	};

	return (
		<div
			className={classNames(
				'flex justify-around items-center w-[633px] h-[60px] border-2 border-[#CCE7F0] rounded-xl',
				className,
			)}
		>
			{optionList.map(item => {
				return (
					<button
						className={classNames(
							'px-3 w-[128px] h-[50px] leading-[50px] rounded-lg',
							{
								'bg-[#CCE7F0]': item.key === (router.query.status ?? 'all'),
							},
							btnClassName,
						)}
						key={item.key}
						onClick={() => onFilter(item.key)}
					>
						{item.label}
					</button>
				);
			})}
		</div>
	);
};

export default FilterBar;
