/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Services/IguanaAPI.ts' />

module relisten {
    'use strict';
	
	export interface IShowScope extends ng.IScope {
		shows: Recording[];
		current_show: Recording;
		
		events: ShowController;
		
		show_all_sources: boolean;
	}

	export interface IShowRouteParams extends ng.route.IRouteParamsService {
		artist: string;
		year: string;
		month: string;
		datesource: string;
	}
	
	export class ShowController {
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
			private $scope: IShowScope,
			private $location: ng.ILocationService,
			private $rootScope: IRelistenRootScope,
			private $routeParams: IShowRouteParams,
			private IguanaAPI: IguanaAPI
		) {
			$rootScope.setCurrentArtist($routeParams.artist);
			$scope.show_all_sources = false;
			
			let parts = $routeParams.datesource.split('-');
			let day = parts[0];
			let sourceIndex = parts.length > 1 ? parseInt(parts[1]) : 0;
			let date = `${$routeParams.year}-${$routeParams.month}-${day}`
			IguanaAPI.show($routeParams.artist, $routeParams.year, date).success(show => {
				this.$scope.shows = show.data;
				this.$scope.current_show = this.$scope.shows[sourceIndex];
			});
		}
		
		public changeSource(sourceIdx: number) {
			this.$scope.current_show = this.$scope.shows[sourceIdx];
		}
	}
}
