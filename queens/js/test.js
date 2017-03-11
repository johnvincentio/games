
console.log("start test.js");

var l1 = document.createElement("li");
var l2 = document.createElement("li");
var l3 = document.createElement("li");

var n1 = document.createTextNode("A1");
var n2 = document.createTextNode("A2");
var n3 = document.createTextNode("A3");

l1.appendChild(n1);
l2.appendChild(n2);
l3.appendChild(n3);

var solutions = document.querySelector('#solutions');
var element = solutions.firstElementChild;

element.appendChild(l1);
element.appendChild(l2);
element.appendChild(l3);
