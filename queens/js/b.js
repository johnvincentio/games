
var str1 = "(1,1)-(2,5)-(3,8)-(4,6)-(5,3)-(6,7)-(7,2)-(8,4)";

var str2 = str1.split("-");
console.log("str2 :"+str2+":");
console.log("str2.length "+str2.length);


//console.log("text :"+text+":");
//console.log("text.length "+text.length);

for (var i = 0; i < str2.length; i++) {
    var str3 = str2[i];
    console.log("str3 :"+str3+":");
    var str4 = str3.replace(/[()]/g,"");
    console.log("str4 :"+str4+":");
    console.log("str4.length "+str4.length);

    var str5 = str4.split(",");
    console.log("str5 :"+str5+":");
    console.log("str5.length "+str5.length);



//    console.log("parts[0] "+parts[0]+" parts[1] "+parts[1]);
    break;
}
