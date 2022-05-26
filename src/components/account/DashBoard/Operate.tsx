import classNames from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import { ProposalState } from '../../proposal/types';
import Buy from './Buy';
import CrossChain from './CrossChain';
import Sell from './Sell';

const StepNav = ({
	current,
	setCurrent,
}: {
	current?: number;
	setCurrent: (value: number) => void;
}) => {
	const LineBox = ({
		label,
		isSelect,
		index,
		className,
	}: {
		label: string;
		isSelect: boolean;
		index: number;
		className?: string;
	}) => {
		return (
			<div
				className={classNames(
					'relative w-[400px] h-[112px] flex justify-center items-center',
					className,
				)}
			>
				<div
					className={classNames('w-full h-[2px] border-dashed border-t-2 border-t-[#e0e0e0]', {
						'border-t-[#FFD13C]': isSelect,
					})}
				></div>
				<div
					className={classNames(
						'absolute right-0 top-[56px] w-[2px] h-[80px] border-dashed border-r-2 border-r-[#e0e0e0]',
						{
							'border-r-[#FFD13C]': isSelect,
							hidden: index != 2,
						},
					)}
				></div>
				<span
					className={classNames(
						'text-[28px] opacity-50 absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2',
						{ 'opacity-100 text-[#FFD13C]': isSelect },
					)}
				>
					{label}
				</span>
				<span
					className={classNames(
						'absolute text-[100px] font-bold',
						{
							'-left-7': index <= 2,
							'-right-7': index > 2,
							'text-white text-stroke-gray': !isSelect,
						},
						'hover:cursor-pointer',
					)}
					onClick={() => setCurrent(index)}
				>
					{index}
				</span>
				<div
					className={classNames(
						'absolute -left-5 w-9 h-9 from-[#FFC031] to-[#FFF6D7] bg-gradient-to-br rotate-45',
						{
							hidden: index != 4,
						},
					)}
				></div>
			</div>
		);
	};
	const stepList = [
		{
			key: ProposalState.SEND,
			label: 'Send',
		},
		{
			key: ProposalState.BUY,
			label: 'Buy',
		},
		{
			key: ProposalState.SELL,
			label: 'Sell',
		},
		{
			key: ProposalState.BACK,
			label: 'Send Back',
		},
	];
	return (
		<div className="flex flex-wrap justify-center">
			{stepList.map((step, index) => {
				return (
					<LineBox
						className={classNames({ 'order-4': index + 1 === 3 })}
						key={step.key}
						label={step.label}
						isSelect={current ? index + 1 <= current : false}
						index={index + 1}
					></LineBox>
				);
			})}
		</div>
	);
};

const CrossChainBg = () => {
	return (
		<div className={classNames('absolute top-[180px] left-0 ')}>
			<Image
				src={'/static/img/account/cross-chain/bg-line.svg'}
				width={'1241px'}
				height={'559px'}
				alt=""
			></Image>
		</div>
	);
};

const Operate = () => {
	const [currentStep, setStep] = useState<ProposalState | undefined>(ProposalState.SEND);

	const renderWrapper = () => {
		switch (currentStep) {
			case ProposalState.SEND:
				return <CrossChain></CrossChain>;
			case ProposalState.BUY:
				return <Buy></Buy>;
			case ProposalState.SELL:
				return <Sell></Sell>;
			case ProposalState.BACK:
				return <CrossChain></CrossChain>;
			default:
				return null;
		}
	};

	return (
		<div className="px-[86px] pt-8 pb-8 relative">
			{(currentStep == ProposalState.SEND || currentStep == ProposalState.BACK) && (
				<CrossChainBg></CrossChainBg>
			)}
			<div className="relative">
				<StepNav current={currentStep} setCurrent={setStep}></StepNav>
				<div className="mt-6">{renderWrapper()}</div>
			</div>
		</div>
	);
};

export default Operate;
