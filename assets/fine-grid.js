/* Half-size construction cells. World coordinates and existing saves keep their scale. */
const BUILD_STEP=.5;
function onBuildGrid(n){return Number.isFinite(n)&&Number.isInteger(n/BUILD_STEP);}
function snapBuildGrid(n){return Math.round(n/BUILD_STEP)*BUILD_STEP;}
function footCrossAllowed(x,y,nx,ny,state=S){
 if(x===nx||y===ny)return canCross(x,y,nx,ny,state);
 // A foot box may straddle both cells of the wide entrance while crossing it.
 return(floor(nx,y,state)&&canCross(x,y,nx,y,state)&&canCross(nx,y,nx,ny,state))||(floor(x,ny,state)&&canCross(x,y,x,ny,state)&&canCross(x,ny,nx,ny,state));
}
function shallowFixture(f){return !f.warehouseKey&&['shelf','cold','frozen','bakery'].includes(f.kind);}
function fixtureFootprint(f){
 const rot=(f.rot||0)%4;
 if(shallowFixture(f))return{x:f.x,y:f.y,w:rot%2?.5:1,h:rot%2?1:.5};
 if(f.kind==='checkout'){const [dx,dy]=checkoutVector(f);return{x:f.x-Math.max(0,dx),y:f.y-Math.max(0,dy),w:dx?2:1,h:dy?2:1};}
 return{x:f.x,y:f.y,w:1,h:1};
}
function footprintOverlaps(a,b){return a.x<b.x+b.w-1e-6&&a.x+a.w>b.x+1e-6&&a.y<b.y+b.h-1e-6&&a.y+a.h>b.y+1e-6;}
function footprintHasCell(f,x,y){const r=fixtureFootprint(f);return x>=r.x&&x<r.x+r.w&&y>=r.y&&y<r.y+r.h;}
function fixtureGridLabel(f){const r=fixtureFootprint(f);return(r.w*2)+' × '+(r.h*2)+' Felder';}
function fixtureHitTest(f,px,py){
 const r=fixtureFootprint(f),x=OX+r.x*T,y=OY+r.y*T,w=r.w*T;
 const crop=HD_CROPS[f.kind]||REFERENCE_CROPS[f.kind],height=shallowFixture(f)&&crop?(T-(HD_CROPS[f.kind]?4:2))*crop[3]/crop[2]:f.kind==='checkout'?(r.h>1?r.h*T:Math.min(T*1.9,r.w*T)):T+25;
 return px>=x-2&&px<=x+w+2&&py>=y+r.h*T-height-2&&py<=y+r.h*T+2;
}
function fineFurnitureCells(f){
 if(shallowFixture(f)){const r=fixtureFootprint(f);return[{x:f.x,y:f.y},{x:f.x+(r.w===1?.5:0),y:f.y+(r.h===1?.5:0)}];}
 if(f.kind==='checkout'){const [dx,dy]=checkoutVector(f);return[-1,0].map(i=>({x:f.x+dx*i,y:f.y+dy*i}));}
 return[{x:f.x,y:f.y}];
}
function fineFurnitureBounds(f,state=S){
 const r=fixtureFootprint(f);
 if(shallowFixture(f))return{left:r.x+.02,right:r.x+r.w-.02,top:r.y+.02,bottom:r.y+r.h-.02};
 const top=layout(state).shop[1],wall=wallFixture(f.kind)&&!(f.rot||0)&&f.y<=top+1;
 return{left:r.x-.065,right:r.x+r.w+.065,top:wall?top:r.y+.08,bottom:r.y+r.h-.07};
}
function fineServicePoint(f){
 // Actor coordinates describe the sprite; its feet are at x+.5 / y+.7.
 const offsets=shallowFixture(f)?[[0,0],[-1,0],[0,-1],[.5,0]]:[[0,1],[-1,0],[0,-1],[1,0]];
 const [dx,dy]=offsets[f.rot||0];return{x:f.x+dx,y:f.y+dy};
}
function fineCursor(p){
 const b=editorBounds();editCursor={x:Math.max(b[0],Math.min(b[2]+.5,snapBuildGrid(p.x))),y:Math.max(b[1],Math.min(b[3]+.5,snapBuildGrid(p.y)))};
 hover={...editCursor};cursorRepeat=0;cursorDirection='';
}
function fineTile(e){const c=canvasPoint(e);return{x:Math.floor((c.x-OX)/T/BUILD_STEP)*BUILD_STEP,y:Math.floor((c.y-OY)/T/BUILD_STEP)*BUILD_STEP};}
function fineEditorControls(dt){
 if(payment)return;if($('modal').open){updateMenuControls(dt);return;}if(!editing())return;if(!editCursor)setEditCursor(S.player);
 let dx=(keys.d||keys.ArrowRight?1:0)-(keys.a||keys.ArrowLeft?1:0),dy=(keys.s||keys.ArrowDown?1:0)-(keys.w||keys.ArrowUp?1:0);if(dx)dy=0;
 const dir=dx+','+dy;if(!dx&&!dy){cursorDirection='';cursorRepeat=0;return;}cursorRepeat-=dt;if(dir===cursorDirection&&cursorRepeat>0)return;
 cursorDirection=dir;cursorRepeat=.15;const b=editorBounds();editCursor={x:Math.max(b[0],Math.min(b[2]+.5,editCursor.x+dx*BUILD_STEP)),y:Math.max(b[1],Math.min(b[3]+.5,editCursor.y+dy*BUILD_STEP))};hover={...editCursor};hud();
}
function finePath(sx,sy,tx,ty){
 const actual=[sx,sy];sx=snapBuildGrid(sx);sy=snapBuildGrid(sy);tx=snapBuildGrid(tx);ty=snapBuildGrid(ty);
 const canStep=(x,y,nx,ny)=>!solid(nx,ny)&&!solid((x+nx)/2,(y+ny)/2)&&canCross(Math.floor(x+.5),Math.floor(y+.7),Math.floor(nx+.5),Math.floor(ny+.7));
 if(solid(tx,ty))return[];
 if(solid(sx,sy)){
  const choices=[];for(const dx of[-.5,0,.5])for(const dy of[-.5,0,.5])if(canStep(...actual,sx+dx,sy+dy))choices.push([sx+dx,sy+dy]);
  choices.sort((a,b)=>Math.hypot(a[0]-actual[0],a[1]-actual[1])-Math.hypot(b[0]-actual[0],b[1]-actual[1]));if(!choices.length)return[];[sx,sy]=choices[0];
 }
 const warehouse=layout().store,inStore=(x,y)=>inRect(Math.floor(x+.5),Math.floor(y+.7),warehouse),allowWarehouse=inStore(sx,sy)||inStore(tx,ty);
 const key=(x,y)=>(x*2)+','+(y*2),start=key(sx,sy),goal=key(tx,ty),cost=new Map([[start,0]]),prev=new Map(),heap=[];
 const push=n=>{heap.push(n);let i=heap.length-1;while(i){const p=(i-1)>>1;if(heap[p].f<=n.f)break;heap[i]=heap[p];i=p;}heap[i]=n;};
 const pop=()=>{const first=heap[0],last=heap.pop();if(heap.length){let i=0;while(i*2+1<heap.length){let j=i*2+1;if(j+1<heap.length&&heap[j+1].f<heap[j].f)j++;if(heap[j].f>=last.f)break;heap[i]=heap[j];i=j;}heap[i]=last;}return first;};
 push({x:sx,y:sy,g:0,f:Math.abs(tx-sx)+Math.abs(ty-sy)});
 while(heap.length){const n=pop(),k=key(n.x,n.y);if(n.g!==cost.get(k))continue;if(k===goal){const out=[];let point=[n.x,n.y],current=k;while(current!==start){out.push(point);point=prev.get(current);if(!point)return[];current=key(...point);}out.reverse();if(Math.hypot(actual[0]-sx,actual[1]-sy)>.001)out.unshift([sx,sy]);return out;}
  for(const [dx,dy]of[[.5,0],[-.5,0],[0,.5],[0,-.5]]){const x=n.x+dx,y=n.y+dy,nk=key(x,y),g=n.g+.5;if(g>=(cost.get(nk)??Infinity)||(!allowWarehouse&&inStore(x,y))||!canStep(n.x,n.y,x,y))continue;cost.set(nk,g);prev.set(nk,[n.x,n.y]);push({x,y,g,f:g+Math.abs(tx-x)+Math.abs(ty-y)});}
 }
 return[];
}
function fineRoomFits(r,state=S){for(let y=r.y;y<r.y+r.h-1e-6;y+=.5)for(let x=r.x;x<r.x+r.w-1e-6;x+=.5)if(!marketCell(Math.floor(x+.25),Math.floor(y+.25),state))return false;return true;}
function fixedDepartmentFootprints(state=S){return departmentAreas(state).flatMap(a=>{const l=departmentLayout(a.type,state);return[...l.cells,...(a.type==='meat'?[l.cooler]:[l.oven,l.coffee])].map(p=>({...p,w:1,h:1}));});}
function fineCanPlace(x,y){
 if(moving?.warehouseKey)return canPlaceWarehouse(x,y);placementReason='';const reject=s=>{placementReason=s;return false;},kind=moving?.kind||placing;
 if(!kind||!onBuildGrid(x)||!onBuildGrid(y))return reject('Ein Möbel und ein Feld im halben Raster wählen.');
 const candidate={kind,x,y,rot:previewRotation},r=fixtureFootprint(candidate);
 if(!fineRoomFits(r))return reject('Das ganze Möbel muss innerhalb des Raums stehen.');
 if(footprintOverlaps(r,{x:12,y:13,w:2,h:1}))return reject('Der Eingang muss frei bleiben.');
 if(warehouseMovables().some(o=>footprintOverlaps(r,{x:o.x,y:o.y,w:1,h:1})))return reject('Dort steht Lagereinrichtung.');
 if(fixedDepartmentFootprints().some(o=>footprintOverlaps(r,o)))return reject('Die feste Theke und ihre Geräte müssen frei bleiben.');
 if(S.furniture.some(f=>f!==moving&&footprintOverlaps(r,fixtureFootprint(f))))return reject('Dort steht bereits ein Möbel.');
 if(!moving&&S.money<FURN[kind].cost)return reject('Für dieses Möbel fehlt Geld.');
 const original=S.furniture;try{
  S.furniture=original.filter(f=>f!==moving).concat(candidate);
  for(const actor of [S.player,...customers])if(footBlocked(actor.x,actor.y))return reject('Hier steht gerade eine Figur.');
  const reason=warehouseAccessReason();if(reason)return reject(reason);
  for(const actor of [S.player,...customers])if(!path(actor.x,actor.y,12,16).length&&distance(actor,{x:12,y:16})>.6)return reject('Der Laufweg zum Ausgang muss frei bleiben.');
  return true;
 }finally{S.furniture=original;}
}
function drawPlacementGrid(){
 if(!editing())return;ctx.save();ctx.lineWidth=.45;ctx.strokeStyle='#284a6b45';
 for(const b of [layout().shop,layout().store,...departmentAreas().map(a=>a.bounds)]){const x=OX+b[0]*T,y=OY+b[1]*T,w=(b[2]-b[0]+1)*T,h=(b[3]-b[1]+1)*T;ctx.beginPath();for(let dx=0;dx<=w;dx+=T/2){ctx.moveTo(x+dx,y);ctx.lineTo(x+dx,y+h);}for(let dy=0;dy<=h;dy+=T/2){ctx.moveTo(x,y+dy);ctx.lineTo(x+w,y+dy);}ctx.stroke();}
 ctx.restore();
}
function drawFurnitureOutline(f,color=PX.gold){const r=fixtureFootprint(f);ctx.strokeStyle=color;ctx.lineWidth=1;for(let y=r.y;y<r.y+r.h-.001;y+=.5)for(let x=r.x;x<r.x+r.w-.001;x+=.5)ctx.strokeRect(OX+x*T+1,OY+y*T+1,T/2-2,T/2-2);}
