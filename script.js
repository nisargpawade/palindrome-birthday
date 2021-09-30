function reverseStringGenerator(string) {
  var stringArray = string.split("");
  var reverseStringArray = stringArray.reverse();
  var reverseString = reverseStringArray.join("");
  return reverseString;
}

function checkPalindrome(string) {
  if (string === reverseStringGenerator(string)) {
    return true;
  } else {
    return false;
  }
}

function numToStrConverter(date) {
  var strDate = { day: "", month: "", year: "" };
  if (date.day < 10) {
    strDate.day = "0" + date.day;
  } else {
    strDate.day = date.day.toString();
  }
  if (date.month < 10) {
    strDate.month = "0" + date.month;
  } else {
    strDate.month = date.month.toString();
  }
  strDate.year = date.year.toString();
  return strDate;
}

function dateFormats(date) {
  var strDate = numToStrConverter(date);
  var ddmmyyyy = strDate.day + strDate.month + strDate.year;
  var mmddyyyy = strDate.month + strDate.day + strDate.year;
  var yyyymmdd = strDate.year + strDate.month + strDate.day;
  var ddmmyy = strDate.day + strDate.month + strDate.year.slice(-2);
  var mmddyy = strDate.month + strDate.day + strDate.year.slice(-2);
  var yymmdd = strDate.year.slice(-2) + strDate.month + strDate.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeAllFormats(date) {
  var listOfFormats = dateFormats(date);
  var output = false;
  for (let i = 0; i < listOfFormats.length; i++) {
    if (checkPalindrome(listOfFormats[i])) {
      output = true;
      break;
    }
  }
  return output;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function generateNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  var daysInMonth = [30, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function nextPalindromeDate(date) {
  var counter = 0;
  var nextDate = generateNextDate(date);
  while (1) {
    counter++;
    if (checkPalindromeAllFormats(nextDate)) {
      break;
    }
    nextDate = generateNextDate(nextDate);
  }
  return [ counter, nextDate ];
}

// var date = { day: 2, month: 12, year: 2021 };

const inputDate = document.querySelector("#input-date");
const btnCheck = document.querySelector("#btn-check");
const outputEle = document.querySelector("#output-element");

function clickHandler() {
  var inputValue = inputDate.value;
  if (inputValue !== "") {
    var dateList = inputDate.value.split("-");
    var date = {
      day: Number(dateList[2]),
      month: Number(dateList[1]),
      year: Number(dateList[0])
    };
    var mainPalindromeFun = checkPalindromeAllFormats(date)
    if(mainPalindromeFun){
        outputEle.innerText= "Yes! Your birthday is a Palindrome!!🥳"
    }
    else {
        var [counter, nextDate]= nextPalindromeDate(date);
        outputEle.innerText= `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter} days!`
    }
  }
}
btnCheck.addEventListener("click", clickHandler);
