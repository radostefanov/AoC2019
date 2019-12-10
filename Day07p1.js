function intCode(iCip,file){
    var ret;
    const fs = require('fs');
    var data = fs.readFileSync(file).toString().split('\n');
    if(data[data.length-1]==''){data.pop();}
    
    var ip1, ip2, ip3, op;
    var p=[];
    
    p = data[0].split(',').map(Number);
    
    var inc=4;
    var pmode1,pmode2,pmode3;
    var inst, opc, ipcount=0;
            
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
                op=iCip[ipcount];
                ipcount++;
                inc=2;
                break;
            case 4:
                console.log('OUTPUT: p'+i+': '+ip1);
                ret=ip1;
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
    
    return ret;
}

var input=[0,0,0,0,0];
var i1,i2,i3,i4,i5;
var ipseq=0, ipvalid, seqb5;
var output, highoutput=0

while(ipseq<2931){
    //console.log(ipseq);
    output=0;
    ipvalid=false;
    while(!ipvalid&&ipseq<2931){
         //convert ipseq to base 5
        seqb5=parseInt(ipseq,10).toString(5);
        i1=Math.trunc(seqb5%100000/10000);
        i2=Math.trunc(seqb5%10000/1000);
        i3=Math.trunc(seqb5%1000/100);
        i4=Math.trunc(seqb5%100/10);
        i5=seqb5%10;
        if(i1!=i2&&i1!=i3&&i1!=i4&&i1!=i5&&i2!=i3&&i2!=i4&&i2!=i5&&i3!=i4&&i3!=i5&&i4!=i5){
            input=[i1,i2,i3,i4,i5];
            ipvalid=true;
        }
        ipseq++;
    }
    console.log('\nINPUT: '+input);
    for(a=0;a<5;a++){
        output=intCode([input[a],output], './input.txt');
    }
    if(output>highoutput){highoutput=output;}  
}

ret=highoutput

console.log('\nHighest output: '+ret);