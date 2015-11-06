/// <reference path='../../../../typings/tsd.d.ts' />

interface IHomeScope extends ng.IScope {
	
}

module showbutler {
    'use strict';
	
	export class HomeController {
		public static $inject = [
			'$scope',
			'$location',
			// 'todoStorage',
			// 'filterFilter'
		];
		
		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			private $scope: IHomeScope,
			private $location: ng.ILocationService
			// private todoStorage: ITodoStorage,
			// private filterFilter
		) {
			
		}
	}
}
