/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Application.ts' />
/// <reference path='User.ts' />

module showbutler {
	export interface IPropertyParams {
		id: string;
	}
	
	export class Property {
		_id: string;
		address: string;
		phoneNumbers: string[];
		names: string[];
		usersToNotify: User[];
	}
	
	export interface IPropertyResource extends ng.resource.IResource<IPropertyResource>, Property {
		$enableNotifications(): IPropertyResource;
		$disableNotifications(): IPropertyResource;
	}
	
	export interface IPropertyResourceClass extends ng.resource.IResourceClass<IPropertyResource> {
		get(): IPropertyResource;
		get(params: IPropertyParams, onSuccess: Function): Property;
		
		enableNotifications(): IPropertyResource;
		disableNotifications(): IPropertyResource;
	}
	
	export function PropertyResourceFactory($resource: ng.resource.IResourceService) {
		let ret = $resource(config.route("properties/:id"), {id: '@_id'}, {
			enableNotifications: {
				'method': 'POST',
				url: config.route('properties/:id/enable_notifications')
			},
			disableNotifications: {
				'method': 'POST',
				url: config.route('properties/:id/disable_notifications')
			},
		});
		
		angular.extend(ret.prototype, Property.prototype);
		return ret;
	}
	
	PropertyResourceFactory.$inject = ['$resource'];
}
