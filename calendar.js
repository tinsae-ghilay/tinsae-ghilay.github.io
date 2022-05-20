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
        document.getElementById("title").innerHTML=displayedMonth+", "+thisYear;
        var bar=document.getElementById("calendarNav");
        bar.style.background="linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,1)),url('./res/"+thisMonth+".webp')";
        bar.style.backgroundPosition="center";
        bar.style.backgroundSize="cover";
        //html+="<h3 style=\"align-text: center; width=\"100%\"\">"+displayedMonth+"</h3>";
        html+="<table>";
        html+="<tr style=\"padding:3px;\">";
        html+="<th>"+weekDays[0]+"</th><th>"+weekDays[1]+"</th><th>"+weekDays[2]+"</th><th>"+weekDays[3]+"</th><th>"+weekDays[4]+"</th><th>"+weekDays[5]+"</th><th>"+weekDays[6]+"</th></tr><tr>";
        for(let i=1;i<43;i++){
            if(start.month==thisMonth){
                if(start.dayOfMonth==currentDate.dayOfMonth 
                    && thisMonth==currentDate.month
                    && thisYear==currentDate.year){
                    html+="<td class=\"today\"> ";
                }else{
                html+="<td>";
            }
            }else{
                html+="<td class=\"month-offset\"> ";
            }
            html+=String(start.dayOfMonth).padStart(2,"0")+"</td>";
            start=start.plusDays(1);
            if(i%7==0){
                html+="</tr>";
            }
       }
       html+="</table>";
       return html;
    }
}