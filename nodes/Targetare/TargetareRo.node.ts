import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class TargetareRo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Targetare.ro',
		name: 'targetareRo',
		icon: 'file:targetare.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from Targetare.ro API',
		defaults: {
			name: 'Targetare.ro',
		},
		inputs: ['main' as NodeConnectionType],
		outputs: ['main' as NodeConnectionType],
		credentials: [
			{
				name: 'TargetareApi',
				required: true,
			},
		],
        requestDefaults: {
            baseURL: 'https://api.targetare.ro/v1',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
        },

		properties: [
			// Resource selector
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Company',
						value: 'companies',
					}
				],
				default: 'companies',
			},

			// Operation selector
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['companies'],
					},
				},
				options: [
					{
					  name: 'Get By CUI',
					  value: 'getByTaxId',
					  action: 'Get company by cui',
					  description: 'Get a single company by its CUI',
					  routing: {
						request: {
						  method: 'GET',
						  url: '=/companies/{{$parameter.taxId}}',
						},
					  },
					},
					{
					  name: 'Get By Registration Date',
					  value: 'getByRegistration',
					  action: 'Get companies by registration date',
					  description: 'Get companies registered from a specific date',
					  routing: {
						request: {
						  method: 'GET',
						  url: '/companies/',
						},
					  },
					},
					{
					  name: 'Get Company Administrators by CUI',
					  value: 'getAdministratorsByTaxId',
					  action: 'Get company administrators by cui',
					  description: 'Get company Administrators by its CUI',
					  routing: {
						request: {
						  method: 'GET',
						  url: '=/companies/{{$parameter.taxId}}/administrators',
						},
					  },
					},
					{
					  name: 'Get Company Emails by CUI',
					  value: 'getEmailsByTaxId',
					  action: 'Get company emails by cui',
					  description: 'Get company Emails by its CUI',
					  routing: {
						request: {
						  method: 'GET',
						  url: '=/companies/{{$parameter.taxId}}/emails',
						},
					  },
					},
					{
					  name: 'Get Company Financial by CUI',
					  value: 'getFinancialByTaxId',
					  action: 'Get company financial by cui',
					  description: 'Get company financial information by its CUI',
					  routing: {
						request: {
						  method: 'GET',
						  url: '=/companies/{{$parameter.taxId}}/financial',
						},
					  },
					},
					{
					  name: 'Get Company Phones by CUI',
					  value: 'getPhonesByTaxId',
					  action: 'Get company phones by cui',
					  description: 'Get company Phones by its CUI',
					  routing: {
						request: {
						  method: 'GET',
						  url: '=/companies/{{$parameter.taxId}}/phones',
						},
					  },
					},
					{
					  name: 'Get Company Websites by CUI',
					  value: 'getWebsitesByTaxId',
					  action: 'Get company websites by cui',
					  description: 'Get company Websites by its CUI',
					  routing: {
						request: {
						  method: 'GET',
						  url: '=/companies/{{$parameter.taxId}}/websites',
						},
					  },
					},
				],
				default: 'getByRegistration',
			},

			// Registration Date (only for "getByRegistration" operation)
			{
				displayName: 'Registration Date',
				description: 'Company registration date (YYYY-MM-DD)',
				required: true,
				name: 'registrationDate',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: ['companies'],
						operation: ['getByRegistration'],
					},
				},
				routing: {
					request: {
						qs: {
							registration_date: '={{ new Date($value).toISOString().substring(0, 10) }}',
						},
					},
				},
			},	

			// Page number (only for "getByRegistration" operation)
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				required: false,
				default: 1,
				description: 'Page number.',
				displayOptions: {
					show: {
						resource: ['companies'],
						operation: ['getByRegistration'],
					},
				},
				routing: {
					request: {
						qs: {
							page: '={{$parameter.page}}',
						},
					},
				},
			},

			// CUI (only for "by CUI" operations)
			{
				displayName: 'CUI',
				name: 'taxId',
				type: 'string',
				required: true,
				default: '',
				description: 'Company CUI to look up',
				displayOptions: {
					show: {
						resource: ['companies'],
						operation: [
							'getByTaxId',
							'getFinancialByTaxId',
							'getPhonesByTaxId',
							'getEmailsByTaxId',
							'getAdministratorsByTaxId',
							'getWebsitesByTaxId'
						],
					},
				},
			},
		],
	};
}
