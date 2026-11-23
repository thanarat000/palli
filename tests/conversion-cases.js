// Runs sample conversion cases through the app in a headless browser and prints the resulting orders.
// Usage: npm i playwright && node tests/conversion-cases.js index.html
const {chromium}=require('playwright');
const path=require('path');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:390,height:844}});
const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file://'+path.resolve(process.argv[2]||'index.html'));
await pg.waitForTimeout(500);
// row = [drug, qty, schedule, prn]; schedule: interval hours (oral/bolus), 'cont_h' / 'cont_24' (infusion), PRN count when prn=true
async function setRows(rows){await pg.click('#tabBar button[data-k="meds"]');
  while(await pg.$('#rows .row .del')){await pg.click('#rows .row .del');}
  for(const [i,[drug,qty,sch,prn]] of rows.entries()){
    await pg.click('#addRow');await pg.selectOption('#drug'+i,drug);
    const chips=await pg.$$('#rows .row:nth-child('+(i+1)+') .typechip button');
    if(chips.length>1) await chips[prn?1:0].click();
    if(!prn && typeof sch==='string') await pg.selectOption('#mode'+i,sch);
    await pg.fill('#qty'+i,String(qty));
    if(prn) await pg.fill('#cnt'+i,String(sch));
    else if(typeof sch==='number' && await pg.$('#int'+i)) await pg.selectOption('#int'+i,String(sch));
  }}
async function conv(t){await pg.click('#tabBar button[data-k="conv"]');const btns=await pg.$$('#cvTarget button');const labels=['mst','kap','syr','mocsci','fentcsci','patch'];await btns[labels.indexOf(t)].click();
 return pg.evaluate(()=>({ome:document.querySelector('#cvOme').textContent,lines:[...document.querySelectorAll('#cvOut .order .line')].map(e=>e.firstChild.textContent),alerts:[...document.querySelectorAll('#cvOut .alert span')].map(e=>e.textContent.slice(0,45))}));}
const cases=[
 ['oxycr 20 q12',[['oxycr',2,12,false]],['mst','patch']],
 ['MST prn+methadone',[['mst30',1,2,true],['methadone',1,12,false]],['mst']],
 ['codeine 240',[['codeine',2,6,false]],['mst']],
 ['tramadol 400',[['tramadol',2,6,false]],['mst','syr']],
 ['MST60+syr18',[['mst30',1,12,false],['mosyr',3,3,true]],['mst','kap','mocsci','fentcsci','patch']],
 ['MoSC 20/24h',[['moinj',20,'cont_24',false]],['mst','fentcsci','patch']],
 ['Mo IV 1 mg/h',[['moinj',1,'cont_h',false]],['mst']],
 ['patch 50',[['patch',2,0,false]],['mst','mocsci']],
 ['pethidine 300',[['pethinj',75,6,false]],['mst']],
 ['fent 300mcg',[['fentinj',300,'cont_24',false]],['mst','mocsci']],
 ['high 400 OME',[['mst30',6,12,false],['mst10',2,12,false],['mosyr',10,2,true]],['patch','fentcsci']],
];
for(const [n,rows,ts] of cases){await setRows(rows);
  const ords=await pg.evaluate(()=>[...document.querySelectorAll('#rows .roword')].map(e=>e.innerText.replace(/\n/g,' ')));
  console.log('#',n,JSON.stringify(ords));
  for(const t of ts){console.log(n,'->',t,JSON.stringify(await conv(t)));}}
await setRows([]);await pg.click('#tabBar button[data-k="tit"]');
for(const f of [0,2]){const bs=await pg.$$('#tiForm button');await bs[f].click();
console.log('naive form',f,await pg.evaluate(()=>[...document.querySelectorAll('#tiOut .order .line')].map(e=>e.firstChild.textContent)));}
console.log('ERR',errs);await b.close();})();
