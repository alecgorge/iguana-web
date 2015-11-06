/// <reference path='../../../../typings/tsd.d.ts' />

module relisten {
	export function HumanizeBooleanFilter() {
		return (input: string) => {
			return !!input ? "Yes" : "No";
		}
	}
	
	export function RoundFilter() {
		return (input: string, digits: number) => {
			let f = parseFloat(input)
			return f.toFixed(digits);
		}
	}
  
	export function HumanizeTime() {
		return (seconds: string, short = false) => {
			let dur = moment.duration(parseInt(seconds, 10), 'seconds');
      let time = {
        years: Math.round(dur.years()),
        months: Math.round(dur.months()),
        days: Math.round(dur.days()),
        hours: Math.round(dur.hours()),
        minutes: Math.round(dur.minutes()),
        seconds: Math.round(dur.seconds()),       
      };
      
      if(short) {
        if(time.hours > 0) {
          return time.hours + ":" + ("00" + time.minutes).slice(-2) + ":" + ("00" + time.seconds).slice(-2)
        }

        return time.minutes + ":" + ("00" + time.seconds).slice(-2);
      }
      
      if(time.years > 0)
        return time.years + " years and " + time.months + " months"

      if(time.months > 0)
        return time.months + " months and " + time.days + " days"

      if(time.days > 0)
        return time.days + " days and " + time.hours + " hours"

      if(time.hours > 0)
        return time.hours + " hours and " + time.minutes + " minutes"

      if(time.minutes > 0)
        return time.minutes + " minutes and " + time.seconds + " seconds"

      if(time.seconds > 0)
        return time.seconds + " seconds"
		}

	}
}
