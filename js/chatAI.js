console.log("=== CHAT AI JS ĐÃ LOAD ===");

let sessionId =
    typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : Date.now().toString();
let currentConversationId = localStorage.getItem("currentConversationId");

const chatWrapper = document.querySelector("main .chat-wrapper");
if (!chatWrapper) {
    throw new Error("Không tìm thấy .chat-wrapper");
}

const textarea = chatWrapper.querySelector("#chatInput");
const sendBtn = chatWrapper.querySelector("#sendBtn");
const chatMessages = chatWrapper.querySelector("#chatMessages");

const refreshBtn = chatWrapper.querySelector("#refreshBtn");
const newChatBtn = chatWrapper.querySelector("#newChatBtn");
const historyBtn = chatWrapper.querySelector("#historyBtn");

const attachBtn = chatWrapper.querySelector("#attachBtn");
const fileInput = chatWrapper.querySelector("#fileInput");
const filePreview = chatWrapper.querySelector("#filePreview");

const voiceBtn = chatWrapper.querySelector("#voiceBtn");
const voiceStatus = chatWrapper.querySelector("#voiceStatus");
const voiceHelpBtn = chatWrapper.querySelector("#voiceHelpBtn");



const voiceHelpModal = document.getElementById("voiceHelpModal");
const closeVoiceHelp = document.getElementById("closeVoiceHelp");
const historyPanel = document.getElementById("historyPanel");
const historyOverlay = document.getElementById("historyOverlay");
const closeHistoryBtn = document.getElementById("closeHistoryBtn");
const historySearch = document.getElementById("historySearch");
const conversationList = document.getElementById("conversationList");

console.log("KIỂM TRA DOM:", {
    chatWrapper,
    textarea,
    sendBtn,
    chatMessages,
    refreshBtn,
    newChatBtn,
    historyBtn,
    attachBtn,
    fileInput,
    filePreview,
    voiceBtn,
    voiceStatus
});

const API_BASE_URL ="https://ai-public-assistant-backend.onrender.com";

let currentAudio = null;
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;
let selectedFile = null;

// CONVERSATION DATABASE

async function createConversation() {
    const response = await fetch(`${API_BASE_URL}/conversations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`Tạo conversation thất bại: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success || !data.conversationId) {
        throw new Error("Backend không trả conversationId");
    }

    currentConversationId = data.conversationId;
    localStorage.setItem("currentConversationId", currentConversationId);

    return currentConversationId;
}

async function ensureConversation() {
    if (!currentConversationId) {
        await createConversation();
    }

    return currentConversationId;
}

async function saveMessageToDB(role, content) {
    try {
        const conversationId = await ensureConversation();

        const response = await fetch(
            `${API_BASE_URL}/conversations/${conversationId}/messages`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    role,
                    content
                })
            }
        );

        if (!response.ok) {
            throw new Error(`Lưu message thất bại: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || "Không thể lưu tin nhắn");
        }

        console.log("Đã lưu SQLite:", role);
    } catch (error) {
        console.error("Lỗi lưu SQLite:", error);
    }
}

// TEXTAREA

textarea.addEventListener("input", () => {
    textarea.style.height = "40px";
    textarea.style.height = textarea.scrollHeight + "px";
});

// MESSAGE UI

function addMessage(text, sender) {
    const message = document.createElement("div");
    message.className = `message ${sender}`;

    if (sender === "user") {
        // Tin nhắn người dùng: giữ nguyên text
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.textContent = text;

        message.appendChild(bubble);

    } else {
        // Avatar AI
        const avatar = document.createElement("div");
        avatar.className = "avatar";

        avatar.innerHTML = `
            <span class="material-symbols-outlined">
                smart_toy
            </span>
        `;

        // Nội dung AI
        const bubble = document.createElement("div");
        bubble.className = "bubble";

        const formattedText = text
            // Escape HTML trước
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")

            // **chữ đậm**
            .replace(
                /\*\*(.*?)\*\*/g,
                "<strong>$1</strong>"
            )

            // Bullet dạng * nội dung
            .replace(
                /(^|\n)\s*\*\s+/g,
                "$1• "
            )

            // Xuống 2 dòng
            .replace(
                /\n\n/g,
                "<br><br>"
            )

            // Xuống 1 dòng
            .replace(
                /\n/g,
                "<br>"
            );

        bubble.innerHTML = formattedText;

        message.appendChild(avatar);
        message.appendChild(bubble);
    }

    chatMessages.appendChild(message);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}

function addLoading() {
    removeLoading();

    const message = document.createElement("div");
    message.className = "message ai";
    message.id = "loadingMessage";

    message.innerHTML = `
        <div class="avatar">
            <span class="material-symbols-outlined">smart_toy</span>
        </div>
        <div class="bubble loading">
            Đang trả lời
            <span class="dots"></span>
        </div>
    `;

    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeLoading() {
    const loading = chatMessages.querySelector("#loadingMessage");

    if (loading) {
        loading.remove();
    }
}

// SMARTVOICE TTS

async function speakText(text) {
    if (!text || !text.trim()) {
        return;
    }

    try {
        console.log("🔊 Gửi SmartVoice TTS:", text);

        // Dừng audio cũ nếu đang phát
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }

        // Gọi backend TTS
        const response = await fetch(
            `${API_BASE_URL}/text-to-speech`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: text
                })
            }
        );

        const data = await response.json();

        console.log("🔊 TTS RESPONSE FRONTEND:", data);

        // Kiểm tra HTTP
        if (!response.ok) {
            throw new Error(
                data.message ||
                data.error ||
                `TTS HTTP ${response.status}`
            );
        }

        // Lấy đường dẫn audio
        const audioUrl =
            data.audioUrl ||
            data?.object?.playlist?.[0]?.audio_link;

        console.log("🔊 AUDIO URL:", audioUrl);

        if (!audioUrl) {
            throw new Error(
                "Không tìm thấy audio URL trong TTS response"
            );
        }

        // Tạo audio
        currentAudio = new Audio(audioUrl);

        currentAudio.preload = "auto";
        currentAudio.volume = 1;

        // Audio đã tải dữ liệu
        currentAudio.addEventListener(
            "loadeddata",
            () => {
                console.log("✅ AUDIO ĐÃ LOAD");
            }
        );

        // Audio đã sẵn sàng phát
        currentAudio.addEventListener(
            "canplay",
            () => {
                console.log("✅ AUDIO CÓ THỂ PHÁT");
            }
        );

        // Audio bắt đầu phát
        currentAudio.addEventListener(
            "play",
            () => {
                console.log(
                    "▶️ AUDIO BẮT ĐẦU PHÁT"
                );
            }
        );

        // Audio phát xong
        currentAudio.addEventListener(
            "ended",
            () => {
                console.log(
                    "✅ AUDIO ĐÃ PHÁT XONG"
                );

                currentAudio = null;
            }
        );

        // Audio bị lỗi
        currentAudio.addEventListener(
            "error",
            () => {
                console.error(
                    "❌ AUDIO ERROR:",
                    currentAudio?.error
                );
            }
        );

        console.log("🔊 CHUẨN BỊ PLAY");

        // Phát audio
        await currentAudio.play();

        console.log(
            "✅ PLAY() THÀNH CÔNG"
        );

    } catch (error) {
        console.error(
            "❌ LỖI SMARTVOICE TTS:"
        );

        console.error(
            "Tên lỗi:",
            error.name
        );

        console.error(
            "Nội dung lỗi:",
            error.message
        );

        console.error(error);
    }
}

// SEND MESSAGE
sendBtn.addEventListener("click", event => {
    event.preventDefault();
    sendMessage();
});

textarea.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {
    console.log("1. SEND MESSAGE ĐÃ CHẠY");

    const question = textarea.value.trim();

    console.log("2. TEXT =", question);

    if (!question) {
        return;
    }

    if (sendBtn.disabled) {
        return;
    }

    addMessage(question, "user");

    textarea.value = "";
    textarea.style.height = "40px";

    sendBtn.disabled = true;
    //textarea.disabled = true;

    addLoading();

    try {
        console.log("3. ĐANG GỌI SMARTBOT");

        const response = await fetch(
            `${API_BASE_URL}/chat`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    question: question,
                    sessionId: sessionId
                })
            }
        );

        console.log(
            "4. SMARTBOT STATUS =",
            response.status
        );

        const data = await response.json();

        console.log(
            "5. SMARTBOT RESPONSE =",
            data
        );

        if (!response.ok) {
            throw new Error(
                data.message ||
                `SmartBot HTTP ${response.status}`
            );
        }

        if (!data.success) {
            throw new Error(
                data.message ||
                "SmartBot không trả kết quả thành công"
            );
        }

        const reply =
            data.reply?.trim() ||
            "Xin lỗi, tôi chưa có câu trả lời.";

        console.log(
            "6. FULL REPLY =",
            reply
        );

        removeLoading();

        addMessage(reply, "ai");

        console.log(
            "✅ ĐÃ HIỂN THỊ TOÀN BỘ TEXT:",
            reply
        );

        console.log(
            "🔊 CHUẨN BỊ GỌI TTS:",
            reply
        );

        // Đọc trước để test TTS
        speakText(reply);

        // Sau đó mới lưu DB
        await ensureConversation();

        await saveMessageToDB(
            "user",
            question
        );

        await saveMessageToDB(
            "assistant",
            reply
        );

    } catch (error) {
    removeLoading();

    console.error(
        "LỖI SMARTBOT FRONTEND:",
        error
    );

    addMessage(
        "Không thể kết nối SmartBot.",
        "ai"
    );

    } finally {
        sendBtn.disabled = false;
        textarea.focus();
    }
}

// RESET UI
function resetChat() {
    chatMessages.innerHTML = `
        <div class="message ai">
            <div class="avatar">
                <span class="material-symbols-outlined">smart_toy</span>
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
}

// ĐẶT LẠI
// Chỉ dọn input, file, audio.
// Không xóa chat, không đổi conversation.

refreshBtn.addEventListener("click", () => {
    textarea.value = "";
    textarea.style.height = "40px";

    selectedFile = null;
    fileInput.value = "";
    filePreview.innerHTML = "";
    filePreview.classList.add("hidden");

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }

    if (
        isRecording &&
        mediaRecorder &&
        mediaRecorder.state === "recording"
    ) {
        mediaRecorder.stop();
        isRecording = false;

        voiceBtn.classList.remove("recording");
        voiceBtn.innerHTML = `
            <span class="material-symbols-outlined">mic</span>
        `;
    }

    voiceStatus.textContent = "";
    textarea.focus();
});

// CHAT MỚI

newChatBtn?.addEventListener("click", () => {
    currentConversationId = null;
    localStorage.removeItem("currentConversationId");

    sessionId = crypto.randomUUID();

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }

    selectedFile = null;
    fileInput.value = "";
    filePreview.innerHTML = "";
    filePreview.classList.add("hidden");

    if (
        isRecording &&
        mediaRecorder &&
        mediaRecorder.state === "recording"
    ) {
        mediaRecorder.stop();
        isRecording = false;

        voiceBtn.classList.remove("recording");
        voiceBtn.innerHTML = `
            <span class="material-symbols-outlined">mic</span>
        `;
    }

    voiceStatus.textContent = "";
    resetChat();
});

// FILE

attachBtn.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", () => {
    if (fileInput.files.length === 0) {
        return;
    }

    selectedFile = fileInput.files[0];

    filePreview.classList.remove("hidden");

    filePreview.innerHTML = `
        <div class="file-card">
            <span>📄 ${selectedFile.name}</span>
            <button id="removeFile" type="button">✕</button>
        </div>
    `;

    const removeFileBtn =
        filePreview.querySelector("#removeFile");

    removeFileBtn?.addEventListener("click", () => {
        selectedFile = null;
        fileInput.value = "";
        filePreview.innerHTML = "";
        filePreview.classList.add("hidden");
    });
});

// VOICE HELP

voiceHelpBtn?.addEventListener("click", () => {
    voiceHelpModal?.classList.remove("hidden");
});

closeVoiceHelp?.addEventListener("click", () => {
    voiceHelpModal?.classList.add("hidden");
});

voiceHelpModal?.addEventListener("click", event => {
    if (event.target === voiceHelpModal) {
        voiceHelpModal.classList.add("hidden");
    }
});

// SMARTVOICE STT

voiceBtn.addEventListener("click", toggleRecording);

async function toggleRecording() {
    console.log("3. MIC ĐÃ ĐƯỢC BẤM");
    console.log("isRecording =", isRecording);

    if (!isRecording) {
        try {
            const stream =
                await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true,
                        channelCount: 1
                    }
                });

            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.ondataavailable = event => {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const mimeType =
                    mediaRecorder.mimeType || "audio/webm";

                const audioBlob = new Blob(audioChunks, {
                    type: mimeType
                });

                console.log("🎤 MIME TYPE:", mimeType);
                console.log("🎤 AUDIO SIZE:", audioBlob.size);

                stream.getTracks().forEach(track => track.stop());

                await sendVoice(audioBlob);
            };

            // Thu dữ liệu thành từng đoạn nhỏ 250ms
            mediaRecorder.start(250);

            isRecording = true;

            voiceBtn.classList.add("recording");

            voiceBtn.innerHTML = `
                <span class="material-symbols-outlined">mic</span>
            `;

            voiceStatus.textContent = "Đang ghi âm...";
        } catch (error) {
            console.error("Lỗi microphone:", error);
            voiceStatus.textContent = "";
            alert("Không thể sử dụng microphone.");
        }
    } else {
        if (
            mediaRecorder &&
            mediaRecorder.state === "recording"
        ) {
            voiceStatus.textContent = "Đang hoàn tất ghi âm...";

            // Lấy nốt dữ liệu audio đang còn trong buffer
            mediaRecorder.requestData();

            setTimeout(() => {
                if (
                    mediaRecorder &&
                    mediaRecorder.state === "recording"
                ) {
                    mediaRecorder.stop();
                }
            }, 700);
        }

        isRecording = false;

        voiceBtn.classList.remove("recording");

        voiceBtn.innerHTML = `
            <span class="material-symbols-outlined">mic</span>
        `;

        voiceStatus.textContent = "Đang nhận dạng giọng nói...";
    }
}

async function sendVoice(audioBlob) {
    console.log("4. SEND VOICE ĐÃ CHẠY");
    console.log("AUDIO SIZE =", audioBlob.size);

    const formData = new FormData();

    // Tên audioFile khớp với backend:
    // upload.single("audioFile")
    formData.append(
        "audioFile",
        audioBlob,
        "voice.webm"
    );

    addLoading();

    try {
        console.log("5. ĐANG GỌI API STT");

        const response = await fetch(
            `${API_BASE_URL}/speech-to-text`,
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        console.log("STT RESPONSE:", data);
        console.log("TEXT NHẬN ĐƯỢC =", data.text);

        removeLoading();
        voiceStatus.textContent = "";

        if (!response.ok) {
            throw new Error(
                data.message ||
                data.error ||
                `STT HTTP ${response.status}`
            );
        }

        if (!data.success) {
            throw new Error(
                data.message ||
                "STT không thành công"
            );
        }

        const text = data.text || "";

        if (!text.trim()) {
            addMessage(
                "Không nhận dạng được giọng nói.",
                "ai"
            );

            return;
        }

        // Hiện chữ STT vào ô nhập
        textarea.value = text;

        textarea.style.height = "40px";
        textarea.style.height =
            textarea.scrollHeight + "px";

        textarea.focus();

        textarea.setSelectionRange(
            textarea.value.length,
            textarea.value.length
        );

        console.log(
            "6. STT ĐÃ ĐƯA TEXT VÀO TEXTAREA:",
            text
        );

    } catch (error) {
        removeLoading();

        voiceStatus.textContent = "";

        console.error(
            "Lỗi SmartVoice STT:",
            error
        );

        addMessage(
            "Không thể nhận dạng giọng nói.",
            "ai"
        );
    }
}

// HISTORY PANEL

historyBtn?.addEventListener("click", async () => {
    historyPanel?.classList.add("active");
    historyOverlay?.classList.add("active");

    await loadConversationList();
});

function closeHistoryPanel() {
    historyPanel?.classList.remove("active");
    historyOverlay?.classList.remove("active");
}

closeHistoryBtn?.addEventListener(
    "click",
    closeHistoryPanel
);

historyOverlay?.addEventListener(
    "click",
    closeHistoryPanel
);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeHistoryPanel();
        voiceHelpModal?.classList.add("hidden");
    }
});


// SEARCH HISTORY


historySearch?.addEventListener("input", () => {
    const keyword =
        historySearch.value.trim().toLowerCase();

    const conversations =
        conversationList?.querySelectorAll(
            ".conversation-item"
        ) || [];

    conversations.forEach(item => {
        const title =
            item
                .querySelector(".conversation-title")
                ?.textContent
                .toLowerCase() || "";

        item.style.display =
            title.includes(keyword)
                ? "flex"
                : "none";
    });
});


// LOAD HISTORY

async function loadConversationList() {
    if (!conversationList) {
        console.error("Không tìm thấy #conversationList");
        return;
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/conversations`
        );

        if (!response.ok) {
            throw new Error(
                `History HTTP ${response.status}`
            );
        }

        const data = await response.json();

        conversationList.innerHTML = "";

        if (
            !data.conversations ||
            data.conversations.length === 0
        ) {
            conversationList.innerHTML = `
                <div class="history-empty">
                    <span class="material-symbols-outlined">
                        history
                    </span>
                    <p>Chưa có lịch sử trò chuyện</p>
                </div>
            `;

            return;
        }

        data.conversations.forEach(conversation => {
            const item =
                document.createElement("button");

            item.type = "button";
            item.className = "conversation-item";

            const icon =
                document.createElement("div");

            icon.className = "conversation-icon";

            icon.innerHTML = `
                <span class="material-symbols-outlined">
                    chat_bubble
                </span>
            `;

            const info =
                document.createElement("div");

            info.className = "conversation-info";

            const title =
                document.createElement("span");

            title.className = "conversation-title";
            title.textContent = conversation.title;

            const time =
                document.createElement("span");

            time.className = "conversation-time";

            time.textContent =
                formatConversationTime(
                    conversation.updated_at
                );

            info.appendChild(title);
            info.appendChild(time);

            item.appendChild(icon);
            item.appendChild(info);

            item.addEventListener("click", () => {
                openConversation(conversation.id);
            });

            conversationList.appendChild(item);
        });
    } catch (error) {
        console.error("Lỗi tải lịch sử:", error);

        conversationList.innerHTML = `
            <div class="history-empty">
                <p>Không thể tải lịch sử trò chuyện.</p>
            </div>
        `;
    }
}

function formatConversationTime(dateString) {
    if (!dateString) {
        return "";
    }

    const date = new Date(
        dateString.replace(" ", "T") + "Z"
    );

    return date.toLocaleString("vi-VN");
}

// OPEN OLD CONVERSATION
async function openConversation(conversationId) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/conversations/${conversationId}/messages`
        );

        if (!response.ok) {
            throw new Error(
                `Messages HTTP ${response.status}`
            );
        }

        const data = await response.json();

        if (!data.success) {
            return;
        }

        currentConversationId = conversationId;

        localStorage.setItem(
            "currentConversationId",
            conversationId
        );

        sessionId = crypto.randomUUID();

        chatMessages.innerHTML = "";

        data.messages.forEach(message => {
            const sender =
                message.role === "assistant"
                    ? "ai"
                    : "user";

            addMessage(
                message.content,
                sender
            );
        });

        closeHistoryPanel();
        textarea.focus();
    } catch (error) {
        console.error(
            "Lỗi mở cuộc trò chuyện:",
            error
        );
    }
}

async function loadCurrentConversation() {
    if (!currentConversationId) {
        return;
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/conversations/${currentConversationId}/messages`
        );

        if (!response.ok) {
            throw new Error(
                `Messages HTTP ${response.status}`
            );
        }

        const data = await response.json();

        if (!data.success || !data.messages) {
            return;
        }

        chatMessages.innerHTML = "";

        data.messages.forEach(message => {
            const sender =
                message.role === "assistant"
                    ? "ai"
                    : "user";

            addMessage(
                message.content,
                sender
            );
        });

        console.log(
            "✅ ĐÃ KHÔI PHỤC CHAT:",
            currentConversationId
        );

    } catch (error) {
        console.error(
            "Lỗi khôi phục cuộc trò chuyện:",
            error
        );
    }
}
loadCurrentConversation();