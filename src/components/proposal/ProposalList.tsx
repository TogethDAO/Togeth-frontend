import { getProposalList } from '@/utils/backend';
import { CaretDownOutlined, CaretUpOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import ProposalItem from '../home/ProposalItem';
import { ClosingOrder, HotOrder, ListStatus } from '../type';

const ProposalList = () => {
	const { t } = useTranslation();
	const { query, push } = useRouter();
	const { status } = query;
	const listStatus = status || ListStatus.Proceeding;
	const list = getProposalList();

	const statusOptions = [
		{
			label: t('home:proceeding', 'Proceeding'),
			key: ListStatus.Proceeding,
		},
		{
			label: t('home:finished', 'Finished'),
			key: ListStatus.Finished,
		},
	];

	const orderOption = [
		{
			label: t('proposals:hottest', 'Hottest'),
			value: HotOrder,
			key: 'Hottest',
		},
		{
			label: t('proposals:closing', 'Closing'),
			value: ClosingOrder,
			key: 'Closing',
		},
	];

	const onSearch = () => {
		console.log('onSearch');
	};

	return (
		<div className="w-[1096px] mx-auto pb-16">
			<div className="bg-white h-[108px] px-5 py-6 flex items-center rounded-lg">
				<div className="w-[262px] h-full border-2 px-1 border-[#cce7f0] flex items-center rounded-xl">
					{statusOptions.map(({ key, label }) => {
						return (
							<button
								key={key}
								className={classNames('h-[50px] w-[127px] rounded-lg text-medium', {
									'bg-[#cce7f0]': listStatus === key,
								})}
								onClick={() => {
									push({ query: { status: key } });
								}}
							>
								{label}
							</button>
						);
					})}
				</div>
				<Input
					size={'large'}
					placeholder="proposal name or num"
					prefix={<SearchOutlined className="mr-2" />}
					className="w-[260px] h-full rounded-xl ml-4"
					onPressEnter={onSearch}
				></Input>
				<div className="ml-auto flex items-center space-x-4">
					{orderOption.map(({ label, value, key }) => {
						const { ASC, DESC } = value;
						const currentOrder = query[key] || value.ASC;
						const rightIcon = [
							{
								value: ASC,
								icon: CaretUpOutlined,
							},
							{
								value: DESC,
								icon: CaretDownOutlined,
							},
						].map(({ value, icon }) => {
							const Icon = icon;
							return (
								<Button
									size="small"
									type="text"
									onClick={() => {
										push({ query: { ...query, [key]: value } });
									}}
									key={value}
								>
									<Icon
										className={classNames('hover:cursor-pointer opacity-20', {
											'opacity-100': currentOrder === value,
										})}
									/>
								</Button>
							);
						});
						return (
							<div
								key={key}
								className="w-[156px] h-[60px] px-5 rounded-lg shadow-[0_0_6px_1px_#eeeeee] flex justify-between items-center"
							>
								<span>{label}</span>
								<span className="flex flex-col">{rightIcon}</span>
							</div>
						);
					})}
				</div>
			</div>
			<ol className="mt-6 space-y-6">
				{list.map(({ id, progress, promoter, title, deadline, img }) => {
					return (
						<ProposalItem
							key={id}
							{...{ id, progress, promoter, title, deadline, img }}
						></ProposalItem>
					);
				})}
			</ol>
		</div>
	);
};

export default ProposalList;
