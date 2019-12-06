function countOrbits(obj){
    var retval=0, a;
    orbitchain.push(obj);
    if(centres[obj]!=undefined){
        retval += centres[obj].length*orbitchain.length;
        for(a=0;a<centres[obj].length;a++){
            retval += countOrbits(centres[obj][a])
        }
    }
    orbitchain.pop();
    return retval
}

const fs = require('fs');

var ret = 0;
// var data = fs.readFileSync('./inputsample.txt').toString().split('\n');
var data = fs.readFileSync('./input.txt').toString().split('\n');
if(data[data.length-1]==''){
    data.pop();
}

var centres = [];
var thisorbiter;
var thiscentre;
var orbitchain = [];

for(i=0;i<data.length;i++){
    thisorbiter = data[i].split(')')[1].replace('\s','');
    thiscentre = data[i].split(')')[0];
    if(centres[thiscentre]==undefined){centres[thiscentre]=[thisorbiter];}else{(centres[thiscentre].push(thisorbiter));}
}

ret = countOrbits('COM');

console.log(ret);

