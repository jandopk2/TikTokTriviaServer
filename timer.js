let interval = null;


export function startTimer(seconds, callback){

    if(interval){

        clearInterval(interval);

    }


    let time = seconds;


    callback(time);



    interval = setInterval(()=>{


        time--;


        callback(time);



        if(time <= 0){


            clearInterval(interval);

            interval = null;


        }


    },1000);


}



export function stopTimer(){


    if(interval){


        clearInterval(interval);

        interval = null;

    }


}
