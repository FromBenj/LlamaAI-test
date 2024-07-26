function submitQuestion() {
    const submitButton = document.getElementById("llama-submit");
    const textInput = document.getElementById("llama-input");
    submitButton.addEventListener("click", () => {
        if (answerException(textInput.value)) {
            console.log("Exception");
            renderApiAnswer("Cet homme est un Dieu dans plusieurs pays, je ne peux rien dire d'autre");
            return;
        }

        fetch("/llamaai-api", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: textInput.value,
            }),
        })
        .then(response => response.json())
        .then(data => renderApiAnswer((data)))
        .catch(error => console.error('Frontend - fetch error:', error));
    })
}
submitQuestion();

function renderApiAnswer(data) {
    const llamaAnswer = document.getElementById("llama-answer");
    llamaAnswer.innerHTML = data;
}

function answerException(question) {
    let exception = false;
    const exceptionWords = "David Dielen";
    if (question.includes(specialWords)) {
        return true;
    }
}
