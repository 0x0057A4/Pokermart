/* Real browser coverage for half-cell building, shallow shelves and save compatibility. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--allow-file-access-from-files'],...(process.env.POKERMART_BROWSER?{executablePath:process.env.POKERMART_BROWSER}:{})});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);await page.waitForFunction(()=>hdReady&&referenceReady&&gbaReady);
  const geometry=await page.evaluate(()=>{
   closePanel();S=fresh();S.paused=true;customers=[];const original=JSON.stringify(S);const results=[];
   for(const kind of ['shelf','cold','frozen','bakery'])for(let rot=0;rot<4;rot++){
    const f={kind,x:10,y:11,rot,pid:kind==='bakery'?162:kind==='cold'?0:kind==='frozen'?8:4,qty:8};S.furniture=[f];
    const bounds=fixtureFootprint(f),service=merchandiseFront(f),walk=path(12,16,service.x,service.y);
    if(bounds.w*bounds.h!==.5||furnitureCells(f).length!==2)throw Error('Not a two-cell shelf');
    if(footBlocked(service.x,service.y)||!walk.length)throw Error('Unreachable service side: '+kind+'/'+rot);
    if(walk.some(([x,y])=>!onBuildGrid(x)||!onBuildGrid(y)||footBlocked(x,y)))throw Error('Path intersects an obstacle');
    drawFixture(f,false);results.push([kind,rot,walk.length]);
   }
   S=JSON.parse(original);return results;
  });assert.equal(geometry.length,16);console.log('PASS: four cabinet families occupy two small cells in all rotations; every service side has a collision-free half-cell route');
  const corridor=await page.evaluate(()=>{
   S=fresh();customers=[];S.furniture=[{kind:'shelf',x:10,y:10,rot:0,pid:4,qty:8},{kind:'shelf',x:10,y:11,rot:0,pid:7,qty:8}];
   const p=path(9,10,12,10);return{walk:p,free:!footBlocked(10,10),solid:footBlocked(10,9.5)};
  });assert(corridor.walk.length);assert(corridor.free);assert(corridor.solid);assert(corridor.walk.some(([x,y])=>x===10&&y===10));
  console.log('PASS: the formerly blocked half of a shelf tile is walkable; shelf bodies still block feet');
  const clickPoints=await page.evaluate(()=>{
   closePanel();S=fresh();S.paused=true;customers=[];startMoveMode();draw();const r=cv.getBoundingClientRect(),scale=Math.min(r.width/cv.width,r.height/cv.height);
   const point=(x,y)=>({x:r.left+(r.width-cv.width*scale)/2+((OX+x*T)*camera.scale+camera.x)*scale,y:r.top+(r.height-cv.height*scale)/2+((OY+y*T)*camera.scale+camera.y)*scale});
   return{free:point(9.5,9.8),shelf:point(9.5,9.25)};
  });
  await page.mouse.click(clickPoints.free.x,clickPoints.free.y);assert.equal(await page.evaluate(()=>moving===null),true);
  await page.mouse.click(clickPoints.shelf.x,clickPoints.shelf.y);assert.equal(await page.evaluate(()=>moving===S.furniture[0]),true);
  await page.evaluate(()=>backAction());console.log('PASS: pointer selection picks the actual shelf and leaves its free half-cell unselected');
  const moved=await page.evaluate(()=>{
   closePanel();S=fresh();S.paused=true;customers=[];const shelf=S.furniture.find(f=>f.kind==='shelf'),before={money:S.money,qty:shelf.qty,pid:shelf.pid,stock:JSON.stringify(S.stock)};
   beginMove(shelf);keys={ArrowDown:true};updateControls(.2);keys={};const down=editCursor.y;setEditCursor({x:9.5,y:9});if(!canPlace(9.5,9))throw Error(placementReason);primaryAction();
   if(editing())throw Error('Move did not finish');save();const saved=validate(JSON.parse(localStorage.getItem('pokermart-v1')));
   return{down,before,after:{money:S.money,qty:shelf.qty,pid:shelf.pid,stock:JSON.stringify(S.stock)},position:[saved.furniture[0].x,saved.furniture[0].y]};
  });assert.equal(moved.down,9.5);assert.deepEqual(moved.position,[9.5,9]);assert.deepEqual(moved.before,moved.after);
  await page.reload();await page.waitForFunction(()=>hdReady&&referenceReady&&gbaReady);assert.equal(await page.evaluate(()=>S.furniture[0].x),9.5);
  console.log('PASS: arrow keys advance exactly half a tile; fractional placement survives validation and reload without changing money, goods or assignment');
  const placement=await page.evaluate(()=>{
   closePanel();S=fresh();customers=[];beginMove(S.furniture[0]);setEditCursor({x:12,y:10.5});previewRotation=1;
   const rotation=canPlace(12,10.5);if(!rotation)throw Error(placementReason);primaryAction();const shelf=S.furniture[0];
   startBuild('shelf');const overlap=!canPlace(12,10.5),offGrid=!canPlace(12.25,10.5),wall=!canPlace(7.5,9),door=!canPlace(12,13);backAction();
   return{rotation,overlap,offGrid,wall,door,position:[shelf.x,shelf.y,shelf.rot]};
  });assert.deepEqual(placement,{rotation:true,overlap:true,offGrid:true,wall:true,door:true,position:[12,10.5,1]});
  console.log('PASS: rotated shelves fit half-cell positions while overlaps, quarter-cell input, wall crossings and entrance blockage are rejected');
  const warehouse=await page.evaluate(()=>{
   closePanel();S=fresh();customers=[];beginWarehouseMove('rack-0');const a=warehouseAnchor();let position=null;
   outer:for(let y=a.y;y<=a.y+5;y+=.5)for(let x=a.x;x<=a.x+7;x+=.5){if(Number.isInteger(x)&&Number.isInteger(y))continue;if(canPlace(x,y)){position={x,y};break outer;}}
   if(!position)throw Error('No fractional warehouse placement');const inventory=JSON.stringify(S.stock),money=S.money;setEditCursor(position);primaryAction();save();
   const loaded=validate(JSON.parse(localStorage.getItem('pokermart-v1'))),rack=warehousePlan(loaded).racks.find(r=>r.key==='rack-0');
   return{position,actual:{x:rack.x,y:rack.y},sameStock:inventory===JSON.stringify(S.stock),sameMoney:money===S.money};
  });assert.deepEqual(warehouse.actual,warehouse.position);assert(warehouse.sameStock&&warehouse.sameMoney);
  console.log('PASS: warehouse fixtures can also move on the half-cell grid and retain their saved position and inventory');
  for(let rot=0;rot<4;rot++){
   const sale=await page.evaluate(rot=>{
    closePanel();S=fresh();S.furniture=[{kind:'checkout',x:10,y:11,rot}];const f=S.furniture[0],front=customerCells(f)[0];S.player=cashierCell(f);
    customers=[{x:front[0],y:front[1],profile:PROFILES[0],look:0,state:'queue',cart:[0,4],target:f,path:[],payment:'Bar',patience:100,think:0}];
    const money=S.money;interact();if(!payment)throw Error('Checkout cannot open');payment.givenCents=payment.totalCents;cashKey('0');cashKey('confirm');
    return{sales:S.sales,delta:S.money-money,expected:S.prices[0]+S.prices[4]};
   },rot);assert.equal(sale.sales,2);assert(Math.abs(sale.delta-sale.expected)<.001);
  }
  console.log('PASS: all four checkout orientations still accept manual payment exactly once');
  const day=await page.evaluate(()=>{
   closePanel();S=fresh();customers=[];S.open=true;S.staff.cashier=1;S.staff.stocker=1;S.staff.cleaner=1;const start=performance.now();
   for(let i=0;i<6000;i++){
    update(.1);animate(.1);
    if(S.business.phase==='report'){continueAfterHours();const position={...S.player};S.player={x:12,y:13};nextBusinessDay();S.player=position;}
    for(const c of customers)if(footBlocked(c.x,c.y))throw Error('Blocked actor during tick '+i+': '+JSON.stringify({x:c.x,y:c.y,state:c.state}));
   }return{sales:S.sales,customers:S.served,seconds:(performance.now()-start)/1000,finite:Number.isFinite(S.money),blocked:customers.filter(c=>footBlocked(c.x,c.y)).length};
  });assert(day.sales>0);assert(day.customers>0);assert(day.finite);assert.equal(day.blocked,0);console.log('PASS: staffed trading simulation sells goods and serves customers with no blocked actors ('+day.seconds.toFixed(2)+' s test time)');
  await page.evaluate(()=>{closePanel();S=fresh();S.paused=true;customers=[];payment=null;pendingCheckout=null;$('saleIncome').classList.remove('show');$('toast').style.display='none';hud();draw();});
  fs.mkdirSync(path.resolve(__dirname,'../.work/fine-grid-qa'),{recursive:true});await page.screenshot({path:path.resolve(__dirname,'../.work/fine-grid-qa/world.png')});
  await page.evaluate(()=>{beginMove(S.furniture[0]);draw();});await page.screenshot({path:path.resolve(__dirname,'../.work/fine-grid-qa/editor.png')});
  assert.deepEqual(errors,[]);console.log('PASS: no browser script errors; wall contact and construction grid screenshots captured');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
