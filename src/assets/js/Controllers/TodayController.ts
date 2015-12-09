/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Services/IguanaAPI.ts' />

module relisten {
    'use strict';
	
	export interface ITodayScope extends ng.IScope {
		current_artist: IguanaTIHArtist;
		today_artists: IguanaTIHArtist[];
	}

	export class TodayController {
		public static $inject = [
			'$scope',
			'$location',
			'$rootScope',
			'IguanaAPI'
		];
		
		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			private $scope: ITodayScope,
			private $location: ng.ILocationService,
			private $rootScope: IRelistenRootScope,
			private IguanaAPI: IguanaAPI
		) {
			IguanaAPI.today().success(tih => {
				this.$scope.today_artists = tih.tih;
				
				if($rootScope.currentArtist) {
					this.$scope.current_artist = this.$scope.today_artists.filter(art => {
						return art.name == $rootScope.currentArtist.name;
					})[0];					
				}
			});
		}
	}
}
