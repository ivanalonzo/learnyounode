var t = new Date(Date.now());
var month = 1 + t.getMonth();
var formattedDate = t.getFullYear() + "-" + month + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes();
//t = t.now();

console.log(t);
console.log(formattedDate);
// console.log(t.toDateString());
//
//
// var d = new Date(1993, 6, 28, 14, 39, 7);
//
// console.log(d.toString());     // logs Wed Jul 28 1993 14:39:07 GMT-0600 (PDT)
// console.log(d.toDateString()); // logs Wed Jul 28 1993
