import {FileChecker} from "./file-checker";
import {i18n} from "../i18n";

const _imageBreakpoints = [
    {q:0, l: i18n.quality_insufficient, c: 'danger', ok: false},
    {q:768, l: i18n.quality_scarce, c: 'warning', ok: true},
    {q:1439, l: i18n.quality_sufficient, c: 'warning', ok: true},
    {q:1919, l: i18n.quality_sufficient, c: 'success', ok: true},
    {q:200000, l: i18n.quality_perfect, c: 'success', ok: true}
]

const _iconBreakpoints = [
    {q:0, l: i18n.quality_insufficient, c: 'danger', ok: false},
    {q:100, l: i18n.quality_scarce, c: 'warning', ok: true},
    {q:256, l: i18n.quality_sufficient, c: 'warning', ok: true},
    {q:512, l: i18n.quality_sufficient, c: 'success', ok: true},
    {q:200000, l: i18n.quality_perfect, c: 'success', ok: true}
]

export class QualityChecker extends FileChecker {
    get template() {
        return "<li class=\"list-group-item d-flex justify-content-between p-1\">\n" +
            "                                <strong>"+i18n.quality_title+"</strong>\n" +
            "                                <span></span>\n" +
            "                            </li>\n";
    }

    static get IMAGE_BREAKPOINTS() { return _imageBreakpoints; }
    static get ICON_BREAKPOINTS() { return _iconBreakpoints; }

    constructor(breakpoints) {
        super();
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

        let clazz = '', label = '', ok = true;
        this.breakpoints.forEach((bp) => {
            if(clazz === '' || ms > bp.q) {
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
