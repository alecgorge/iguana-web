/// <reference path='../../../typings/tsd.d.ts' />
/// <reference path='Controllers/PlaybackController.ts' />
/// <reference path='Controllers/HomeController.ts' />
/// <reference path='Controllers/YearController.ts' />
/// <reference path='Controllers/ShowController.ts' />
/// <reference path='Controllers/VenueController.ts' />
/// <reference path='Controllers/TopController.ts' />
/// <reference path='Controllers/VenuesController.ts' />
/// <reference path='Controllers/QueueController.ts' />
/// <reference path='Services/IguanaAPI.ts' />
/// <reference path='Services/AGAudioPlayer.ts' />
/// <reference path='Filters/RelistenFilters.ts' />

module relisten {
    'use strict';
	
	export interface IRelistenRootScope extends ng.IRootScopeService {
		currentArtist: Artist;
		artists: Artist[];
		recordingCount: number;
		setCurrentArtist: (artistSlug: string) => Artist;
		currentArtistSlug: string;
		
		path: string;
	}
	
	let router = (
		$routeProvider : ng.route.IRouteProvider,
		$locationProvider : ng.ILocationProvider,
		$httpProvider : ng.IHttpProvider
	) => {
		/*
		/
		/:artist
		/:artist/top
		/:artist/venues
		/:artist/venues/:venue
		/:artist/:year
		/:artist/:year/:month/:daysource/:slug?
		/today
		/live
		/about
		/queue
		/search?q=
		*/
		$routeProvider
			.when('/', {
				controller: null,
				templateUrl: '/assets/partials/artists.html',
				controllerAs: 'vm'
			})
			.when('/queue', {
				controller: QueueController,
				templateUrl: '/assets/partials/queue.html',
				controllerAs: 'vm'
			})
			.when('/:artist', {
				controller: HomeController,
				templateUrl: '/assets/partials/home.html',
				controllerAs: 'vm'
			})
			.when('/:artist/top', {
				controller: TopController,
				templateUrl: '/assets/partials/top.html',
				controllerAs: 'vm'
			})
			.when('/:artist/venues', {
				controller: VenuesController,
				templateUrl: '/assets/partials/venues.html',
				controllerAs: 'vm'
			})
			.when('/:artist/venues/:venue', {
				controller: VenueController,
				templateUrl: '/assets/partials/venue.html',
				controllerAs: 'vm'
			})
			.when('/:artist/:year', {
				controller: YearController,
				templateUrl: '/assets/partials/year.html',
				controllerAs: 'vm'
			})
			.when('/:artist/:year/:month/:datesource', {
				controller: ShowController,
				templateUrl: '/assets/partials/show.html',
				controllerAs: 'vm'
			})
			.when('/:artist/:year/:month/:datesource/:track', {
				controller: ShowController,
				templateUrl: '/assets/partials/show.html',
				controllerAs: 'vm'
			})
			
			$locationProvider.html5Mode(true);
		;
	}
	
	router.$inject = ["$routeProvider", "$locationProvider", "$httpProvider"];
	
	let run = (
		$rootScope : IRelistenRootScope,
		$location : ng.ILocationService,
		IguanaAPI : IguanaAPI
	) => {
		IguanaAPI.artists().success(artistsContainer => {
			$rootScope.artists = artistsContainer.data;
			$rootScope.recordingCount = $rootScope.artists.map(artist => {
				return artist.recording_count;
			}).reduce((a, b) => {
				return a + b;
			});
			
			if($rootScope.currentArtistSlug) {
				$rootScope.setCurrentArtist($rootScope.currentArtistSlug);
			}
		});
		
		$rootScope.setCurrentArtist = (slug: string) => {
			$rootScope.currentArtistSlug = slug;
			
			if($rootScope.artists) {
				$rootScope.currentArtist = $rootScope.artists.filter(artist => {
					return artist.slug == slug;
				})[0];
				
				return $rootScope.currentArtist;				
			}
			
			return null;
		};
		
		$rootScope.path = $location.path();
		$rootScope.$on('$locationChangeSuccess', () => {
			$rootScope.path = $location.path();
            // if (restrictedPage && !loggedIn) {
            //     $location.path('/login');
            // }
		})
	}
	
	run.$inject = ['$rootScope', '$location', 'IguanaAPI'];

    var sb = angular.module('relisten', [
			'ngRoute',
			'ngResource',
			'ngSanitize',
			'ui.bootstrap',
			'angularMoment'
		])
            	.service('IguanaAPI', IguanaAPI)
				.filter('humanizeBoolean', HumanizeBooleanFilter)
				.filter('humanizeDuration', HumanizeTime)
				.filter('round', RoundFilter)
				.factory('AGAudioPlayer', AGAudioPlayerFactory)
				.controller('PlaybackController', PlaybackController)
				.config(router)
				.run(run)
				;
}
