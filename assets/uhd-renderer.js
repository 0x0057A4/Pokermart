/* Native furniture art and display-resolution rendering. Simulation coordinates stay in fine-grid.js. */
const UHD_FURNITURE_CROPS={
 shelf:[[44,59,324,256],[449,34,103,280],[669,58,321,256],[1073,34,103,280]],
 cold:[[61,349,288,327],[438,347,142,326],[685,350,289,321],[1056,348,140,324]],
 frozen:[[28,657,520,246],[581,589,178,376],[795,657,505,245],[1330,589,171,377]]
};
const UHD_STAFF_CROPS={down:[94,20,290,537],up:[459,20,278,537],left:[777,20,314,537],right:[1160,20,316,537]};
const uhdFrames=new Map();let uhdAtlas=null,uhdCharacterAtlas=null,uhdReady=false,uhdCharactersReady=false,uhdPrevious=null;
function uhdPixelRatio(r){
 const width=r.width||1250,height=r.height||800;
 // Native 4K backing surfaces without allocating oversized 8K canvases on Retina displays.
 return Math.min(4,Math.max(1,window.devicePixelRatio||1),4096/width,4096/height,Math.sqrt(8388608/(width*height)));
}
function uhdFurnitureFrame(kind,rot=0){
 const key=kind+':'+rot;if(uhdFrames.has(key))return uhdFrames.get(key);
 const crop=UHD_FURNITURE_CROPS[kind][rot],c=gbaCanvas(crop[2],crop[3]),g=c.getContext('2d');
 g.drawImage(kind==='frozen'?uhdCharacterAtlas:uhdAtlas,...crop,0,0,c.width,c.height);
 if(kind==='frozen')hdRemoveBackground(c,true);
 uhdFrames.set(key,c);return c;
}
function uhdFixtureGeometry(f){
 if(!uhdReady||!UHD_FURNITURE_CROPS[f.kind]||(f.kind==='frozen'&&!uhdCharactersReady))return uhdPrevious.geometry(f);
 const r=fixtureFootprint(f),rot=f.rot||0,crop=UHD_FURNITURE_CROPS[f.kind][rot];
 const front=UHD_FURNITURE_CROPS[f.kind][0],frontHeight=(T-3)*front[3]/front[2];
 let width=T-3,height=width*crop[3]/crop[2];
 if(rot%2){height=frontHeight+T*.5;width=height*crop[2]/crop[3];if(width>r.w*T-2){width=r.w*T-2;height=width*crop[3]/crop[2];}}
 if(f.kind==='frozen'&&rot%2){height=T-4;width=height*crop[2]/crop[3];}
 return{left:OX+r.x*T+(r.w*T-width)/2,top:OY+(r.y+r.h)*T-height-1,width,height};
}
function uhdSample(image,x,y,w,h){
 // Native artwork is sampled directly at the screen scale, never through a tiny intermediate sprite.
 const scale=Math.abs(ctx.getTransform?.()?.a||camera.scale||1);
 ctx.save();ctx.imageSmoothingEnabled=w*scale<image.width||h*scale<image.height;
 ctx.imageSmoothingQuality='high';ctx.drawImage(image,x,y,w,h);ctx.restore();
}
function uhdFixture(f,labels=true){
 if(!uhdReady||!UHD_FURNITURE_CROPS[f.kind]||f.warehouseKey||(f.kind==='frozen'&&!uhdCharactersReady))return uhdPrevious.fixture(f,labels);
 const rot=f.rot||0,frame=uhdFurnitureFrame(f.kind,rot),{left,top,width,height}=uhdFixtureGeometry(f),r=fixtureFootprint(f);
 uhdSample(frame,left,top,width,height);
 if(!rot){
  const qty=Math.max(0,Number(f.qty)||0),capacity=furnitureCapacity(f),limit=f.kind==='frozen'?8:15;
  const count=Math.min(qty,limit,Math.ceil(Math.min(1,qty/capacity)*limit));
  const bays=f.kind==='shelf'?[[.105,.20,.79,.19],[.105,.44,.79,.19],[.105,.69,.79,.17]]:f.kind==='cold'?[[.10,.24,.33,.52],[.57,.24,.32,.52]]:[[.075,.09,.40,.28],[.54,.09,.40,.28]];
  const rows=f.kind==='shelf'?3:f.kind==='cold'?3:2,cols=f.kind==='shelf'?5:3;
  ctx.save();ctx.beginPath();for(const [x,y,w,h]of bays)ctx.rect(left+x*width,top+y*height,w*width,h*height);ctx.clip();
  for(let i=0;i<count;i++){
   const row=i%rows,col=Math.floor(i/rows),bay=f.kind==='shelf'?bays[row]:bays[col%2],localCol=f.kind==='shelf'?col:Math.floor(col/2);
   const [bx,by,bw,bh]=bay,slotH=f.kind==='shelf'?bh:bh/rows;
   drawProduct(f.pid,left+(bx+localCol*bw/cols)*width,top+(by+(f.kind==='shelf'?0:row*slotH))*height,bw/cols*width,slotH*height);
  }ctx.restore();
  if(f.kind!=='shelf'&&count){ctx.save();ctx.globalAlpha*=.23;uhdSample(frame,left,top,width,height);ctx.restore();}
 }
 if(labels&&FURN[f.kind]?.type&&furnitureDistance(S.player,f)<1.1){const x=OX+f.x*T,y=OY+(f.y+r.h)*T;rect(x+7,y+1,T-14,9,'#f8f4e7');textAt(f.qty+'/'+furnitureCapacity(f),x+T/2,y+8,'#20364e',7);}
 if(editing()){const p=merchandiseFront(f);rect(OX+(p.x+.5)*T-2,OY+(p.y+.7)*T-2,4,4,PX.gold);}
}
function uhdFloor(x,y){
 const storage=inRect(Math.floor((x-OX)/T),Math.floor((y-OY)/T),layout().store),size=T/2;
 for(let yy=0;yy<2;yy++)for(let xx=0;xx<2;xx++){
  const px=x+xx*size,py=y+yy*size,alt=(Math.round((px-OX)/size)+Math.round((py-OY)/size))%2;
  rect(px,py,size+.2,size+.2,storage?(alt?'#abb8c2':'#b5c1ca'):(alt?'#e5d5b7':'#eee2ca'));
  rect(px,py,size,.45,storage?'#c8d1d5':'#f7ecd7');rect(px,py,.45,size,storage?'#a0acb6':'#dbcaaa');
 }
}
function uhdPersonFrame(look,dir,step=0,role='customer'){
 if(!gbaReady)return uhdPrevious.personFrame(look,dir,step,role);
 const row=role==='player'?0:role==='staff'?1:2+(((look||0)%6+6)%6),variant=role==='customer'?Math.floor((look||0)/6)%5:0,key=['person',row,variant,dir,step].join(':');
 if(uhdFrames.has(key))return uhdFrames.get(key);
 const index=(role==='player'?1:row)*4+({down:0,up:1,left:2,right:3}[dir]||0),crop=GBA_PEOPLE_BOUNDS[index];
 const base=gbaCrop(gbaImages.people,crop,crop[2],crop[3]),g=base.getContext('2d');
 if(variant){const data=g.getImageData(0,0,base.width,base.height);if(data?.data){const d=data.data,palettes=[[91,144,185],[154,110,172],[196,136,72],[97,159,131],[196,104,123]],t=palettes[variant];
  for(let y=Math.floor(base.height*34/64);y<Math.floor(base.height*50/64);y++)for(let x=2;x<base.width-2;x++){const i=(y*base.width+x)*4,r=d[i],green=d[i+1],b=d[i+2],max=Math.max(r,green,b),min=Math.min(r,green,b);if(d[i+3]&&max>80&&max-min>18&&!(r>green*1.2&&green>b*1.1)){const k=max/220;d[i]=t[0]*k;d[i+1]=t[1]*k;d[i+2]=t[2]*k;}}
  g.putImageData(data,0,0);}
 }
 const c=gbaCanvas(156,204),p=c.getContext('2d'),left=Math.floor((c.width-base.width)/2),top=192-base.height,split=Math.round(base.height*50/64),stride=[0,6,0,-6][step%4],half=Math.floor(base.width/2),leg=base.height-split;
 p.drawImage(base,0,0,base.width,split,left,top,base.width,split);
 p.drawImage(base,0,split,half,leg,left,top+split+Math.max(0,stride),half,leg);
 p.drawImage(base,half,split,base.width-half,leg,left+half,top+split+Math.max(0,-stride),base.width-half,leg);
 uhdFrames.set(key,c);return c;
}
function uhdStaffFrame(dir,step){
 const key='staff:'+dir+':'+step;if(uhdFrames.has(key))return uhdFrames.get(key);
 const crop=UHD_STAFF_CROPS[dir]||UHD_STAFF_CROPS.down,base=gbaCanvas(crop[2],crop[3]);base.getContext('2d').drawImage(uhdCharacterAtlas,...crop,0,0,base.width,base.height);hdRemoveBackground(base,true);
 const c=gbaCanvas(400,560),g=c.getContext('2d'),left=Math.floor((c.width-base.width)/2),top=10,split=425,half=Math.floor(base.width/2),leg=base.height-split,stride=[0,12,0,-12][step%4];
 g.drawImage(base,0,0,base.width,split,left,top,base.width,split);
 g.drawImage(base,0,split,half,leg,left,top+split+Math.max(0,stride),half,leg);
 g.drawImage(base,half,split,base.width-half,leg,left+half,top+split+Math.max(0,-stride),base.width-half,leg);uhdFrames.set(key,c);return c;
}
function uhdStaff(p,look,player=false){
 if(!uhdCharactersReady)return uhdPrevious.staff(p,look,player);
 const x=OX+p.x*T,y=OY+p.y*T,a=pose(p),step=a.moving?Math.floor(a.phase/(Math.PI/2))%4:0;
 rect(x+14,y+35,19,3,'#70857938');uhdSample(uhdStaffFrame(a.dir,step),x+5,y-8-(a.moving?step%2:0),36,45);
 if(player){rect(x+21,y-14,5,2,'#db9c43');rect(x+22,y-12,3,2,'#db9c43');}
 actionVisual(p,a,x,y);if(player&&S.broomHeld)drawBroom(x+35,y+20,true);
}
function installUhdRenderer(){
 uhdPrevious={fixture:hdFixture,geometry:hdFixtureGeometry,personFrame:gbaPersonFrame,staff:hdPerson,person};
 hdFixture=uhdFixture;hdFixtureGeometry=uhdFixtureGeometry;hdPerson=uhdStaff;
 gbaPersonFrame=uhdPersonFrame;drawAtlasFloor=uhdFloor;
 person=function(...args){ctx.save();ctx.imageSmoothingEnabled=Math.abs(camera.scale||1)<4.8;ctx.imageSmoothingQuality='high';uhdPrevious.person(...args);ctx.restore();};
 uhdAtlas=new Image();uhdAtlas.onload=()=>{uhdReady=uhdAtlas.width===1254&&uhdAtlas.height===1254;};uhdAtlas.onerror=()=>console.warn('Neue Möbelgrafik konnte nicht geladen werden; Originalgrafik bleibt aktiv.');uhdAtlas.src='assets/uhd-furniture.png?v=3.15';
 uhdCharacterAtlas=new Image();uhdCharacterAtlas.onload=()=>{uhdCharactersReady=uhdCharacterAtlas.width===1536&&uhdCharacterAtlas.height===1024;};uhdCharacterAtlas.onerror=()=>console.warn('Neue Figuren konnten nicht geladen werden; Originalgrafik bleibt aktiv.');uhdCharacterAtlas.src='assets/uhd-characters.png?v=3.15';
}
