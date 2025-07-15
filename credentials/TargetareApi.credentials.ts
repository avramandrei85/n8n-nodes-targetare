import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TargetareApi implements ICredentialType {

	name = 'TargetareApi';
	displayName = 'Targetare API';
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
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
	authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
          headers: {
            Authorization: '={{ "Bearer " + $credentials.apiKey }}'
          }
        },
      };
}