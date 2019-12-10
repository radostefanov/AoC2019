class intCode{
    constructor(filename){
        var data = fs.readFileSync(filename).toString().split('\n');
        if(data[data.length-1]==''){data.pop();}
        this.p = data[0].split(',').map(Number);
        this.instruction=0;
        this.done=false;
    }

    run(rin){
        var ip1, ip2, ip3, op, oppos;
        var i, inc=4;
        var pmode1,pmode2,pmode3;
        var inst, opc, ipcount=0;
        var rout;
        var p=this.p;
                
        for(i=this.instruction;i<this.p.length;i+=inc){
        
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
                    op=rin[ipcount];
                    ipcount++;
                    inc=2;
                    break;
                case 4:
                    rout=ip1;
                    console.log('OUTPUT: p'+i+': '+rout);
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
            if(opc==99){this.done=true;}
            if(opc==99||rout!=undefined){break;}
        }
        this.instruction=i+=inc;
        return rout;
    }
}

const fs = require('fs');

var input=[5,5,5,5,5];
var i1,i2,i3,i4,i5;
var ipseq=0, ipvalid, seqb5;
var output, lastoutput, highoutput=0
var amp=[];

while(ipseq<2931){
    amp=[];
    console.log(ipseq);
    output=0;
    lastoutput=0;
    ipvalid=false;
    while(!ipvalid&&ipseq<2931){
         //convert ipseq to base 5
        seqb5=parseInt(ipseq,10).toString(5);
        i1=Math.trunc(seqb5%100000/10000)+5;
        i2=Math.trunc(seqb5%10000/1000)+5;
        i3=Math.trunc(seqb5%1000/100)+5;
        i4=Math.trunc(seqb5%100/10)+5;
        i5=seqb5%10+5;
        if(i1!=i2&&i1!=i3&&i1!=i4&&i1!=i5&&i2!=i3&&i2!=i4&&i2!=i5&&i3!=i4&&i3!=i5&&i4!=i5){
            input=[i1,i2,i3,i4,i5];
            ipvalid=true;
        }
        ipseq++;
    }
    console.log('\nINPUT: '+input);

    //initiate 5 amplifiers
    for(a=0;a<5;a++){
        amp[a] = new intCode('./input.txt');
        output = amp[a].run([input[a],output]);
    }

    //run 5 amplifiers sequentially until E is done
    while(!amp[4].done){
        for(a=0;a<5;a++){
            lastoutput=output;
            output = amp[a].run([output]);
            if(output==undefined){output=lastoutput;}
        }
    }

    if(output>highoutput){highoutput=output;}  
}

console.log('\nHighest output: '+highoutput);