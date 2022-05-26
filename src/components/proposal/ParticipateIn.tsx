import { getProposalList, updateProposal } from '@/utils/backend';
import { InputNumber, Modal, ModalProps } from 'antd';
import BigNumber from 'bignumber.js';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

const BriefRow: FC<{ label: string; value: string | React.ReactElement; subValue?: string }> = ({
	label,
	value,
	subValue,
}) => {
	return (
		<div className="flex justify-between">
			<p className="opacity-50 ">{label}</p>
			<div className="max-w-[60%]">
				{typeof value === 'string' ? (
					<p>
						<span className="font-medium">{value}</span>
						{subValue && <span className="ml-3">{`(${subValue})`}</span>}
					</p>
				) : (
					value
				)}
			</div>
		</div>
	);
};
const ParticipateInModal: FC<
	ModalProps & {
		onClose: () => void;
		departAmount: string;
		currentAmount: string;
		promoter: string;
		promoterAccount: string;
		collectionName: string;
		proposalId: string;
	}
> = ({
	children,
	onClose,
	departAmount,
	currentAmount,
	promoter,
	promoterAccount,
	collectionName,
	proposalId,
	...rest
}) => {
	const { t } = useTranslation('proposal');
	const [amount, setAmount] = useState<undefined | string>();
	const onConfirm = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		console.log('amount', amount);
		if (amount) {
			const progress = new BigNumber(amount)
				.plus(currentAmount)
				.dividedBy(departAmount)
				.multipliedBy(100)
				.toFormat(2);
			updateProposal({ id: proposalId, progress: progress });
			rest.onOk?.(e);
		}
	};

	const maxAmount = new BigNumber(departAmount).toFormat(2);

	const amountNode = (
		<div className="w-[355px]">
			<InputNumber
				size={'large'}
				className="w-full rounded-md border-[#141d28]"
				precision={2}
				stringMode
				controls={false}
				max={maxAmount}
				value={amount}
				onChange={value => {
					setAmount(new BigNumber(value).toFormat(2));
				}}
				placeholder="Input"
			></InputNumber>
			<p className="text-base opacity-50 text-right mt-2">
				<b>123,282.00</b>
				<span>USDT available</span>
			</p>
		</div>
	);

	return (
		<Modal
			width="883px"
			title={null}
			footer={null}
			centered
			destroyOnClose
			afterClose={() => {
				setAmount(undefined);
			}}
			{...rest}
		>
			<div className="p-8">
				<p className="text-center text-[32px] font-bold">
					{t('participate.title', 'Participate in ConstitutionDAO')}
				</p>
				<div className="mt-16">
					<p className="text-[22px] font-bold">{'Brief'}</p>
					<div className="bg-[#f9f9f9] border-[#d4d4d4] p-4 mt-3 text-xl space-y-6">
						<BriefRow
							label={'Depart Amount'}
							value={`${departAmount} ETH`}
							subValue={`${currentAmount} ETH`}
						></BriefRow>
						<BriefRow label={'Promoter'} value={promoter} subValue={promoterAccount}></BriefRow>
						<BriefRow label={'Target'} value={collectionName}></BriefRow>
						<BriefRow label={'Participate Amount'} value={amountNode}></BriefRow>
					</div>
					<p className="text-[22px] mt-5 font-bold text-brand-yellow">If failure</p>
					<p>
						We’ll wait for <b>1h</b> and see if the price falls back to <b>$5 - 7</b> per token, if
						so, we’ll still buy it. Otherwise, this proposal `will be called as failure and you can
						claim your assets later.
					</p>
					<div className="flex justify-center my-12">
						<button
							className="btn-primary-longer text-lg w-[389px] h-[76px] bg-[length:389px_76px]"
							onClick={onConfirm}
						>
							Get Me Onboard
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ParticipateInModal;
