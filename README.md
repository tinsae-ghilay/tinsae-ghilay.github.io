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


### GeezDate

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

// We pass that GeezDate object as parameter to the to() function of the class.
var toGregorian=GeezDate.to(geezDate);


```

### Calendar

the Calendar class has a showMonth() function that returns HTML tags as a single String that becomes an innerHTML of a div.

##### Example 

Again if you dont want to change anything,

c

if you want to have a custom styled Week days. the reside in a <th> tag of a table.

declare a #calendar id in CSS or create a CSS class of your wish and give it a "calendar" id in html as follows
I have the following CSS id.
  
  ``` css
  
  #calendar{
    margin-top: 0px;
    -webkit-border-radius: 1em;
    -moz-border-radius: 1em;
    border-radius: 1em;
  }
  
  /* a month grid where day cells are arranged looks like this */
  .month{
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
    grid-template-rows: auto auto auto auto auto auto auto;
    min-height: 300px;
    max-height: 500px;
    column-count: 7;
    width: 100%;
    max-width: 500px;
    min-width: 300px;
    justify-items: center;
    border-radius: 0 0 15px 15px;
    background-color: rgb(46, 46, 46);
}
  
  /* th for week days*/
  th {
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    color: rgb(255, 255, 255);
  }
  
  /* day cells*/
  .day{
    border-radius: 50%;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    display:flex;
    align-items: center;
    justify-content: center;
    border:  solid 1px transparent;
    margin: 10%;
  }
  ```
  
 !! important, if you change class names in CSS , their names should also be changed in the Calendar class at Calendar.js 
 and then in html.
  
```html
<div id="calendar"></div>
  <script>
    
    // we get the current date
    var dateToday = GeezDate.now();
    
    // take the month and year of the current date
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
  


If you want to see how this looks in a website, look at it <a href="https://tinsae-ghilay.github.io ">here</a>
