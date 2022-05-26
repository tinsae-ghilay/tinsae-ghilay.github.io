const currentDate=GeezDate.now();
//var locale;

class Calendar{
   
    constructor(constants){

        this.constants=constants;
    }

    showMonth(start){

        // first get required data from GeezDate befor any change happens
        var thisMonth=start.month;
        var thisYear=start.year;

        // first day of the month( sun=0 sat=6)
        var firstDay=start.dayOfWeek();

        // array of days of the week (locale based).
        var weekDays=this.constants.week;
        
        // we should declare month here, because it will change in the next step
        var displayedMonth=this.constants.getMonth(start.month)
        // back to start of week. in our case Sunday and fetch remaining days from previous month
        start=start.plusDays(-firstDay);

        // setting text to title of the month. i.e Month and year the calendar is on.
        document.getElementById("title").innerHTML=displayedMonth+", <span class=\"latin\">"+thisYear+"</span>";

        // Calendar navigation Buttons and month related picture.
        var bar=document.getElementById("calendarNav");
        
        // CSS.
        // pictures should be named 1-13 with a .webp extension,
        // we want pictures to represent month.
        // so naming picture for september would be 1.webp and pagumie would be 13.webp
        bar.style.background="url('./res/"+thisMonth+".webp')";
        bar.style.backgroundPosition="center";
        bar.style.backgroundSize="cover";
        
        // HTML tags start here 
        // week days in a table head. we get it from array
        var html ="<table>";
        html+="<tr style=\"padding:3px;\">";
        html+="<th class=\"weekend\">"+weekDays[0]+"</th><th>"+weekDays[1]+"</th><th>"+
            weekDays[2]+"</th><th>"+weekDays[3]+"</th><th>"+weekDays[4]+"</th><th>"+
            weekDays[5]+"</th><th class=\"weekend\">"+
        weekDays[6]+"</th></tr></table>";

        // month dates part of the card starts here
        html+="<div class=\"month\" id=\"mon\">";

        // number of days in month grid is 7*6=42 so loop < 43;
        for(let i=0;i<42;i++){

            //start tag and class of a day box
            html+="<li class =\"day ";

            // if within calendar month?
            if(start.month==thisMonth){

                // if week end or not
                if((i%7==0 )|| ((i)%7==6)){
                    html+="weekend ";
                }else{
                    html+="week ";
                }
                // if this date? 
                if(start.dayOfMonth==currentDate.dayOfMonth 
                    && thisMonth==currentDate.month
                    && thisYear==currentDate.year){
                        html+="today";
                }

            }else{ // if dates are of previous month or next month
                html+="offset";
            }

            // we close tag
            html+="\">";

            // add 0 to dates < 10 and add it between tag and end tag
            html+=String(start.dayOfMonth).padStart(2,"0")+"</li>";

            // add one day to GeezDate object so that it can be used for the next day.
            start=start.plusDays(1);
       }

       // Calendar dates grid ends here.
       html+="</div>";
       return html;
    }
}