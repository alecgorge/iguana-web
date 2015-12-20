/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Services/IguanaAPI.ts' />

module relisten {
    'use strict';
	
	export interface IVenueScope extends ng.IScope {
		venue: Venue;
	}

	export interface IVenueRouteParams extends ng.route.IRouteParamsService {
		artist: string;
		venue: string;
	}
	
	export class VenueController {
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
			private $scope: IVenueScope,
			private $location: ng.ILocationService,
			private $rootScope: IRelistenRootScope,
			private $routeParams: IVenueRouteParams,
			private IguanaAPI: IguanaAPI
		) {
			$rootScope.setCurrentArtist($routeParams.artist);
			IguanaAPI.venue($routeParams.artist, $routeParams.venue).success(venue => {
				this.$scope.venue = venue.data;
			});
		}
	}
}
