/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Application.ts' />

module showbutler {
	// We have the option to define arguments for a custom resource
	export interface IDeviceParameters {
		id: string;
	}
	
	export class Device {
		_id: string;
		barcode: string;
		phoneNumber: string;
		property: Property;		
	}
	
	export interface IDeviceLinkParameters {
		property_id: string;
	}
	
	export interface IDeviceResource extends ng.resource.IResource<IDeviceResource>, Device {
		$link(params: IDeviceLinkParameters) : IDeviceResource;
		$unlink() : IDeviceResource;
		// agent: IUserModel;
	
		// Although all actions defined on IArticleResourceClass are avaiable with
		// the '$' prefix, we have the choice to expose only what we will use
		// $publish(): IDeviceResource;
		// $unpublish(): IDeviceResource;
	}
	
	// Let's define a custom resource
	export interface IDeviceResourceClass extends ng.resource.IResourceClass<IDeviceResource> {
		// Overload get to accept our custom parameters
		get(): IDeviceResource;
		get(params: IDeviceParameters, onSuccess: Function): IDeviceResource;
		
		link(params: IDeviceLinkParameters) : IDeviceResource;
		unlink() : IDeviceResource;
	
		// Add our custom resource actions
		// publish(): IArticleResource;
		// publish(params: IArticleParameters): IArticleResource;
		// unpublish(params: IArticleParameters): IArticleResource;
	}
	
	export function DeviceResourceFactory($resource: ng.resource.IResourceService) {
		let path = config.route('devices/:id');
		let ret = $resource<IDeviceResource, IDeviceResourceClass>(path, {id: '@_id'}, {
			link: {
				'method': 'POST',
				url: config.route('devices/:id/link/:property_id')
			},
			unlink: {
				'method': 'DELETE',
				url: config.route('devices/:id/unlink')
			}
		});
		
		angular.extend(ret.prototype, Property.prototype);
		return ret;
	}
	
	DeviceResourceFactory.$inject = ['$resource'];
}
