// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// -------------------- snap-scroll.js ------------------------
// ------------------------------------------------------------
// Snaps on short, deliberate scrolls. Ignores overscroll/jerks.
// Long/fast scrolls are left as free-scroll (user is jumping far).

const SnapScroll = {
    selector: "main > section",
    jerkThreshold: 100,     // deltas below this are ignored (noise/overscroll)
    snapThreshold: 1000,    // deltas above this = free scroll, no snap
    idleTime: 140,         // ms of no wheel activity before we evaluate the burst
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

    // Wheel events accumulate freely (native scroll is never blocked).
    // Once the burst goes idle, we decide what to do with it.
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

        const distance = Math.abs(delta);

        if (distance < this.jerkThreshold) return;     // too small, ignore
        if (distance > this.snapThreshold) return;     // deliberate long scroll, let it free-scroll

        this.index = this.getCurrentSection();
        delta > 0 ? this.next() : this.previous();
    },

    handleKeyboard(e) {
        if (this.snapping) return;

        if (e.key === "ArrowDown" || e.key === "PageDown") {
            e.preventDefault();
            this.next();
        }

        if (e.key === "ArrowUp" || e.key === "PageUp") {
            e.preventDefault();
            this.previous();
        }
    },

    next() {
        if (this.index >= this.sections.length - 1) return;

        this.index++;
        this.snap();
    },

    previous() {
        if (this.index <= 0) return;

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