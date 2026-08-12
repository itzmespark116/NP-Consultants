// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// -------------------- snap-scroll.js ------------------------
// ------------------------------------------------------------
// Snaps based on how far the current section has scrolled past
// the viewport edge, not on scroll speed/distance.

const SnapScroll = {
    selector: "main > section",
    edgeThreshold: 1,    // 40% of viewport height
    idleTime: 140,
    smooth: true,
    behavior: "smooth",

    sections: [],
    index: 0,
    snapping: false,
    accumulator: 0,
    idleTimer: null,
    snapLockTimer: null,

    init() {
        this.sections = [...document.querySelectorAll(this.selector)];
        if (!this.sections.length) return;

        this.index = this.getCurrentSection();

        window.addEventListener("wheel", e => this.handleWheel(e), { passive: true });
        window.addEventListener("keydown", e => this.handleKeyboard(e));
        window.addEventListener("touchstart", e => this.handleTouchStart(e), { passive: true });
        window.addEventListener("touchend", e => this.handleTouchEnd(e), { passive: true });
    },

    handleWheel(e) {
        if (this.snapping) return;

        this.accumulator += e.deltaY;
        clearTimeout(this.idleTimer);
        this.idleTimer = setTimeout(() => this.evaluateBurst(), this.idleTime);
    },

    handleTouchStart(e) {
        this.touchStartY = e.touches[0].clientY;
    },

    handleTouchEnd(e) {
        if (this.snapping || this.touchStartY == null) return;

        this.accumulator = this.touchStartY - e.changedTouches[0].clientY;
        this.touchStartY = null;
        this.evaluateBurst();
    },

    evaluateBurst() {
        const delta = this.accumulator;
        this.accumulator = 0;
        if (delta === 0) return;

        this.index = this.getCurrentSection();
        delta > 0 ? this.tryNext() : this.tryPrevious();
    },

    handleKeyboard(e) {
        if (this.snapping) return;

        if (e.key === "ArrowDown" || e.key === "PageDown") {
            e.preventDefault();
            this.index = this.getCurrentSection();
            this.tryNext();
        }

        if (e.key === "ArrowUp" || e.key === "PageUp") {
            e.preventDefault();
            this.index = this.getCurrentSection();
            this.tryPrevious();
        }
    },

    // Only advance if current section's bottom has scrolled above
    // 40% of viewport height.
    tryNext() {
        if (this.index >= this.sections.length - 1) return;

        const rect = this.sections[this.index].getBoundingClientRect();
        const limit = window.innerHeight * this.edgeThreshold;

        if (rect.bottom < limit) this.next();
    },

    // Only go back if current section's top has scrolled below
    // 60% of viewport height (mirror of the 40% threshold).
    tryPrevious() {
        if (this.index <= 0) return;

        const rect = this.sections[this.index].getBoundingClientRect();
        const limit = window.innerHeight * (1 - this.edgeThreshold);

        if (rect.top > limit) this.previous();
    },

    next() {
        this.index++;
        this.snap();
    },

    previous() {
        this.index--;
        this.snap();
    },

    snap() {
        this.snapping = true;

        this.sections[this.index].scrollIntoView({
            behavior: this.smooth ? this.behavior : "auto",
            block: "start"
        });

        clearTimeout(this.snapLockTimer);
        this.snapLockTimer = setTimeout(() => {
            this.snapping = false;
        }, 500);
    },

    getCurrentSection() {
        const viewportMid = window.innerHeight / 2;
        let closest = 0;
        let distance = Infinity;

        this.sections.forEach((section, i) => {
            const rect = section.getBoundingClientRect();
            const sectionMid = rect.top + rect.height / 2;
            const d = Math.abs(sectionMid - viewportMid);

            if (d < distance) {
                distance = d;
                closest = i;
            }
        });

        return closest;
    }
};

SnapScroll.init();