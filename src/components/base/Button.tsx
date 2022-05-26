/* eslint-disable react/display-name */
import { ComponentProps, ComponentRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends Omit<ComponentProps<'button'>, 'type'> {
	type?: 'filled' | 'outline' | 'plain' | 'unstyled';
	size?: 'sm' | 'md' | 'lg';
	color?: 'green' | 'white' | 'gray2';
}

export const Button = forwardRef<ComponentRef<'button'>, Props>(
	(
		{
			className,
			type = 'unstyled',
			size = 'md',
			color = 'green',
			disabled = false,
			children,
			...props
		},
		ref,
	) => {
		let baseClassName =
			/*tw:*/ 'inline-flex cursor-pointer items-center justify-center rounded-[10px] border font-medium uppercase outline-0 transition-all duration-300 hover:opacity-60 xl:rounded-full';

		switch (color) {
			case 'green':
				baseClassName +=
					/*tw:*/ ' border-transparent bg-gradient-to-r from-[#75be39] to-[#bae047] text-white';
				break;
			case 'white':
				baseClassName += /*tw:*/ ' border-black bg-white text-black';
				break;
			case 'gray2':
				baseClassName += /*tw:*/ ' border-black bg-gray2 text-black';
				break;
		}

		switch (size) {
			case 'sm':
				baseClassName += /*tw:*/ ' h-[32px] px-[18px] text-[12px]';
				break;
			case 'md':
				baseClassName += /*tw:*/ ' h-[40px] px-[24px] text-[14px]';
				break;
			case 'lg':
				baseClassName += /*tw:*/ ' h-[48px] px-[36px] text-[16px]';
				break;
		}

		switch (type) {
			case 'filled':
				baseClassName += /*tw:*/ '';
				break;
			case 'outline':
				baseClassName += /*tw:*/ ' bg-transparent text-[color:inherit]';
				break;
			case 'plain':
				baseClassName += /*tw:*/ ' border-transparent bg-transparent text-[color:inherit]';
				break;
			case 'unstyled':
				baseClassName +=
					/*tw:*/ ' h-auto rounded-none border-0 bg-transparent bg-none px-0 text-[length:inherit] font-[number:inherit] text-[color:inherit]';
				break;
		}

		const disabledClassName = /*tw:*/ 'cursor-not-allowed opacity-30 hover:opacity-30 ';

		return (
			<button
				ref={ref}
				className={twMerge(baseClassName, disabled && disabledClassName, className)}
				type="button"
				disabled={disabled}
				{...props}
			>
				{children}
			</button>
		);
	},
);
