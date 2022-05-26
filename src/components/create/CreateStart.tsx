import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useContract } from '@/hooks/useContract';
import DaiContractABI from '@/abis/dai-contract.json';
import { DaiContract } from '@/abis/types';
import Image from 'next/image';
import classNames from 'classnames';
import { DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import { FC, useState } from 'react';
import { CreateFormValues } from './types';
import { QuestionCircleFilled } from '@ant-design/icons';
import { getOneCollection } from '@/utils/backend';
import { TargetCollection } from './TargetCollection';

// You can also use an ENS name for the contract address
const daiAddress = 'dai.tokens.ethers.eth';

const ChooseTarget: FC<{ onChange?: (value: any) => void; value?: string }> = ({
	onChange,
	value,
}) => {
	const [visible, setVisible] = useState(false);
	return (
		<>
			<button
				className="btn-primary-longer w-[236px] h-[68px]"
				onClick={() => {
					setVisible(true);
				}}
				type="button"
			>
				Choose NFT
			</button>
			<div className="my-7 w-[394px] h-[390px]">
				{value ? (
					<TargetCollection contract={value}></TargetCollection>
				) : (
					<div className="flex flex-col h-full justify-center items-center">
						<QuestionCircleFilled className="w-40 h-40 text-[140px] text-gray-300" />
						<p className="text-lg text-center mt-8">Please select target collection</p>
					</div>
				)}
			</div>
			<Modal
				visible={visible}
				onCancel={() => {
					setVisible(false);
				}}
				title={null}
				footer={null}
				centered
				destroyOnClose
			>
				<div className="p-6">
					<p className="text-center text-[32px]">{'Choose Target'}</p>
					<Form
						className="mt-12 text-base"
						initialValues={{ contract: '' }}
						onFinish={async (values: any) => {
							// const result = await getCollection(values.contract);
							// console.log('result', result);
							setVisible(false);
							values.contract && onChange?.(getOneCollection().contract);
						}}
					>
						<Form.Item label="Contract" name="contract">
							<Input placeholder="contract"></Input>
						</Form.Item>
						<Form.Item className="mt-10">
							<div className="flex justify-center">
								<button className="btn-primary w-40 h-10" type="submit">
									submit
								</button>
							</div>
						</Form.Item>
					</Form>
				</div>
			</Modal>
		</>
	);
};

const PickerWrapper: FC = props => {
	return (
		<div className="flex justify-between items-center bg-white rounded-[10px] px-6 h-[84px] w-[388px]">
			<DatePicker
				showTime={{ format: 'HH:mm' }}
				format="YYYY-MM-DD HH:mm"
				showNow={false}
				showToday={false}
				{...props}
				className="w-[236px] h-[42px]"
			/>
			<div className="w-[54px] h-[54px] rounded-[16px] bg-black flex items-center justify-center">
				<Image src={'/static/img/icon/date.png'} width={'31px'} height={'35px'} alt=""></Image>
			</div>
		</div>
	);
};

const CreateStart = ({
	onCreate,
}: {
	onCreate: (values: { proposal: CreateFormValues }) => void;
}) => {
	const { library, account, connector } = useWeb3React<Web3Provider>();
	const onSign = () => {
		const signer = library && account && library.getSigner(account);
		signer &&
			signer
				.signMessage('hello')
				.then((signature: any) => {
					window.alert(`Success!\n\n${signature}`);
				})
				.catch((error: any) => {
					window.alert('Failure!' + (error && error.message ? `\n\n${error.message}` : ''));
				});
		// signer && signer.sendTransaction();
	};

	const daiContract = useContract<DaiContract>(daiAddress, DaiContractABI);

	const SELECT_OPTION = [
		{
			label: 'Invest a Token',
			disabled: true,
			icon: '/static/img/icon/uniswap.svg',
			bg: 'bg-[#889AFF]',
		},
		{
			label: 'Invest an NFT',
			icon: '/static/img/icon/opensea.svg',
			bg: 'bg-[#CCE7F0]',
		},
	];

	return (
		<div className="">
			<div className={`h-[487px] w-full top-0 absolute`}>
				<Image src={'/static/img/create/create_bg.png'} layout="fill" alt=""></Image>
				<div className="w-[1096px] h-full mx-auto relative mt-[86px]">
					<Image src={'/static/img/create/create_bg-layer.png'} layout="fill" alt=""></Image>
				</div>
			</div>
			<div className="relative flex flex-col items-center h-[180px]">
				<p className="text-[40px] font-light mt-12">What Would You Like to Do?</p>
			</div>
			<div className="relative mt-8 space-y-6">
				<Form
					name="nest-messages"
					className="create-proposal-form"
					onFinish={onCreate}
					layout="vertical"
					initialValues={{ proposal: { type: 1 } }}
				>
					<div className="w-[666px] mx-auto">
						<Form.Item name={['proposal', 'type']}>
							<div className="flex justify-between">
								{SELECT_OPTION.map(({ label, disabled, icon, bg }, index) => {
									return (
										<div
											key={index}
											className={classNames(
												'p-[10px] flex space-x-5 w-[316px] h-[96px] bg-[#EFEFEF] rounded-xl',
												{
													'opacity-50': disabled,
													'cursor-not-allowed': disabled,
												},
											)}
										>
											<div
												className={classNames(
													'w-[76px] h-[76px] rounded-[17px] flex justify-center items-center',
													bg,
												)}
											>
												{icon && <Image src={icon} width={'46px'} height={'46px'} alt=""></Image>}
											</div>
											<span className="text-[26px] leading-[76px]">{label}</span>
										</div>
									);
								})}
							</div>
						</Form.Item>
						<Form.Item name={['proposal', 'title']} label="Title" rules={[{ required: true }]}>
							<Input
								className="py-4 px-9 text-base"
								placeholder="Give your token proposal a title  e.g Buy 10e worth $PEOPLE"
							/>
						</Form.Item>
						<Form.Item name={['proposal', 'brief']} label="Brief">
							<Input.TextArea
								className="py-4 px-9 text-base !min-h-[156px]"
								placeholder="Introduce your proposal in serval sentences. e.g  Constitution Dao is  a great project which I personally support a lot. But Ethereum’s gas fee are so much, so I’d like to invite you to join me"
							/>
						</Form.Item>
						<Form.Item name={['proposal', 'target']} label="Target">
							<ChooseTarget></ChooseTarget>
							{/* <div onClick={()=>{}}>1234</div> */}
						</Form.Item>
					</div>
					<div className="bg-[#E7F9E6] h-[800px] pt-6">
						<div className="w-[666px] mx-auto">
							<Form.Item
								name={['proposal', 'effectDay']}
								label="BUY Effective time"
								// rules={[{ type: 'number', min: 0, max: 100 }]}
								rules={[{ required: true }]}
							>
								<div className="flex flex-col justify-center bg-white rounded-[10px] px-6 h-[104px]">
									<div className="flex items-center">
										<p>You promise to BUY Bored Ape Yacht Club #2345 in</p>
										<div className="ml-4 relative">
											<InputNumber className="w-[134px] pr-10" controls={false} />
											<p className="absolute top-0 right-0 pr-1 w-12 text-center h-full text-sm leading-[32px] opacity-50">
												day(s)
											</p>
										</div>
									</div>
									<p className="text-brand-yellow text-sm mt-3">
										If not, the proposal will be failed and return all the funded assets back to the
										participates.
									</p>
								</div>
							</Form.Item>
							<Form.Item
								name={['proposal', 'departureAmount']}
								label="Depart Amount"
								rules={[{ type: 'string', required: true }]}
							>
								<div className="flex bg-white rounded-[10px] px-6 h-[104px] items-center space-x-5">
									<span>{'Once  raised'}</span>
									<div className="relative">
										<InputNumber
											className="w-[134px] pr-8"
											precision={2}
											controls={false}
											// stringMode
										/>
										<p className="absolute top-0 right-0 pr-1 w-10 text-center h-full text-sm leading-[32px]">
											eth
										</p>
									</div>
									<span>{'you will able to execute this proposal.'}</span>
								</div>
							</Form.Item>
							<Form.Item name={['proposal', 'deadline']} label="End" rules={[{ required: false }]}>
								<PickerWrapper></PickerWrapper>
							</Form.Item>
							<Form.Item>
								<button className="btn-primary-longer w-[388px] h-[76px]" type="submit">
									Next
								</button>
							</Form.Item>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default CreateStart;
