/* Run with Playwright installed and, optionally, POKERMART_BROWSER set. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),crypto=require('node:crypto');
const {chromium}=require('playwright');
const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
 const file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
 fs.readFile(file,(error,data)=>{if(error){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png'})[path.extname(file)]||'application/octet-stream');res.end(data);});
});
function contrast(a,b){const luminance=c=>c.match(/\d+/g).slice(0,3).map(Number).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4;}).reduce((v,x,i)=>v+x*[.2126,.7152,.0722][i],0);const x=luminance(a),y=luminance(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
(async()=>{
 let browser;
 try{
  const source=fs.readFileSync(path.join(root,'assets/gemini-source.png'));
  assert.equal(crypto.createHash('sha256').update(source).digest('hex'),'31a4614dcedcb30650bc5f97cd9b120af50d4c5e813bbaa7e7bae0dc5119ef0b');
  assert.equal(source.readUInt32BE(16),1024);assert.equal(source.readUInt32BE(20),765);
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  browser=await chromium.launch({headless:true,...(process.env.POKERMART_BROWSER?{executablePath:process.env.POKERMART_BROWSER}:{}),...(process.env.POKERMART_LOCAL_FILES?{args:['--allow-file-access-from-files']}:{})});
  const errors=[];
  for(const [width,height,dpr]of[[1440,1000,1],[412,915,2],[915,412,1]]){
   const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:dpr,isMobile:width<600,hasTouch:width<1000});
   const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
   const url=process.env.POKERMART_LOCAL_FILES?pathToFileURL(path.join(root,'index.html')).href:'http://127.0.0.1:'+server.address().port+'/';
   await page.goto(url);await page.waitForFunction(()=>hdReady&&gbaReady&&referenceReady);
   const art=await page.evaluate(()=>{
    closePanel();S=fresh();S.paused=true;customers=[];const before=JSON.stringify(S);
    for(const crop of [...Object.values(HD_CROPS),...Object.values(HD_SELLER_CROPS)])if(crop[0]<0||crop[1]<0||crop[0]+crop[2]>hdAtlas.width||crop[1]+crop[3]>hdAtlas.height)throw Error('Unbounded native crop');
    const native=hdNativeCrop('original:shelf',HD_CROPS.shelf),empty=hdFurnitureFrame('shelf'),a=native.getContext('2d').getImageData(0,0,native.width,native.height).data,b=empty.getContext('2d').getImageData(0,0,empty.width,empty.height).data;
    let preserved=0;for(let y=0;y<empty.height;y++)for(let x=0;x<empty.width;x++){
     const bay=HD_SHELF_BAYS.find(([bx,by,bw,bh])=>x>=bx&&x<bx+bw&&y>=by&&y<by+bh),i=(y*empty.width+x)*4;
     if(bay){const color=y<bay[1]+2?[28,43,59,255]:[38,55,73,255];for(let c=0;c<4;c++)if(b[i+c]!==color[c])throw Error('Old merchandise remains in empty bay');}
     else{for(let c=0;c<4;c++)if(a[i+c]!==b[i+c])throw Error('Source frame pixel changed');preserved++;}
    }
    const originalDraw=drawProduct,calls=[];drawProduct=(...args)=>calls.push(args);
    for(const kind of Object.keys(HD_CROPS))for(let rot=0;rot<4;rot++)for(const qty of[0,1,8,24]){
     calls.length=0;hdFixture({kind,x:10,y:10,rot,pid:kind==='cold'?0:kind==='frozen'?8:4,qty},false);
     if((!qty||rot)&&calls.length)throw Error('Products on empty cabinet or closed profile');
     if(calls.length>qty||calls.length>15)throw Error('Invented display stock');
     if(calls.some(a=>!a.every(Number.isFinite)||a[3]<=0||a[4]<=0))throw Error('Invalid merchandise geometry');
    }drawProduct=originalDraw;
    for(const dir of['down','up','left','right'])for(let step=0;step<4;step++){
     const frame=hdSellerFrame(dir,step);if(frame.width!==80||frame.height!==100)throw Error('Seller was downsampled');
     const c=HD_SELLER_CROPS[dir],original=hdNativeCrop('seller-native:'+dir,c,true);if(original.width!==c[2]||original.height!==c[3])throw Error('Native seller resolution lost');
     const p={...S.player};pose(p).dir=dir;hdPerson(p,0,true);
    }
    if(before!==JSON.stringify(S))throw Error('Rendering mutated the save');
    return{preserved,frame:[empty.width,empty.height],canvas:[cv.width,cv.height]};
   });
   assert(art.preserved>4000);assert.deepEqual(art.frame,[126,112]);
   await page.evaluate(()=>{S.stock[4]=6;shelfPanel(S.furniture.find(f=>f.kind==='shelf'));focusMenu(0);});
   const ui=await page.evaluate(()=>{
    const primary=document.querySelector('#body .primary'),style=getComputedStyle(primary),grid=getComputedStyle($('productGrid'));
    const rect=primary.getBoundingClientRect();return{background:style.backgroundColor,color:style.color,columns:grid.gridTemplateColumns.split(/\s+/).length,minHeight:rect.height,overflow:document.documentElement.scrollWidth>innerWidth};
   });
   assert(contrast(ui.background,ui.color)>=4.5,'Primary focus contrast');assert.equal(ui.columns,width<=560?2:4);assert(ui.minHeight>=44);assert.equal(ui.overflow,false);
   const result=await page.evaluate(()=>{
    S.money=0;shelfPanel(selection);const disabled=$('shelfReorder'),style=getComputedStyle(disabled);
    return{disabled:disabled.disabled,color:style.color,background:style.backgroundColor,opacity:style.opacity};
   });
   assert(result.disabled);assert.equal(result.opacity,'1');assert(contrast(result.background,result.color)>=4.5,'Disabled label contrast');
   await page.evaluate(()=>{S.money=2600;S.stock[5]=9;shelfPanel(selection);});
   await page.locator('[data-product="5"]').click();
   assert.equal(await page.evaluate(()=>selection.pid),5);assert.equal(await page.evaluate(()=>selection.qty),9);assert.equal(await page.evaluate(()=>S.stock[5]),0);
   await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>$('modal').open),false);
   await page.evaluate(()=>{save();});await page.reload();await page.waitForFunction(()=>hdReady&&referenceReady&&gbaReady);
   assert.equal(await page.evaluate(()=>S.furniture.find(f=>f.kind==='shelf').pid),5);
   assert.equal(await page.evaluate(()=>S.money),2600);
   if(process.env.POKERMART_SCREENSHOTS){fs.mkdirSync(process.env.POKERMART_SCREENSHOTS,{recursive:true});await page.evaluate(()=>shelfPanel(S.furniture.find(f=>f.kind==='shelf')));await page.screenshot({path:path.join(process.env.POKERMART_SCREENSHOTS,'shelf-'+width+'.png')});}
   console.log('PASS: native sprites, immutable frames, empty/full rotated shelves, readable controls, product assignment and save reload at '+width+' × '+height+' / DPR '+dpr);
   await context.close();
  }
  assert.deepEqual(errors,[]);console.log('PASS: immutable original PNG and no browser script errors');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
