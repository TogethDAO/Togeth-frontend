import { DeleteFilled, QuestionCircleFilled } from '@ant-design/icons';
import { Input } from 'antd';
import { useState } from 'react';

export const exampleList = [
	{
		url: 'https://opensea.io/assets/ethereum/0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b/6447',
		img: 'https://img.seadn.io/files/3396993bd4b1fd9615f759073c8ba320.png?auto=format&w=600',
	},
	{
		url: 'https://opensea.io/assets/ethereum/0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b/5650',
		img: 'https://img.seadn.io/files/454c95f48c1168b1adba1da856bf00d7.png?auto=format&w=600',
	},
	{
		url: 'https://opensea.io/assets/ethereum/0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b/10500',
		img: 'https://img.seadn.io/files/df63d845428ebb7ed60f0c97ed87e9d2.png?auto=format&w=600',
	},
];

const Buy = () => {
	const [productList, setList] = useState<typeof exampleList>([]);

	return (
		<div className="px-12 py-6 bg-white drop-shadow-xl rounded-[10px]">
			<p className="font-medium text-[28px]">Target NFT</p>
			<p className="font-medium text-xl mt-2">{'CryptoPunks'}</p>
			<div className="mt-4 flex justify-between">
				<Input
					size="large"
					className="w-[420px] rounded-3xl"
					placeholder="Please enter url"
				></Input>
				<button
					className="w-40 h-10 rounded-[30px] font-bold text-white from-[#F3AA03] to-[#FFD13C] bg-gradient-to-r"
					onClick={() => {
						const n = productList.length;
						if (n < 3) {
							setList(exampleList.slice(0, n + 1));
						}
					}}
				>
					Add
				</button>
			</div>
			<div className="flex my-8 px-10 space-x-10">
				{productList.length == 0 && (
					<div className="h-[256px] w-full flex flex-col justify-center items-center">
						<QuestionCircleFilled className="w-40 h-40 text-[140px] text-gray-400" />
						<p className="mt-8">Please add item from opensea link</p>
					</div>
				)}
				{productList.map((product, index) => {
					return (
						<div key={product.url}>
							<a
								className="block w-[200px] h-[200px] bg-slate-300 rounded-xl overflow-hidden"
								href={product.url}
								target="_blank"
								rel="noreferrer"
							>
								<img src={product.img} className="w-full h-full object-cover" alt="" />
							</a>
							<div className="text-sm mt-3 flex justify-between">
								<div>
									<p className="font-medium">{'CloneX #6941'}</p>
									<div className="mt-1">
										<p className="font-barlow">5</p>
									</div>
								</div>
								<button
									onClick={() => {
										setList(list => {
											const newList = list.slice();
											newList.splice(index, 1);
											return newList;
										});
									}}
								>
									<DeleteFilled className="text-lg text-red-400" />
								</button>
							</div>
						</div>
					);
				})}
			</div>
			<div className="flex flex-row-reverse">
				<button
					className="w-[180px] h-10 rounded-[30px] font-bold text-white from-[#F3AA03] to-[#FFD13C] bg-gradient-to-r"
					onClick={() => {
						const n = productList.length;
						if (n < 3) {
							setList(exampleList.slice(0, n + 1));
						}
					}}
				>
					<span>{`Select ${productList.length} Token`}</span>
					<span className="ml-3">{5 * productList.length}</span>
				</button>
			</div>
		</div>
	);
};

export default Buy;
