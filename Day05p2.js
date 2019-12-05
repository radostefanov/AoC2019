var ret = 0;
const fs = require('fs');
var data = fs.readFileSync('./input.txt').toString().split('\n');
if(data[data.length-1]==''){data.pop();}

var ip1, ip2, ip3, op;
var p=[];

p = data[0].split(',').map(Number);

var inc=4;
var pmode1,pmode2,pmode3;
var inst, opc, input=5;
        
for(i=0;i<p.length;i+=inc){

    inst = p[i];
    opc=inst%100;
    pmode1 = (inst-opc)%1000/100;
    pmode2 = (inst-pmode1*100-opc)%10000/1000;
    pmode3 = (inst-pmode2*1000-pmode1*100-opc)%100000/10000;

    if(pmode1==0){ip1=p[p[i+1]]}else{ip1=p[i+1]};
    if(pmode2==0){ip2=p[p[i+2]]}else{ip2=p[i+2]};
    if(pmode3==0){ip3=p[p[i+3]]}else{ip3=p[i+3]};

    if(opc==1||opc==2||opc==7||opc==8){
        oppos = p[i+3];    
    } else if (opc==3){
        oppos = p[i+1];
    }

    // console.log('INPUT i='+i+': inst:'+inst+'; p[i+1]: '+p[i+1]+'; p[i+2]: '+p[i+2]+'; pmode1='+pmode1+'; pmode2='+pmode2);

    switch(opc){
        case 1:
            op=ip1+ip2;
            inc=4;
            break;
        case 2: 
            op=ip1*ip2;
            inc=4;
            break;
        case 3:
            op=input;
            inc=2;
            break;
        case 4:
            console.log('OUTPUT: p'+i+': '+ip1);
            inc=2;
            break; 
        case 5:
            if(ip1!=0){
                i=ip2;
                inc=0;
            } else {inc=3;}
            break; 
        case 6:
            if(ip1==0){
                i=ip2;
                inc=0;
            } else {inc=3;}
            break; 
        case 7:
            if(ip1<ip2){op=1;}else{op=0;}
            inc=4;
            break; 
        case 8:
            if(ip1==ip2){op=1;}else{op=0;}
            inc=4;
            break;   
    }
    
    if(opc==1||opc==2||opc==3||opc==7||opc==8){
        p[oppos]=op;
        // console.log('WRITING i='+i+': '+op+' to p['+oppos+']');
    }
    if(opc==99){break;}
}

ret = 'Done';

console.log(ret);