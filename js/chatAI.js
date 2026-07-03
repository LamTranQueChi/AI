let sessionId = localStorage.getItem("sessionId");

if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("sessionId", sessionId);
}
const textarea = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");
const refreshBtn = document.getElementById("refreshBtn");
const attachBtn = document.getElementById("attachBtn");
const fileInput = document.getElementById("fileInput");
const voiceBtn = document.getElementById("voiceBtn");
const voiceStatus = document.getElementById("voiceStatus");

let mediaRecorder;
let audioChunks = [];
let isRecording = false;
let selectedFile = null;
    // tự tăng chiều cao textarea
    textarea.addEventListener("input", () => {
    textarea.style.height = "40px";
    textarea.style.height = textarea.scrollHeight + "px";
});

//tạo tin nhắn 
function addMessage(text, sender) {

    const message = document.createElement("div");
    message.className = `message ${sender}`;
    if (sender === "user") {

        message.innerHTML = `
            <div class="bubble">${text}</div>
        `;

    } else {

        message.innerHTML = `
            <div class="avatar">
                <span class="material-symbols-outlined">
                    smart_toy
                </span>
            </div>

            <div class="bubble">
                ${text}
            </div>
        `;

    }

    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;

}

function addLoading() {
    const message = document.createElement("div");

    message.className = "message ai";
    message.id = "loadingMessage";
    message.innerHTML = `
        <div class="avatar">
            <span class="material-symbols-outlined">
                smart_toy
            </span>
        </div>

        <div class="bubble loading">
            Đang trả lời<span class="dots"></span>
        </div>
    `;

    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
//xó loading
function removeLoading() {

    const loading = document.getElementById("loadingMessage");

    if (loading) {
        loading.remove();
    }

}

// Lưu lịch sử chat
function saveHistory(sender, text) {
    const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
    history.push({
        sender,
        text
    });
    localStorage.setItem("chatHistory", JSON.stringify(history));

}

// Tải lịch sử chat
function loadHistory() {
    const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatMessages.innerHTML = "";
    history.forEach(item => {
        addMessage(item.text, item.sender);
    });
}

sendBtn.addEventListener("click", sendMessage);
function sendMessage() {
    const text = textarea.value.trim();
    if (!text && !selectedFile) return;

    if (text) {
        addMessage(text, "user");
        saveHistory("user", text);
    }

    if (selectedFile) {
        addMessage(
            `📄 Đã gửi: ${selectedFile.name}`,
            "user"
        );

        selectedFile = null;
        fileInput.value = "";

        filePreview.innerHTML = "";
        filePreview.classList.add("hidden");
    }
    textarea.value = "";
    textarea.style.height = "40px";
    
    sendBtn.disabled = true;
    textarea.disabled = true;

    addLoading();

    fetch("http://localhost:3000/chat", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            question: text,
            sessionId: sessionId
        })

    })
    .then(response => response.json())
    .then(data => {
        removeLoading();
        console.log(data);

        // Hiển thị câu trả lời AI
        const reply =
            data.object?.sb?.card_data?.[0]?.text ||
            "Xin lỗi, tôi chưa có câu trả lời.";

        addMessage(reply, "ai");
        saveHistory("ai", reply);

    })
    .catch(err => {

        removeLoading();
        console.error(err);
        addMessage(
            "Không thể kết nối SmartBot.",
            "ai"
        );

    })
    .finally(() => {

        sendBtn.disabled = false;
        textarea.disabled = false;
        textarea.focus();

    });
}

textarea.addEventListener("keydown", (e) => {

    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }

});

//reset chat
function resetChat() {

    chatMessages.innerHTML = `
        <div class="message ai">

            <div class="avatar">
                <span class="material-symbols-outlined">
                    smart_toy
                </span>
            </div>

            <div class="bubble">
                Xin chào Quế Chi 👋<br>
                Tôi có thể hỗ trợ gì cho bạn hôm nay?
            </div>

        </div>
    `;
    textarea.value = "";
    textarea.style.height = "40px";
    textarea.focus();
    localStorage.removeItem("chatHistory");
}

//hỏi xác nhận trước khi reset đoạn chat
refreshBtn.addEventListener("click", () => {

    const ok = confirm("Bạn có muốn bắt đầu cuộc trò chuyện mới không?");

    if (!ok) return;

    resetChat();

});

attachBtn.addEventListener("click", () => {
    fileInput.click();
});

const filePreview = document.getElementById("filePreview");

fileInput.addEventListener("change", () => {

    if (fileInput.files.length === 0) return;
    selectedFile = fileInput.files[0];
    filePreview.classList.remove("hidden");

    filePreview.innerHTML = `
        <div class="file-card">
            <span>📄 ${selectedFile.name}</span>
            <button id="removeFile">✕</button>
        </div>
    `;

    document.getElementById("removeFile").addEventListener("click", () => {
        selectedFile = null;
        fileInput.value = "";
        filePreview.innerHTML = "";
        filePreview.classList.add("hidden");
    });

});

// Khi mở trang, tải lịch sử chat
loadHistory();
voiceBtn.addEventListener("click", toggleRecording);

async function toggleRecording() {

    if (!isRecording) {

        try {

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });

            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            mediaRecorder.ondataavailable = (e) => {
                audioChunks.push(e.data);
            };

            mediaRecorder.onstop = async () => {

                const audioBlob = new Blob(audioChunks, {
                    type: "audio/webm"
                });

                await sendVoice(audioBlob);
                stream.getTracks().forEach(track => track.stop());

            };

            mediaRecorder.start();
            isRecording = true;
            voiceBtn.classList.add("recording");
            voiceBtn.innerHTML = `
                <span class="material-symbols-outlined">
                    mic
                </span>
            `;

        // Tự dừng sau 5 giây
        setTimeout(() => {

            if (isRecording) {
                mediaRecorder.stop();
                isRecording = false;
                voiceBtn.classList.remove("recording");
                voiceBtn.innerHTML = `
                    <span class="material-symbols-outlined">
                        mic
                    </span>
                `;
            }

        }, 5000);
                    
        } catch (err) {

            alert("Không thể sử dụng microphone.");

            console.error(err);

        }

    } else {

        mediaRecorder.stop();
        isRecording = false;
        voiceBtn.innerHTML = `
            <span class="material-symbols-outlined">
                mic
            </span>
        `;
    }
}

async function sendVoice(audioBlob) {
    console.log("Đã gọi sendVoice");

    const formData = new FormData();
    formData.append("audioFile", audioBlob, "voice.webm");

    console.log("Đang gửi request tới backend...");

    addLoading();

    try {
        const res = await fetch("http://localhost:3000/speech-to-text", {
            method: "POST",
            body: formData
        });

        console.log("Status:", res.status);

        const data = await res.json();
        removeLoading();

        console.log("STT Response:", data);

        const text = data.text || "";

        if (!text) {
            addMessage("Không nhận dạng được giọng nói.", "ai");
            return;
        }

        textarea.value = text;
        sendMessage();

    } catch (err) {
        removeLoading();
        console.error("Fetch lỗi:", err);
        addMessage("Không thể nhận dạng giọng nói.", "ai");
    }
}