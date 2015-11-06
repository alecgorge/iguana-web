/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Services/AuthService.ts' />

module showbutler {
    'use strict';
	
	export interface Support {
		phone: string;
		email: string;
	}
	
	export interface IDashboardControllerScope {
		events: DashboardController;
		support: Support;
	}
	
	export class DashboardController {
		public static $inject = [
			'$scope',
			'$http'
		];
		
		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			private $scope: IDashboardControllerScope,
			private $http: ng.IHttpService
		) {
			$http.get(config.route('support_info')).then((resp: ng.IHttpPromiseCallbackArg<Support>) => {
				this.$scope.support = resp.data;
			});
		}		
 	}
}
