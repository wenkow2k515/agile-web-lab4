const target = "CRAZE";

function wordle() {
    let guess = document.getElementById("guess").value.toUpperCase();
    if (target.length !== 5 || guess.length !== 5) {
        document.getElementById("answer").innerHTML = "Please input a string with a length of 5.";
        return;
    }

    let outcome = Array(5).fill(0);
    let targetCount = {};

    // Count occurrences of each letter in the target word
    for (let i = 0; i < target.length; i++) {
        targetCount[target[i]] = (targetCount[target[i]] || 0) + 1;
    }

    // First pass: Check for correct positions (green)
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === target[i]) {
            outcome[i] = 2; // Green
            targetCount[guess[i]]--; // Decrease count for matched letter
        }
    }

    // Second pass: Check for wrong positions (yellow)
    for (let i = 0; i < guess.length; i++) {
        if (outcome[i] === 0 && targetCount[guess[i]] > 0) {
            outcome[i] = 1; // Yellow
            targetCount[guess[i]]--; // Decrease count for matched letter
        }
    }

    // Display the result with colors
    const resultContainer = document.getElementById("answer");
    resultContainer.innerHTML = ""; // Clear previous results

    for (let i = 0; i < outcome.length; i++) {
        const span = document.createElement("span");
        span.textContent = guess[i];
        if (outcome[i] === 2) {
            span.style.backgroundColor = "green"; // Green for correct position
        } else if (outcome[i] === 1) {
            span.style.backgroundColor = "orange"; // Orange for wrong position
        } else {
            span.style.backgroundColor = "gray"; // Gray for incorrect letter
        }
        resultContainer.appendChild(span);
    }
}



function hint(){
    document.getElementById("hintc").innerHTML = "Input a string of 5 len to guess the word"
}

function addFinder() {
    // Create a textfield and add it to the top of the page
    const textField = document.createElement("input");
    textField.type = "text";
    textField.placeholder = "Search...";
    textField.style.marginBottom = "10px";
    document.body.insertBefore(textField, document.body.firstChild);

    // Add an event listener to handle input changes
    textField.addEventListener("input", function () {
        const searchText = textField.value.toLowerCase();

        // Remove previous highlights
        const highlightedElements = document.querySelectorAll(".highlight");
        highlightedElements.forEach((el) => {
            const parent = el.parentNode;
            parent.replaceChild(document.createTextNode(el.textContent), el);
        });

        // Search and highlight matches
        const textNodes = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while ((node = walker.nextNode())) {
            textNodes.push(node);
        }

        textNodes.forEach((textNode) => {
            const textContent = textNode.nodeValue;
            const index = textContent.toLowerCase().indexOf(searchText);
            if (searchText && index !== -1) {
                const span = document.createElement("span");
                span.className = "highlight";
                span.style.backgroundColor = "yellow";
                span.textContent = textContent.substring(index, index + searchText.length);

                const before = document.createTextNode(textContent.substring(0, index));
                const after = document.createTextNode(textContent.substring(index + searchText.length));

                const parent = textNode.parentNode;
                parent.replaceChild(after, textNode);
                parent.insertBefore(span, after);
                parent.insertBefore(before, span);
            }
        });
    });
}