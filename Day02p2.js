var ret = 0;
const fs = require('fs');
var data = fs.readFileSync('./input.txt').toString().split('\n');
if(data[data.length-1]==''){data.pop();}

var ip1pos, ip2pos, oppos;
var ip1, ip2, op;
var p=[];
var goalseek = 19690720;

for(j=0;j<100;j++){
    for(k=0;k<100;k++){
        p = data[0].split(',').map(Number);
        p[1]=j;
        p[2]=k;
                
        for(i=0;i<p.length;i+=4){
            ip1pos = p[i+1];
            ip2pos = p[i+2];
            oppos = p[i+3];
        
            ip1 = p[ip1pos];
            ip2 = p[ip2pos];
            
            if(p[i]==1){op=ip1+ip2;} else if(p[i]==2){op=ip1*ip2;} else if(p[i]==99){break;} else {console.log("ERROR");}
            p[oppos]=op;
        }
        if(op==goalseek){break};
    }
    if(op==goalseek){break};
}

ret = 100*j+k;

console.log(ret);

