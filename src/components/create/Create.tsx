import { useState } from 'react';
import CreateConfirm from './CreateConfirm';
import { CreateFormValues } from './types';
import CreateStart from './CreateStart';
import Header from './Header';

enum CreateStep {
	'ONE' = 1,
	'TWO' = 2,
	'THREE' = 3,
}

const Create = () => {
	const [formValues, setFormValues] = useState<CreateFormValues | undefined>(undefined);
	const [step, setStep] = useState(CreateStep.TWO);

	const onCreate = (values: { proposal: CreateFormValues }) => {
		console.log(values);
		setFormValues(values.proposal);
		setStep(CreateStep.THREE);
	};

	return (
		<div className="">
			<Header current={step}></Header>
			{step === CreateStep.TWO && <CreateStart onCreate={onCreate}></CreateStart>}
			{step === CreateStep.THREE && formValues != null && (
				<CreateConfirm
					proposal={formValues}
					onCancel={() => {
						setStep(CreateStep.TWO);
					}}
				></CreateConfirm>
			)}
		</div>
	);
};

export default Create;
