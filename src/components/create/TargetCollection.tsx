import { getCollectionByContract } from '@/utils/backend';

export const TargetCollection = ({ contract }: { contract: string }) => {
	const collection = getCollectionByContract(contract);
	console.log('contract', contract);
	return collection ? (
		<a
			href={collection.link}
			target={'_blank'}
			rel="noreferrer"
			className="block w-[394px] text-base hover:text-current shadow-lg"
		>
			<img src={collection.banner} className="h-[200px] w-full object-cover" alt=""></img>
			<div className="bg-white flex flex-col items-center -mt-5 pb-8 px-4">
				<div className="w-[50px] h-[50px] rounded-[50%] overflow-hidden">
					<img src={collection.img} alt="" width={'100%'} height="100%" />
				</div>
				<p className="mt-3">{collection.name}</p>
				<div className="flex text-sm mt-1">
					<p>by</p>
					<a href={''} target="_blank" rel="noreferrer" className="ml-2 text-blue-500">
						{collection.creator}
					</a>
				</div>
				<span className="mt-5 text-center">
					A collection of 10,000 utility-enabled PFPs that feature a richly diverse and unique pool
					of rarity-...
				</span>
			</div>
		</a>
	) : null;
};
