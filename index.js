const state = {
  playersList: [],
  playerShowDetails: false,
};

const getDataApi = async () => {
  const res = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-FT/players");
  const response = await res.json();
  state.playersList = response.data.players;
  renderPlayersList();
};

const renderPlayersList = () => {
  const playersListElement = document.getElementById('playersList');
  playersListElement.innerHTML = ""; 

  state.playersList.forEach(player => {
    const li = document.createElement('li');
    renderPlayerDetails(player, li);
    
    li.onclick = () => {
      
      state.playerShowDetails = !state.playerShowDetails;
      renderPlayerDetails(player, li); 
    };
    
    playersListElement.appendChild(li);
  });
};

const renderPlayerDetails = (player, li) => {
  if (state.playerShowDetails) {
    li.innerHTML = `
      <legend><center><strong><marquee>${player.name}🐾</marquee></strong></center></legend>
      <fieldset>
        Details<br>----------------<br>
        Breed: ${player.breed} <br>
        Status: ${player.status} <br>
        Team ID: ${player.teamId} <br>
        Player ID: ${player.id}
        <center><img src="${player.imageUrl}" alt="Player Image"></center>
      </fieldset>
      <br><br>
    `;
  } else {
    li.innerHTML = player.name; 
  }
};

const showDetailsSwitch = () => {
  state.playerShowDetails = !state.playerShowDetails;
  const btn1 = document.getElementById('btn1');
  btn1.textContent = state.playerShowDetails ? "HIDE DETAILS" : "SHOW DETAILS";
  renderPlayersList(); 
};

getDataApi();
