var ret = '';
const fs = require('fs');
var data = fs.readFileSync('./input.txt').toString().split('\n');
if(data[data.length-1]==''){data.pop();}

var h=6;
var l=25;
var pixperlayer = h*l;
var layers = data[0].length/pixperlayer
const black=' ';
const white='█';

for(k=0;k<h;k++){
    for(j=0;j<l;j++){
        for(i=0;i<layers;i++){
            c=parseInt(data[0].substr(i*pixperlayer+k*l+j,1));
            if(c==0){
                ret+=black;
                break;
            } else if(c==1){
                ret+=white;
                break;
            }  
        }
    }
    ret+='\n';
}
console.log(ret);
