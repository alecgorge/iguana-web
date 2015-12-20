/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Services/IguanaAPI.ts' />

module relisten {
    'use strict';
	
	export interface IVenuesScope extends ng.IScope {
		venues: PartialVenue[];
	}

	export interface IVenuesRouteParams extends ng.route.IRouteParamsService {
		artist: string;
	}
	
	export class VenuesController {
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
			private $scope: IVenuesScope,
			private $location: ng.ILocationService,
			private $rootScope: IRelistenRootScope,
			private $routeParams: IVenuesRouteParams,
			private IguanaAPI: IguanaAPI
		) {
			$rootScope.setCurrentArtist($routeParams.artist);
			IguanaAPI.venues($routeParams.artist).success(venues => {
				this.$scope.venues = venues.data;
			});
		}
	}
}
