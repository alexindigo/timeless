// loader boilderplate
!function(name, definition){
  if (typeof module != 'undefined') module.exports = definition();
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
  else this[name] = definition();
}('timeless', function()
{
  // actual thing goes below

  var timeless
    , twelveHours     = 12*60*60*1000
    , twentyFourHours = twelveHours * 2
    ;

  timeless =
  {
    // Converts time string (hh:mm:ss.sss) to number of milliseconds
    toMilliseconds: function timeless_toMilliseconds(str)
    {
      str = +(''+str).replace(/^\s*(\d{1,2}(?:am|pm)?)(?::(\d{1,2})(?::(\d{1,2})(?:\.(\d+))?)?)?\s*$/i, parseToMilliseconds);

      return str ? Math.floor(str) : 0;
    },

    // Converts date[time] string into timestamp in milliseconds (UTC)
    // Note: In order to always return positive number of milliseconds
    //       two digit year number less than 70 treated as belonging to 21 century
    toTimestamp: function timeless_toTimestamp(str)
    {
      str = +(''+str).replace(/^\s*(\d{1,2})\/(\d{1,2})\/((?:\d{2})?\d{2})(?:\s+(\d{1,2}:\d{1,2}(?::\d{1,2}(?:\.\d+)?)?)(?:\s+(AM|PM))?)?\s*$/i, parseToTimestamp);

      return str ? str : 0;
    },

    // Returns midnight time of the specified date
    getBaseDateTime: function timeless_getBaseDateTime(time)
    {
      // Assume it's UTC
      return (time - (time % twentyFourHours));
    },

    // Fills empty digit places with 0s
    padLeft: function timeless_padLeft(number, length, fill)
    {
      var str = ''+number;

      // defaults
      length = length || 2;
      fill   = fill || '0';

      while (str.length < length)
      {
        str = fill + str;
      }

      return str;
    }
  }

  /**
   * Parser procedures
   */

  // Parser for toTimestamp method
  function parseToTimestamp(match, m, d, y, time, meridiem)
  {
    var timestamp = Date.UTC((y.length == 4 ? y : ((+y < 70) ? +y+2000 : +y+1900)), m-1, d);

    if (time)
    {
      time = timeless.toMilliseconds(time);

      // 12:xxAM -> 00:xx
      if (time >= twelveHours)
      {
        time -= twelveHours;
      }

      timestamp += time;
    }

    if (meridiem && meridiem.toLowerCase() == 'pm')
    {
      timestamp += twelveHours;
    }

    return timestamp;
  }

  // Parser for toMilliseconds method
  function parseToMilliseconds(match, h, m, s, ms)
  {
    // check for PM suffix
    h = h.replace(/^(\d{1,2})(am|pm)$/i, parseMeridiem);

    return (ms||0)*Math.pow(10, 3-(ms?ms.length:0)) + (s||0)*1000 + (m||0)*60*1000 + h*60*60*1000;
  }

  // Helper meridiem parser for toMilliseconds method
  function parseMeridiem(match, h, meridiem)
  {
    if (h < 12 && meridiem.toLowerCase() == 'pm')
    {
      return (+h + 12);
    }

    return h;
  }

  // done

  return timeless;
});
