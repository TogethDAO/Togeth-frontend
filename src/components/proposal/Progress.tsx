import classNames from 'classnames';
import Image from 'next/image';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ProposalState } from './types';

interface StepProps {
	key: ProposalState;
	label: string;
	detail: string;
	labelExtra?: string;
	index: number;
}

const StepCard: FC<StepProps> = ({ label, detail, labelExtra, index }) => {
	const isOdd = index % 2 === 1;
	return (
		<div
			className={classNames('flex justify-between w-[1000px] mx-auto', {
				'flex-row-reverse': !isOdd,
			})}
		>
			<div
				className={classNames('w-[380px] flex flex-col justify-center', { 'text-right': isOdd })}
			>
				<p className="text-[26px]">Step {index}</p>
				<p className="text-[22px]">{label}</p>
				{labelExtra && <p className="text-brand-yellow text-[18px] mt-4">{label}</p>}
			</div>
			<div
				className={classNames('flex relative  w-[380px] h-[155px]', {
					'flex-row-reverse': !isOdd,
					'shadow-[0_2px_20px_0_#f0f0f0]': !!detail,
				})}
			>
				{detail && (
					<>
						<div
							className={classNames(`absolute top-1/2 -translate-y-1/2`, {
								'-left-20': isOdd,
								'-right-24': !isOdd,
							})}
						>
							{isOdd ? (
								<Image
									src={'/static/img/proposal/pic_puzzle01.svg'}
									width={'95px'}
									height={'94px'}
									alt=""
								></Image>
							) : (
								<Image
									src={'/static/img/proposal/pic_puzzle02.svg'}
									width={'156px'}
									height={'156px'}
									alt=""
								></Image>
							)}
							<p className="font-barlow text-[28px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
								{'0' + index.toString()}
							</p>
						</div>
						<div className="flex justify-center items-center">
							<p className="text-[18px] p-8">{detail}</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

const Progress = () => {
	const { t } = useTranslation('proposal');

	const stepList = [
		{
			key: ProposalState.SEND,
			label: t('step.crossChain', 'Cross-Chain'),
			detail: t(
				'step.crossChainDetail',
				`(The proposer shall send ETH (Polygon) to the Ethereum network via provided bridge function. )`,
			),
		},
		{
			key: ProposalState.BUY,
			label: t('step.buyNFT', 'Buy CryptoPunk'),
			labelExtra: 'From this point on, the proposal CAN NOT BE STOPPED by the proposer',
			detail: 'The proposer suppose to buy CryptoPunk in xx:xx:xx',
		},
		{
			key: ProposalState.SELL,
			label: t('step.sell', 'Distribute and claim your token'),
			detail: '(The proposer is seeking an opportunity to sell CryptoPunk)',
		},
		{
			key: ProposalState.BACK,
			label: t('step.crossBack', 'Cross Back'),
			detail:
				'(The proposer shall send ETH back to the Polygon network via provided bridge function. )',
		},
		{
			key: ProposalState.CLAIM,
			label: t('step.crossChain', 'All the investors claim the token'),
			detail: '',
		},
	];
	return (
		<div>
			<div className="flex flex-col items-center">
				<p className="text-[38px] relative z-10">Proposer Progress Update</p>
				<p className="text-[60px] opacity-20 text-white text-stroke-primary -mt-16 relative z-0">
					Proposer Progress Update
				</p>
			</div>
			<div className="h-[1400px] bg-[url(/static/img/proposal/curve.svg)] bg-center bg-no-repeat">
				<div className="space-y-[128px]">
					{stepList.map((stepProps, index) => {
						// eslint-disable-next-line react/jsx-key
						return <StepCard {...{ ...stepProps, index: index + 1 }}></StepCard>;
					})}
				</div>
			</div>
		</div>
	);
};

export default Progress;
