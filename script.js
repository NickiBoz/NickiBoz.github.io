const genres=["Puzzles","Action","RPGs","Simulators","Horror"];
const games=[
{title:"Portal 2",genres:["Puzzles"],platform:"PC",link:"https://store.steampowered.com/app/620/Portal_2/"},
{title:"The Witness",genres:["Puzzles"],platform:"PC",link:"https://store.steampowered.com/app/210970/The_Witness/"},
{title:"Baba Is You",genres:["Puzzles"],platform:"PC",link:"https://store.steampowered.com/app/736260/Baba_Is_You/"},
{title:"Tetris Effect",genres:["Puzzles"],platform:"PC",link:"https://store.steampowered.com/app/1003590/Tetris_Effect_Connected/"},
{title:"Talos Principle",genres:["Puzzles"],platform:"PC",link:"https://store.steampowered.com/app/257510/The_Talos_Principle/"},
{title:"DOOM Eternal",genres:["Action"],platform:"PC",link:"https://store.steampowered.com/app/782330/DOOM_Eternal/"},
{title:"Titanfall 2",genres:["Action"],platform:"PC",link:"https://store.steampowered.com/app/1237970/Titanfall_2/"},
{title:"Hades",genres:["Action","RPGs"],platform:"PC",link:"https://store.steampowered.com/app/1145360/Hades/"},
{title:"Control",genres:["Action"],platform:"PC",link:"https://store.steampowered.com/app/870780/Control_Ultimate_Edition/"},
{title:"Devil May Cry 5",genres:["Action"],platform:"PC",link:"https://store.steampowered.com/app/601150/Devil_May_Cry_5/"},
{title:"Skyrim",genres:["RPGs"],platform:"Multi-platform",link:"https://elderscrolls.bethesda.net/en/skyrim"},
{title:"Baldur's Gate 3",genres:["RPGs"],platform:"PC",link:"https://baldursgate3.game/"},
{title:"The Witcher 3",genres:["RPGs"],platform:"Multi-platform",link:"https://www.thewitcher.com/us/en/witcher3"},
{title:"Persona 5 Royal",genres:["RPGs"],platform:"Multi-platform",link:"https://persona.atlus.com/p5r/"},
{title:"Mass Effect Legendary Edition",genres:["RPGs"],platform:"PC",link:"https://www.ea.com/games/mass-effect/mass-effect-legendary-edition"},
{title:"Stardew Valley",genres:["Simulators","RPGs"],platform:"Multi-platform",link:"https://www.stardewvalley.net/"},
{title:"The Sims 4",genres:["Simulators"],platform:"PC",link:"https://www.ea.com/games/the-sims/the-sims-4"},
{title:"Cities Skylines",genres:["Simulators"],platform:"PC",link:"https://store.steampowered.com/app/255710/Cities_Skylines/"},
{title:"Microsoft Flight Simulator",genres:["Simulators"],platform:"PC/Xbox",link:"https://www.flightsimulator.com/"},
{title:"Planet Coaster",genres:["Simulators"],platform:"PC",link:"https://store.steampowered.com/app/493340/Planet_Coaster/"},
{title:"PowerWash Simulator",genres:["Simulators"],platform:"PC",link:"https://store.steampowered.com/app/1290000/PowerWash_Simulator/"},
{title:"Phasmophobia",genres:["Horror"],platform:"PC",link:"https://store.steampowered.com/app/739630/Phasmophobia/"},
{title:"Resident Evil 4",genres:["Horror","Action"],platform:"Multi-platform",link:"https://www.residentevil.com/re4/"},
{title:"Dead Space",genres:["Horror","Action"],platform:"PC",link:"https://www.ea.com/games/dead-space"},
{title:"Alien Isolation",genres:["Horror"],platform:"Multi-platform",link:"https://store.steampowered.com/app/214490/Alien_Isolation/"},
{title:"SOMA",genres:["Horror"],platform:"PC",link:"https://store.steampowered.com/app/282140/SOMA/"},
{title:"Outlast",genres:["Horror"],platform:"PC",link:"https://store.steampowered.com/app/238320/Outlast/"},
{title:"Amnesia The Bunker",genres:["Horror"],platform:"PC",link:"https://store.steampowered.com/app/1944430/Amnesia_The_Bunker/"},
{title:"Project Zomboid",genres:["Horror"],platform:"PC",link:"https://store.steampowered.com/app/108600/Project_Zomboid/"},
{title:"Darkest Dungeon",genres:["RPGs"],platform:"PC",link:"https://store.steampowered.com/app/262060/Darkest_Dungeon/"}];
genres.forEach(g=>genreArea.insertAdjacentHTML('beforeend',`<label><input type="checkbox" value="${g}"> ${g}</label>`));
let selected=null;function toggle(){const game=document.querySelector('[value="game"]').checked;gameArea.hidden=!game;genreArea.hidden=game;}document.querySelectorAll('[name="mode"]').forEach(r=>r.addEventListener('change',toggle));toggle();
search.addEventListener('input',()=>{matches.innerHTML='';games.filter(g=>g.title.toLowerCase().includes(search.value.toLowerCase())).slice(0,8).forEach(g=>{const b=document.createElement('button');b.textContent=g.title;b.onclick=()=>{selected=g;selectedGame.textContent='Selected: '+g.title};matches.appendChild(b);});});
recommend.onclick=()=>{let rec=[];msg.textContent='';if(document.querySelector('[value="genre"]').checked){const c=[...document.querySelectorAll('#genreArea input:checked')].map(x=>x.value);if(!c.length){msg.textContent='Please select a genre';return;}rec=games.filter(g=>g.genres.some(x=>c.includes(x))).slice(0,5);}else{if(!selected){msg.textContent='Please select a game';return;}rec=games.filter(g=>g.title!==selected.title&&g.genres.some(x=>selected.genres.includes(x))).slice(0,5);}results.innerHTML=rec.map(g=>`<article class="result"><h3>${g.title}</h3><p>${g.genres.join(', ')}</p><p><strong>Why Recommended:</strong> Shares matching genre characteristics.</p><p>${g.platform}</p><a class="game-link" href="${g.link}" target="_blank" rel="noopener">View Game</a></article>`).join('');};