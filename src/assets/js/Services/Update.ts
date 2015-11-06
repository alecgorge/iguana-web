/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Application.ts' />

module showbutler {
	// We have the option to define arguments for a custom resource	
	export enum SBUpdateType {
    	SBUpdateTypeDoorOpened,
    	SBUpdateTypeDoorClosed,
    	SBUpdateTypeMotionDetected
	}
	
	export class Update {
		_id: string;
		type: SBUpdateType;
		date: string;
		dateDate: Date;
		property: Property;		
	}
	
	export interface IUpdateResource extends ng.resource.IResource<IUpdateResource>, Update {
		
	}
	
	export interface IUpdateResourceClass extends ng.resource.IResourceClass<IUpdateResource> {
		get(): IUpdateResource;	
	}
	
	export function UpdateResourceFactory($resource: ng.resource.IResourceService) {
		let path = config.route('devices/all/updates');
		let ret = $resource<IDeviceResource, IDeviceResourceClass>(path);
		
		angular.extend(ret.prototype, Property.prototype);
		return ret;
	}
	
	UpdateResourceFactory.$inject = ['$resource'];
}
