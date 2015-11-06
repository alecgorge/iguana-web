/// <reference path='../../../../typings/tsd.d.ts' />

module showbutler {
	export function PhoneNumberFilter() {
		return (input: string) => {
			if(!input || input.length != 12) {
				return input;
			}
			
			let areaCode = input.substr(2, 3);
			let start = input.substr(5, 3);
			let end = input.substr(8, 4);
			
			return `(${areaCode}) ${start}-${end}`;
		}
	}
	
	PhoneNumberFilter.$inject = [];
}
