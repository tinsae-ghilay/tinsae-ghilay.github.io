# Geez date

## what is this?

GeezDate is a Javascript version of the Java and Kotlin Classes with the same name designed to be used in Date conversion and displaying a Calendar in mobile apps and websites.  these Classes are meant to be easy and targeted at an objective. thus the Methods(functions) are mostly if not all, similar.

The idea is to make it easy to convert between the already available standard APIs and Geez date.  I am using Joda time in an app and since it may( may not) be depreciated. I wanted to be on the safe side. If any one is in the same situation feel free to adapt this to your liking and use it any way you like.
if you care about License, assume this as having an MIT licence as stated <a href="https://choosealicense.com/licenses/mit/">here</a>


## Usage

if you are interested on how to use these classes without changing anything here is how to.

P.s I am only interested in Day, month and year aspects of the Geez calendar. not in Time so I did not includ Hours, minute, seconds and milliseconds.

There is no need to call new instance of the class it self. Just call the static methods to get the date.


```javascript

// to get the current system date in Geez,
var now = GeezDate.now(); 

// To convert a Date object to a GeezDate object
var date = GeezDate.from(new Date(2022,9,31)); 

// get a Date object by passing a specific date in Geez calendar
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



visit this site at https://tinsae-ghilay.github.io 
