import questions from "./questions.json" with { type:"json" };


let current = 0;

let answered = false;



export function getQuestion(){


    return {

        id: questions[current].id,

        question: questions[current].question,

        time:20

    };

}



export function checkAnswer(
    user,
    message
){


    if(answered){

        return false;

    }



    const cleanAnswer =
    message
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .trim();



    const correctAnswer =
    questions[current]
    .answer
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .trim();



    if(cleanAnswer === correctAnswer){


        answered = true;


        return {

            user:user,

            correct:true

        };


    }


    return false;

}



export function nextQuestion(){


    current++;


    if(current >= questions.length){

        current = 0;

    }


    answered = false;


    return getQuestion();

}
