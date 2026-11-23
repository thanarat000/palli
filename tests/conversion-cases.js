// Runs sample conversion cases through the app in a headless browser and prints the resulting orders.
// Usage: npm i playwright && node tests/conversion-cases.js index.html
const {chromium}=require('playwright');
const fs=require('fs');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:390,height:844}});
const errs=[];pg.on('pageerror',e=>errs.push(e.message));
const path=require('path');
await pg.goto('file://'+path.resolve(process.argv[2]||'index.html'));
await pg.waitForTimeout(500);
async function setRows(rows){await pg.click('#tabBar button[data-k="meds"]');
  while(await pg.$('#rows .row .del')){await pg.click('#rows .row .del');}
  for(const [i,r] of rows.entries()){
    await pg.click('#addRow');await pg.selectOption('#drug'+i,r[0]);await pg.fill('#qty'+i,String(r[1]));
    if(r[0]!=='patch')await pg.fill('#freq'+i,String(r[2]));
    const chips=await pg.$$('#rows .row:nth-child('+(i+1)+') .typechip button'); if(chips.length){await chips[r[3]?1:0].click();}
  }}
async function conv(t){await pg.click('#tabBar button[data-k="conv"]');const btns=await pg.$$('#cvTarget button');const labels=['mst','kap','syr','mocsci','fentcsci','patch'];await btns[labels.indexOf(t)].click();
 return pg.evaluate(()=>({ome:document.querySelector('#cvOme').textContent,lines:[...document.querySelectorAll('#cvOut .order .line')].map(e=>e.firstChild.textContent),alerts:[...document.querySelectorAll('#cvOut .alert span')].map(e=>e.textContent.slice(0,45))}));}
const cases=[
 ['tramadol 400',[['tramadol',2,4,false]],['mst','syr']],
 ['MST60+syr18',[['mst30',1,2,false],['mosyr',3,3,true]],['mst','kap','mocsci','fentcsci','patch']],
 ['MoSC 20/24h',[['moinj',20,1,false]],['mst','fentcsci','patch']],
 ['patch 50',[['patch',2,1,false]],['mst','mocsci']],
 ['pethidine 300',[['pethinj',75,4,false]],['mst']],
 ['fent 300mcg',[['fentinj',300,1,false]],['mst','mocsci']],
 ['high 400 OME',[['mst30',6,2,false],['mst10',2,2,false],['mosyr',10,2,true]],['patch','fentcsci']],
];
for(const [n,rows,ts] of cases){await setRows(rows);for(const t of ts){console.log(n,'->',t,JSON.stringify(await conv(t)));}}
await setRows([]);await pg.click('#tabBar button[data-k="tit"]');
for(const f of [0,2]){const bs=await pg.$$('#tiForm button');await bs[f].click();
console.log('naive form',f,await pg.evaluate(()=>[...document.querySelectorAll('#tiOut .order .line')].map(e=>e.firstChild.textContent)));}
await pg.evaluate(()=>{document.querySelector('#egfr').value='80';document.querySelector('#egfr').dispatchEvent(new Event('input'))});
console.log('naive frail',await pg.evaluate(()=>[...document.querySelectorAll('#tiOut .order .line')].map(e=>e.firstChild.textContent)));
console.log('ERR',errs);await b.close();})();
