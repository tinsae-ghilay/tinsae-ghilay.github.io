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
    static jdnToGeez (jdn) { // correct multiplication in javascript=Math.imul(number,number) is used instead of number*number.
        var r = (jdn - jOffset) % 1461; 
        var n = r%365 + Math.imul/*here*/(365,(r/1460));
        var year =Math.floor(Math.imul/*here*/(4 , ((jdn - jOffset) / 1461)) + r / 365 - r / 1460);
        var month = Math.floor(n/30 + 1);
        var dayOfMonth = Math.floor(n%30 + 1);
        var dayOfYear = Math.floor((Math.imul/*here*/((month - 1) , 30)) + dayOfMonth);
        return new GeezDate(year, month, dayOfMonth, dayOfYear,jdn);
    }
    format(){// to convert a GeezDate to String.
        return this.dayOfMonth+", "+this.getMonth()+", "+this.year;
    }

    // Date arthimatic( plus and minus )
    // for subtuction we have to use negative value.
    plusDays(days){
        var jdn=this.julianDay+days;
        return GeezDate.jdnToGeez(jdn);
    }
    plusMonths(months){
        return GeezDate.of(this.year,(this.month+months),this.dayOfMonth)
    }
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
    setLocale(locale){
        this.locale=locale;
    }

    static geezToJdn(year,month,dayOfMonth){
        return (( jOffset + 365 )+ Math.imul(365 , ( year - 1 ))+( year/4 )+ Math.imul(30 , month)+ dayOfMonth - 31)
    }

    /*static now(){
        var localDate=new Date()
        var julianDay = Math.floor((localDate / 86400000) - (localDate.getTimezoneOffset()/1440) + 2440587.5);
        return this.jdnToGeez(julianDay);
    }*/
    static now(){
        var epoch=2440588;
        var time=Date.now()/86400000;
        return this.jdnToGeez(time+epoch);
    }

    static from(date = Date){
        var julianDay = Math.floor((date / 86400000) - (date.getTimezoneOffset()/1440) + 2440587.5);
        return this.jdnToGeez(julianDay);
    }
    static of(year, month, dayOfMonth){ // validate function is below!!!
        validate(year,month,dayOfMonth);//this Validates the parameters as valid dates.
        var dayOfYear=Math.imul(30,(month-1))+dayOfMonth;
        var jdn=this.geezToJdn(year,month,dayOfMonth);
        return new GeezDate(year,month,dayOfMonth,dayOfYear,jdn);
    }

}
var date=GeezDate.now().plusMonths(1);
console.log(GeezDate.now());// without parameter.
console.log(GeezDate.from(new Date()))// with Date() as parameter
console.log(GeezDate.of(2015,13,4)); // with Geez dates as parameters
console.log("Day today is "+date.dayOfWeek())

function validate(year, month, dayOfMonth){
    var  areNumbers=(Number.isInteger(year)) && (Number.isInteger(month)) && (Number.isInteger(dayOfMonth));
    var areGreaterThanZero=+year>0 && +month>0 && +dayOfMonth>0;
    var isValidMonth=month<=13;
    var isValidDate=validateDate(year,month,dayOfMonth)
    var isValid =areNumbers && areGreaterThanZero && isValidMonth && isValidDate;
    if(!isValid){
        throw new EvalError('Unrepresentable date parameters');
    }
   
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