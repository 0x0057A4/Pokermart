require('./premium.cjs');
const {run,assert}=require('./smoke.cjs');
const png=Buffer.from(run('CUSTOMER_SOURCE').split(',')[1],'base64'),width=png.readUInt32BE(16),height=png.readUInt32BE(20),frames=JSON.parse(run('JSON.stringify(CUSTOMER_FRAMES)'));
assert.equal(png.subarray(1,4).toString(),'PNG');assert(png.length>50000,'Customer atlas is empty');assert.equal(Object.keys(frames).length,32);
for(let i=0;i<8;i++)for(const dir of ['Down','Up','Left','Right']){const [x,y,w,h]=frames['customer'+i+dir];assert(x>=0&&y>=0&&w>0&&h===128&&x+w<=width&&y+h<=height);}
console.log('PASS: eight unique customer designs, four bounded 128px directional frames each');
run(`customerAtlas=document.createElement('canvas');customerAtlas.width=${width};customerAtlas.height=${height};customersReady=true;customerFrames.clear();pixelAssets.clear();for(let look=1;look<=20;look++)for(const dir of ['up','down','left','right'])for(let step=0;step<4;step++){const frame=premiumCharacter(look,dir,step,'idle');if(frame.width!==72||frame.height!==104)throw new Error('Incorrect customer scale');}`);
assert.equal(run('customerFrames.size'),32);assert.equal(run('new Set(CUSTOMER_PROFILE_DESIGNS).size'),8);
assert.equal(run('customerDesign(5)'),6);assert.equal(run('customerDesign(21)'),run('customerDesign(1)'));
console.log('PASS: all customer profiles keep stable identities and use actual directional artwork');
run("closePanel();S=fresh();customers=[];globalThis.shopBefore=JSON.stringify(S);const l=layout();for(let i=0;i<8;i++)customers.push({x:l.shop[0]+i%4,y:l.shop[1]+2+Math.floor(i/4)*2,look:CUSTOMER_PROFILE_DESIGNS.indexOf(i)+1,cart:i%2?[0,4]:[],path:[],profile:PROFILES[i],state:'shop'});draw();");
assert.equal(run('JSON.stringify(S)'),run('shopBefore'));
console.log('PASS: mixed customer crowd and stocked shopping baskets render without modifying the save');
