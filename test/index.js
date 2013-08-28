var test     = require('tape').test
  , timeless = require('../')

  , toMilliseconds =
    { '3:08' : 11280000
    , '7:00' : 25200000
    , '7:7'  : 25620000
    , '07:50': 28200000
    , ' 10:43 ': 38580000
    , '11:3' : 39780000
    , '12:23': 44580000
    , '12:23:06': 44586000
    , '12:23:6' : 44586000
    , '12:23:57' : 44637000
    , '12:23:57.123' : 44637123
    , '3:3:3.300' : 10983300
    , '3:3:3.30' : 10983300
    , '3:3:3.3' : 10983300
    , '01:01:01.001': 3661001
    , '01:01:01.01': 3661010
    , '01:01:01.1': 3661100
    , '04:03:02': 14582000
    , '04:03:02.0001': 14582000
    , '04:03:02.1000': 14582100
    , '04:03:02.1001': 14582100
    , '07:06:05.4321': 25565432
    , '00:30': 1800000
    , '12:30': 45000000
    , '7am': 25200000
    , '11pm': 82800000
    , '': 0
    }

  , toTimestamp =
    { '8/22/13': Date.parse('2013-08-22')
    , '12/31/69': Date.parse('2069-12-31')
    , '1/1/70': Date.parse('1970-01-01')
    , '8/22/70': Date.parse('1970-08-22')
    , '8/22/2070': Date.parse('2070-08-22')
    , '8/22/13 09:30': Date.parse('2013-08-22T09:30:00')
    , '8/22/13 12:30': Date.parse('2013-08-22T00:30')
    , '8/22/13 1:30': Date.parse('2013-08-22T01:30')
    , '8/22/13 12:30 PM': Date.parse('2013-08-22T12:30')
    , '8/22/13 1:30 PM': Date.parse('2013-08-22T13:30')
    , '': 0
    }

  , getBaseDateTime =
    { '11280000': 0 // 03:08
    , '1377163800000': 1377129600000 // 22 Aug 2013 09:30
    , '1377131400000': 1377129600000 // 22 Aug 2013 00:30
    , '1377135000000': 1377129600000 // 22 Aug 2013 01:30
    , '1377174600000': 1377129600000 // 22 Aug 2013 12:30
    , '3155673612345': 3155673600000 // 31 Dec 2069 00:00:12.345
    , '20987654321': 20908800000 // 31 Aug 1970 21:54:14.321
    , '3155673600000': 3155673600000 // 31 Dec 2069 00:00:00
    , '3155716800000': 3155673600000 // 31 Dec 2069 12:00:00
    , '': 0
    }

  , padLeft =
    { '1'  : '01'
    , '10' : '10'
    , '0'  : '00'
    , '100': '100'
    , ''   : '00'
    }
  ;

// timeless.toMilliseconds
test('toMilliseconds', function test_timeless_toMilliseconds(t)
{
  var timeStrings = Object.keys(toMilliseconds);

  // planning to have 1 test per file
  t.plan(timeStrings.length);

  timeStrings.forEach(function(str)
  {
    var ms;
    t.equal((ms = timeless.toMilliseconds(str)), toMilliseconds[str], 'converted '+str+' into '+ms+' milliseconds, expected '+toMilliseconds[str]);
  });
});

// timeless.toTimestamp
test('toTimestamp', function test_timeless_toTimestamp(t)
{
  var dateStrings = Object.keys(toTimestamp);

  // planning to have 1 test per file
  t.plan(dateStrings.length);

  dateStrings.forEach(function(str)
  {
    var ts;
    t.equal((ts = timeless.toTimestamp(str)), toTimestamp[str], 'converted '+str+' into '+ts+' milliseconds ('+new Date(ts).toUTCString()+'), expected '+toTimestamp[str]+' ('+new Date(toTimestamp[str]).toUTCString()+')');
  });
});

// timeless.getBaseDateTime
test('getBaseDateTime', function test_timeless_getBaseDateTime(t)
{
  var timeStrings = Object.keys(getBaseDateTime);

  // planning to have 1 test per file
  t.plan(timeStrings.length);

  timeStrings.forEach(function(time)
  {
    var baseTime;
    t.equal((baseTime = timeless.getBaseDateTime(time)), getBaseDateTime[time], 'From '+time+' ('+new Date(+time).toUTCString()+') got base time '+baseTime+' ('+new Date(+baseTime).toUTCString()+'), expected '+getBaseDateTime[time]+' ('+new Date(+getBaseDateTime[time]).toUTCString()+')');
  });
});

// timeless.padLeft
test('padLeft', function test_timeless_padLeft(t)
{
  var digitStrings = Object.keys(padLeft);

  // planning to have 1 test per file
  t.plan(digitStrings.length);

  digitStrings.forEach(function(digit)
  {
    var padded;
    t.equal((padded = timeless.padLeft(digit)), padLeft[digit], 'Padded '+digit+' to '+padded);
  });
});
