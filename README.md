# timeless [![Build Status](https://travis-ci.org/alexindigo/timeless.png?branch=master)](https://travis-ci.org/alexindigo/timeless) [![Dependency Status](https://gemnasium.com/alexindigo/timeless.png)](https://gemnasium.com/alexindigo/timeless)

Javascript (Node + Browser) library that helps to deal with time in timezone- and/or date- agnostic way

## Install

### Node
```
$ npm install timeless
```

### Ender
```
$ ender add timeless --use=your_ender_file
```

## Usage

### toMilliseconds
– converts time string to milliseconds

Node:
``` javascript
var time = require('timeless');

time.toMilliseconds('11:23'); // -> 44580000
```

Ender:
``` javascript
$.time.toMilliseconds('12:23:57.123'); // -> 44637123
```

### toTimestamp
– parses date[time] string into timestamp (Assumes UTC, AM)

Node:
``` javascript
var time = require('timeless');

time.toTimestamp('12/31/69'); // -> 3155673600000
```

Ender:
``` javascript
$.time.toTimestamp('8/22/13 12:30'); // -> 1377131400000 (22 Aug 2013 00:30:00 GMT)
```

### getBaseDateTime
– returns midnight time of the specified date (strips time value from the timestamp, assumes UTC)

Node:
``` javascript
var time = require('timeless');

time.getBaseDateTime(1377174600000); // -> 1377129600000 (22 Aug 2013 12:30:00 -> 22 Aug 2013 00:00:00)
```

Ender:
``` javascript
$.time.getBaseDateTime(3155673612345); // -> 3155673600000 (31 Dec 2069 00:00:12 -> 31 Dec 2069 00:00:00)
```

### padLeft
– fills empty digit places with ```0```

Node:
``` javascript
var time = require('timeless');

time.padLeft(1); // -> '01'
```

Ender:
``` javascript
$.time.padLeft(10); // -> '10'
```
