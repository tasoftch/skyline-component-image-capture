import {FileChecker} from "./file-checker";
import {i18n} from "../i18n";

export class QualityChecker extends FileChecker {
    get template() {
        return "<li class=\"list-group-item d-flex justify-content-between p-1\">\n" +
            "                                <strong>"+i18n.quality_title+"</strong>\n" +
            "                                <span></span>\n" +
            "                            </li>\n";
    }

    static get IMAGE_BREAKPOINTS() { return [
        {q:767, l: i18n.quality_scarce, c: 'warning', ok: true},
        {q:1023, l: i18n.quality_sufficient, c: 'warning', ok: true},
        {q:1439, l: i18n.quality_OK, c: 'success', ok: true},
        {q:1919, l: i18n.quality_perfect, c: 'success', ok: true}
    ]; }
    static get ICON_BREAKPOINTS() { return [
        {q:99, l: i18n.quality_scarce, c: 'warning', ok: true},
        {q:256, l: i18n.quality_sufficient, c: 'warning', ok: true},
        {q:511, l: i18n.quality_OK, c: 'success', ok: true},
        {q:1023, l: i18n.quality_perfect, c: 'success', ok: true}
    ]; }

    constructor(breakpoints) {
        super();
        if(typeof breakpoints.sort === 'function')
            breakpoints.sort((a,b) => {
                if(a.q < b.q)
                    return -1;
                if(a.q > b.q)
                    return 1;
                return 0;
            });
        this.breakpoints = breakpoints;
    }

    bindTemplate($t) {
        this.boundClass = $t;
        this.boundQ = $t.find("span");
    }

    reset() {
        this.boundClass.removeClass("list-group-item-success").removeClass("list-group-item-warning").removeClass("list-group-item-danger");
        this.boundQ.html("");
    }

    checkImage(image, file) {
        let ms = Math.max(image.width, image.height);

        let clazz = 'danger', label = i18n.quality_insufficient, ok = false;
        this.breakpoints.forEach((bp) => {
            if(ms > bp.q) {
                clazz = bp.c;
                label = bp.l;
                ok = bp.ok;
            }
        });

        if(clazz !== '')
            this.boundClass.addClass("list-group-item-"+clazz);
        this.boundQ.html(label);

        return ok;
    }
}
