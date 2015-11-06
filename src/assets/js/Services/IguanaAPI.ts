/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Application.ts' />

module relisten {
	export interface IguanaModel {
		id: number;
		createdAt: Date;
		updatedAt: Date;
	}
	
	export interface Artist extends IguanaModel {
		name: string;
		archive_collection: string;
		slug: string;
		from_archive: boolean;
		recording_count: number;
	}
	
	export interface PartialYear extends IguanaModel {
		year: number;
		show_count: number;
		recording_count: number;
		duration: number;
		avg_duration: number;
		avg_rating: number;
		ArtistId: number;
	}
	
	export interface Year extends PartialYear {
		shows: Show[];
	}
	
	/*
	{
		recording_count: 1,
		title: "Grateful Dead Live at Various on 1977-00-00",
		date: "1977-01-01T00:00:00.000Z",
		display_date: "1977-00-00",
		year: 1977,
		archive_identifier: "gd1977-00-00.125546.tuning.murphy.flac",
		id: 31562,
		VenueId: 26,
		ArtistId: 1,
		is_soundboard: 0,
		duration: 5570,
		reviews_count: 2,
		average_rating: 0,
		venue_city: "Various",
		venue_name: "Various"
	}
	*/			
	export interface Show extends IguanaModel {
		recording_count: number;
		title: string;
		date: Date;
		display_date: string;
		year: number;
		archive_identifier: string;
		VenueId: number;
		ArtistId: number;
		is_soundboard: boolean;
		reviews_count: number;
		average_rating: number;
		venue_city: string;
		venue_name: string;
	}
	
	export interface Recording extends IguanaModel {
		title: string;
		date: Date;
		display_date: string;
		year: number;
		source: string;
		lineage: string;
		transferer: string;
		taper: string;
		description: string;
		archive_identifier: string;
		reviews: Review[];
		reviews_count: number;
		average_rating: number;
		duration: number;
		track_count: number;
		is_soundboard: boolean;
		weighted_avg: number;
		ArtistId: number;
		tracks: Track[];
		venue: PartialVenue[];
	}
	
	export interface Review {
		reviewbody: string;
		reviewtitle: string;
		reviewer: string;
		reviewdate: string;
	}
	
	/*
	{
		title: "Tuning",
		md5: "fc1a0f6268bb72d886f623876af30899",
		track: 1,
		bitrate: 178,
		size: 123863552,
		length: 5570,
		file: "https://archive.org/download/gd1977-00-00.125546.tuning.murphy.flac/gd_1977_Tuning_77.mp3",
		slug: "tuning",
		id: 572455,
		createdAt: "2014-08-22T23:33:51.000Z",
		updatedAt: "2014-08-22T23:33:51.000Z",
		ShowId: 31562
	}
	*/
	export interface Track extends IguanaModel {
		title: string;
		md5: string;
		track: number;
		bitrate: number;
		size: number;
		length: number;
		file: string;
		slug: string;
		ShowId: number;
	}
	
	export interface PlaybackTrack extends Track {
		artist: Artist;
		recording: Recording;
	}
	
	export interface PartialVenue extends IguanaModel {
		name: string;
		city: string;
		slug: string;
	}
	
	export interface Venue extends PartialVenue {
		shows: Show[];
	}
	
	export interface IguanaContainer<T> {
		is_success: boolean;
		data: T;
	}
	
	export class IguanaAPI {
		public static $inject = [
			'$http',
			'$q',
			'$rootScope',
			'$location'
		];
		
		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			private $http : ng.IHttpService,
			private $q: ng.IQService,
			private $rootScope : IRelistenRootScope,
			private $location: ng.ILocationService
		) {
		}
		
		private route(path: string) {
			return "http://iguana.app.alecgorge.com/api/" + path;
		}
		
		private artistRoute(artist: string, path: string) {
			return this.route(`artists/${artist}/${path}`);
		}
		
		public artists() : ng.IHttpPromise<IguanaContainer<Artist[]>> {
			return this.$http.get(this.route('artists'));
		}
		
		public years(artistSlug: string) : ng.IHttpPromise<IguanaContainer<PartialYear[]>> {
			return this.$http.get(this.artistRoute(artistSlug, 'years'));
		}
		
		public year(artistSlug: string, year: string) : ng.IHttpPromise<IguanaContainer<Year>> {
			return this.$http.get(this.artistRoute(artistSlug, 'years/' + year));
		}
		
		public show(artistSlug: string, year: string, date: string) : ng.IHttpPromise<IguanaContainer<Recording[]>> {
			return this.$http.get(this.artistRoute(artistSlug, `years/${year}/shows/${date}`));
		}
		
		public topShows(artistSlug: string) : ng.IHttpPromise<IguanaContainer<Show[]>> {
			return this.$http.get(this.artistRoute(artistSlug, 'top_shows'));
		}
		
		public venues(artistSlug: string) : ng.IHttpPromise<IguanaContainer<PartialVenue[]>> {
			return this.$http.get(this.artistRoute(artistSlug, 'venues'));
		}
		
		public venue(artistSlug: string, venueId: string) : ng.IHttpPromise<IguanaContainer<Venue>> {
			return this.$http.get(this.artistRoute(artistSlug, 'venues/' + venueId));
		}
		
		public randomShow(artistSlug: string) : ng.IHttpPromise<IguanaContainer<Show>> {
			return this.$http.get(this.artistRoute(artistSlug, 'random_show'));
		}
	}
}
