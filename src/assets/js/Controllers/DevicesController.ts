/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Services/AuthService.ts' />

module showbutler {
    'use strict';
	
	export interface IDevicesControllerScope {
		events: DevicesController;
		devices: ng.resource.IResourceArray<IDeviceResource>;
		properties: ng.resource.IResourceArray<IPropertyResource>;
		currentDevice: IDeviceResource;
	}
	
	export interface IDevicesRouteParams extends ng.route.IRouteParamsService {
		device_id: string;
	}
	
	export class DevicesController {
		public static $inject = [
			'$scope',
			'Device',
			'$routeParams',
			'Property'
		];
		
		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			private $scope: IDevicesControllerScope,
			private Devices: ng.resource.IResourceClass<IDeviceResource>,
			private $routeParams: IDevicesRouteParams,
			private Properties: ng.resource.IResourceClass<IPropertyResource>
		) {
			this.$scope.events = this;
			
			this.$scope.devices = Devices.query(() => {
				if($routeParams.device_id) {
					this.selectDevice(this.$scope.devices.map((dev: IDeviceResource) => {
						return dev._id;
					}).indexOf($routeParams.device_id));
				}
			});
			
			this.$scope.properties = Properties.query();
		}
		
		public selectDevice(deviceIdx: number) {
			this.$scope.currentDevice = this.$scope.devices[deviceIdx];
		}
		
		public assignCurrentDeviceTo(propertyIdx: number) {
			let prop = this.$scope.properties[propertyIdx];
			
			this.$scope.currentDevice.property = prop;
			this.$scope.currentDevice.$link({
				property_id: prop._id
			});
		}
		
		public unassign() {
			this.$scope.currentDevice.property = null;
			this.$scope.currentDevice.$unlink();
		}
	}
}
