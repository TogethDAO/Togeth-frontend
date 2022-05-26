import { ArrowDownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import Lottie from 'react-lottie';
import loadingAnimation from '@/../public/static/lottie/cross-chain-loading.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: loadingAnimation,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const CrossChain = () => {
	const [isLoading, setLoading] = useState(false);
	return (
		<div className={classNames('flex justify-between h-[356px] relative')}>
			<div className="flex justify-center w-[474px] h-full">
				<div
					className={classNames(
						'flex flex-col justify-center items-center w-[212px] h-[200px] absolute left-0 bottom-9',
						// 'backdrop-blur-md bg-[url(/static/img/account/cross-chain/left-bg.svg)]',
					)}
				>
					<Image
						src={'/static/img/account/cross-chain/eth_blue.png'}
						width={'65px'}
						height={'92px'}
						alt=""
					></Image>
					<span className="mt-2 text-[20px] font-light opacity-50">100 ETH</span>
				</div>
				<div
					className={classNames(
						'w-[276px] h-[185px] absolute left-[260px] top-[64px]',
						// ' bg-[url(/static/img/account/cross-chain/right-bg.svg)]',
					)}
				>
					<div className="absolute bg-[#13BAEA] rounded-full w-5 h-5 right-[106px] top-4"></div>
					<div className="absolute top-[32px] left-[108px]">
						<Image
							src={'/static/img/account/cross-chain/eth_black.png'}
							width={'50px'}
							height={'77px'}
							alt=""
						></Image>
					</div>
					<span className="absolute bottom-9 left-8 rotate-12 text-[20px] opacity-50 font-light">
						Ethereum network
					</span>
				</div>
			</div>
			<div className="shadow-[0_12px_16px_0px_#efefef] bg-white rounded-[10px] w-[474px] h-full flex flex-col items-center">
				<div className="w-[360px] h-[164px] mt-14 flex flex-col items-center">
					{isLoading ? (
						<div className="flex justify-center items-center h-full">
							<Lottie options={defaultOptions} width={'160px'} height={'90px'}></Lottie>
						</div>
					) : (
						<>
							<div className="w-full h-[52px] leading-[52px] text-xl text-center rounded-[10px] bg-[#e6f2ff] text-[#6bbefb]">
								Send 100 ETH
							</div>
							<div className="w-[30px] h-[30px] my-4 flex justify-center items-center rounded-full border border-[#141d2b] border-opacity-30">
								<ArrowDownOutlined />
							</div>
							<div className="w-full h-[52px] leading-[52px] text-xl text-center rounded-[10px] bg-[#e6f2ff] text-[#6bbefb]">
								Ethereum network
							</div>
						</>
					)}
				</div>
				<button
					className="btn-primary-longer w-[360px] h-[52px] mt-11"
					onClick={() => setLoading(true)}
				>
					Send
				</button>
			</div>
		</div>
	);
};

export default CrossChain;
