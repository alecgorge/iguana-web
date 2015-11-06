/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Services/AuthService.ts' />

module showbutler {
    'use strict';
	
	export interface IPropertiesControllerScope {
		events: PropertiesController;
		properties: ng.resource.IResourceArray<IPropertyResource>;
		currentProperty: IPropertyResource;
		currentPropertyPushNotificationsEnabled: boolean;
		submitting: boolean;
	}
	
	export interface IPropertiesRouteParams extends ng.route.IRouteParamsService {
		property_id: string;
	}
	
	export class PropertiesController {
		public static $inject = [
			'$scope',
			'$routeParams',
			'Property',
			'$rootScope',
			'$location'
		];
		
		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			private $scope: IPropertiesControllerScope,
			private $routeParams: IPropertiesRouteParams,
			private Properties: ng.resource.IResourceClass<IPropertyResource>,
			private $rootScope: ISBRootScope,
			private $location: ng.ILocationService
		) {
			this.$scope.events = this;
			this.$scope.submitting = false;
			
			this.$scope.properties = Properties.query(() => {
				if(this.$routeParams.property_id == "create") {
					this.$scope.currentProperty = new Properties({
						address: "",
						phoneNumbers: [],
						names: [],
						usersToNotify: [ this.$rootScope.currentUser ]
					}); 
					this.$scope.currentPropertyPushNotificationsEnabled = true;
				}
				else if(this.$routeParams.property_id) {
					this.selectProperty(this.$scope.properties.map((prop: IPropertyResource) => {
						return prop._id;
					}).indexOf($routeParams.property_id));
				}
			});
		}
		
		public selectProperty(propertyIdx: number) {
			this.$scope.currentProperty = this.$scope.properties[propertyIdx];
			this.$scope.currentPropertyPushNotificationsEnabled = this.currentUserHasNotificationsEnableForProperty(propertyIdx);
		}
		
		public currentUserHasNotificationsEnableForProperty(propertyIdx: number) {
			let prop = this.$scope.properties[propertyIdx];
			
			return prop.usersToNotify.map((u : User) => {
				return u._id;
			}).indexOf(this.$rootScope.currentUser._id) != -1;
		}
				
		public save() {
			this.$scope.submitting = true;
			this.$scope.currentProperty.phoneNumbers = this.$scope.currentProperty.phoneNumbers.map((ph: string) => {
				if(ph.indexOf("+1") === 0) {
					return ph;		
				}
				else {
					return "+1" + ph;
				}
			});
			
			this.$scope.currentProperty.$save(() => {
				if(this.$scope.currentPropertyPushNotificationsEnabled) {
					this.$scope.currentProperty.$enableNotifications();					
				}
				else {					
					this.$scope.currentProperty.$disableNotifications();					
				}
				
				this.$scope.submitting = false;					
				
				if(this.$routeParams.property_id == "create") {
					this.$location.path('/properties');					
				}
			}, (err: any) => {
				console.log(err)
				alert(JSON.stringify(err));
				this.$scope.submitting = false;
			});
		}
		
		public removeHomeowner(idx: number) {
			this.$scope.currentProperty.names.splice(idx, 1);
			this.$scope.currentProperty.phoneNumbers.splice(idx, 1);
		}
		
		public addHomeowner() {
			this.$scope.currentProperty.names.push('')
			this.$scope.currentProperty.phoneNumbers.push('')
		}
	}
}
