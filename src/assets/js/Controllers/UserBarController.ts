/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Application.ts' />
/// <reference path='../Services/AuthService.ts' />

module showbutler {
    'use strict';

	export class UserBarController {
		public static $inject = [
			'$scope',
			'$rootScope',
			'AuthService'
		];
		
		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			private $scope: ng.IScope,
			private $rootScope: ISBRootScope,
			private authService: AuthService
		) {
		}
    }
}
