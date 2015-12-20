/// <reference path='../../../../typings/tsd.d.ts' />

module relisten {
    'use strict';
	
	export interface IHomeScope extends ng.IScope {
		years: PartialYear[];
		top_shows: Show[];
	}

	export interface IHomeRouteParams extends ng.route.IRouteParamsService {
		artist: string;
	}
	
	export class HomeController {
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
			private $scope: IHomeScope,
			private $location: ng.ILocationService,
			private $rootScope: IRelistenRootScope,
			private $routeParams: IHomeRouteParams,
			private IguanaAPI: IguanaAPI
		) {
			$rootScope.setCurrentArtist($routeParams.artist);
			IguanaAPI.years($routeParams.artist).success(years => {
				this.$scope.years = years.data;
			});
			
			IguanaAPI.topShows($routeParams.artist).success(topShows => {
				this.$scope.top_shows = topShows.data;
			});
		}
	}
}
