const genres=["Puzzles","Action","RPGs","Simulators","Horror"];
const games=[
{title:"Portal 2",genres:["Puzzles"],platform:"PC",link:"https://store.steampowered.com/app/620/Portal_2/",desc:"Physics puzzle adventure."},
{title:"The Witness",genres:["Puzzles"],platform:"PC/Console",link:"https://store.steampowered.com/app/210970/The_Witness/",desc:"Island mystery puzzles."},
{title:"Baba Is You",genres:["Puzzles"],platform:"PC/Switch",link:"https://store.steampowered.com/app/736260/Baba_Is_You/",desc:"Rule-changing puzzles."},
{title:"DOOM Eternal",genres:["Action"],platform:"PC/Console",link:"https://store.steampowered.com/app/782330/DOOM_Eternal/",desc:"Fast action shooter."},
{title:"Titanfall 2",genres:["Action"],platform:"PC/Console",link:"https://store.steampowered.com/app/1237970/Titanfall_2/",desc:"Mobility focused combat."},
{title:"Hades",genres:["Action","RPGs"],platform:"PC/Switch",link:"https://store.steampowered.com/app/1145360/Hades/",desc:"Award-winning roguelike."},
{title:"Skyrim",genres:["RPGs"],platform:"Multi-platform",link:"https://elderscrolls.bethesda.net/",desc:"Open world fantasy RPG."},
{title:"Baldur's Gate 3",genres:["RPGs"],platform:"PC/PS5",link:"https://baldursgate3.game/",desc:"Party-based role playing."},
{title:"Stardew Valley",genres:["Simulators","RPGs"],platform:"Multi-platform",link:"https://www.stardewvalley.net/",desc:"Farm and life simulation."},
{title:"The Sims 4",genres:["Simulators"],platform:"PC/Console",link:"https://www.ea.com/games/the-sims/the-sims-4",desc:"Life simulation."},
{title:"Cities Skylines",genres:["Simulators"],platform:"Multi-platform",link:"https://www.paradoxinteractive.com/games/cities-skylines",desc:"City builder."},
{title:"Phasmophobia",genres:["Horror"],platform:"PC",link:"https://store.steampowered.com/app/739630/Phasmophobia/",desc:"Co-op ghost hunting."},
{title:"Resident Evil 4",genres:["Horror","Action"],platform:"Multi-platform",link:"https://www.residentevil.com/re4/",desc:"Survival horror action."},
{title:"Dead Space",genres:["Horror","Action"],platform:"PC/Console",link:"https://www.ea.com/games/dead-space",desc:"Sci-fi horror."}
];
genres.forEach(g=>genreArea.insertAdjacentHTML('beforeend',`<label><input type="checkbox" value="${g}"> ${g}</label>`));
let selected=null;
function toggle(){const gm=document.querySelector('[value="game"]').checked;gameArea.hidden=!gm;genreArea.hidden=gm;}
document.querySelectorAll('[name="mode"]').forEach(r=>r.addEventListener('change',toggle));toggle();
search.addEventListener('input',()=>{matches.innerHTML='';games.filter(g=>g.title.toLowerCase().includes(search.value.toLowerCase())).forEach(g=>{const b=document.createElement('button');b.textContent=g.title;b.onclick=()=>{selected=g;selectedGame.textContent='Selected: '+g.title};matches.appendChild(b);});});
recommend.onclick=()=>{msg.textContent='';let rec=[];if(document.querySelector('[value="genre"]').checked){const chosen=[...document.querySelectorAll('#genreArea input:checked')].map(x=>x.value);if(!chosen.length){msg.textContent='Please select at least one genre.';return;}rec=games.map(g=>({...g,score:g.genres.filter(x=>chosen.includes(x)).length})).filter(g=>g.score>0).sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title)).slice(0,5);}else{if(!selected){msg.textContent='Please select a game.';return;}rec=games.filter(g=>g.title!==selected.title).map(g=>({...g,score:g.genres.filter(x=>selected.genres.includes(x)).length})).filter(g=>g.score>0).sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title)).slice(0,5);}results.innerHTML='<h3 style="grid-column:1/-1">Your Game Recommendations</h3>'+rec.map(g=>`<article class="result"><div class="cover">Image Unavailable</div><h4>${g.title}</h4><p>${g.desc}</p><p>${g.genres.map(x=>`<span class="genre">${x}</span>`).join('')}</p><p><strong>Why Recommended:</strong> Genre match.</p><p><strong>Platform:</strong> ${g.platform}</p><a target="_blank" href="${g.link}">View Game</a></article>`).join('');};