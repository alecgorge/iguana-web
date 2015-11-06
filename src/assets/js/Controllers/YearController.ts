/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Services/IguanaAPI.ts' />

module relisten {
    'use strict';
	
	export interface IYearScope extends ng.IScope {
		year: Year;
	}

	export interface IYearRouteParams extends ng.route.IRouteParamsService {
		artist: string;
		year: string;
	}
	
	export class YearController {
		public static $inject = [
			'$scope',
			'$location',
			'$rootScope',
			'$routeParams',
			'IguanaAPI'
		];
		
		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			private $scope: IYearScope,
			private $location: ng.ILocationService,
			private $rootScope: IRelistenRootScope,
			private $routeParams: IYearRouteParams,
			private IguanaAPI: IguanaAPI
		) {
			$rootScope.setCurrentArtist($routeParams.artist);
			IguanaAPI.year($routeParams.artist, $routeParams.year).success(year => {
				this.$scope.year = year.data;
			});
		}
	}
}
