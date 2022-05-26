import { isAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers';

// account is not optional
function getSigner(library: JsonRpcProvider, account: string): JsonRpcSigner {
	return library.getSigner(account).connectUnchecked();
}

// account is optional
function getProviderOrSigner(
	library: JsonRpcProvider,
	account?: string,
): JsonRpcProvider | JsonRpcSigner {
	return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(
	address: string,
	ABI: any,
	library: JsonRpcProvider,
	account?: string,
): Contract {
	// if (!isAddress(address) || address === AddressZero) {
	// 	throw Error(`Invalid 'address' parameter '${address}'.`);
	// }

	return new Contract(address, ABI, getProviderOrSigner(library, account) as any);
}
