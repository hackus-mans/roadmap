(function(){
  const root=document.getElementById("roadmapRoot");
  if(!root || !window.ROADMAP_STAGES) return;

  const KEY="osr-progress-v2";
  let progress={};
  try{progress=JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){progress={}}

  function id(stage,module){return stage.id+"-"+module.n}
  function save(){localStorage.setItem(KEY,JSON.stringify(progress));updateProgress()}
  function updateProgress(){
    const all=[];
    ROADMAP_STAGES.forEach(s=>s.modules.forEach(m=>all.push(id(s,m))));
    const done=all.filter(x=>progress[x]).length;
    const pct=all.length?Math.round(done/all.length*100):0;
    document.getElementById("progressPercent").textContent=pct+"%";
    document.getElementById("doneCount").textContent=done;
    document.getElementById("totalCount").textContent=all.length;
    document.getElementById("progressFill").style.width=pct+"%";
  }
  function esc(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]))}
  function render(){
    root.innerHTML=ROADMAP_STAGES.map(stage=>{
      const mods=stage.modules.map(m=>{
        const mid=id(stage,m);
        const res=m.resources.map(r=>`<a target="_blank" rel="noreferrer" href="${r[1]}">${esc(r[0])} ↗</a>`).join("");
        return `<article class="module-card">
          <div class="module-summary" tabindex="0" role="button" aria-expanded="false">
            <div class="module-index">${m.n}</div>
            <div class="module-title"><h3>${esc(m.title)}</h3><p>${esc(m.summary)}</p></div>
            <div class="module-meta"><span class="mini-pill ${m.type==="CORE"?"core":""}">${m.type}</span><span class="mini-pill">${esc(m.duration)}</span></div>
          </div>
          <div class="module-body">
            <div class="module-columns">
              <div><h4>À maîtriser</h4><ul>${m.learn.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
              <div><h4>Pratique recommandée</h4><ul>${m.practice.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
            </div>
            <div class="exit-criterion">
              <label><input type="checkbox" data-progress="${mid}" ${progress[mid]?"checked":""}><span><strong>Critère de sortie :</strong> ${esc(m.exit)}</span></label>
            </div>
            <div class="resource-links">${res}</div>
          </div>
        </article>`;
      }).join("");
      return `<section class="roadmap-stage" id="${stage.id}">
        <div class="roadmap-stage-head"><span>${stage.label}</span><div><h2>${esc(stage.title)}</h2><p>${esc(stage.desc)}</p></div></div>
        ${mods}
      </section>`;
    }).join("");

    document.querySelectorAll(".module-summary").forEach(el=>{
      const toggle=()=>{const card=el.closest(".module-card");card.classList.toggle("open");el.setAttribute("aria-expanded",card.classList.contains("open")?"true":"false")};
      el.addEventListener("click",toggle);
      el.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();toggle()}});
    });
    document.querySelectorAll("[data-progress]").forEach(cb=>{
      cb.addEventListener("change",()=>{if(cb.checked)progress[cb.dataset.progress]=true;else delete progress[cb.dataset.progress];save()});
    });
    updateProgress();
  }
  document.getElementById("resetProgress").addEventListener("click",()=>{
    if(confirm("Réinitialiser toute la progression enregistrée sur ce navigateur ?")){progress={};save();render()}
  });
  render();
})();