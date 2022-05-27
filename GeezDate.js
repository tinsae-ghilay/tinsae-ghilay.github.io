const jOffset = 1723856;
const jdnOfEpocH = 2440588; 
var message="Provided date is not valid !";
/**
 * @author Tinsae ghilay: tinsaekahsay&#64;gmail.com
 */
class GeezDate{
    /**
     * 
     * @throws RangeError
     * @param {Number} year 
     * @param {Number} month 
     * @param {Number} dayOfMonth 
     * @param {Number} dayOfYear 
     * @param {Number} julianDay 
     */
    constructor(year,month,dayOfMonth, dayOfYear,julianDay){
        var isValidDate=this.validate(year,month,dayOfMonth);
        try {
            if(isValidDate){
                this.year=year;
                this.month=month;
                this.dayOfMonth=dayOfMonth;
                this.dayOfYear=dayOfYear;
                this.julianDay=julianDay;
            }else{
                throw new RangeError(message);
            }
            
        } catch (error) {

            console.log(error);

        }
    }

    /**
     * validates Geez Date
     * @param {Number} year 
     * @param {Number} month 
     * @param {Number} dayOfMonth 
     */
    validate(year, month, dayOfMonth){
        try {
            (Number.isInteger(year)) && (Number.isInteger(month)) && (Number.isInteger(dayOfMonth))==true;
        } catch (error) {
            console.log(error+" try catch");
        }
        var  areNumbers=(Number.isInteger(year)) && (Number.isInteger(month)) && (Number.isInteger(dayOfMonth));
        if(!areNumbers){
            message+= "\n * -- Date parameters must be numbers!";
        }
        var areGreaterThanZero= month>0 && dayOfMonth>0;
        if(!areGreaterThanZero){
            message+="\n * -- Month and dayOfMonth must be greater than 0!";
        }
        var isValidMonth=month<=13;
        if(!isValidMonth){
            message+="\n * -- Month is out of range!";
        }
        var isValidDate=this.validateDate(year,month,dayOfMonth)
        if (!isValidDate) {
            message+="\n * -- Day is out of range for the month!";
        }
        return areNumbers && areGreaterThanZero && isValidMonth && isValidDate;
    }

    validateDate(year,month,dayOfMonth){
        if(month!=13){
            return dayOfMonth<=30;
        }else{
            return (year%4==3 && dayOfMonth<=6)|| (year%4!=3 && dayOfMonth<=5);
        }
    }    

    /** 
     * Date arthimatic( plus and minus )
     * for subtruction we have to use negative value.
     * @param {Number}days
     * @returns GeezDate
    */
    plusDays(days){
        return GeezDate.jdnToGeez(this.julianDay+days);
    }

    /** 
     *year arthimatic( plus and minus )
     * for subtruction we have to use negative value.
     * @param {Number}years
     * @returns GeezDate
    */
    plusYears(years){
        return GeezDate((this.year+years),month,this.dayOfMonth);
    }
    dayOne(){
        return Math.ceil((this.julianDay-this.dayOfMonth)%7);
    }
    dayOfWeek(){
        return Math.round((this.julianDay+0.5)%7)%7;
    }
    
    getMaxDate(){
        if(this.month!=13){
            return 30;
        }else{
            if(this.year%4==3){
                return 6;
            }else{
                return 5;
            }
        };
    }

    toGregorian(){
        return new Date((this.julianDay-jdnOfEpocH)*86400000);
    }
    
    // static functions below.
    /**
     * Calculates GeezDate from Julian day number.
     * @param {Number} jdn 
     * @returns GeezDate
     */
    static jdnToGeez (jdn) { // correct multiplication in javascript=Math.imul(number,number) is used instead of number*number.
        var r = (jdn - jOffset) % 1461; 
        var n = r%365 + Math.imul/*here*/(365,(r/1460));
        var year =Math.floor(Math.imul/*here*/(4 , ((jdn - jOffset) / 1461)) + r / 365 - r / 1460);
        var month = Math.floor(n/30 + 1);
        var dayOfMonth = Math.floor(n%30 + 1);
        var dayOfYear = Math.floor((Math.imul/*here*/((month - 1) , 30)) + dayOfMonth);
        return new GeezDate(year, month, dayOfMonth, dayOfYear,jdn);
    }

    /**
     * 
     * @param {Number} year 
     * @param {Number} month 
     * @param {Number} dayOfMonth 
     * @returns Julian_day_number
     */
    static toJdn(year,month,dayOfMonth){

        return (( jOffset + 365 )+ Math.imul(365 , ( year - 1 ))+( year/4 )+ Math.imul(30 , month)+ dayOfMonth - 31)
    }

    /**
     * Current date in geez from Unix.time
     * @returns GeezDate
     */
    static now(){
        //var epoch=2440588;// Julian day number of january 1,1970.-- because UNIX time starts from that date.
        var res=(Date.now())/86400000; // elapsed days since start of UNIX time.
        return this.jdnToGeez(res+jdnOfEpocH);// Julian day number now = Julian day at EPOCH+Elapsed days in UNIX time
    }

    /**
     * directly converts Gregorian Date object ( ፈረንጂ )  to GeezDate object
     * @param {Date} date 
     * @returns GeezDate.
     */
    static from(date = Date){
        try {
            var julianDay = Math.floor((date / 86400000) - (date.getTimezoneOffset()/1440) + jdnOfEpocH);
            return this.jdnToGeez(julianDay);
        } catch (error) {
            console.log(new TypeError("value must be an instance of Date"))
        }
    }

    /**
     * gets GeezDate Object from dayOfMonth, month and year of a given Geez date. 
     * eg. if we want a GeezDate object of September 2, 1961 :::-  we would say GeezDate.of(1961,1,2);
     * @param {Number} year 
     * @param {Number} month 
     * @param {Number} dayOfMonth 
     * @returns GeezDate
     */
    static of(year, month, dayOfMonth){ // Validate the given Dates. eg. GeezDate.of(1961,1,31) would return an Exception.
        var dayOfYear=Math.imul(30,(month-1))+dayOfMonth;
        var jdn=this.toJdn(year,month,dayOfMonth);
        return new GeezDate(year,month,dayOfMonth,dayOfYear,jdn);    
    }

}
// test output.
//console.log(GeezDate.now().toGregorian());    // without parameter.
//console.log(GeezDate.from(new Date()))        // with Date() as parameter
//console.log(GeezDate.of(2015,13,6));          // Should throw no Error
//console.log(GeezDate.of(2014,13,6));          // should throw Range Error
//console.log(GeezDate.of(2014,1,6));           // should throw no error
//console.log(GeezDate.of(0,1,31));             // should throw Range Error
//console.log(GeezDate.of(0,1,0));              // should throw Range Error
//console.log(GeezDate.of("a",1,2));            // should throw Range Error