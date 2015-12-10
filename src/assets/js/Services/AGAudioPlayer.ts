/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Services/IguanaAPI.ts' />

module relisten {
    'use strict';
	
	export class AGAudioPlayer {
		public audioTag: HTMLAudioElement;
		public tracks: PlaybackTrack[] = [];
		private currentIndex = -1;
		public currentTrack : PlaybackTrack = null;
		public IguanaAPI: IguanaAPI;
		
		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			
		) {
			this.audioTag = new Audio();
			
			this.audioTag.addEventListener("ended", this.audioTagEnded);
			this.audioTag.addEventListener("loadedmetadata", this.metadataLoaded);
			
			this.loadQueue();	
		}
		
		private audioTagEnded = (ev: Event) => {
			this.next();
		}
		
		private metadataLoaded = (ev: Event) => {
			
		}
		
		public fixCurrentIndex() {
			var i = 0;
			for(var t of this.tracks) {
				if(t.file == this.audioTag.src) {
					this.currentIndex = i;
					break;
				}
				i++;
			}
			this.saveQueue();
		}
		
		public loadQueue() {
			if(window.localStorage["agaudioplayer_queue"]) {
				let ob = JSON.parse(window.localStorage["agaudioplayer_queue"]);
				
				this.tracks = ob["tracks"];
				this.playAtIndex(ob["currentIndex"]);
				this.pause();
			}
		}
		
		public saveQueue() {
			window.localStorage["agaudioplayer_queue"] = JSON.stringify({
				tracks: this.tracks,
				currentIndex: this.currentIndex
			});
		}
		
		public clearPlaylist() {
			this.tracks.splice(0, this.tracks.length);
			this.saveQueue();
		}
		
		public addPlaybackTracks(pt: PlaybackTrack[]) {
			for(let t of pt) {
				this.tracks.push(t);				
			}
			return this;
		}
		
		public addTracksFromRecordingAndArtist(t: Track[], rec: Recording, artist: Artist) {
			this.addPlaybackTracks(t.map(v => {
				let pt = <PlaybackTrack>jQuery.extend(true, {}, v);
				pt.artist = artist;
				
				pt.recording = jQuery.extend(true, {}, rec);
				
				return pt;
			}));
			this.saveQueue();
		}
		
		public playNext(t: Track, rec: Recording, artist: Artist) {
			let pt = <PlaybackTrack>jQuery.extend(true, {}, t);
			pt.artist = artist;
			
			pt.recording = jQuery.extend(true, {}, rec);
			
			this.tracks.splice(this.currentIndex + 1, 0, pt);

			this.saveQueue();
		}
		
		public removeTrackAtIndex(idx: number) {
			this.tracks.splice(idx, 1);
			
			// move to next item
			if(idx == this.currentIndex) {
				this.playAtIndex(idx);
			}
			
			this.saveQueue();
		}
		
		public nextIndex() {
			if(this.canNext()) {
				return this.currentIndex + 1;
			}
			
			return -1;
		}
		
		public prevIndex() {
			if(this.elapsed() < 5) {
				if(this.canPrevious()) {
					return this.currentIndex - 1;
				}
				else {
					return -1;
				}
			}
			else {
				return this.currentIndex;
			}
		}
				
		public playAtIndex(idx: number) {
			if(idx < 0 || idx >= this.tracks.length) {
				this.pause();
				return;
			}
			
			this.currentIndex = idx;
			this.currentTrack = this.tracks[idx];
			let cur = this.currentTrack;
			
			this.currentTrack = cur;
			
			this.audioTag.src = cur.file;
			this.audioTag.play();
			
			if(this.IguanaAPI) {
				this.IguanaAPI.post(this.currentTrack);
			}
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
			this.playAtIndex(this.nextIndex());
		}
		
		public previous() {
			this.playAtIndex(this.prevIndex());
		}
		
		public canPrevious() {
			return this.currentIndex - 1 >= 0;
		}
		
		public canNext() {
			return this.currentIndex + 1 < this.tracks.length;
		}
		
		// playback info
		public elapsed() {
			return this.audioTag.currentTime;
		}
		
		public seek(seconds: number) {
			this.audioTag.currentTime = seconds;
		}
		
		public volume() {
			return this.audioTag.volume;
		}
		
		public setVolume(vol: number) {
			this.audioTag.volume = vol;
		}
	}
	
	let _agAudioPlayer = new AGAudioPlayer();
	export function AGAudioPlayerFactory(IguanaAPI: IguanaAPI) {
		_agAudioPlayer.IguanaAPI = IguanaAPI;
		return _agAudioPlayer;
	}
	
	AGAudioPlayerFactory.$inject = ['IguanaAPI'];
}
