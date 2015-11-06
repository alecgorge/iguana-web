/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Services/AuthService.ts' />

module showbutler {
    'use strict';
	
	export interface ISignIn extends ng.IScope {
		phoneNumber: string;
		password: string;
		errors: string[];
		hasErrors: boolean;
		events: SignInController;
	}

	export class SignInController {
		public static $inject = [
			'$scope',
			'$location',
			'AuthService',
			'$rootScope'
			// 'filterFilter'
		];
		
		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			private $scope: ISignIn,
			private $location: ng.ILocationService,
			private authService: AuthService,
			private $rootScope: ISBRootScope
			// private todoStorage: ITodoStorage,
			// private filterFilter
		) {
			this.$scope.events = this;
			this.$scope.errors = [];
			this.$scope.hasErrors = false;
		}
		
		private hasFocused: boolean = false;
		public focusInput(focusSelector: string) {
			if(!this.hasFocused) {
				setTimeout(function () {
					$(focusSelector).focus();				
				}, 50);
				
				this.hasFocused = true;
			}
		}
		
		public signIn() {
			let ph = "+1" + this.$scope.phoneNumber;
			let pa = this.$scope.password;
			
			this.$scope.errors = [];
			
			if(!ph) {
				this.$scope.errors.push('Make sure you put in a valid phone number!');
			}
			
			if(!pa || pa.length == 0) {
				this.$scope.errors.push('You need to enter a password.');
			}
			
			if(this.$scope.errors.length == 0) {
				this.$scope.hasErrors = false;
				this.authService.signIn(ph, pa)
					.then((u: ng.IHttpPromiseCallbackArg<User>) => {
						let user = u.data;
						
						this.$rootScope.currentUser = user;
						this.$location.path('/dashboard');
					}, (reason: ng.IHttpPromiseCallbackArg<ISBHTTPErrorResponse>) => {
						if(reason.status == 403 || reason.data && reason.data.message) {
							this.$scope.errors.push(reason.data.message);
							this.$scope.hasErrors = true;							
						}
						else {
							this.$scope.errors.push(`Something has gone wrong: ${reason.statusText}.`);
							this.$scope.hasErrors = true;
							
							Rollbar.error("Unexpected sign in error", {
								"status": reason.status,
								"statusText": reason.statusText,
								"response": reason.data
							});
						}
					})
					;
					
			}
			else {
				this.$scope.hasErrors = true;
			}
		}
	}
}
