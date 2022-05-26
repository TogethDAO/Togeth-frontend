export const IN_PRODUCTION = process.env.NODE_ENV === 'production';
export const TARGET_MAINNET = process.env.NEXT_PUBLIC_TARGET === 'mainnet';

export const IN_BROWSER = typeof window !== 'undefined';

export const rinkeby = 'https://eth-rinkeby.alchemyapi.io/v2/Wpn-UoJmc8WAM82msCh7LrcmeJUW1Ac0';
export const mainnet = 'https://eth-mainnet.alchemyapi.io/v2/yVFcz_ATlZSWMCSBvs67U6r7OuSGfWRM';

export const ma2 = '0dabfec4163a9e498d144e04927cfd97d30add0cbe8d0e1f916212ab4c27ead5';
export const ma1 = '8a1913c0f6ea94bc58e3fddaf67200f3cf668a3c80a4b9d44a624d3224f1a085';

export const openseaApiKey = IN_PRODUCTION
	? 'ae8507688bad4a60a1b8aad47450bf2c'
	: 'ae8507688bad4a60a1b8aad47450bf2c';
// export const openseaApiTest = '5bec8ae0372044cab1bef0d866c98618';
