/// <reference path='../../../typings/tsd.d.ts' />
/// <reference path='Controllers/HomeController.ts' />
/// <reference path='Controllers/DashboardController.ts' />
/// <reference path='Controllers/SignInController.ts' />
/// <reference path='Controllers/UserBarController.ts' />
/// <reference path='Controllers/DevicesController.ts' />
/// <reference path='Controllers/PropertiesController.ts' />
/// <reference path='Controllers/UpdatesController.ts' />
/// <reference path='Services/AuthService.ts' />
/// <reference path='Services/Device.ts' />
/// <reference path='Services/Update.ts' />
/// <reference path='Filters/PhoneNumberFilter.ts' />

module showbutler {
    'use strict';
	
	export interface IConfig {
		api_base: string;
		route: (path: string) => string;
	}
	
	export let config = <IConfig>{
		'api_base': 'http://api-server.showbutler.clients.tinittventures.com/api/',
		route: null
	};
	
	config.route = (path : string) => {
		return config.api_base + path; 
	};
	
	export interface ISBRootScope extends ng.IRootScopeService {
		currentUser: User;
		path: string;
		signOut: () => void;
	}
	
	let router = (
		$routeProvider : ng.route.IRouteProvider,
		$locationProvider : ng.ILocationProvider,
		$httpProvider : ng.IHttpProvider
	) => {
		$httpProvider.defaults.withCredentials = true;
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
				controller: HomeController,
				templateUrl: '/assets/partials/home.html',
				controllerAs: 'vm'
			})
			.when('/dashboard', {
				controller: DashboardController,
				templateUrl: '/assets/partials/dashboard.html',
				controllerAs: 'vm'
			})
			.when('/sign-in', {
				controller: SignInController,
				templateUrl: '/assets/partials/sign-in.html',
				controllerAs: 'vm'
			})
			/*
			.when('/sign-up', {
				controller: SignUpController,
				templateUrl: '/assets/partials/sign-up.html',
				controllerAs: 'vm'				
			})
			.when('/devices/register', {
				controller: DeviceRegisterController,
				templateUrl: '/assets/partials/device-register.html',
				controllerAs: 'vm'				
			})
			*/
			.when('/devices/:device_id?', {
				controller: DevicesController,
				templateUrl: '/assets/partials/devices.html',
				controllerAs: 'vm'				
			})
			.when('/properties/:property_id?', {
				controller: PropertiesController,
				templateUrl: '/assets/partials/properties.html',
				controllerAs: 'vm'				
			})
			.when('/history', {
				controller: UpdatesController,
				templateUrl: '/assets/partials/updates.html',
				controllerAs: 'vm'				
			})
			/*
			.when('/sign-out', {
				controller: SignOutController,
				templateUrl: '/assets/partials/sign-out.html',
				controllerAs: 'vm'				
			});
			*/
		;
	}
	
	let run = (
		$rootScope : ISBRootScope,
		$location : ng.ILocationService
	) => {
		$rootScope.currentUser = null;
		$rootScope.path = $location.path();
		$rootScope.$on('$locationChangeSuccess', () => {
			$rootScope.path = $location.path();
            // if (restrictedPage && !loggedIn) {
            //     $location.path('/login');
            // }
		})
	}
	
	run.$inject = ['$rootScope', '$location'];

    var sb = angular.module('showbutler', [
			'ngRoute',
			'ngResource',
			'ui.bootstrap',
			'angularMoment',
			'angular-duration-format',
			'angularSoundManager'
		])
            	// .controller('SignInController', TodoCtrl)
            	// .directive('todoBlur', todoBlur)
            	// .directive('todoFocus', todoFocus)
				.filter('phoneNumber', PhoneNumberFilter)
				.controller('UserBarController', UserBarController)
            	.service('AuthService', AuthService)
				.factory('Property', PropertyResourceFactory)
				.service('User', UserService)
				.factory('Device', DeviceResourceFactory)
				.factory('Update', UpdateResourceFactory)
				.config(["$routeProvider", "$locationProvider", "$httpProvider", router])
				.run(run)
				;
}
