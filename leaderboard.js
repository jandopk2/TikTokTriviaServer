let players = {};


export function addPoint(user){

    if(!players[user]){

        players[user]=0;

    }


    players[user]++;

}



export function getLeaderboard(){

    return Object
    .entries(players)
    .sort(
        (a,b)=>b[1]-a[1]
    )
    .slice(0,10)
    .map(player=>({

        user:player[0],

        score:player[1]

    }));

}
