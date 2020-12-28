
const listenWindow = (event, handler) => {
    window.addEventListener(event, handler);
    return () => {
        window.removeEventListener(event, handler);
    }
}


export class Drag {
    constructor(el, onTranslate, onStart, onDrag) {
        this.pointerStart = null;

        this.el = el;
        this.ontranslate = onTranslate;
        this.onstart = onStart;
        this.ondrag = onDrag;

        this.el.style.touchAction = 'none';
        this.el.addEventListener('pointerdown', this.down.bind(this));

        const destroyMove = listenWindow('pointermove', this.move.bind(this));
        const destroyUp = listenWindow('pointerup', this.up.bind(this));

        this.destroy = () => { destroyMove(); destroyUp(); }
    }

    down(e) {
        e.stopPropagation();
        this.pointerStart = [e.pageX, e.pageY]

        if(typeof this.onstart === 'function')
            this.onstart(e);
    }

    move(e) {
        if (!this.pointerStart) return;
        if(typeof this.ontranslate === 'function') {
            e.preventDefault();
            let [x, y] = [e.pageX, e.pageY]
            let delta = [x - this.pointerStart[0], y - this.pointerStart[1]];
            let zoom = this.el.getBoundingClientRect().width / this.el.offsetWidth;
            this.ontranslate({dx:delta[0] / zoom, dy:delta[1] / zoom, e});
        }
    }

    up(e) {
        if (!this.pointerStart) return;
        if(typeof this.ondrag === 'function') {
            let [x, y] = [e.pageX, e.pageY]
            let delta = [x - this.pointerStart[0], y - this.pointerStart[1]];
            let zoom = this.el.getBoundingClientRect().width / this.el.offsetWidth;
            this.ondrag({dx:delta[0] / zoom, dy:delta[1] / zoom, e});
        }
        this.pointerStart = null;
    }
}
