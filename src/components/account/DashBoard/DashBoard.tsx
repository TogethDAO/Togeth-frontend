import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import FilterBar from '../../base/FilterBar';
import { ProposalState } from '../../proposal/types';
import Operate from './Operate';

const operateList = [
	{
		key: 'all',
		label: 'All',
	},
	{
		key: ProposalState.SEND.toString(),
		label: 'Send',
	},
	{
		key: ProposalState.BUY.toString(),
		label: 'Buy',
	},
	{
		key: ProposalState.SELL.toString(),
		label: 'Sell',
	},
	{
		key: ProposalState.BACK.toString(),
		label: 'SendBack',
	},
];

const Nav = () => {
	const router = useRouter();
	return (
		<nav className="flex justify-between">
			<div className="w-[30%] flex items-center space-x-3">
				<button className="h-full">
					<ArrowLeftOutlined onClick={() => router.back()} />
				</button>
				<span className="text-xl opacity-50">Participate in ConstitutionDAO</span>
			</div>
			<p className="text-[38px]">Operate</p>
			<div className="w-[30%] flex items-center flex-row-reverse">
				<button className="w-[110px] h-[42px] text-[#fdbd00] border border-[#fdbd00] bg-white rounded-md">
					Stop
				</button>
			</div>
		</nav>
	);
};

const TableRow = () => {
	return (
		<div className="flex">
			<div className="flex justify-center items-center w-7 h-7 bg-[#D6F5E0] rounded-full">
				<CheckOutlined className="text-xs text-[#19C3A9]" />
			</div>
			<div className="ml-12 flex-1">
				<p className="text-lg font-medium">Send 123 wETH to Ethereym network</p>
			</div>
			<div className="w-[200px]">
				<p className="text-lg">Jan,1, 2022 10:00:04</p>
			</div>
		</div>
	);
};

const HistoryList = () => {
	return (
		<div className="mt-16 px-20">
			<div className="h-20 mt-10 rounded-lg bg-gradient-to-b from-[#313E4F] to-[#161D27]">
				<span className="text-white text-[22px] ml-[60px] leading-[80px]">Operate History</span>
			</div>
			<div className="flex flex-col px-[60px] mt-6 bg-white h-[520px] shadow-[0_2px_20px_0_#f2f2f2]">
				<FilterBar
					optionList={operateList}
					className="!w-full mt-6"
					btnClassName="!w-[156px]"
				></FilterBar>
				<div className="py-9 space-y-5">
					{new Array(6).fill(1).map((i, index) => {
						return <TableRow key={index}></TableRow>;
					})}
				</div>
				<div className="flex justify-center py-6">
					<Pagination total={500} className="ant"></Pagination>
				</div>
			</div>
		</div>
	);
};

const DashBoard = () => {
	return (
		<div className="w-[1242px] mx-auto">
			<Nav></Nav>
			<main className="mt-7 mb-8 pb-20 bg-white rounded-t-[48px] flow-root">
				<Operate></Operate>
				<HistoryList></HistoryList>
			</main>
		</div>
	);
};

export default DashBoard;
