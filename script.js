const jOffset = 1723856;
//var locale;
const months=["MESKEREM","TIKIMTI","HIDAR","TAHSAS","TIRI","LEKATIT","MEGABIT","MIYAZYA","GINBOT","SENE","HAMLE","NEHASE","PAGUMIE"]
const awarh=["መስከረም","ጥቅምቲ","ሕዳር","ታሕሳስ","ጥሪ","ለካቲት","መጋቢት","ሚያዝያ","ግንቦት","ሰነ","ሓምለ","ነሓሰ","ጳጉሜ"]
const week=["SUN","MON","TUE","WED","THU","FRI","SAT"];
const semun =["ሰንበት","ሰኑይ","ሰሉስ","ረቡዕ","ሓሙስ","ዓርቢ","ቀዳም"];
class GeezDate{
    constructor(year,month,dayOfMonth, dayOfYear,julianDay){
        this.year=year;
        this.month=month;
        this.dayOfMonth=dayOfMonth;
        this.dayOfYear=dayOfYear;
        this.julianDay=julianDay;
    }
    format(){// to convert a GeezDate to String.
        return this.dayOfMonth+", "+this.getMonth()+", "+this.year;
    }

    /** 
    * Date arthimatic( plus and minus )
    * for subtruction we have to use negative value.
    * @param {Number}days
    * @returns GeezDate
    */
    plusDays(days){
        var jdn=this.julianDay+days;
        return GeezDate.jdnToGeez(jdn);
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
    getMonth(){
        if(this.locale=="iso"){
            return months[this.month-1];
        }else{
            return awarh[this.month-1];
        }
    }
    getMonthsOfYear(){
        if(this.locale=="iso"){
            return months;
        } else{
            return awarh;
        }
    }
    getDaysOfWeek(){
        if(this.locale=="iso"){
            return week;
        } else{
            return semun;
        }
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
    /** 
    *setters for year,month, day and locale if need be
    */
    setLocale(locale){ this.locale=locale; }
    setDayOfMonth(day){
        var diff=this.dayOfMonth-day;
        this.dayOfYear+=diff;
        this.julianDay+=diff; 
        this.dayOfMonth=day;
    }
    setMonth(month){ return GeezDate.of(this.year, month, this.dayOfMonth) }
    setYear(year){ return GeezDate.of(year, this.month, this.dayOfMonth) }

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
    static geezToJdn(year,month,dayOfMonth){
        return (( jOffset + 365 )+ Math.imul(365 , ( year - 1 ))+( year/4 )+ Math.imul(30 , month)+ dayOfMonth - 31)
    }

    /**
     * Current date in geez from Unix.time
     * @returns GeezDate
     */
    static now(){
        var epoch=2440588;// Julian day number of january 1,1970.-- because UNIX time starts from that date.
        var res=(Date.now())/86400000; // elapsed days since start of UNIX time.
        return this.jdnToGeez(res+epoch);// Julian day number now = Julian day at EPOCH+Elapsed days in UNIX time
    }

    /**
     * directly converts Gregorian Date object ( ፈረንጂ )  to GeezDate object
     * @param {Date} date 
     * @returns GeezDate.
     */
    static from(date = Date){
        var julianDay = Math.floor((date / 86400000) - (date.getTimezoneOffset()/1440) + 2440587.5);
        return this.jdnToGeez(julianDay);
    }

    /**
     * gets GeezDate Object from dayOfMonth, month and year of a given Geez date. 
     * eg. if we want a GeezDate object of September 2, 1961 :::-  we would say GeezDate.of(1961,1,2);
     * @param {Number} year 
     * @param {Number} month 
     * @param {Number} dayOfMonth 
     * @returns GeezDate
     * @throws RangeError
     */
    static of(year, month, dayOfMonth){ // Validate the given Dates. eg. GeezDate.of(1961,1,31) would return an Exception.
        try {
            if(validate(year,month,dayOfMonth));
            var dayOfYear=Math.imul(30,(month-1))+dayOfMonth;
            var jdn=this.geezToJdn(year,month,dayOfMonth);
            return new GeezDate(year,month,dayOfMonth,dayOfYear,jdn);
        } catch (error) {
            console.log(error);
        }
        //  validate(year,month,dayOfMonth);//this Validates the parameters as valid dates.
        
    }

}
// test output.

/*console.log(GeezDate.now());// without parameter.
console.log(GeezDate.from(new Date()))// with Date() as parameter
console.log(GeezDate.of(2015,13,4)); // with Geez dates as parameters*/

/**
 * validates Geez Date
 * @param {Number} year 
 * @param {Number} month 
 * @param {Number} dayOfMonth 
 */
function validate(year, month, dayOfMonth){
    var  areNumbers=(Number.isInteger(year)) && (Number.isInteger(month)) && (Number.isInteger(dayOfMonth));
    var areGreaterThanZero=+year>0 && +month>0 && +dayOfMonth>0;
    var isValidMonth=month<=13;
    var isValidDate=validateDate(year,month,dayOfMonth)
    var isValid =areNumbers && areGreaterThanZero && isValidMonth && isValidDate;

    if(!isValid){
        throw new RangeError('Unrepresentable date parameters '+year+", "+month+", "+dayOfMonth);
    }
    return isValid;
   
}

function validateDate(year,month,dayOfMonth){
    if(month!=13){
        return dayOfMonth<=30;
    }else{
        if(year%4==3){
            return dayOfMonth<=6;
        }else{
            return dayOfMonth<=5;
        }
    };
}