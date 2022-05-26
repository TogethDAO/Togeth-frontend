import {
	getCollectionByContract,
	getProposalFromId,
	ProposalProps,
	updateProposal,
} from '@/utils/backend';
import { t } from 'i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import ParticipateInModal from './ParticipateIn';
import ParticipateList from './ParticipateList';
import Progress from './Progress';
import BigNumber from 'bignumber.js';
import moment from 'moment';

const useParticipateModal = () => {
	const [isVisible, setVisible] = useState(false);
	const onOpen = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};
	return { isVisible, onOpen, onClose };
};

const useProposal = () => {
	const { query } = useRouter();
	const [proposal, setProposal] = useState<ProposalProps | undefined>(undefined);
	const id = query.id;

	const fetchData = useCallback(() => {
		if (typeof id == 'string') {
			const proposal = getProposalFromId(id);
			setProposal(proposal);
		}
	}, [id]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { proposal, refresh: fetchData };
};

const Proposal = () => {
	const { isVisible: isParticipateModalVisible, onOpen, onClose } = useParticipateModal();
	const { proposal, refresh } = useProposal();
	const cardOption = [
		{
			key: 'promoter',
			value: (
				<>
					<span>{proposal?.promoter} </span>
					<span className="text-base">({proposal?.promoterAccount})</span>
				</>
			),
		},
		{
			key: 'departureAmount',
			value: (
				<>
					<span className="text-2xl">{proposal?.departureAmount}</span>
					<span className="ml-1">USDT</span>
				</>
			),
		},
		{
			key: 'startToEnd',
			value: proposal?.startTime ? (
				<>
					<span>
						{moment(proposal.startTime, 'X').format('MMM DD YYYY') +
							' - ' +
							moment(proposal.deadline, 'X').format('MMM DD YYYY')}
					</span>
					<span className="text-[#FF8D55] ml-1">
						{moment(proposal.deadline, 'X').format('HH:mm')}
					</span>
				</>
			) : (
				'-'
			),
		},
	];

	const detailOption = [
		{
			key: 'brief',
			value: proposal?.brief,
		},
		{
			key: 'target',
			value: (
				<>
					<p>{proposal?.collectionName}</p>
					<p>{proposal?.target}</p>
				</>
			),
		},
		{
			key: 'buyEffectiveTime',
			value: (
				<>
					If the price doesn’t hit among $ 10.00 - $ 20.00 in <b>48</b> hours, the proposal will be
					consider as failed.
				</>
			),
		},
		{
			key: 'departureAmount',
			value: `${proposal?.departureAmount} USDT`,
		},
		{
			key: 'end',
			value: moment(proposal?.deadline, 'X').format('MM/DD/YYYY HH:mm'),
		},
	];

	const currentAmount =
		proposal?.progress && proposal.departureAmount
			? new BigNumber(proposal.departureAmount)
					.multipliedBy(new BigNumber(proposal.progress).dividedBy(100))
					.toFormat(2)
			: undefined;

	return proposal ? (
		<div className="max-w-[1248px] mx-[96px] xl:mx-auto">
			<div className="bg-white p-14 rounded-xl">
				<div className="flex h-[452px] justify-between">
					<div className="w-[724px] p-14 rounded-xl shadow-[0_0_3px_1px_#eeeeee]">
						<p className="text-[34px] font-bold">{proposal?.title}</p>
						<div className="flex justify-between my-12">
							<div className="w-[480px] h-[22px] bg-[#f0f0f0]">
								<div
									className="bg-[#D7F5FF] h-full relative"
									style={{ width: proposal.progress + '%' }}
								>
									<div className="absolute w-20 h-[68px] -bottom-2 right-0 translate-x-1/2">
										<Image
											src={'/static/img/common/little-puzzle.svg'}
											width="80px"
											height="68px"
											alt=""
										></Image>
									</div>
								</div>
								<p className="text-right opacity-50 text-base">{`${proposal?.progress}`}%</p>
							</div>
							<p>{currentAmount ? `${currentAmount} USDT` : '-'}</p>
						</div>
						<div className="flex flex-col space-y-8">
							{cardOption.map(({ key, value }) => {
								return (
									<div key={key} className="flex justify-between text-xl">
										<span className="opacity-50 capitalize">{t(`proposal:${key}`, key)}</span>
										<div>{value}</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className="w-[348px]">
						<div className="h-[348px] bg-gray-100">
							<img
								src={getCollectionByContract(proposal.target)?.banner}
								alt=""
								className="w-full h-full object-cover"
							></img>
						</div>
						<p className="font-bold text-lg text-center my-3">{proposal?.collectionName}</p>
						<button
							className="btn-primary-longer w-full h-[52px] bg-[length:348px_52px]"
							onClick={onOpen}
						>
							Participate
						</button>
					</div>
				</div>
				<div className="space-y-8 py-6 mt-16 mr-[336px]">
					{detailOption.map(({ key, value }) => {
						return (
							<div key={key}>
								<p className="font-bold text-[22px] capitalize">{t(`proposal:${key}`, key)}</p>
								<p className="text-lg mt-3 font-light">{value}</p>
							</div>
						);
					})}
				</div>
				<div className="">
					<Progress></Progress>
				</div>
			</div>
			<ParticipateList></ParticipateList>
			{proposal?.promoter && (
				<ParticipateInModal
					visible={isParticipateModalVisible}
					onOk={() => {
						onClose();
						refresh();
					}}
					onCancel={onClose}
					onClose={onClose}
					proposalId={proposal.id}
					promoter={proposal?.promoter}
					promoterAccount={proposal?.promoterAccount}
					departAmount={proposal?.departureAmount}
					currentAmount={currentAmount?.toString() as string}
					collectionName={proposal.collectionName}
				></ParticipateInModal>
			)}
		</div>
	) : null;
};

export default Proposal;
