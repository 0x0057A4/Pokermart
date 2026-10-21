const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url');
const{chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--allow-file-access-from-files'],...(process.env.POKERMART_BROWSER?{executablePath:process.env.POKERMART_BROWSER}:{})});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);await page.waitForFunction(()=>hdReady&&referenceReady&&gbaReady);
  const masks=await page.evaluate(()=>{
   closePanel();S=fresh();S.expanded=3;customers=[];const results=[];
   for(let rot=0;rot<4;rot++){
    const f={kind:'checkout',x:11,y:10,rot},r=fixtureFootprint(f);S.furniture=[f];const cells=fixtureTileCells(f),occupied=new Set(cells.map(c=>c.x+','+c.y));let free=0,blocked=0;
    for(let y=r.y;y<r.y+r.h;y+=.5)for(let x=r.x;x<r.x+r.w;x+=.5){
     const filled=occupied.has(x+','+y),point={x:x-.25,y:y-.5};
     if(footBlocked(point.x,point.y)!==filled)throw Error('Wrong foot collision at '+rot+':'+x+','+y);
     const picked=fixtureHitTest(f,OX+(x+.25)*T,OY+(y+.25)*T);if(picked!==filled)throw Error('Wrong pointer hit');
     if(fixtureOverlapsRect(f,{x,y,w:.5,h:.5})!==filled)throw Error('Wrong placement collision');
     if(filled)blocked++;else{free++;const route=path(12,16,point.x,point.y);if(!route.length||route.some(p=>footBlocked(...p)))throw Error('Unused checkout cell is unreachable');}
    }
    const s=cashierCell(f),c=customerCells(f)[0];if(footBlocked(s.x,s.y)||footBlocked(...c)||!path(12,16,s.x,s.y).length||!path(12,16,...c).length)throw Error('Checkout service side blocked');
    const image=document.createElement('canvas');image.width=800;image.height=800;const previous=ctx;ctx=image.getContext('2d');drawTileCheckout(f);ctx=previous;
    const rgba=image.getContext('2d').getImageData(0,0,800,800).data,painted=new Map();let outside=0;
    for(let y=0;y<800;y++)for(let x=0;x<800;x++)if(rgba[(y*800+x)*4+3]){
     const wx=(x+.5-OX)/T,wy=(y+.5-OY)/T;if(!footprintHasCell(f,wx,wy))outside++;
     const key=(Math.floor(wx*2)/2)+','+(Math.floor(wy*2)/2);painted.set(key,(painted.get(key)||0)+1);
    }
    if(outside)throw Error('Checkout art extends into unused cells');if(cells.some(c=>(painted.get(c.x+','+c.y)||0)<20))throw Error('Occupied cell has no checkout artwork');
    results.push({rot,blocked,free,mask:cells.map(c=>[(c.x-r.x)*2,(c.y-r.y)*2]).sort((a,b)=>a[1]-b[1]||a[0]-b[0])});
   }
   return results;
  });for(const result of masks){assert.equal(result.blocked,5);assert.equal(result.free,3);}
  assert.deepEqual(masks[1].mask,[[1,0],[0,1],[1,1],[1,2],[1,3]]);
  console.log('PASS: the checkout matches the five-cell sketch; all four rotated masks agree with collision, selection, placement and rendered pixels');
  console.log('PASS: all three unused cells remain reachable; cashier and customer sides remain accessible in every rotation');
  const freezer=await page.evaluate(()=>{
   S=fresh();S.expanded=3;customers=[];const output=[];
   for(const rot of[1,3]){
    const f={kind:'frozen',x:10,y:10,rot,pid:8,qty:0};S.furniture=[f];const r=hdFixtureGeometry(f),floor=fixtureFootprint(f),image=document.createElement('canvas');image.width=800;image.height=800;const old=ctx;ctx=image.getContext('2d');hdFixture(f,false);ctx=old;
    const data=image.getContext('2d').getImageData(OX+f.x*T,OY+f.y*T,23,46).data,rows=[0,0];for(let y=0;y<46;y++)for(let x=0;x<23;x++)if(data[(y*23+x)*4+3])rows[Math.floor(y/23)]++;
    if(rows.some(n=>n<100))throw Error('Freezer occupies only one visible tile');if(!fixtureHitTest(f,r.left+r.width/2,r.top+2))throw Error('Upper freezer half cannot be selected');
    if(Math.abs(r.height/(T-4)-1)>.001||r.width>floor.w*T)throw Error('Freezer size does not fit its two tiles');output.push({rot,rows,height:r.height});
   }return output;
  });assert.equal(freezer.length,2);console.log('PASS: 90° and 270° freezers visibly fill both small tiles and can be selected at either end');
  const nested=await page.evaluate(()=>{
   closePanel();S=fresh();S.expanded=3;customers=[];S.player={x:14,y:12};const checkout={kind:'checkout',x:11,y:10,rot:1};S.furniture=[checkout];
   startBuild('cold');previewRotation=1;if(!canPlace(11,10))throw Error('Free mask cells cannot accept another fixture: '+placementReason);const before=S.money;setEditCursor({x:11,y:10});primaryAction();
   if(S.furniture.length!==2||S.money!==before-FURN.cold.cost)throw Error('Fixture was not purchased once');save();const loaded=validate(JSON.parse(localStorage.getItem('pokermart-v1')));
   return{count:loaded.furniture.length,overlap:fixturesOverlap(...loaded.furniture),position:[loaded.furniture[1].x,loaded.furniture[1].y,loaded.furniture[1].rot]};
  });assert.equal(nested.count,2);assert.equal(nested.overlap,false);assert.deepEqual(nested.position,[11,10,1]);
  console.log('PASS: another fixture fits into the formerly blocked empty part of the checkout bounding box and survives save/reload');
  for(let rot=0;rot<4;rot++)for(const method of['Bar','EC']){
   const sale=await page.evaluate(({rot,method})=>{
    closePanel();S=fresh();customers=[];const till={kind:'checkout',x:10,y:11,rot};S.furniture=[till];S.player=cashierCell(till);const front=customerCells(till)[0];customers=[{x:front[0],y:front[1],profile:PROFILES[0],look:0,state:'queue',cart:[0,4],target:till,path:[],payment:method,patience:200,think:0}];
    const money=S.money;interact();if(!payment)throw Error('Checkout cannot open');if(method==='Bar'){payment.givenCents=payment.totalCents;cashKey('0');cashKey('confirm');}else{payment.clock=payment.target/.65;primaryAction();}return{sales:S.sales,delta:S.money-money,expected:S.prices[0]+S.prices[4],finished:payment===null};
   },{rot,method});assert.equal(sale.sales,2);assert(sale.finished);assert(Math.abs(sale.delta-sale.expected)<.001);
  }console.log('PASS: cash and card payments settle exactly once in all four checkout orientations');
  const trading=await page.evaluate(()=>{
   closePanel();S=fresh();customers=[];S.open=true;S.staff.cashier=1;S.staff.stocker=1;S.staff.cleaner=1;const start=performance.now();for(let i=0;i<6000;i++){update(.1);animate(.1);if(S.business.phase==='report'){continueAfterHours();const old={...S.player};S.player={x:12,y:13};nextBusinessDay();S.player=old;}for(const c of customers)if(footBlocked(c.x,c.y))throw Error('Customer collision at '+i+': '+c.x+','+c.y);}return{sales:S.sales,served:S.served,seconds:(performance.now()-start)/1000};
  });assert(trading.sales>0&&trading.served>0);console.log('PASS: ten-minute staffed simulation has sales and no collisions ('+trading.seconds.toFixed(2)+' s test time)');
  const qa=path.resolve(__dirname,'../.work/tile-footprint-qa');fs.mkdirSync(qa,{recursive:true});
  await page.evaluate(()=>{closePanel();S=fresh();S.expanded=2;S.paused=true;customers=[];pendingCheckout=null;payment=null;S.player={x:13,y:12};S.furniture=[...Array.from({length:4},(_,rot)=>({kind:'checkout',x:6+rot*3,y:8,rot})),{kind:'frozen',x:8,y:11,rot:1,pid:8,qty:0},{kind:'frozen',x:10,y:11,rot:3,pid:8,qty:0}];$('saleIncome').classList.remove('show');$('toast').style.display='none';moveMode=true;moving=null;placing=null;hud();draw();});
  await page.screenshot({path:path.join(qa,'masks.png')});assert.deepEqual(errors,[]);console.log('PASS: original sprites render without script errors; visual comparison captured');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
