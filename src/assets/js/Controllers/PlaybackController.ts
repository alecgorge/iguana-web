/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Services/IguanaAPI.ts' />

module relisten {
    'use strict';
	
	export interface IPlaybackScope extends ng.IScope {
		venue: Venue;
	}

	export class PlaybackController {
		public static $inject = [
			'$scope',
			'$location',
			'$rootScope',
			'$routeParams',
			'IguanaAPI'
		];
		
		private audioTag : HTMLAudioElement;
		public tracks: PlaybackTrack[];
		
		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			private $scope: IVenueScope,
			private $location: ng.ILocationService,
			private $rootScope: IRelistenRootScope,
			private $routeParams: IVenueRouteParams,
			private IguanaAPI: IguanaAPI
		) {
			this.audioTag = new HTMLAudioElement();
			
			this.audioTag.addEventListener("ended", this.audioTagEnded);
		}
		
		private audioTagEnded(ev: Event) {
			this.next();
		}
		
		public addPlaybackTracks(pt: PlaybackTrack[]) {
			for(let t in pt) {
				this.tracks.push(t);				
			}
			return this;
		}
		
		public addTracksFromRecordingAndArtist(t: Track[], rec: Recording, artist: Artist) {
			this.addPlaybackTracks(t.map(v => {
				let pt = <PlaybackTrack>v;
				pt.artist = artist;
				pt.recording = rec;
				
				return pt;
			}));
		}
		
		public removeTrackAtIndex(idx: number) {
			this.tracks.splice(idx, 1);
		}
		
		// playback management
		public play() {
			this.audioTag.play();
		}
		
		public pause() {
			this.audioTag.pause();
		}
		
		public isPlaying() {
			return !this.audioTag.paused;
		}
		
		public next() {
			
		}
		
		public previous() {
			
		}
	}
}
