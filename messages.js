export function questionMessage(question){

    return {

        type:"QUESTION",

        data:question

    };

}



export function winnerMessage(user, points){

    return {

        type:"WINNER",

        data:{

            user:user,

            points:points

        }

    };

}



export function leaderboardMessage(players){

    return {

        type:"LEADERBOARD",

        data:players

    };

}



export function timerMessage(seconds){

    return {

        type:"TIMER",

        data:{

            seconds:seconds

        }

    };

}



export function roundStartMessage(round){

    return {

        type:"ROUND_START",

        data:round

    };

}



export function roundEndMessage(){

    return {

        type:"ROUND_END",

        data:{}

    };

}
