import { getProposalList } from '@/utils/backend';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import FilterBar from '../base/FilterBar';
import { ProposalProgress } from '../proposal/types';
import ListItem from './ListItem';

const Tab = ({ label, value }: { label: string; value: string }) => {
	const { query, push } = useRouter();

	return (
		<button
			className={classNames('text-[32px]', {
				'text-underline-secondary': (query.type ?? 'create') === value,
			})}
			onClick={() => {
				push({
					query: {
						...query,
						type: value,
					},
				});
			}}
		>
			{label}
		</button>
	);
};

const statusList = [
	{
		label: 'All',
		key: 'all',
	},
	{
		label: 'Proceeding',
		key: ProposalProgress.proceeding,
	},
	{
		label: 'Succeed',
		key: ProposalProgress.succeed,
	},
	{
		label: 'Failed',
		key: ProposalProgress.failed,
	},
];

const Account = () => {
	const TabList = [
		{ key: 'create', label: 'My Created' },
		{ key: 'participate', label: 'My Participate' },
	];

	return (
		<div className="w-[1242px] mx-auto">
			<div className="flex space-x-10 pl-24">
				{TabList.map(tab => (
					<Tab label={tab.label} value={tab.key} key={tab.key}></Tab>
				))}
			</div>
			<div className="mt-9 mb-20 pt-11 pb-[150px] px-[72px] rounded-t-[46px] bg-white">
				<FilterBar optionList={statusList}></FilterBar>
				<ol className="mt-6 space-y-6">
					{getProposalList().map(({ title, id, progress, promoter, img }, index) => {
						return (
							<ListItem
								key={index}
								{...{ title, id, progress, promoter, img, status: ProposalProgress.proceeding }}
							></ListItem>
						);
					})}
				</ol>
			</div>
		</div>
	);
};

export default Account;
