# Geez date


## what is this?

GeezDate is a Javascript version of the Java and Kotlin Classes with the same name designed to be used in Date conversion and displaying a Calendar in mobile apps and websites.  these Classes are meant to be easy and targeted at an objective. thus the Methods(functions) are mostly if not all, similar.

The idea is to make it easy to convert between the already available standard APIs and Geez date.  I am using Joda time in an app and since it may( may not) be depreciated. I wanted to be on the safe side. If any one is in the same situation feel free to adapt this to your liking and use it any way you like.
if you care about License, assume this as having an MIT licence as stated <a href="https://choosealicense.com/licenses/mit/">here</a>


## Usage

There are three classes in this repo. 

<ol>
  <li> GeezDate class that handles the conversion to and fro geez and iso dates and also date arthimetic.</li>
  <li> Calendar class that shows a calendar as an innerHTML to a div by refering to its ID.</li>
  <li> and a Constants class that holds the week days and months of Geez calendar in English and Tigrinya.(a lot of room for improvement on how this is handled) </li>
</ol>

if you are interested on how to use these classes without changing anything here is how to.

P.s I am only interested in Day, month and year aspects of the Geez calendar. not in Time so I did not includ Hours, minute, seconds and milliseconds.


## GeezDate

There is no need to call new instance of the class it self. Just call the static methods to get the date.



```javascript

// to get the current system date in Geez,
var now = GeezDate.now(); 

// To convert a Date object to a GeezDate object
var date = GeezDate.from(new Date(2022,9,31)); 

// get a GeezDate object by passing a specific date in Geez calendar
var dateOf = GeezDate.of(2014,9,18);  

// to increment date by numberOfDays 
// to decrement , number of days should be negative.
var newDate = newDate(numberOfDays);


```

If you want to convert a geez date to Gregorian date, you can call the to() function like below.


```javascript

// A GeezDate that we want to convert to Gregorian.
var geezDate=GeezDate.of(2014,9,16);

// and to convert it to Gregorian.
var gregorianDate=GeezDate.toGregorian();


```

## Calendar

The Calendar class has a showMonth() function that returns HTML tags as a single String that becomes an innerHTML of a div.

#### Example 

Again if you don#t want to change anything,..

If you want to have a custom styled Week days. they reside in a <th> tag of a table. hense style a th tag

declare a #calendar id in CSS or create a CSS class of your wish and give it a "calendar" id in html as follows
I have the following CSS id in calendar.css.
  
  ``` css
  
  /* the container that will hold the calendar table */
  #calendar{
  
    /* your style here style it the way you like*/
  }
  
  /* title where current month and year are displayed*/
  
  #title{
  
  /* style here */
  
  }
  
  /* a div where(optionally) navigation buttons and Title are located and background changes dynamically.*/
  
  #calendarNav{
  
  /* style here*/
  }
  
  /* a month grid where day cells are arranged looks like this */
  .month{
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
    column-count: 7;
    width: 100%;
    /* your style here */
  }
  
  /* th fordays of the week*/
  th {
    /* your style here 
    width: 100%;
  }
  
  /* day cells*/
  
  .day{
    /* your style here*/
  }
  
  ```
  
 ##### important!!
 if you change class names in CSS , their names should also be changed in the Calendar class at Calendar.js 
 and then in html.\
  
 Also background images for calendarNav need to be named from 1 to 13 based on month they represent, and they should be in .webp format.
 as can be seen in bellow example from showMonth() function of Calendar class(Calendar.js).
  
  ``` javascript
   // setting text to title of the month. i.e Month and year the calendar is on.
  
    document.getElementById("title").innerHTML=displayedMonth+", <span class=\"latin\">"+thisYear+"</span>";

    // background of Div where navigation buttons and title reside.
  
    var bar=document.getElementById("calendarNav");

    // CSS tags.
    // pictures should be named 1-13 with a .webp extension,
    // we want pictures to represent month.
    // so naming picture for september would be 1.webp and pagumie would be 13.webp
    bar.style.background="url('./res/"+thisMonth+".webp')";
    bar.style.backgroundPosition="center";
    bar.style.backgroundSize="cover";
  
  ```
 
  
  Additional CSS classe that you can add are ,
  
  <ul>
    <li> . offset for dates that lie outside of the month displayed but overflow to start and end weeks of said month</li>
    <li> . todays for indicating the current day of the month</li>
    <li> . weekend and optionally .week for weekends and weekdays respectively.</li>
  </ul>
  
  and implementation in HTML goes like..
  
```html
<div id="calendar"></div>
  <script>
    
    // we get the current date
    var dateToday = GeezDate.now();
    
    // take the month and year of the current date
    // Using these two variables, we can navigate forward and backward in months and years. 
    var m=dateToday.month;                    
    var y=dateToday.year;
    
    // Day should be 1 to reduce unneccesary code to compensate for Pagumie date error.
    var calendarMonth=GeezDate.of(y,m,1);
    
    // we get the id where Calendar is going to reside
    var calendarCard=document.getElementById("calendar");
    
    // now we can call the constants also based on locale we want. 
    // if we want it in Tigrinya we can pass an empty string, for English we pass "iso"
    var constants=new Constants("Geez");
    
    // and we call a new instance of calendar by passing an instance of Constants
    var calendar=new Calendar(constants);

    // setting html data dynamically from javascript 
    calendarCard.innerHTML=calendar.showMonth(calendarMonth); 
    
  </script>
  ```
  Navigation buttons can also be set up and listened for Clicks.  I perform these actions eg for forward navigation in calendar.html as such \
  
  
  ```html
  <script>
    // next button
    var next=document.getElementById("next"); 
    next.addEventListener("click", nextMonth);
    
    // the nextMonth function like so
    // navigating forward when next button is clicked. 
    function nextMonth(){
        if(m<13){ // if month is not the last month in that year add one
            m=m+1;
        }else{ // if it is the last month already , revert to september
            m=1;
            //and increase year by one.
            y=y+1;
        }
        // renew CalendarMonth with new params.
        calendarMonth=GeezDate.of(y,m,1); // as always dayOfMonth set to 1;
        // finally  set text to card.
        calendarCard.innerHTML=calendar.showMonth(calendarMonth); // and we are done.
     }
   </script>
   
  ```
    
And for navigating back just reverse the steps. 

##### Also.
If you want to see how this looks in a website, look at it <a href="https://tinsae-ghilay.github.io/calendar.html">here</a>\
Opinion, comments advice and recomendations will be greatly apreciated.

#### Maintainer
  
[@tinsae-ghilay](https://github.com/tinsae-ghilay).
    
#### License

[MIT](LICENSE) © Richard Littauer
