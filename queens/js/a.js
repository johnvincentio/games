
var str = "(1,1)(2,5)(3,8)(4,6)(5,3)(6,7)(7,2)(8,4)";

var text = str.replace(/[(]/g,"");
console.log("text :"+text+":");
console.log("text.length "+text.length);

var moves = text.split(")");
console.log("moves :"+moves+":");
console.log("moves.length "+moves.length);

for (var i = 0; i < moves.length; i++) {
    var parts = moves[i].split(",");
    console.log("parts[0] "+parts[0]+" parts[1] "+parts[1]);
}
