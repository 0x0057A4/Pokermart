// HYPERMARKT 3.4: physical product storage, closing work and resilient registers.
function warehousePlan(state=S){
 const key=state.expanded+':'+Math.floor(state.sales/12),cached=warehousePlans.get(state);if(cached?.key===key)return cached;
 const base=STAGES[state.expanded],left=base.shop[2]+2,top=base.door-3;
 let count=Math.min(160,10*(1+Math.floor(state.sales/12)));
 for(let id=0;id<160;id++)if(state.stock[id]>0||state.orders.some(o=>o.pid===id)||state.crates.some(o=>o.pid===id))count=Math.max(count,id+1);
 const rows=Math.ceil(count/6),bounds=[left,top,left+13,top+9+rows*3],fixtures=[];
 [160,164,161,162,165,163,166,167,168,169,170,171].forEach((pid,col)=>fixtures.push({pid,x:left+1+(col%6)*2,y:col>=6?top+5+rows*3:top,kind:pid===160||pid===164?'dough':PRODUCTS[pid].type==='ingredient'?'shelf':PRODUCTS[pid].type==='meat'?'cold':PRODUCTS[pid].type,warehouse:true}));
 for(let id=0;id<count;id++)fixtures.push({pid:id,x:left+1+(id%6)*2,y:top+5+Math.floor(id/6)*3,kind:PRODUCTS[id].type,warehouse:true});
 const plan={key,bounds,fixtures,map:new Map(fixtures.map(f=>[f.x+','+f.y,f]))};warehousePlans.set(state,plan);return plan;
}
function warehouseBlocked(x,y,state=S){
 const plan=warehousePlan(state),cx=x+.5,cy=y+.7,gx=Math.floor(cx),gy=Math.floor(cy);
 for(let yy=gy-1;yy<=gy+1;yy++)for(let xx=gx-1;xx<=gx+1;xx++){const f=plan.map.get(xx+','+yy);if(f&&cx+.27>f.x-.065&&cx-.27<f.x+1.065&&cy+.16>f.y+.08&&cy-.16<f.y+.93)return true;}
 return false;
}
function nearWarehouseFixture(){return warehousePlan(S).fixtures.filter(f=>distance(S.player,{x:f.x,y:f.y+1})<.9).sort((a,b)=>distance(S.player,{x:a.x,y:a.y+1})-distance(S.player,{x:b.x,y:b.y+1}))[0]||null;}
function worldVisible(x,y,w,h){return x+w>=-camera.x/camera.scale&&x<=(cv.width-camera.x)/camera.scale&&y+h>=-camera.y/camera.scale&&y<=(cv.height-camera.y)/camera.scale;}
function warehouseVisible(f){return worldVisible(OX+f.x*T-5,OY+f.y*T-45,T+10,T+65);}
function warehouseQuantityColor(q){return q===0?'#b45f4d':q<=6?'#b98c3c':'#447d66';}
function drawWarehouseFixture(f){
 const x=OX+f.x*T,y=OY+f.y*T,q=S.stock[f.pid],color=warehouseQuantityColor(q);
 if(f.kind==='dough'){
  // Reuse the game's pixel materials; contents remain a view onto S.stock, never a second inventory.
  rect(x+2,y+11,T-4,29,PX.woodDark);rect(x+4,y+12,T-8,25,PX.wood);rect(x+6,y+14,T-12,20,'#c6ac77');rect(x+2,y+10,T-4,4,PX.cream);
  for(let i=0;i<Math.min(4,Math.ceil(q/6));i++)drawFood(foodProductKey(f.pid),x+6+(i%2)*16,y+12+Math.floor(i/2)*10,14,11);
  rect(x+2,y+33,T-4,3,PX.woodDark);drawFood(foodProductKey(f.pid),x+16,y-10,15,17);textAt(f.pid===160?'TEIG':'CROISS.',x+T/2,y+7,PX.ink,7);
 }else drawFixture({...f,kind:f.kind==='coffee'?'shelf':f.kind,pid:f.pid,qty:Math.min(24,q),rot:0},false);
 rect(x+3,y+T-2,T-6,13,PX.paper);rect(x+3,y+T-2,3,13,color);textAt(String(q),x+T/2,y+T+8,color,8);
 if(!q)textAt('LEER',x+T/2,y+T+20,color,7);else if(q<=6)textAt('KNAPP',x+T/2,y+T+20,color,7);
 const near=nearWarehouseFixture();if(near===f){ctx.strokeStyle=PX.gold;ctx.lineWidth=1;ctx.strokeRect(x+1,y+T-3,T-2,15);}
}
function warehouseRows(){return warehousePlan(S).fixtures.map(f=>{const id=f.pid;return{...f,product:PRODUCTS[id],stock:S.stock[id],display:S.furniture.filter(k=>FURN[k.kind]?.type&&k.pid===id).reduce((n,k)=>n+k.qty,0),incoming:S.orders.filter(o=>o.pid===id).reduce((n,o)=>n+o.qty,0),arrived:S.crates.filter(o=>o.pid===id).reduce((n,o)=>n+o.qty,0)};});}
function warehousePanel(){
 pendingCheckout=null;payment=null;currentPanel='storage';const rows=warehouseRows(),dough=rows.filter(r=>r.kind==='dough'),other=rows.filter(r=>r.kind!=='dough');
 const tile=r=>`<button class="warehouse-tile ${r.stock<=6?'stock-low':''}" data-stock-product="${r.pid}" onclick="warehouseProductPanel(${r.pid})">${merchIconHTML(r.pid)}<b>${r.product.name}</b><strong>${r.stock}</strong><span>im Lager${r.stock===0?' · LEER':r.stock<=6?' · KNAPP':''}</span><small>${r.incoming} unterwegs · ${r.arrived} annehmen</small><span class="warehouse-order-hint">Bestand & Nachbestellen</span></button>`;
 show('Lager · Produktregale',`<p class="notice">Jedes Produkt hat einen festen Lagerplatz. Rot: leer · Gold: höchstens 6 Stück. Wähle ein Regal zum Nachbestellen. Gezählt wird nur angenommene Ware; Auslagen und Lieferungen bleiben getrennt.</p><h3>Teigrohlinge · eigene Behälter</h3><div class="warehouse-dough">${dough.map(tile).join('')}</div><div class="action-grid"><button onclick="panel('cafe')">Backstube & Café</button><button onclick="panel('supply')">Gesamten Einkauf öffnen</button></div><h3>Produktregale · ${other.length} Lagerplätze</h3><div class="warehouse-grid">${other.map(tile).join('')}</div>`);focusMenu(0);
}
function warehouseProductPanel(id){
 const r=warehouseRows().find(r=>r.pid===id);if(!r)return;pendingCheckout=null;payment=null;currentPanel='warehouseProduct';selection={warehousePid:id};const f={kind:r.product.type,pid:id},supply=shelfReorderInfo(f),raw=supply.id!==id;
 show(r.kind==='dough'?'Rohlingbehälter · '+r.product.name:'Lagerregal · '+r.product.name,`<div class="warehouse-detail">${merchIconHTML(id)}<div><span class="eyebrow">${r.kind==='dough'?'TEIGLAGER':'LAGERPLATZ'}</span><h3>${r.product.name}</h3><strong>${r.stock}</strong><span> Stück im Lager</span></div></div><div class="warehouse-counts"><span>${r.display} in Auslagen</span><span>${r.incoming} unterwegs</span><span>${r.arrived} zur Annahme</span></div>${raw?'<p class="notice">Wird im Laden hergestellt. Nachbestellt werden '+PRODUCTS[supply.id].name+'. '+S.stock[supply.id]+' Rohwaren im Lager · '+supply.pending+' unterwegs · '+supply.arrived+' zur Annahme.</p>':''}<div class="action-grid"><button id="warehouseOrder" class="primary" ${supply.blocked?'disabled':''} onclick="orderWarehouseProduct(${id})">Nachbestellen · 12 ${raw?'Rohwaren':'Stück'}<small>${money(supply.q.cost)} · ${supply.q.eta} Spielsekunden</small></button>${['bakery','coffee','ingredient'].includes(r.product.type)?'<button onclick="panel(\'cafe\')">Backstube & Café</button>':''}<button onclick="warehousePanel()">Alle Lagerplätze</button><button onclick="closePanel()">Zurück zum Lagerraum</button></div><p class="sub" aria-live="polite">${supply.blocked||'Lieferung anschließend am markierten Annahmeplatz im Lager annehmen.'}</p>`);focusMenu(0);
}
function orderWarehouseProduct(id){if(!$('modal').open||currentPanel!=='warehouseProduct'||selection?.warehousePid!==id)return;const p=PRODUCTS[id],f={kind:p?.type,pid:id};if(!p)return;const info=shelfReorderInfo(f);if(info.blocked){toast(info.blocked);return;}order(info.id);warehouseProductPanel(id);}
function atDayExit(){return distance(S.player,{x:12.5,y:13.6})<1.65;}
function continueAfterHours(){if(S.business.phase==='report'){S.business.phase='afterhours';S.open=false;S.paused=false;save();}closePanel();toast('Nacharbeit · Lieferungen, Einräumen und Backen möglich. Tag am Eingang beenden.');}
function refreshClosingReport(){
 if(!['report','afterhours'].includes(S.business.phase)||!S.business.report)return;
 const b=S.business,e=S.economy,r=b.report,expected=roundMoney(b.openingMoney+e.revenue+b.otherIncome-e.purchases-e.wages-e.utilities-b.otherExpenses),adjustment=roundMoney(S.money-expected);
 Object.assign(r,{closingMoney:S.money,purchases:e.purchases,otherIncome:b.otherIncome,otherExpenses:b.otherExpenses,adjustment,income:roundMoney(e.revenue+b.otherIncome+Math.max(0,adjustment)),expenses:roundMoney(e.purchases+e.wages+e.utilities+b.otherExpenses+Math.max(0,-adjustment))});r.cashflow=roundMoney(r.income-r.expenses);e.history=[...e.history.filter(h=>h.day!==S.day),{...r}].slice(-14);
}
function endDayPanel(){if(S.business.phase!=='afterhours'||!atDayExit())return;currentPanel='endDay';show('Laden abschließen',`<p class="notice">Nacharbeit erledigt? ${S.orders.length} Bestellung(en) sind noch unterwegs; ${S.crates.length} Karton(s) warten auf Annahme. Offene Lieferungen und Ofenladungen bleiben erhalten.</p><div class="action-grid"><button class="primary" onclick="nextBusinessDay()">Tag ${S.day} beenden · Tag ${S.day+1} um 05:00 starten</button><button onclick="closePanel()">Weiter nacharbeiten</button><button onclick="cashReportPanel()">Aktualisierten Kassenbericht ansehen</button></div>`);}
function drawDayExit(){if(S.business.phase!=='afterhours')return;const x=OX+12*T,y=OY+14*T;rect(x+3,y+9,T*2-6,15,PX.ink);textAt('TAG BEENDEN',x+T,y+20,PX.gold,7);}
function warehouseHud(){
 if(S.business.phase==='afterhours'){$('worldtag').textContent='NACHARBEIT · GESCHLOSSEN · 20:00 UHR';if(!editing()&&!$('modal').open)$('hint').textContent=atDayExit()?'Leertaste / E · Tag beenden':'Nacharbeit · Lieferungen annehmen, einräumen und backen · Tag am Eingang beenden';}
 if(!editing()&&!$('modal').open&&!S.broomHeld){const rack=nearWarehouseFixture();if(rack){$('hint').textContent=PRODUCTS[rack.pid].name+' · '+S.stock[rack.pid]+' im Lager · E / Leertaste: Bestand & Nachbestellen';$('actionLabel').textContent='Lagerregal';}}
}
function setupCamera(){
 legacySetupCamera();setupDepartmentCamera();const st=layout().store;if(editing()||!inRect(Math.floor(S.player.x+.5),Math.floor(S.player.y+.7),st))return;
 const width=cv.width,height=cv.height,scale=Math.min(width/(T*9),height/(T*7))*S.zoom,left=OX+st[0]*T-20,right=OX+(st[2]+1)*T+20,top=OY+st[1]*T-95,bottom=OY+(st[3]+1)*T+30;
 const clamp=(v,a,b)=>a>b?(a+b)/2:Math.max(a,Math.min(b,v)),cx=clamp(OX+(S.player.x+.5)*T,left+width/scale/2,right-width/scale/2),cy=clamp(OY+(S.player.y+.4)*T,top+height/scale/2,bottom-height/scale/2);camera={scale,x:width/2-cx*scale,y:height/2-cy*scale};
}
function repairCheckoutQueues(force=false){
 if(payment)return;const tills=S.furniture.filter(f=>['checkout','self'].includes(f.kind)),geometry=tills.map(f=>f.x+','+f.y+','+(f.rot||0)).join('|');
 for(const c of customers)if(c.state==='queue'&&!tills.includes(c.target))queue(c);
 if(force||repairCheckoutQueues.geometry!==geometry){repairCheckoutQueues.geometry=geometry;for(const f of tills)refreshQueue(f);}
 for(const f of tills){const c=queueHead(f),goal=neighbors(f)[0];if(!c||!goal)continue;if(!c.path?.length&&distance(c,{x:goal[0],y:goal[1]})>.45)refreshQueue(f);}
}

