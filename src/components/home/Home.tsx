import { useSelector } from '@/store';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import ProposalItem from './ProposalItem';
import { ListStatus } from '../type';
import { getProposalList } from '@/utils/backend';

const Home = () => {
	const { t } = useTranslation();
	const { query, push } = useRouter();
	const errors = useSelector(r => r.errors);
	const proposalList = getProposalList();
	const dataList = [
		{
			label: t('home:proposals', 'Proposals'),
			value: '789',
		},
		{
			label: t('home:funded', 'Funded'),
			value: '$123,123.00',
		},
		{
			label: t('home:supporters', 'Supporters'),
			value: '3329',
		},
	];

	const listFiler = [
		{
			label: t('home:proceeding', 'Proceeding'),
			key: ListStatus.Proceeding,
		},
		{
			label: t('home:finished', 'Finished'),
			key: ListStatus.Finished,
		},
	];

	return (
		<div className="bg-white flow-root">
			<div className={`h-[846px] w-full top-0 absolute`}>
				<NextImage src={'/static/img/home/wrapper_bg.png'} layout="fill"></NextImage>
				<div className="w-[1096px] h-full mx-auto relative">
					<div className="absolute bottom-0 -left-[217px]">
						<NextImage
							src={'/static/img/home/puzzle_green.png'}
							width={'395px'}
							height={'390px'}
						></NextImage>
					</div>
					<div className="absolute -bottom-16 2xl:-bottom-[72px] -right-[88px]">
						<NextImage
							src={'/static/img/home/puzzle_blue@2x.png'}
							width={'491px'}
							height={'781px'}
						></NextImage>
					</div>
				</div>
			</div>
			<div className="2xl:ml-[170px] lg:w-[1096px] lg:mx-auto relative pt-16">
				<blockquote className="text-[54px] home-mixed-title font-light">
					{'Every'}
					<span className="overlap-text font-bold" data-text="little">
						{' little '}
					</span>
					{'makes a'}
					<span className="overlap-text font-bold" data-text="mickle">
						{' mickle '}
					</span>
					{'!'}
				</blockquote>
				<div
					className={`mt-14 pr-6 pb-7 w-[700px] h-[205px] bg-no-repeat bg-center bg-contain bg-[url(/static/img/home/display-box.png)]`}
				>
					<div className="px-10 text-[44px]">
						<div className="flex justify-around">
							{dataList.map(({ label, value }) => {
								return (
									<div key={label} className="text-center font-bold">
										<p className="text-white font-barlow leading-[122px]">{value}</p>
										<p className="text-2xl leading-[54px]">{label}</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			<div className="w-[1096px] mt-32 mx-auto relative">
				<div className="flex space-x-32 text-[32px] ml-[186px]">
					{listFiler.map(({ label, key }) => {
						return (
							<div
								key={key}
								className={classNames('hover:cursor-pointer relative', {
									'font-bold': query.status == key,
								})}
								onClick={() => {
									push({ pathname: '/', query: { status: key } }, undefined, {
										scroll: false,
										shallow: true,
									});
								}}
							>
								<p
									className={classNames('px-5', {
										'text-underline-secondary': (query.status || ListStatus.Proceeding) === key,
									})}
								>
									{label}
								</p>
							</div>
						);
					})}
				</div>
				<ol className="mt-6 space-y-6">
					{getProposalList().map((value, index) => {
						return (
							<ProposalItem
								key={index}
								title={value.title}
								promoter={value.promoter}
								deadline={value.deadline}
								progress={value.progress}
								img={value.img}
								id={value.id}
							></ProposalItem>
						);
					})}
				</ol>
			</div>
			<div className="mt-40 mb-36 text-[22px] text-center">
				<button className="mr-2">
					<p className="text-underline-primary px-3 leading-[40px]">
						<NextLink href={'/proposal'} passHref>
							<a className="hover:text-current">{t('home:goToParticipate', 'Go to Participate')}</a>
						</NextLink>
					</p>
				</button>
				<NextImage src={'/static/img/icon/right-go.svg'} width="32px" height="13px"></NextImage>
			</div>
		</div>
	);
};

export default Home;
