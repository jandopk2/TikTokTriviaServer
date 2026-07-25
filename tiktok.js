import TikTokLiveConnector 
    from "tiktok-live-connector";


let connection = null;

let chatHandler = null;



export function setChatHandler(handler){

    chatHandler = handler;

}



export async function connectTikT(username){


    try{


        connection =
new TikTokLiveConnector.WebcastPushConnection(
    jandopk2 
);



        await connection.connect();



        console.log(
            "TikTok conectado:",
            username
        );



        connection.on(
            "chat",
            (data)=>{


                const user =
                data.uniqueId;



                const message =
                data.comment;



                console.log(
                    "CHAT:",
                    user,
                    message
                );



                if(chatHandler){


                    chatHandler(
                        user,
                        message
                    );


                }


            }
        );



        connection.on(
            "disconnected",
            ()=>{


                console.log(
                    "TikTok desconectado"
                );


                setTimeout(
                    ()=>{
                        connectTikTok(username);
                    },
                    5000
                );


            }
        );



        connection.on(
            "error",
            (error)=>{


                console.log(
                    "Error TikTok:",
                    error.message
                );


            }
        );



    }
    catch(error){


        console.log(
            "No se pudo conectar:",
            error.message
        );


        setTimeout(
            ()=>{
                connectTikTok(username);
            },
            10000
        );


    }


}
