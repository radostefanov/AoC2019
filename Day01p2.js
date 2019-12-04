function addFuel(m){
    var retval=0;
    retval = Math.trunc(m/3)-2;
    if(retval>0){
        retval+=addFuel(retval);
    } else {retval=0;}
    return retval;
}

var ret = 0;
const fs = require('fs');
var data = fs.readFileSync('./input.txt').toString().split('\n');
if(data[data.length-1]==''){data.pop();}

var mass;
var totfuel = 0;

for(i=0;i<data.length;i++){
    mass=parseInt(data[i]);
    totfuel+=addFuel(mass);
}

ret = totfuel;

console.log(ret);

