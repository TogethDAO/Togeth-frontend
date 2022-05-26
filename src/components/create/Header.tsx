import Image from 'next/image';

const Fragment = ({ index, empty }: { index: number; empty: boolean }) => {
	const img = `/static/img/proposal/fragment_0${index}.svg`;
	const imgEmpty = `/static/img/proposal/fragment_0${index}_empty.svg`;

	return (
		<div className="relative w-[100px] h-[90px]">
			<Image src={empty ? imgEmpty : img} width={'100px'} height={'90px'} alt=""></Image>
			<span className="absolute text-[28px] font-barlow font-bold top-1/2 left-[44%] -translate-x-1/2 -translate-y-1/2">{`0${index}`}</span>
		</div>
	);
};
const Header = ({ current }: { current: 1 | 2 | 3 }) => {
	const divider = (
		<hr className="w-[106px] h-1 mx-3 border-t border-t-[#141d2b] border-opacity-50" />
	);
	const titleList = [
		{ title: '' },
		{ title: 'Create an NFT Proposal' },
		{ title: 'Check & Create' },
	];
	return (
		<div className="relative z-20 mt-6">
			<div className="justify-center items-center flex">
				<Fragment index={1} empty={current < 1}></Fragment>
				{divider}
				<Fragment index={2} empty={current < 2}></Fragment>
				{divider}
				<Fragment index={3} empty={current < 3}></Fragment>
			</div>
			<div className="flex flex-col mt-2 items-center">
				<p className="relative text-[68px] text-brand-yellow text-center font-extrabold">{`0${current}`}</p>
				<p className="relative text-underline-secondary italic text-[32px] px-3 -mt-11 bg-[#FFFBE3]">
					{titleList[current - 1].title}
				</p>
			</div>
		</div>
	);
};

export default Header;
