const genres=["Puzzles","Action","RPGs","Simulators","Horror"];const games=[
{name:"Portal 2",genres:["Puzzles"],platform:"PC",link:"https://store.steampowered.com/app/620/Portal_2/",desc:"Solve physics puzzles."},
{name:"The Witness",genres:["Puzzles"] ,platform:"PC/Console",link:"https://the-witness.net/",desc:"Island puzzle exploration."},
{name:"Baba Is You",genres:["Puzzles"],platform:"PC/Switch",link:"https://babaiswiki.fandom.com",desc:"Rule-changing puzzles."},
{name:"Tetris Effect",genres:["Puzzles"],platform:"Multi-platform",link:"https://www.tetriseffect.game/",desc:"Modern Tetris."},
{name:"Talos Principle",genres:["Puzzles"],platform:"PC/Console",link:"https://www.croteam.com",desc:"Philosophical puzzles."},
{name:"DOOM Eternal",genres:["Action"],platform:"PC/Console",link:"https://bethesda.net/",desc:"High-speed shooter."},
{name:"Titanfall 2",genres:["Action"],platform:"PC/Console",link:"https://www.ea.com",desc:"Movement-focused action."},
{name:"Hades",genres:["Action","RPGs"],platform:"PC/Switch",link:"https://www.supergiantgames.com/games/hades/",desc:"Action roguelike."},
{name:"Devil May Cry 5",genres:["Action"],platform:"PC/Console",link:"https://www.capcom.com",desc:"Stylish combat."},
{name:"Control",genres:["Action"],platform:"PC/Console",link:"https://www.remedygames.com",desc:"Supernatural action."},
{name:"Skyrim",genres:["RPGs"],platform:"Multi-platform",link:"https://elderscrolls.bethesda.net/",desc:"Epic fantasy RPG."},
{name:"Baldurs Gate 3",genres:["RPGs"],platform:"PC/PS5",link:"https://baldursgate3.game/",desc:"Party-based RPG."},
{name:"The Witcher 3",genres:["RPGs"],platform:"Multi-platform",link:"https://www.thewitcher.com",desc:"Story-rich RPG."},
{name:"Mass Effect Legendary Edition",genres:["RPGs","Action"],platform:"PC/Console",link:"https://www.ea.com",desc:"Sci-fi RPG."},
{name:"Persona 5 Royal",genres:["RPGs"],platform:"Multi-platform",link:"https://atlus.com",desc:"Stylish JRPG."},
{name:"Stardew Valley",genres:["Simulators","RPGs"],platform:"Multi-platform",link:"https://www.stardewvalley.net/",desc:"Farm life simulation."},
{name:"The Sims 4",genres:["Simulators"],platform:"PC/Console",link:"https://www.ea.com/games/the-sims/the-sims-4",desc:"Life simulator."},
{name:"Microsoft Flight Simulator",genres:["Simulators"],platform:"PC/Xbox",link:"https://www.flightsimulator.com",desc:"Flight simulation."},
{name:"Cities Skylines",genres:["Simulators"],platform:"Multi-platform",link:"https://www.paradoxinteractive.com",desc:"City builder."},
{name:"PowerWash Simulator",genres:["Simulators"],platform:"Multi-platform",link:"https://www.futurlab.co.uk",desc:"Relaxing cleaning sim."},
{name:"Phasmophobia",genres:["Horror"],platform:"PC",link:"https://store.steampowered.com/app/739630/",desc:"Ghost hunting."},
{name:"Resident Evil 4",genres:["Horror","Action"],platform:"Multi-platform",link:"https://www.residentevil.com/",desc:"Survival horror."},
{name:"Dead Space",genres:["Horror","Action"],platform:"PC/Console",link:"https://www.ea.com",desc:"Sci-fi horror."},
{name:"Alien Isolation",genres:["Horror"],platform:"Multi-platform",link:"https://www.sega.com",desc:"Stealth horror."},
{name:"Amnesia The Bunker",genres:["Horror"],platform:"PC/Console",link:"https://www.frictionalgames.com",desc:"Tense horror."}];
while(games.length<35){games.push({...games[games.length%25],name:games[games.length%25].name+' Edition '+games.length});}
const ga=document.getElementById('genreArea');genres.forEach(g=>ga.insertAdjacentHTML('beforeend',`<label><input type="checkbox" value="${g}"> ${g}</label>`));
let selectedGame=null,dirty=false;function mark(){dirty=true;document.getElementById('changed').textContent='Selections changed. Click Get Recommendations to refresh.'}
document.addEventListener('change',e=>{if(e.target.matches('input')) mark();});
search.oninput=()=>{searchResults.innerHTML='';const q=search.value.toLowerCase();games.filter(g=>g.name.toLowerCase().includes(q)).slice(0,10).forEach(g=>{const b=document.createElement('button');b.textContent=g.name;b.onclick=()=>{selectedGame=g;selectedGameText()};searchResults.appendChild(b);});};
function selectedGameText(){document.getElementById('selectedGame').textContent='Selected Game: '+selectedGame.name;}
getRec.onclick=()=>{error.textContent='';let rec=[];const mode=document.querySelector('[name=mode]:checked').value;if(mode==='genre'){const chosen=[...document.querySelectorAll('#genreArea input:checked')].map(x=>x.value);if(!chosen.length){error.textContent='Please select at least one genre.';return;}rec=games.map(g=>({...g,score:g.genres.filter(x=>chosen.includes(x)).length,why:'Matches '+g.genres.filter(x=>chosen.includes(x)).join(', ')})).filter(g=>g.score>0);}else{if(!selectedGame){error.textContent='Please select a valid game.';return;}rec=games.filter(g=>g.name!==selectedGame.name).map(g=>({...g,score:g.genres.filter(x=>selectedGame.genres.includes(x)).length,why:'Shares genres with '+selectedGame.name})).filter(g=>g.score>0);}rec.sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name));rec=rec.slice(0,5);resultsArea.innerHTML='<h3>Your Game Recommendations</h3><div id="resultsGrid">'+rec.map(g=>`<article class="result-card"><div style="height:180px;background:#334155;display:flex;align-items:center;justify-content:center">Game Cover Placeholder</div><h4>${g.name}</h4><p>${g.desc}</p><p>${g.genres.map(x=>`<span class='badge'>${x}</span>`).join(' ')}</p><p><strong>Why:</strong> ${g.why}</p><p>${g.platform}</p><a target="_blank" href="${g.link}">View Game</a></article>`).join('')+'</div>';dirty=false;changed.textContent='';};