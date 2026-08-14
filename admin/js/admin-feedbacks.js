// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ------------------ admin-feedbacks.js -----------------------
// ------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("feedbackContainer");
    const count = document.getElementById("feedbackCount");
    const popup = document.getElementById("feedbackPopup");
    const popupBackdrop = document.getElementById("popupBackdrop");
    const popupClose = document.getElementById("popupClose");
    const toggleRead = document.getElementById("toggleRead");
    const filters = document.querySelectorAll(".filter");
    const FEEDBACK_JSON = "../../data/feedbacks.json";
    let feedbacks = [];
    let currentFilter = "all";
    let selectedFeedback = null;

    async function loadFeedbacks() {
        try {
            const response = await fetch(`${FEEDBACK_JSON}?t=${Date.now()}`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            feedbacks = await response.json();
            if (!Array.isArray(feedbacks)) {
                throw new Error("Feedback JSON must contain an array.");
            }
            render();
        } catch (error) {
            console.error("Failed to load feedbacks:", error);
            container.innerHTML = `
                <div class="feedback-empty">
                    Failed to load feedbacks.
                </div>
            `;
            count.textContent = "0";
        }
    }

    function render() {
        container.innerHTML = "";
        const filtered = feedbacks.filter(feedback => {
            if (currentFilter === "read") {
                return feedback.read === true;
            }
            if (currentFilter === "unread") {
                return feedback.read !== true;
            }
            return true;
        });
        count.textContent = filtered.length;
        if (filtered.length === 0) {
            const empty = document.createElement("div");
            empty.className = "feedback-empty";
            empty.textContent = "No feedbacks found.";
            container.appendChild(empty);
            return;
        }
        filtered.forEach(feedback => {
            container.appendChild(createFeedbackCard(feedback));
        });
    }

    function createFeedbackCard(feedback) {
        const card = document.createElement("div");
        card.className = `feedback ${feedback.read ? "read" : "unread"}`;

        const name = document.createElement("div");
        name.className = "feedback-name";
        name.textContent = feedback.name || "Unknown";

        const telephone = document.createElement("div");
        telephone.className = "feedback-telephone";
        telephone.textContent = feedback.phone || "—";

        const email = document.createElement("div");
        email.className = "feedback-email";
        email.textContent = feedback.email || "—";

        const message = document.createElement("div");
        message.className = "feedback-message";
        message.textContent = feedback.message || "—";

        card.appendChild(name);
        card.appendChild(telephone);
        card.appendChild(email);
        card.appendChild(message);

        card.addEventListener("click", () => {
            openPopup(feedback);
        });

        return card;
    }

    function openPopup(feedback) {
        selectedFeedback = feedback;
        setPopupValue("popupName", feedback.name);
        setPopupValue("popupContactName", feedback.name);
        setPopupValue("popupEmail", feedback.email);
        setPopupValue("popupPhone", feedback.phone);
        setPopupValue("popupMessage", feedback.message);
        setPopupValue("popupRequestId", feedback.requestId);
        setPopupValue("popupDate", feedback.date);
        setPopupValue("popupTime", feedback.time);
        setPopupValue("popupRead", feedback.read ? "Read" : "Unread");
        setPopupValue("popupIp", feedback.ip);
        setPopupValue("popupCountry", feedback.country);
        setPopupValue("popupCity", feedback.city);
        setPopupValue("popupTimezone", feedback.timezone);
        setPopupValue("popupLanguage", feedback.language);
        setPopupValue("popupSubmittedFrom", feedback.submittedFrom);
        setPopupValue("popupReferrer", feedback.referrer);
        setPopupValue("popupUserAgent", feedback.userAgent);

        const status = document.getElementById("popupStatus");
        status.textContent = feedback.read ? "Read" : "Unread";
        status.className = `popup-status ${feedback.read ? "read" : "unread"}`;

        toggleRead.textContent = feedback.read ? "Mark as unread" : "Mark as read";
        popup.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closePopup() {
        popup.classList.remove("open");
        document.body.style.overflow = "";
        selectedFeedback = null;
    }

    function setPopupValue(id, value) {
        const element = document.getElementById(id);
        if (!element) return;
        element.textContent = value !== undefined && value !== null && value !== "" ? value : "—";
    }

    filters.forEach(button => {
        button.addEventListener("click", () => {
            filters.forEach(filter => {
                filter.classList.remove("active");
            });
            button.classList.add("active");
            currentFilter = button.dataset.filter;
            render();
        });
    });

    toggleRead.addEventListener("click", () => {
        if (!selectedFeedback) return;

        selectedFeedback.read = !selectedFeedback.read;
        selectedFeedback.status = selectedFeedback.read ? "read" : "unread";

        const status = document.getElementById("popupStatus");
        status.textContent = selectedFeedback.read ? "Read" : "Unread";
        status.className = `popup-status ${selectedFeedback.read ? "read" : "unread"}`;

        setPopupValue("popupRead", selectedFeedback.read ? "Read" : "Unread");

        toggleRead.textContent = selectedFeedback.read ? "Mark as unread" : "Mark as read";

        render();
    });

    popupClose.addEventListener("click", closePopup);
    popupBackdrop.addEventListener("click", closePopup);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closePopup();
        }
    });

    loadFeedbacks();
});