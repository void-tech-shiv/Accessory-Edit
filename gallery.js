"use strict";
function filterProducts(items,query="",category="All",sort="featured"){
  const q=String(query).trim().toLowerCase();
  const matches=items.filter(p=>(category==="All"||p.category===category)&&String(p.name+" "+p.description).toLowerCase().includes(q));
  if(sort==="low")matches.sort((a,b)=>a.price-b.price);
  if(sort==="high")matches.sort((a,b)=>b.price-a.price);
  return matches;
}
if(typeof module!=="undefined"&&module.exports)module.exports={filterProducts};
if(typeof document!=="undefined")document.addEventListener("DOMContentLoaded",()=>{
  const get=id=>document.getElementById(id),gallery=get("gallery"),search=get("search"),category=get("category"),sort=get("sort");
  const items=Array.from(gallery.children).map(card=>({card,name:card.dataset.name,category:card.dataset.category,price:Number(card.dataset.price),description:card.querySelector(".description").textContent}));
  function update(){
    const matches=filterProducts(items,search.value,category.value,sort.value),visible=new Set(matches);
    for(const item of items)item.card.hidden=!visible.has(item);
    for(const item of matches)gallery.append(item.card);
    get("result-count").textContent=matches.length+(matches.length===1?" product":" products");
    get("empty").hidden=matches.length>0;
  }
  search.addEventListener("input",update);category.addEventListener("change",update);sort.addEventListener("change",update);
  get("reset").addEventListener("click",()=>{search.value="";category.value="All";sort.value="featured";update();search.focus();});
  get("filters").hidden=false;update();
});
