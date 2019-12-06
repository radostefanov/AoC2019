function scanOrbits(obj, from, to){
    var a;
    orbitchain.push(obj);
    if(centres[obj]!=undefined){
        for(a=0;a<centres[obj].length;a++){
            if(centres[obj][a]==from||centres[obj][a]==to){commonorbits.push(orbitchain.slice());}
            scanOrbits(centres[obj][a],from,to);
        }
    }
    orbitchain.pop();
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
var commonorbits = [];

for(i=0;i<data.length;i++){
    thisorbiter = data[i].split(')')[1].replace('\s','');
    thiscentre = data[i].split(')')[0];
    if(centres[thiscentre]==undefined){centres[thiscentre]=[thisorbiter];}else{(centres[thiscentre].push(thisorbiter));}
}

scanOrbits('COM','SAN','YOU');

//look for common parent
for(i=commonorbits[0].length-1;i>=0;i--){
    for(j=commonorbits[1].length-1;j>=0;j--){
        if(commonorbits[0][i]==commonorbits[1][j]){
            ret = (commonorbits[0].length-1-i)+(commonorbits[1].length-1-j);
            break;
        }
    }
    if(ret!=0){break;}
}

console.log(ret);

