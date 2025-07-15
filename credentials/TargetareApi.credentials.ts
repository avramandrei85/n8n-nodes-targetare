import {
	IAuthenticateGeneric,
	ICredentialType,
	ICredentialTestRequest,
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
		default: '',
		typeOptions: {
		  password: true,
		},
	  },
	];
  
	authenticate = {
	  type: 'generic',
	  properties: {
		headers: {
		  Authorization: '={{ "Bearer " + $credentials.apiKey }}'
		}
	  },
	} as IAuthenticateGeneric;
  
	test = {
	  request: {
		baseURL: 'https://api.targetare.ro/v1',
		method: 'GET',
		url: '/companies/',
		qs: {
			registration_date: '2020-01-01'
		  },
		headers: {
		  Authorization: '={{"Bearer " + $credentials.apiKey}}'
		}
	  }
	} as ICredentialTestRequest;
  }
  