/* User's Gemini atlas, kept byte-for-byte at 1024 × 765.
 * Crops are cached at source resolution; only the final scene draw scales them.
 */
const HD_CROPS={shelf:[898,13,126,112],cold:[643,0,121,124],frozen:[516,50,122,77]};
const HD_SHELF_BAYS=[[7,29,112,24],[7,57,112,23],[7,83,112,24]];
const HD_SELLER_CROPS={down:[10,291,65,93],up:[95,291,65,93],left:[329,396,53,88],right:[329,396,53,88]};
const hdFrames=new Map();let hdAtlas=null,hdReady=false;

function hdRemoveBackground(canvas,white){
 const g=canvas.getContext('2d');if(typeof g.getImageData!=='function')return;
 const pixels=g.getImageData(0,0,canvas.width,canvas.height);if(!pixels?.data)return;
 const d=pixels.data,w=canvas.width,h=canvas.height,seen=new Uint8Array(w*h),queue=new Uint32Array(w*h);let head=0,tail=0;
 const add=i=>{if(seen[i])return;seen[i]=1;const p=i*4,r=d[p],g=d[p+1],b=d[p+2];if(d[p+3]===0||(white?Math.min(r,g,b)>=244:Math.max(r,g,b)<=8))queue[tail++]=i;};
 for(let x=0;x<w;x++){add(x);add((h-1)*w+x);}for(let y=0;y<h;y++){add(y*w);add(y*w+w-1);}
 while(head<tail){const i=queue[head++],x=i%w,y=Math.floor(i/w);d[i*4+3]=0;if(x)add(i-1);if(x<w-1)add(i+1);if(y)add(i-w);if(y<h-1)add(i+w);}
 g.putImageData(pixels,0,0);
}
function hdNativeCrop(key,crop,white=false){
 if(hdFrames.has(key))return hdFrames.get(key);
 const c=gbaCanvas(crop[2],crop[3]);c.getContext('2d').drawImage(hdAtlas,...crop,0,0,c.width,c.height);
 hdRemoveBackground(c,white);hdFrames.set(key,c);return c;
}
function hdFurnitureFrame(kind,rot=0){
 const key='fixture:'+kind+':'+rot;if(hdFrames.has(key))return hdFrames.get(key);
 const crop=HD_CROPS[kind],front=hdNativeCrop('original:'+kind,crop),c=gbaCanvas(front.width,front.height),g=c.getContext('2d');g.drawImage(front,0,0);
 if(kind==='shelf')for(const [x,y,w,h]of HD_SHELF_BAYS){g.fillStyle='#263749';g.fillRect(x,y,w,h);g.fillStyle='#1c2b3b';g.fillRect(x,y,w,2);}
 if(rot){
  // Closed side/back panels reuse unscaled native metal; never squash a front view.
  const side=rot%2,width=side?40:c.width,profile=gbaCanvas(width,c.height),p=profile.getContext('2d');
  p.fillStyle='#293c52';p.fillRect(0,0,width,c.height);p.fillStyle='#8193a5';p.fillRect(2,2,width-4,c.height-4);
  p.drawImage(c,0,0,7,c.height,0,0,7,c.height);p.drawImage(c,c.width-7,0,7,c.height,width-7,0,7,c.height);
  p.drawImage(c,7,0,Math.min(width-14,c.width-14),28,7,0,width-14,28);
  p.drawImage(c,7,c.height-6,Math.min(width-14,c.width-14),6,7,c.height-6,width-14,6);
  p.fillStyle='#6d8198';for(const y of[.40,.67])p.fillRect(7,Math.round(c.height*y),width-14,1);
  hdFrames.set(key,profile);return profile;
 }
 hdFrames.set(key,c);return c;
}
function hdFixture(f,labels=true){
 const rot=((Number(f.rot)||0)%4+4)%4,frame=hdFurnitureFrame(f.kind,rot),x=OX+f.x*T,y=OY+f.y*T;
 const width=rot%2?T*.38:T-4,height=(T-4)*HD_CROPS[f.kind][3]/HD_CROPS[f.kind][2],left=x+(T-width)/2,top=y+T-height-2;
 ctx.imageSmoothingEnabled=false;ctx.drawImage(frame,left,top,width,height);
 if(!rot){
  const qty=Math.max(0,Number(f.qty)||0),capacity=furnitureCapacity(f),limit=f.kind==='cold'?12:f.kind==='frozen'?8:15,count=Math.min(limit,Math.ceil(Math.min(1,qty/capacity)*limit));
  // Frame coordinates and merchandise slots share the same native coordinate system.
  const bays=f.kind==='shelf'?HD_SHELF_BAYS:f.kind==='cold'?[[10,37,43,71],[66,37,43,71]]:[[6,9,50,25],[65,9,50,25]],rows=f.kind==='frozen'?2:3;
  ctx.save();ctx.beginPath();for(const [bx,by,bw,bh]of bays)ctx.rect(left+bx/frame.width*width,top+by/frame.height*height,bw/frame.width*width,bh/frame.height*height);ctx.clip();
  for(let i=0;i<count;i++){
   const row=i%rows,col=Math.floor(i/rows),sx=width/frame.width,sy=height/frame.height;
   const [bx,by,bw,bh]=f.kind==='shelf'?bays[row]:bays[Math.floor(col/2)],cols=f.kind==='shelf'?5:2,slotHeight=f.kind==='shelf'?bh:bh/rows;
   drawProduct(f.pid,left+(bx+(col%cols)*bw/cols+1)*sx,top+(by+(f.kind==='shelf'?0:row*slotHeight)+1)*sy,(bw/cols-2)*sx,(slotHeight-2)*sy);
  }
  ctx.restore();
  // Glass highlights remain visible over stocked cooling units.
  if(f.kind!=='shelf'&&count){ctx.save();ctx.globalAlpha*=.22;ctx.drawImage(frame,left,top,width,height);ctx.restore();}
 }
 if(labels&&FURN[f.kind]?.type&&furnitureDistance(S.player,f)<1.1){rect(x+7,y+T+1,T-14,9,'#f8f4e7');textAt(f.qty+'/'+furnitureCapacity(f),x+T/2,y+T+8,'#20364e',7);}
 if(editing()){const p=merchandiseFront(f);rect(OX+p.x*T+21,OY+p.y*T+20,4,4,PX.gold);}
}
function hdSellerFrame(dir='down',step=0){
 const key='seller:'+dir+':'+step;if(hdFrames.has(key))return hdFrames.get(key);
 const crop=HD_SELLER_CROPS[dir]||HD_SELLER_CROPS.down,base=hdNativeCrop('seller-native:'+dir,crop,true),c=gbaCanvas(80,100),g=c.getContext('2d');
 const left=Math.floor((c.width-base.width)/2),top=c.height-base.height-4,split=base.height-15,stride=[0,2,0,-2][step%4],half=Math.floor(base.width/2);
 g.save();if(dir==='right'){g.translate(c.width,0);g.scale(-1,1);}
 g.drawImage(base,0,0,base.width,split,left,top,base.width,split);
 g.drawImage(base,0,split,half,15,left,top+split+Math.max(0,stride),half,15);
 g.drawImage(base,half,split,base.width-half,15,left+half,top+split+Math.max(0,-stride),base.width-half,15);g.restore();
 hdFrames.set(key,c);return c;
}
function hdPerson(p,look,player=false){
 const x=OX+p.x*T,y=OY+p.y*T,a=pose(p),step=a.moving?Math.floor(a.phase/(Math.PI/2))%4:0,frame=hdSellerFrame(a.dir,step);
 rect(x+14,y+35,19,3,'#8b967e55');ctx.imageSmoothingEnabled=false;ctx.drawImage(frame,x+5,y-8-(a.moving?step%2:0),36,45);
 if(player){rect(x+21,y-14,5,2,'#db9c43');rect(x+22,y-12,3,2,'#db9c43');}
 actionVisual(p,a,x,y);if(player&&S.broomHeld)drawBroom(x+35,y+20,true);
}
function installHdRenderer(){
 hdAtlas=new Image();hdAtlas.onload=()=>{hdReady=hdAtlas.width===1024&&hdAtlas.height===765;hdFrames.clear();};
 hdAtlas.onerror=()=>console.warn('Verkäufer- und Regalvorlage konnte nicht geladen werden.');hdAtlas.src='assets/gemini-source.png?v=3.11';
}
