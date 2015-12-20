/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Services/IguanaAPI.ts' />

module relisten {
    'use strict';
	
	export interface IShowScope extends ng.IScope {
		shows: Recording[];
		current_show: Recording;
		current_show_index: number;
		
		events: ShowController;
		
		show_all_sources: boolean;
		
		audioPlayer: AGAudioPlayer;
	}

	export interface IShowRouteParams extends ng.route.IRouteParamsService {
		artist: string;
		year: string;
		month: string;
		datesource: string;
		trackSlug: string;
	}
	
	export class ShowController {
		public static $inject = [
			'$scope',
			'$location',
			'$rootScope',
			'$routeParams',
			'IguanaAPI',
			'AGAudioPlayer'
		];
		
		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			private $scope: IShowScope,
			private $location: ng.ILocationService,
			private $rootScope: IRelistenRootScope,
			private $routeParams: IShowRouteParams,
			private IguanaAPI: IguanaAPI,
			private AGAudioPlayer: AGAudioPlayer
		) {
			$rootScope.setCurrentArtist($routeParams.artist);
			$scope.show_all_sources = false;
			$scope.events = this;
			$scope.audioPlayer = AGAudioPlayer;
			
			let parts = $routeParams.datesource.split('-');
			let day = parts[0];
			let sourceIndex = parts.length > 1 ? parseInt(parts[1]) : 0;
			
			let paddedMonth = ("00" + $routeParams.month).substring($routeParams.month.length);
			let paddedDay = ("00" + day).substring(day.length);
			
			let date = `${$routeParams.year}-${paddedMonth}-${paddedDay}`
			IguanaAPI.show($routeParams.artist, $routeParams.year, date).success(show => {
				this.$scope.shows = show.data;
				this.changeSource(sourceIndex);
				
				if(sourceIndex >= 3) {
					this.$scope.show_all_sources = true;
				}
				
				if($routeParams.trackSlug) {
					this.playTrackAtIndex(this.$scope.current_show.tracks.map(track => {
						return track.slug;
					}).indexOf($routeParams.trackSlug));
				}
			});
		}
		
		public changeSource(sourceIdx: number) {
			this.$scope.current_show = this.$scope.shows[sourceIdx];
			this.$scope.current_show_index = sourceIdx;
		}
		
		public playTrackAtIndex(trackIdx: number) {
			let tracks: Track[] = [];
			for(var i = 0; i < this.$scope.current_show.tracks.length; i++) {
				tracks.push(this.$scope.current_show.tracks[i]);
			}
			
			this.AGAudioPlayer.clearPlaylist();
			this.AGAudioPlayer.addTracksFromRecordingAndArtist(
				tracks,
				this.$scope.current_show,
				this.$rootScope.currentArtist
			);
			this.AGAudioPlayer.playAtIndex(trackIdx);
		}
		
		public playNext(idx: number) {
			let t = this.$scope.current_show.tracks[idx];
			this.AGAudioPlayer.playNext(t, this.$scope.current_show, this.$rootScope.currentArtist);
		}
		
		public addToQueue(idx: number) {
			let t = this.$scope.current_show.tracks[idx];
			this.AGAudioPlayer.addTracksFromRecordingAndArtist(
				[t],
				this.$scope.current_show,
				this.$rootScope.currentArtist
			);			
		}
		
		public addRestOfShowToQueue(idx: number) {
			let tracks: Track[] = [];
			for(var i = idx; i < this.$scope.current_show.tracks.length; i++) {
				tracks.push(this.$scope.current_show.tracks[i]);
			}
			
			this.AGAudioPlayer.addTracksFromRecordingAndArtist(
				tracks,
				this.$scope.current_show,
				this.$rootScope.currentArtist
			);
		}
	}
}
