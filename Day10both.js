class Asteroid{
    constructor(x,y,ang,dist){
        this.x=x;
        this.y=y;
        this.angle=ang;
        this.distance=dist;
    }
}

function losangle(x1,y1,x2,y2){
    var retval;
   
    var angle;
    //offset
    x2-=x1;
    y2-=y1;
    x1=0;
    y1=0;

    angle=Math.atan(x2/y2)
    if(y2<0){
        if(x2>=0){angle=-angle;}else{angle=2*Math.PI-angle;}
    } else {angle=Math.PI-angle;}
    retval=angle;

    return retval
}

const fs = require('fs');
const maputil = require('./map.js');

var data = fs.readFileSync('input.txt').toString();
// var data = fs.readFileSync('inputsample2.txt').toString();
var map = new maputil.Map(data);
var blockedangles = [], myasteroids=[], myangle, myvisible;
var maxasteroids = [], maxvisible=0;
var killcount=0, lastkillx, lastkilly, lastkillangle, killix=0, killseek=200;
// map.Draw();

for(a=0;a<map.ylen;a++){
    for(b=0;b<map.xlen;b++){
        if(map.GetPos(b,a)=='#'){ //position has an asteriod
            //loop through again and look for visible asteriods
            myvisible=0;
            blockedangles=[];
            myasteroids=[];
            for(c=0;c<map.ylen;c++){
                for(d=0;d<map.xlen;d++){
                    if(d==b&&a==c){continue;}
                    if(map.GetPos(d,c)=='#'){
                        myangle = Math.round(losangle(b,a,d,c)*100000)/100000;
                        myasteroids.push(new Asteroid(d,c,myangle,maputil.Manhattan(b,a,d,c)));
                        if(!blockedangles.includes(myangle)){
                            blockedangles.push(myangle);
                            myvisible++;
                        }
                    }
                }
            }
            if(myvisible>maxvisible){
                maxvisible=myvisible;
                maxasteroids=myasteroids.slice();
                // console.log('Max visible updated to ' + maxvisible + ' at (x,y)='+b+','+a);
            }           
        }
    }
}
console.log('Part 1: '+maxvisible);

maxasteroids.sort(function(a,b){return 1000000*(a.angle-b.angle)+a.distance-b.distance;});

while(maxasteroids.length>0&&killcount<killseek){
    while(maxasteroids[0].angle!=maxasteroids[maxasteroids.length-1].angle&&lastkillangle==maxasteroids[killix].angle){
        killix++;
        if(killix>=maxasteroids.length){killix=0;}
    }
    lastkillx=maxasteroids[killix].x;
    lastkilly=maxasteroids[killix].y;
    lastkillangle=maxasteroids[killix].angle;
    maxasteroids.splice(killix,1);
    killcount++;
}

console.log('Part 2: '+(100*lastkillx+lastkilly).toString());