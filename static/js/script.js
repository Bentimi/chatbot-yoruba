const chatForm = document.getElementById('chat-form');
        const chatInput = document.getElementById('chat-input');
        const chatHistory = document.getElementById('chat-history');
        const currentTimeElement = document.getElementById('current-time');

        chatForm.addEventListener('submit', function(event){
            event.preventDefault();

            const message = chatInput.value.trim();

            if(message){
                const messageWrapper = document.createElement('div');
                messageWrapper.classList.add('chat_message', 'user');

                const messageElement = document.createElement('div');
                messageElement.classList.add('message', 'user');
                messageElement.textContent = message;
                messageElement.innerHTML = `
            <div class="">
               <p class="font-bold text-green-500">YOU</p>
                <p>${message}</p>
                <p class="text-xs text-end text-gray-300">${getTime()}</p>
                
            </div>
        `;

                messageWrapper.appendChild(messageElement);
                chatHistory.appendChild(messageWrapper);
                chatInput.value ='';

                fetch("{% url 'chatbot_response' %}", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    },
                    body: JSON.stringify({ 'message': message })
                })
                .then(response => response.json())
                .then(data => {
                    const response = data.response;
                    const messageWrapper2 = document.createElement('div');
                    messageWrapper2.classList.add('chat-message', 'ai');

                    const messageElement2 = document.createElement('div');
                    messageElement2.classList.add('message', 'ai');
                    messageElement2.textContent = response;
                //     setTimeout(() => {
                //     addAIMessage(response);
                //     chatHistory.scrollTop = chatHistory.scrollHeight; // Scroll to bottom after adding message
                // }, 10000);
                    messageElement2.innerHTML = `
                    <div class="">
                    <p class="font-bold text-black">CHATBOT</p>
                    <p>${response}</p>
                    <p class="text-xs text-right text-white">${getTime()}</p>
            
                    </div>
                `;


                    messageWrapper2.appendChild(messageElement2);
                    chatHistory.appendChild(messageWrapper2);
                })
                .catch(error => {
                    console.error('Error:', error);
                });

                chatHistory.scrollTop = chatHistory.scrollHeight;
            }
        });

        function getCurrentTime() {
        const now = new Date();
        const year = now.getFullYear().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const sec = now.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${sec} ${year}`;
    }

    setInterval(() => {
        currentTimeElement.textContent = getCurrentTime();
    }, 1000);

        function getTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    setInterval(() => {
        currentTimeElement.textContent = getCurrentTime();
    }, 1000);


        function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        };

