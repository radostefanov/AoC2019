const fs = require('fs');

var ret = 0;
var data = fs.readFileSync('./input.txt').toString().split('\n');
if(data[data.length-1]==''){
    data.pop();
}

var mass;
var totfuel = 0;

for(i=0;i<data.length;i++){
    mass=parseInt(data[i]);
    totfuel+=Math.trunc(mass/3)-2;
}

ret = totfuel;

console.log(ret);

