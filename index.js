import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";

import { CONFIG } from "./config.js";

import {
    getQuestion,
    checkAnswer,
    nextQuestion
} from "./game.js";

import {
    addPoint,
    getLeaderboard
} from "./leaderboard.js";

import {
    questionMessage,
    winnerMessage,
    leaderboardMessage,
    timerMessage,
    roundStartMessage,
    roundEndMessage
} from "./messages.js";

import {
    startTimer,
    stopTimer
} from "./timer.js";

import {
    startRound,
    nextRoundQuestion
} from "./round.js";

import {
    connectTikTok,
    setChatHandler
} from "./tiktok.js";


const app = express();

app.use(cors());



const server = app.listen(
    CONFIG.port,
    ()=>{
        console.log(
            "Servidor activo en puerto",
            CONFIG.port
        );
    }
);



const wss =
new WebSocketServer({
    server
});



let clients = [];



function broadcast(data){

    const message =
    JSON.stringify(data);


    clients.forEach(client=>{

        if(client.readyState === 1){

            client.send(message);

        }

    });

}



wss.on(
"connection",
(ws)=>{


    console.log(
        "APK conectada"
    );


    clients.push(ws);


    ws.send(
        JSON.stringify(
            questionMessage(
                getQuestion()
            )
        )
    );


    ws.send(
        JSON.stringify(
            leaderboardMessage(
                getLeaderboard()
            )
        )
    );


});



function sendQuestion(){


    broadcast(
        questionMessage(
            getQuestion()
        )
    );



    startTimer(
        20,
        (seconds)=>{

            broadcast(
                timerMessage(seconds)
            );

        }
    );

}



function startGame(){


    broadcast(
        roundStartMessage(
            startRound()
        )
    );


    sendQuestion();

}



function processAnswer(
user,
message
){


    const result =
    checkAnswer(
        user,
        message
    );


    if(result){


        addPoint(user);


        stopTimer();


        broadcast(
            winnerMessage(
                user,
                1
            )
        );


        broadcast(
            leaderboardMessage(
                getLeaderboard()
            )
        );



        setTimeout(()=>{


            const next =
            nextRoundQuestion();



            if(next.finished){


                broadcast(
                    roundEndMessage()
                );


                setTimeout(
                    startGame,
                    5000
                );


            }
            else{


                nextQuestion();


                sendQuestion();


            }


        },3000);


    }


}



setChatHandler(
    processAnswer
);



connectTikTok(
    CONFIG.tiktokUser
);



setTimeout(
    startGame,
    2000
);



app.get(
"/status",
(req,res)=>{

    res.json({

        online:true,

        tiktok:
        CONFIG.tiktokUser,

        players:
        getLeaderboard()

    });

});
