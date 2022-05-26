import { exampleList } from './Buy';

const Sell = () => {
	return (
		<div className="w-[876px] p-6 text-[26px] rounded-[10px] mx-auto bg-white drop-shadow-xl">
			<p>{'CryptoPunks'}</p>
			<div className="flex justify-between mt-4">
				<div className="flex">
					<div className="bg-slate-300 w-[125px] h-[125px] rounded-xl overflow-hidden">
						<img src={exampleList[0].img} className="w-full h-full" alt="" />
					</div>
					<div className="ml-9">
						<p className="text-[22px] font-medium">{'#1234'}</p>
						<p className="text-lg font-light">0xhdhhohhkhkHUH23</p>
						<p className="text-[22px] text-brand-yellow font-bold">79.6798.999</p>
						<p className="text-lg font-light">Sale Price</p>
					</div>
				</div>
				<div className="w-[132px] text-xl">
					<button className="w-full h-[42px] rounded-md font-bold text-white from-[#F3AA03] to-[#FFD13C] bg-gradient-to-r">
						Sell
					</button>
					<button className="w-full h-[42px] border border-[##D6D6D6] rounded-md mt-4">
						Check
					</button>
				</div>
			</div>
		</div>
	);
};

export default Sell;
