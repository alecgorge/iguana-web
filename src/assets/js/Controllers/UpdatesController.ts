/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Services/AuthService.ts' />

module showbutler {
    'use strict';
	
	export interface IUpdatesControllerScope {
		events: UpdatesController;
		updates: ng.resource.IResourceArray<IUpdateResource>;
	}
	
	export class UpdatesController {
		public static $inject = [
			'$scope',
			'Update',
			'$routeParams'
		];
		
		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			private $scope: IUpdatesControllerScope,
			private Updates: ng.resource.IResourceClass<IUpdateResource>,
			private $routeParams: IDevicesRouteParams,
			private Properties: ng.resource.IResourceClass<IPropertyResource>
		) {
			this.$scope.events = this;
			
			this.$scope.updates = Updates.query(() => {
				this.$scope.updates.forEach(element => {
					element.dateDate = new Date(element.date);
				});
			});
		}
 	}
}
