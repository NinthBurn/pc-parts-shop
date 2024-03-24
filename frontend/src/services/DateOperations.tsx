
/*
https://stackoverflow.com/questions/5619202/parsing-a-string-to-a-date-in-javascript
thanks Kaseem
*/
export function stringToDate(_date: string, _format: string, _delimiter: string) {
  var formatLowerCase = _format.toLowerCase();
  var formatItems = formatLowerCase.split(_delimiter);
  var dateItems = _date.split(_delimiter);
  var monthIndex = formatItems.indexOf("mm");
  var dayIndex = formatItems.indexOf("dd");
  var yearIndex = formatItems.indexOf("yyyy");
  var month = parseInt(dateItems[monthIndex]);
  month -= 1;
  var formatedDate = new Date(parseInt(dateItems[yearIndex]), month, parseInt(dateItems[dayIndex]));
  return formatedDate;
}

export function dateToString(_date: Date){
    return _date.toLocaleDateString("en-GB")
}