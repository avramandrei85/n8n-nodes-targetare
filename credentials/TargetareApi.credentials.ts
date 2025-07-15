import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TargetareApi implements ICredentialType {
	name = 'TargetareApi';
	displayName = 'Targetare API';

	documentationUrl = 'https://api.targetare.ro/auth/';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{ "Bearer " + $credentials.apiKey }}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			baseURL: 'https://api.targetare.ro/v1',
			url: '/companies/',
			qs: {
				registration_date: '2020-01-01',
			},
			headers: {
				Authorization: '={{ "Bearer " + $credentials.apiKey }}',
			},
		},
	};
}