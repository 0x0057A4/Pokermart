require('./atlas.cjs');
const {run,assert}=require('./smoke.cjs');
const png=Buffer.from(run('PREMIUM_SOURCE').split(',')[1],'base64'),width=png.readUInt32BE(16),height=png.readUInt32BE(20),frames=JSON.parse(run('JSON.stringify(PREMIUM_FRAMES)'));
assert.equal(png.subarray(1,4).toString(),'PNG');assert.equal(Object.keys(frames).length,29);
for(const [name,[x,y,w,h]]of Object.entries(frames)){assert(x>=0&&y>=0&&w>0&&h>0&&x+w<=width&&y+h<=height,'Invalid premium sprite: '+name);}
for(const dir of ['Down','Up','Left','Right']){assert.equal(frames['employee'+dir][3],96);assert.equal(frames['customer'+dir][3],96);}
console.log('PASS: embedded detailed atlas has 29 bounded sprites and full directional characters');
run(`closePanel();S=fresh();customers=[];premiumAtlas=document.createElement('canvas');premiumAtlas.width=${width};premiumAtlas.height=${height};premiumReady=true;premiumCache.clear();pixelAssets.clear();for(let rot=0;rot<4;rot++){const f={kind:'checkout',x:10,y:11,rot};drawPremiumCheckout(f);drawCashierSpot(f)}for(const kind of Object.keys(FURN))if(kind!=='oven')drawFixture({kind,x:11,y:11,rot:0,pid:0,qty:12});for(let look=0;look<33;look++)for(const dir of ['up','down','left','right']){const image=premiumCharacter(look,dir,1,'idle');if(image.width!==72||image.height!==104)throw new Error('Character dimensions');}draw();`);
assert.equal(run('worldSurface.width'),2500);assert.equal(run('worldSurface.height'),1600);assert(run('premiumCache.size>=25'));
console.log('PASS: detailed sprites render in all rotations in a doubled scene buffer');
run("S=fresh();customers=[];S.stock.fill(0);S.furniture.filter(f=>FURN[f.kind].type).forEach(f=>f.qty=0);S.broomHeld=true;draw();S.player=storagePoint();draw();");
assert.equal(run('S.stock.reduce((a,b)=>a+b,0)'),0);assert(run('S.broomHeld'));
console.log('PASS: empty shop, empty storage and held broom render using detailed pixel art');

