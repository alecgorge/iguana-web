/// <reference path='../../../../typings/tsd.d.ts' />

/// <reference path='../Application.ts' />
/// <reference path='Property.ts' />

module showbutler {
	export const enum UserRole {
		None,
		HomeOwner,
		Agent,
		SuperAdmin
	}
	
	export class User {
		_id: string;
		name: string;
		username: string;
		phoneNumber: string;
		role: UserRole;
		properties: Property[];
		// devices: IDeviceModel[];
		iosPushTokens: string[];
	}
	
	export class UserService {
		public static $inject = [
			'$http'	
		];
		
		constructor(
			private $http : ng.IHttpService
		) {
			
		}
		
		public createAgent(
			phoneNumber: string,
			password: string
		) : ng.IHttpPromise<User> {
			return this.$http.post(config.route('users/create_agent'), {
				phoneNumber: phoneNumber,
				password: password
			});
		}
		
		public createUser(
			phoneNumber: string,
			password: string
		) : ng.IHttpPromise<User> {
			return this.$http.post(config.route('users/create_user'), {
				phoneNumber: phoneNumber,
				password: password
			});
		}
		
		public me() : ng.IHttpPromise<User> {
			return this.$http.get(config.route('users/me'))			
		}
	}
}
