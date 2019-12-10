var ret = 0;
const fs = require('fs');
var data = fs.readFileSync('./input.txt').toString().split('\n');
if(data[data.length-1]==''){data.pop();}

var h=25
var l=6
var pix = h*l;
var min0=pix, layer012=[], c;

for(i=0;i<data[0].length/pix;i++){
    layer012=[0,0,0];
    for(j=0;j<pix;j++){
        c=parseInt(data[0].substr(i*150+j,1));
        if(c==0){layer012[0]++;}else if(c==1){layer012[1]++;}else if(c==2){layer012[2]++;}
    }
    if(layer012[0]<min0){
        ret=layer012[1]*layer012[2];
        min0=layer012[0];
        min0layer=i;
    }
}

console.log(ret);

