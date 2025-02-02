function showSupport() {
    document.querySelector('.panel').style.display = 'block';
}

function hideSupport() {
    document.querySelector('.panel').style.display = 'none';
}

function toggleChat() {
    const chatWindow = document.querySelector('.chat-window');
    chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value;
    if (message.trim() === '') return;

    const chatContent = document.getElementById('chat-content');
    chatContent.innerHTML += `<p><strong>Вы:</strong> ${message}</p>`;

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer DlWJGSjUANbZ5tRjXI3nHhA8AC6S44OX'
        },
        body: JSON.stringify({
            model: 'mistral-large-latest',
            messages: [{ role: 'user', content: message }]
        })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    chatContent.innerHTML += `<p><strong>Среда:</strong> ${reply}</p>`;
    chatContent.scrollTop = chatContent.scrollHeight;

    input.value = '';
}

function search() {
    const query = document.getElementById('search').value;
    alert(`Поиск: ${query}`);
}