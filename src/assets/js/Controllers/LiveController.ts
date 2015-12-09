/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Services/IguanaAPI.ts' />

module relisten {
    'use strict';
	
	export interface ILiveScope extends ng.IScope {
		live: IguanaLivePlay[];
	}

	export class LiveController {
		public static $inject = [
			'$scope',
			'$location',
			'$rootScope',
			'IguanaAPI',
			'$interval'
		];
		
		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			private $scope: ILiveScope,
			private $location: ng.ILocationService,
			private $rootScope: IRelistenRootScope,
			private IguanaAPI: IguanaAPI,
			private $interval: ng.IIntervalService
		) {
			this.$scope.live = [];
			this.poll();
			
			$interval(() => {
				this.poll();
			}, 5000);
		}
		
		private ids: string[] = [];
		public poll() {
			console.log(this.$rootScope.artists);
			this.IguanaAPI.poll().success(liv => {
				liv.plays.forEach(v => {
					for(var a of this.$rootScope.artists) {
						if(v.band == a.slug) {
							v.bandName = a.name;
							break;
						}
					}
					
					if(v.showVersion == "") {
						v.showVersion = "0";
					}
				});
				this.$scope.live = liv.plays.filter((e, idx, arr) => {
					let r = this.ids.indexOf(e.id);
					return r == -1;
				}).concat(this.$scope.live);
				
				this.ids = this.$scope.live.map(v => {
					return v.id;
				})
			});
		}
	}
}
