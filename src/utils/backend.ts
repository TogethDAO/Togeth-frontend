import { CreateFormValues } from '@/components/create/types';
import moment from 'moment';

function rand(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min;
}

const collectionList = [
	{
		name: 'Moonbirds',
		contract: '0x23581767a106ae21c074b2276d25e5c3e136a68b',
		banner:
			'https://lh3.googleusercontent.com/ouzjfA0LotbHC92vuDph9JDeg7Z4ZFo12Pr9GJpfSAZSrnXDOubJn0eTvinwzUTPsWhnLLq5ocjcDSrpNV0_MYIjueVJrzFlE6p0=h600',
		img: 'https://lh3.googleusercontent.com/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75=s100',
		link: '//opensea.io/collection/proof-moonbirds',
		creator: 'PROOF_XYZ',
		brief: `A collection of 10,000 utility-enabled PFPs that feature a richly diverse and unique pool of rarity-...
		`,
	},
	{
		name: 'Bored Ape Yacht Club',
		contract: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
		banner:
			'https://lh3.googleusercontent.com/RBX3jwgykdaQO3rjTcKNf5OVwdukKO46oOAV3zZeiaMb8VER6cKxPDTdGZQdfWcDou75A8KtVZWM_fEnHG4d4q6Um8MeZIlw79BpWPA=h200',
		img: 'https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s130',
		link: '//opensea.io/collection/boredapeyachtclub',
		creator: 'BoredApeYachtClub',
	},
	{
		name: 'Bored Ape Yacht Club',
		contract: '0x495f947276749ce646f68ac8c248420045cb7b5e',
		banner:
			'https://lh3.googleusercontent.com/PjfRHGbEICydusUW1ubKBWWSyOAiIDcCpuO3MyORv4qwzZNy3MQVkQRWbc_bP3uCHTGuf3cpsIIXrXf6v-FThfuOIUu0i61kp2_r14Q=h200',
		img: 'https://lh3.googleusercontent.com/c3ai_6B52A7sOluB6MZ-0eyw-19Im6B5D3ROc6fgjYmI0jMeftpeOAs9DmV0g_UNr0yT9KKXar4lzG806u-J33eAJA1ocp-wQ4P-g5Y=s100',
		link: '//opensea.io/collection/bayc-honorary-members',
		creator: 'BoredApeYachtClub',
	},
];

const example = [
	{
		id: '02',
		title: 'Buy Moonbirds #2818',
		img: 'https://img.seadn.io/files/f6647a6cecf03a8251afb54ed4c4a159.png?auto=format&w=600',
		promoter: 'Erick',
		progress: '88',
		deadline: '1655706427',
		promoterAccount: '0x9335108b49107B3DCf933033A51592d1Fda05ef5',
		departureAmount: '1200',
		startTime: '1654706427',
		brief:
			"A collection of 10,000 utility-enabled PFPs that feature a richly diverse and unique pool of rarity-powered traits. What's more, each Moonbird unlocks private club membership and additional benefits the longer you hold them. We call it nesting – because, obviously.",
		target: '0x23581767a106ae21c074b2276d25e5c3e136a68b',
		collectionName: 'Moonbirds',
	},
	{
		title: 'Buy Moon Birds',
		brief: '12321',
		target: '0x23581767a106ae21c074b2276d25e5c3e136a68b',
		departureAmount: '420.00',
		deadline: '1653624348',
		collectionName: 'Moonbirds',
		img: 'https://img.seadn.io/files/f6647a6cecf03a8251afb54ed4c4a159.png?auto=format&w=600',
		promoter: 'Erick',
		id: '90911.00000',
		progress: '31.43',
		startTime: '1653451552',
		promoterAccount: '0x23581767a106ae21c074b2276d25e5c3e136a68b',
		departAmount: '420.00',
	},
	{
		title: 'Buy New Item',
		brief: 'Introduction',
		target: '0x495f947276749ce646f68ac8c248420045cb7b5e',
		departureAmount: '2000',
		deadline: '1655885331',
		collectionName: 'Bored Ape Yacht Club',
		img: 'https://lh3.googleusercontent.com/c3ai_6B52A7sOluB6MZ-0eyw-19Im6B5D3ROc6fgjYmI0jMeftpeOAs9DmV0g_UNr0yT9KKXar4lzG806u-J33eAJA1ocp-wQ4P-g5Y=s100',
		promoter: 'Erick',
		id: '33666',
		progress: '0',
		startTime: '1653466147',
		promoterAccount: '0x23581767a106ae21c074b2276d25e5c3e136a68b',
	},
	{
		title: 'Buy New Item',
		brief: 'brief',
		target: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
		departureAmount: '2222',
		deadline: '1688006328',
		collectionName: 'Bored Ape Yacht Club',
		img: 'https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s130',
		promoter: 'Erick',
		id: '67056',
		progress: '0',
		startTime: '1653532730',
		promoterAccount: '0x23581767a106ae21c074b2276d25e5c3e136a68b',
	},
];

export interface ProposalProps {
	id: string;
	title: string;
	img: string;
	promoter: string;
	progress: string;
	deadline: string;
	promoterAccount: string;
	departureAmount: string;
	startTime: string;
	brief: string;
	target: string;
	collectionName: string;
}

export function getProposalList(): ProposalProps[] {
	if (typeof window !== 'undefined') {
		const listSource = window.localStorage.getItem('proposalList');
		const list = listSource ? (JSON.parse(listSource) as ProposalProps[]) : example;
		if (!listSource) {
			localStorage.setItem('proposalList', JSON.stringify(list));
		}
		return list;
	}
	return [];
}

export function getProposalFromId(id: string): ProposalProps | undefined {
	const list = getProposalList();
	return list.find(item => item.id === id);
}

export interface ProposalProps {
	id: string;
	title: string;
	img: string;
	promoter: string;
	progress: string;
	deadline: string;
	promoterAccount: string;
	departureAmount: string;
	startTime: string;
	brief: string;
	target: string;
	collectionName: string;
}

export function addProposal(proposal: ProposalProps) {
	const list = getProposalList();
	localStorage.setItem('proposalList', JSON.stringify([...list, proposal]));
}

export function createProposal(proposal: CreateFormValues) {
	const { type, title, brief = '', target, effectDay, departureAmount = '0', deadline } = proposal;
	const collection = getCollectionByContract(target);
	const { name: collectionName = '', img = '' } = collection || {};
	const item = {
		title,
		brief,
		target,
		departureAmount,
		deadline: deadline.format('X'),
		//
		collectionName,
		img,
		promoter: 'Erick',
		id: rand(10000, 99999).toString(),
		progress: '0',
		startTime: moment().format('X'),
		promoterAccount: '0x23581767a106ae21c074b2276d25e5c3e136a68b',
	};
	addProposal(item);
}

export function updateProposal(proposal: Partial<ProposalProps> & { id: string }) {
	const list = getProposalList().slice();
	const index = list.findIndex(i => i.id === proposal.id);
	if (index > -1) {
		list[index] = { ...list[index], ...proposal };
		localStorage.setItem('proposalList', JSON.stringify(list));
	}
}

export function getCollectionByContract(contract: string) {
	return collectionList.find(i => i.contract === contract);
}

export function getOneCollection() {
	const length = collectionList.length;
	const index = Math.floor(length * Math.random());
	return collectionList[index];
}
