/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Services/IguanaAPI.ts' />

module relisten {
    'use strict';
	
	export interface ITopScope extends ng.IScope {
		top_shows: Show[];
	}

	export interface ITopRouteParams extends ng.route.IRouteParamsService {
		artist: string;
	}
	
	export class TopController {
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
			private $scope: ITopScope,
			private $location: ng.ILocationService,
			private $rootScope: IRelistenRootScope,
			private $routeParams: ITopRouteParams,
			private IguanaAPI: IguanaAPI
		) {
			$rootScope.setCurrentArtist($routeParams.artist);
			IguanaAPI.topShows($routeParams.artist).success(top => {
				this.$scope.top_shows = top.data;
			});
		}
	}
}
