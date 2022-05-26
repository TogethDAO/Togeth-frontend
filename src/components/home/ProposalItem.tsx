import { useCountdown } from '@/hooks/useCountdown';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const ProposalItem = ({
	title,
	promoter,
	progress,
	deadline,
	img,
	id,
}: {
	title: string;
	promoter: string;
	progress: string;
	deadline: string;
	img: string;
	id: string;
}) => {
	const { t } = useTranslation();
	const router = useRouter();
	const countdown = useCountdown(deadline);

	return (
		<li className="bg-white h-[156px] shadow-lg px-10 py-9">
			<div className="flex">
				<div className="w-[86px] h-[86px] bg-orange-300 rounded-full overflow-hidden">
					<img src={img} alt="" className="w-full h-full" />
				</div>
				<div className="ml-[60px] flex flex-col justify-center text-[#162b4a] w-[290px]">
					<p className="font-medium text-xl">{title}</p>
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
				<div className="self-end ml-4 w-32">
					<span className="text-[#F36626] text-[28px] leading-none mr-2 font-barlow font-bold">
						{`${progress}%`}
					</span>
					<span>{t('home:funded', 'funded')}</span>
				</div>
				<div className="ml-auto mr-7 font-bold">
					<div
						className={classNames(
							'relative pt-2 w-[155px] h-[75px] text-[22px] bg-center bg-no-repeat',
							'bg-[url(/static/img/common/countdown-box.svg)]',
						)}
					>
						<span className="ml-4 font-barlow tracking-widest">{countdown}</span>
						<button
							className={classNames(
								'absolute w-[120px] h-[47px] -left-2 -bottom-3 text-lg',
								'btn-primary',
							)}
							onClick={() => {
								router.push({ pathname: '/proposal/detail', query: { id } });
							}}
						>
							<p className="px-2 leading-[38px]">Onboard</p>
						</button>
					</div>
				</div>
			</div>
		</li>
	);
};

export default ProposalItem;
