import classNames from 'classnames';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ProposalProgress } from '../proposal/types';

interface ProposalProps {
	title: string;
	promoter: string;
	progress: string;
	status: ProposalProgress;
	img: string;
	id: string;
}

const formatStatus = (progress: ProposalProgress) => {
	switch (progress) {
		case ProposalProgress.succeed:
			return 'Succeed';
		case ProposalProgress.failed:
			return 'Failed';
		case ProposalProgress.proceeding:
			return 'Proceeding';
		default:
			break;
	}
};

const formatAction = (progress: ProposalProgress) => {
	switch (progress) {
		case ProposalProgress.succeed:
			return 'Claim';
		case ProposalProgress.failed:
			return 'Operate';
		case ProposalProgress.proceeding:
			return 'Check';
		default:
			break;
	}
};

const ListItem: FC<ProposalProps> = ({ title, promoter, img, id, progress, status }) => {
	const { t } = useTranslation();
	const router = useRouter();

	return (
		<li className="bg-white h-[156px] shadow-lg px-10 py-9">
			<div className="flex">
				<div className="w-[86px] h-[86px] bg-orange-300 rounded-full overflow-hidden">
					<img src={img} alt="" className="w-full h-full" />
				</div>
				<div className="ml-[60px] flex flex-col justify-center text-[#162b4a] w-[320px]">
					<p className="font-bold text-xl">{title}</p>
					<p className="opacity-50">
						{t('home:promoter', 'Promoter')}: {promoter}
					</p>
					<div className="flex items-end">
						<div className="mt-3 flex-1">
							<div className="h-3 bg-[#F77C21]/[0.18] rounded-md">
								<div
									className="bg-[#F77C21] h-full rounded-md"
									style={{ width: `${progress}%` }}
								></div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col justify-between ml-6">
					<div
						className={classNames('text-center h-7 leading-7 mt-2 rounded-md text-sm font-medium', {
							'bg-[#e6f2ff] text-[#7fbcf3]': status === ProposalProgress.proceeding,
							'bg-[#fff7e6] text-[#FDBD00]': status === ProposalProgress.succeed,
							'bg-[#FFF2EC] text-[#FF8D55]': status === ProposalProgress.failed,
						})}
					>
						{formatStatus(status)}
					</div>

					<div className="self-end ml-4 w-32">
						<span className="text-[#F36626] text-[28px] leading-none mr-2 font-barlow font-bold">
							{progress}%
						</span>
						<span>{t('home:funded', 'funded')}</span>
					</div>
				</div>
				<div className="ml-auto mr-7 flex items-center">
					<button
						className={'btn-primary w-[114px]'}
						onClick={() => {
							router.push({ pathname: '/account/operate', query: { id: '1235' } });
						}}
					>
						<p className="px-2 leading-[38px]">{formatAction(status)}</p>
					</button>
				</div>
			</div>
		</li>
	);
};

export default ListItem;
