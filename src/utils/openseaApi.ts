const OPEN_SEA_API = '//api.opensea.io/api/v1';

// const options = { method: 'GET', headers: { 'X-API-KEY': 'ae8507688bad4a60a1b8aad47450bf2c' } };
const options = { method: 'GET' };

export const openseaApi = (url: string, options?: RequestInit) => {
	return fetch(OPEN_SEA_API + url, options)
		.then(response => response.json())
		.then(response => response)
		.catch(err => {
			throw err;
		});
};

export const getCollection = (contractHash: string) =>
	openseaApi(`/asset_contract/${contractHash}`, options).then(response => console.log(response));
