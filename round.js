let round = {

    active:false,

    questionNumber:0,

    totalQuestions:10

};



export function startRound(){


    round.active = true;

    round.questionNumber = 1;


    return round;

}



export function nextRoundQuestion(){


    round.questionNumber++;



    if(
        round.questionNumber >
        round.totalQuestions
    ){


        round.active = false;


        return {

            finished:true

        };


    }



    return {

        finished:false,

        questionNumber:
        round.questionNumber,

        totalQuestions:
        round.totalQuestions

    };


}



export function getRound(){

    return round;

}
