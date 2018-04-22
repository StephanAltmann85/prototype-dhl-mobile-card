module.exports = { 
  getBarCode: function (postNr) {
    return calculateBarcode(postNr);
  }
}

function getLuhnDigit(number) {
  var lastIndex = number.toString().length - 1 ;
  var isOdd = true;  
  var sum = 0;
  var curChar = '0';
  var addValue = 0;
  var multipliedDigit = 0;
  
  number += "";
  
  for (var n = lastIndex; n>=0; n--) {    
    curChar = number.charAt(n);     
    
    if (isOdd) {
      multipliedDigit = curChar * 2;
      
      if (multipliedDigit > 9) {
        addValue = multipliedDigit - 9;
      } else {
        addValue = multipliedDigit;
      }      
    } else {
      addValue = curChar;
    }        
    isOdd = !isOdd;
    sum += parseInt(addValue);
  }    
  return ((10 - (sum % 10)) % 10);
}

function calculateBarcode(number) {
  var baseNr = number * 631;
  var baseCode = "" + baseNr + getLuhnDigit(baseNr);
  var barCode;

  while (baseCode.length < 15) baseCode = "0" + baseCode ;

  barCode = "3" + baseCode;

  return barCode;
}
