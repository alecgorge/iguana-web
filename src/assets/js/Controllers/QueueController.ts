/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Services/IguanaAPI.ts' />

module relisten {
    'use strict';
	
	export interface IQueueScope extends ng.IScope {
		audioPlayer : AGAudioPlayer;
	}

	export class QueueController {
		public static $inject = [
			'$scope',
			'$rootScope',
			'AGAudioPlayer'
		];
		
		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			private $scope: IQueueScope,
			private $rootScope: IRelistenRootScope,
			private AGAudioPlayer: AGAudioPlayer
		) {
			this.$scope.audioPlayer = AGAudioPlayer;
		}
	}
}
