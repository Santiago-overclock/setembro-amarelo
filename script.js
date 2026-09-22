/* =====================================
   MENU MOBILE
===================================== */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("show");

});


/* Fecha o menu quando o usuário
   clica em algum link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

    });

});


/* =====================================
   MENSAGENS DO HUMOR
===================================== */

const moodButtons = document.querySelectorAll(".mood-button");

const messageTitle = document.getElementById("messageTitle");
const messageText = document.getElementById("messageText");

const moodMessages = {

    bem: {
        title: "Que bom saber disso! 💛",
        text: "Aproveite esse momento e, se puder, compartilhe essa sensação positiva com alguém."
    },

    normal: {
        title: "Tudo bem estar apenas levando.",
        text: "Nem todos os dias precisam ser extraordinários. Respeite seu ritmo e cuide de você."
    },

    triste: {
        title: "Você não precisa guardar tudo sozinho.",
        text: "Conversar com alguém de confiança pode ajudar. Procure apoio quando sentir que precisa."
    },

    ansioso: {
        title: "Vamos desacelerar um pouco.",
        text: "Tente respirar lentamente e concentrar sua atenção no momento presente. Você pode fazer uma pausa."
    },

    sobrecarregado: {
        title: "Você não precisa resolver tudo de uma vez.",
        text: "Divida as tarefas em pequenos passos e considere conversar com alguém sobre o que está acontecendo."
    }

};


/* =====================================
   LOCAL STORAGE
===================================== */

function selectMood(mood) {

    moodButtons.forEach(button => {

        button.classList.remove("active");

    });

    const selectedButton =
        document.querySelector(`[data-mood="${mood}"]`);

    if (selectedButton) {

        selectedButton.classList.add("active");

    }

    messageTitle.textContent =
        moodMessages[mood].title;

    messageText.textContent =
        moodMessages[mood].text;

    localStorage.setItem("ultimoHumor", mood);

}


/* Clique nos botões */

moodButtons.forEach(button => {

    button.addEventListener("click", () => {

        const mood = button.dataset.mood;

        selectMood(mood);

    });

});


/* Recupera o último humor salvo */

const savedMood = localStorage.getItem("ultimoHumor");

if (savedMood && moodMessages[savedMood]) {

    selectMood(savedMood);

}


/* =====================================
   MENSAGENS ALEATÓRIAS
===================================== */

const randomMessage = document.getElementById("randomMessage");
const newMessageButton = document.getElementById("newMessage");

const messages = [

    "Você não precisa ter todas as respostas hoje.",

    "Pequenos passos também são progresso.",

    "Pedir ajuda não diminui você.",

    "Seja paciente com o seu próprio processo.",

    "Você merece ser ouvido.",

    "Está tudo bem fazer uma pausa.",

    "Cuidar de você também é uma prioridade.",

    "Não é necessário enfrentar tudo sozinho.",

    "Um dia difícil não define todos os seus dias.",

    "Conversar pode ser o começo de uma mudança."

];


function generateMessage() {

    const randomIndex =
        Math.floor(Math.random() * messages.length);

    randomMessage.textContent =
        messages[randomIndex];

}


newMessageButton.addEventListener("click", generateMessage);


/* =====================================
   EXERCÍCIO DE RESPIRAÇÃO
===================================== */

const breathingCircle =
    document.getElementById("breathingCircle");

const breathingText =
    document.getElementById("breathingText");

const breathingCounter =
    document.getElementById("breathingCounter");

const breathingButton =
    document.getElementById("breathingButton");


let breathingRunning = false;
let breathingTimeout;


/*
    Ciclo:

    Inspirar → 4 segundos
    Segurar   → 4 segundos
    Expirar   → 6 segundos
*/

function breathingCycle() {

    if (!breathingRunning) {
        return;
    }

    // INSPIRAR

    breathingCircle.classList.remove("exhale");
    breathingCircle.classList.add("inhale");

    breathingText.textContent = "Inspire";

    breathingCounter.textContent =
        "Inspire lentamente...";


    breathingTimeout = setTimeout(() => {

        if (!breathingRunning) return;

        // SEGURAR

        breathingText.textContent = "Segure";

        breathingCounter.textContent =
            "Mantenha a respiração tranquila...";


        breathingTimeout = setTimeout(() => {

            if (!breathingRunning) return;

            // EXPIRAR

            breathingCircle.classList.remove("inhale");
            breathingCircle.classList.add("exhale");

            breathingText.textContent = "Expire";

            breathingCounter.textContent =
                "Solte o ar lentamente...";


            breathingTimeout = setTimeout(() => {

                breathingCycle();

            }, 6000);

        }, 4000);

    }, 4000);

}


/* =====================================
   INICIAR / PARAR RESPIRAÇÃO
===================================== */

breathingButton.addEventListener("click", () => {

    if (!breathingRunning) {

        breathingRunning = true;

        breathingButton.textContent =
            "Parar exercício";

        breathingCycle();

    } else {

        breathingRunning = false;

        clearTimeout(breathingTimeout);

        breathingCircle.classList.remove("inhale");
        breathingCircle.classList.remove("exhale");

        breathingText.textContent =
            "Pronto?";

        breathingCounter.textContent =
            "Clique para começar";

        breathingButton.textContent =
            "Começar exercício";

    }

});
