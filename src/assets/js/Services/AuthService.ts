/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='User.ts' />

module showbutler {
	'use strict';
	
	export interface ISBHTTPErrorResponse {
		message: string;
	}
	
	export class AuthService {
		public static $inject = [
			'$http',
			'$q',
			'User',
			'$rootScope',
			'$location'
		];
		
		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			private $http : ng.IHttpService,
			private $q: ng.IQService,
			private User : UserService,
			private $rootScope : ISBRootScope,
			private $location: ng.ILocationService
		) {
			if(window.localStorage["currentUser"]) {
				try {
					this.$rootScope.currentUser = JSON.parse(window.localStorage["currentUser"]);
				} catch (e) {
					
				}
				this.refreshUser();
			}
			
			$rootScope.signOut = () => {
				this.signOut();
				this.$location.path("/sign-in");
			};
		}
		
		public signIn(phoneNumber: string, password: string) : ng.IHttpPromise<User> {
			let r = this.$http.post(config.route('users/sign_in'), {
				phoneNumber: phoneNumber,
				password: password
			})
			
			r.then((result: ng.IHttpPromiseCallbackArg<User>) => {
				this.saveUser(result.data);
			});
			
			return r;
		}
		
		public signOut() : ng.IHttpPromise<boolean> {
			let r = this.$http.post(config.route('users/sign_out'), {});
			
			r.then((result: ng.IHttpPromiseCallbackArg<boolean>) => {
				this.clearUser();
			});
			
			return r;
		}
		
		saveUser(user: User) {
			this.$rootScope.currentUser = user;
			window.localStorage["currentUser"] = JSON.stringify(user);
		}
		
		clearUser() {
			this.$rootScope.currentUser = null;
			window.localStorage["currentUser"] = null;
		}
		
		refreshUser() {
			this.User.me().then((u: ng.IHttpPromiseCallbackArg<User>) => {
			}, (reason: ng.IHttpPromiseCallbackArg<ISBHTTPErrorResponse>) => {
				if(reason.status == 403 || reason.data && reason.data.message) {
					this.clearUser();
					this.$location.path('/sign-in');
				}
				else {
					Rollbar.error("Unexpected user refresh error", {
						"status": reason.status,
						"statusText": reason.statusText,
						"response": reason.data
					});
				}
			})
		}
	}
}
