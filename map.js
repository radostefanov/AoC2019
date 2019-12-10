module.exports = {
    Map: class {
        constructor(textmap, filler){
            var i,j;
            var x=0, y=0;
            this.xlen = 0;
            this.ylen = 1;
            this.pos = [];
            this.pos[y] = [];
            for(i=0;i<=textmap.length;i++){
                if(i==textmap.length){
                    if(x>this.xlen){this.xlen=x;}
                } else if(textmap.substr(i,1)=='\n'){
                    if(x>this.xlen){this.xlen=x;}
                    x=0;
                    y++;
                    this.pos[y]=[];
                    this.ylen++;
                } else { 
                    x++;
                    this.pos[y].push(textmap.substr(i,1));
                }
            }
            if(filler==null){this.defch=' ';} else {this.defch = filler;}
            for(i=0;i<this.pos.length;i++){
                for(j=this.pos[i].length;j<this.xlen;j++){
                    this.pos[i].push(this.defch);
                }
            }
        }

        GetPos(x,y){
            return this.pos[y][x];
        }
        
        Draw(){
            var i;
            var row = '';
            for(i=0;i<this.pos.length;i++){
                row = this.pos[i].join('');
                console.log(row);
            }
        }

        NewRow(ix,filler){
            this.pos.splice(ix,0,[]);
            var i;
            if(filler==null){filler=this.defch;}
            for(i=0;i<this.xlen;i++){this.pos[ix].push(filler);}
            this.ylen++;
        }

        NewCol(ix,filler){
            var i;
            if(filler==null){filler=this.defch;}
            for(i=0;i<this.pos.length;i++){this.pos[i].splice(ix,0,filler);}
            this.xlen++;
        }
    },

    Manhattan: function(x1,y1,x2,y2){
        retval=0;
        retval = Math.abs(x1-x2) + Math.abs(y1-y2);
        return retval;
    },

    Manhattan3D: function(x1,y1,z1,x2,y2,z2){
        retval=0;
        retval = Math.abs(x1-x2) + Math.abs(y1-y2) + Math.abs(z1-z2);
        return retval;
    },
    
    Manhattan4D: function(x1,y1,z1,t1,x2,y2,z2,t2){
        retval=0;
        retval = Math.abs(x1-x2) + Math.abs(y1-y2) + Math.abs(z1-z2) + Math.abs(t1-t2);
        return retval;
    }

}

