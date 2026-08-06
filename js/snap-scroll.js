// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// -------------------- snap-scroll.js ------------------------
// ------------------------------------------------------------


const SnapScroll = {
    selector: "main > section",
    threshold: 120,
    lockTime: 800,
    resetTime: 150,
    smooth: true,
    behavior: "smooth",

    sections: [],
    index: 0,
    locked: false,
    accumulator: 0,
    resetTimer: null,

    init() {
        this.sections = [...document.querySelectorAll(this.selector)];
        if (!this.sections.length) return;

        this.index = this.getCurrentSection();

        window.addEventListener("wheel", e => this.handleWheel(e), { passive: false });
        window.addEventListener("keydown", e => this.handleKeyboard(e));
    },

    handleWheel(e) {
        if (this.locked) {
            e.preventDefault();
            return;
        }

        let delta = e.deltaY;

        if (Math.abs(delta) < 10) return;

        this.accumulator += delta;
        clearTimeout(this.resetTimer);

        this.resetTimer = setTimeout(() => {
            this.accumulator = 0;
        }, this.resetTime);

        if (Math.abs(this.accumulator) >= this.threshold) {
            e.preventDefault();

            this.accumulator > 0 ? this.next() : this.previous();
            this.accumulator = 0;
        }
    },

    handleKeyboard(e) {
        if (this.locked) return;

        if (e.key === "ArrowDown" || e.key === "PageDown")
            this.next();

        if (e.key === "ArrowUp" || e.key === "PageUp")
            this.previous();
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
        this.locked = true;

        this.sections[this.index].scrollIntoView({
            behavior: this.smooth ? this.behavior : "auto",
            block: "start"
        });

        setTimeout(() => {
            this.locked = false;
        }, this.lockTime);
    },

    getCurrentSection() {
        let closest = 0;
        let distance = Infinity;

        this.sections.forEach((section, i) => {
            let d = Math.abs(section.getBoundingClientRect().top);

            if (d < distance) {
                distance = d;
                closest = i;
            }
        });

        return closest;
    }
};

SnapScroll.init();