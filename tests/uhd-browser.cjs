/* Native art, display resolution and geometry regression. Requires Playwright. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url'),{chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.POKERMART_BROWSER?{executablePath:process.env.POKERMART_BROWSER}:{}),args:['--allow-file-access-from-files']});
 try{
  fs.mkdirSync('.work/uhd-qa',{recursive:true});
  for(const [width,height,dpr]of[[1440,1000,1],[3840,2160,1],[412,915,3]]){
   const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:dpr});
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.addInitScript(()=>window.requestAnimationFrame=()=>0);
   await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
   await page.waitForFunction(()=>uhdReady&&uhdCharactersReady&&hdReady&&gbaReady&&referenceReady);
   const result=await page.evaluate(()=>{
    closePanel();S=fresh();customers=[];S.paused=false;const saved=JSON.stringify(S),original=drawProduct,calls=[];drawProduct=(...args)=>calls.push(args);
    for(const kind of ['shelf','cold','frozen'])for(let rot=0;rot<4;rot++){
     const f={kind,x:10,y:10,rot,pid:4,qty:0},frame=uhdFurnitureFrame(kind,rot),g=uhdFixtureGeometry(f),r=fixtureFootprint(f),pixels=frame.getContext('2d').getImageData(0,0,frame.width,frame.height).data;
     if(Math.abs(g.width/g.height-frame.width/frame.height)>1e-9)throw Error('Distorted artwork '+kind+rot);
     if(g.width>r.w*T||Math.abs(g.top+g.height-(OY+(f.y+r.h)*T-1))>.001)throw Error('Wrong floor anchor');
     if(pixels[3]!==0||!pixels.some((v,i)=>i%4===3&&v===255))throw Error('Empty or opaque frame '+kind+rot);
     for(const qty of [0,1,8,24]){calls.length=0;uhdFixture({...f,qty},false);if((!qty||rot)&&calls.length||calls.length>qty)throw Error('Invented stock');}
    }
    drawProduct=original;
    for(const dir of ['down','up','left','right'])for(let step=0;step<4;step++){
     const frame=uhdStaffFrame(dir,step),pixels=frame.getContext('2d').getImageData(0,0,frame.width,frame.height).data;
     if(pixels[3]||!pixels.some((v,i)=>i%4===3&&v===255)||pixels.slice(-frame.width*4).some((v,i)=>i%4===3&&v))throw Error('Staff transparency or clipped feet');
    }
    for(let look=0;look<30;look++)for(const dir of ['down','up','left','right'])if(gbaPersonFrame(look,dir).height<192)throw Error('Customer detail lost');
    uhdReady=false;uhdCharactersReady=false;
    for(const kind of ['shelf','cold','frozen'])for(let rot=0;rot<4;rot++)hdFixture({kind,x:10,y:10,rot,pid:4,qty:0},false);
    hdPerson(S.player,0,true);uhdReady=true;uhdCharactersReady=true;
    if(JSON.stringify(S)!==saved)throw Error('Renderer changed simulation');
    hud();draw();const r=cv.getBoundingClientRect();return{pixels:[cv.width,cv.height],css:[r.width,r.height],ratio:uhdPixelRatio(r),overflow:document.documentElement.scrollWidth>innerWidth};
   });
   assert(Math.abs(result.pixels[0]-result.css[0]*result.ratio)<1);assert(result.pixels[0]*result.pixels[1]<8397000);assert(!result.overflow);
   if(width===3840)assert(result.pixels[0]>3800);if(dpr===3)assert.equal(result.ratio,3);
   await page.screenshot({path:'.work/uhd-qa/shop-'+width+'.png'});
   if(width===1440){
    await page.evaluate(()=>{S=fresh();S.expanded=2;customers=[];S.paused=false;S.player={x:14,y:12};S.furniture=[];for(let rot=0;rot<4;rot++)for(const [row,kind]of ['shelf','cold','frozen'].entries())S.furniture.push({kind,x:6+rot*3,y:6+row*2.5,rot,pid:kind==='shelf'?4:kind==='cold'?0:8,qty:rot?0:24});hud();draw();});
    await page.screenshot({path:'.work/uhd-qa/directions.png'});
   }
   assert.deepEqual(errors,[]);console.log('PASS UHD '+width+'x'+height+' DPR '+dpr,JSON.stringify(result));await context.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
