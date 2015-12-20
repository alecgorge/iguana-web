/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Services/IguanaAPI.ts' />

module relisten {
    'use strict';
	
	export interface IPlaybackScope extends ng.IScope {
		audioTag : HTMLAudioElement;
		audioPlayer : AGAudioPlayer;
	}
	
	export class PlaybackController {
		public static $inject = [
			'$scope',
			'$rootScope',
			'AGAudioPlayer'
		];
		
		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			private $scope: IPlaybackScope,
			private $rootScope: IRelistenRootScope,
			private AGAudioPlayer: AGAudioPlayer
		) {
			$scope.audioTag = AGAudioPlayer.audioTag;
			$scope.audioPlayer = AGAudioPlayer;
			
			setInterval(() => {
				$scope.$apply();
			}, 500);
		}
	}
}
