import { createProposal, getCollectionByContract } from '@/utils/backend';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { TargetCollection } from './TargetCollection';
import { CreateFormValues } from './types';

const Label: FC = ({ children }) => {
	return <span className="opacity-50 text-[20px] w-[200px] min-w-[200px]">{children}</span>;
};

const Row: FC = ({ children }) => {
	return (
		<div className="flex leading-[30px] px-14 py-5 border-b border-opacity-50 border-b-[#c9c9c9] last:border-0">
			{children}
		</div>
	);
};

const CreateConfirm = ({
	proposal,
	onCancel,
}: {
	proposal: CreateFormValues;
	onCancel: () => void;
}) => {
	const router = useRouter();
	const handleCancel = () => {
		onCancel();
	};

	const handleCreate = () => {
		createProposal(proposal);
		router.push({ pathname: '/account' });
	};

	const collection = getCollectionByContract(proposal.target);

	return (
		<div className="w-[1134px] bg-white mx-auto px-[60px] py-10 mt-5 mb-[110px]">
			<div className="shadow-[0_2px_20px_0_#d5d5d5] rounded-[24px]">
				<div className="flex items-center bg-black text-white text-[22px] py-6 px-14 rounded-lg">
					Target:
					<div className="text-base font-light h-6 leading-6 ml-4 px-6 bg-blue-600 rounded-[20px]">
						{collection?.name}
					</div>
				</div>
				<div className="py-10">
					<div className="flex justify-center mb-4">
						<TargetCollection contract={proposal.target}></TargetCollection>
					</div>
					<Row>
						<Label>Title</Label>
						<div className=" font-bold">{proposal.title}</div>
					</Row>
					<Row>
						<Label>Brief</Label>
						<div className=" font-light">{proposal.brief}</div>
					</Row>
					<Row>
						<Label>Target</Label>
						<div className="">
							<span className="font-light">You propose to Buy </span>
							<b>{collection?.name}</b>
						</div>
					</Row>
					<Row>
						<Label>BUY Effective time</Label>
						<div className="">
							<p>
								<span className="font-light">{`You promise to BUY ${collection?.name} in`}</span>
								<span className="ml-2"></span>
								<b>{proposal.effectDay} days</b>
							</p>
							<p className="text-[#ff8d55] mt-2">
								*If not, the proposal will be failed and return all the funded assets back to the
								participates.
							</p>
						</div>
					</Row>
					<Row>
						<Label>Depart Amount</Label>
						<div className=" font-bold">{proposal.departureAmount} ETH</div>
					</Row>
					<Row>
						<Label>End</Label>
						<div className=" font-bold">{proposal.deadline.format('YYYY-MM-DD HH:mm:ss')}</div>
					</Row>
				</div>
			</div>
			<div className="px-14 mt-12">
				<div className="flex items-center space-x-20">
					<p className="font-bold text-xl">Creation Fee</p>
					<p className="text-[28px] font-barlow text-brand-yellow">12.0</p>
				</div>
				<p className="font-light mt-3">
					Each proposal is a separate contract for which the proposor needs to pay the contract
					creation fee.
				</p>
				<div className="flex justify-center space-x-5 mt-12">
					<button className="btn-primary-longer w-[222px] h-[62px]" onClick={handleCancel}>
						Cancel
					</button>
					<button className="btn-primary-longer w-[222px] h-[62px]" onClick={handleCreate}>
						Create
					</button>
				</div>
				<p className="mt-9 font-light text-brand-yellow text-center">
					Careful! Once you create a proposal, it will be published immediately and can’t be edit
					again.
				</p>
			</div>
		</div>
	);
};

export default CreateConfirm;
