const currentDate=GeezDate.now();
class Calendar{
    constructor(){
    }
    showMonth(start){
        var html="";
        var thisMonth=start.month;
        var thisYear=start.year;
        var firstDay=start.dayOfWeek();
        var weekDays=start.getDaysOfWeek();
        //console.log(firstDay + "and jdn ="+start.julianDay);
        //console.log("date before reduction "+start.format());
        // console.log("firstDay is "+firstDay);
        var displayedMonth=start.getMonth();
        start=start.plusDays(-firstDay);// back to day one
        //console.log("start date is "+start.format());
        //start=start.plusDays(+start.dayOfWeek());
        document.getElementById("title").innerHTML=displayedMonth+", <span class=\"latin\">"+thisYear+"</span>";
        var bar=document.getElementById("calendarNav");
        bar.style.background="linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,1)),url('./res/"+thisMonth+".webp')";
        bar.style.backgroundPosition="center";
        bar.style.backgroundSize="cover";
        //html+="<h3 style=\"align-text: center; width=\"100%\"\">"+displayedMonth+"</h3>";
        html+="<table>";
        html+="<tr style=\"padding:3px;\">";
        html+="<th class=\"weekend\">"+weekDays[0]+"</th><th>"+weekDays[1]+"</th><th>"+
            weekDays[2]+"</th><th>"+weekDays[3]+"</th><th>"+weekDays[4]+"</th><th>"+
            weekDays[5]+"</th><th class=\"weekend\">"+
        weekDays[6]+"</th></tr></table>";
        html+="<div class=\"month\" id=\"mon\">";
        for(let i=1;i<43;i++){
            if(start.month==thisMonth){
                if(start.dayOfMonth==currentDate.dayOfMonth 
                    && thisMonth==currentDate.month
                    && thisYear==currentDate.year){
                        if((i%7==0 )|| (i%7==1)){
                            html+="<li class=\"day today weekend\"> ";
                        } else{html+="<li class=\"day today\"> ";}
                }else{
                    if((i%7==0 )|| (i%7==1)){
                        html+="<li class=\"day weekend\"> ";
                    } else{html+="<li class=\"day week\"> ";}
                }
            }else{
                html+="<li class=\"day month-offset\"> ";
            }
            html+=String(start.dayOfMonth).padStart(2,"0")+"</li>";
            start=start.plusDays(1);
       }
       html+="</div>";
       return html;
    }
}