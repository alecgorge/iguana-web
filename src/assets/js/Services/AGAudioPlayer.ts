/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Services/IguanaAPI.ts' />

module relisten {
    'use strict';
	
	export class AGAudioPlayer {
		public static $inject = [
		];
		
		public tracks: PlaybackTrack[];
		
		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
		) {
			
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
	}
	
	let _agAudioPlayer = new AGAudioPlayer();
	export function AGAudioPlayerFactory() {
		return _agAudioPlayer;
	}
}
