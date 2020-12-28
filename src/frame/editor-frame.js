import {Frame} from "./frame";
import {Drag} from "../core/drag";
import {Mask} from "./mask/mask";
import {MaskDefault} from "./mask/mask-default";

export class EditorFrame extends Frame {
    constructor(mask) {
        super();
        this.translation = [0,0];
        this.scaleFactor = 1;
        this.mask = mask;
    }

    get template() {
        return "<div class='d-flex justify-content-center position-relative mb-3'><div class=\"image-editor border border-primary rounded\">\n" +
            "                                <div class=\"canvas\">\n" +
            "                                    <img src=\"\" alt=''>\n" +
            "                                    <div class=\"backdrop\">&nbsp;</div>\n" +
            "                                </div>\n" +
            "                                <div class=\"im-tools w-100 d-flex justify-content-center\">\n" +
            "                                    <div class=\"slidecontainer\">\n" +
            "                                        <label for=\"image-editor-scale-range\" class=\"sr-only\"></label>\n" +
            "                                        <input type=\"range\" min=\"1\" max=\"100\" value=\"50\" class=\"slider\" id=\"image-editor-scale-range\">\n" +
            "                                    </div>\n" +
            "                                </div>\n" +
            "                            </div></div>";
    }

    setMask(mask) {
        if(mask instanceof Mask) {
            this.mask = mask;
            this.bound.find(".image-editor").css("width", mask.frameDimensions[0]+"px").css("height", mask.frameDimensions[1]+"px");
            this.backdrop[0].style.background = 'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 '+mask.frameDimensions[0]+' '+mask.frameDimensions[1]+'\\"><path d=\\"'+mask.maskSVG+'\\"></path></svg>"';
        } else
            this.setMask(new MaskDefault());
    }

    reset() {
        this.translation = [0,0];
        this.scaleFactor = 1;
        this.boundImage
            .css("top", 0)
            .css("left", 0)
            .css("transform", 'scale(1)');
    }

    bindTemplate($t) {
        super.bindTemplate($t);
        this.bound = $t;
        this.canvas = $t.find(".canvas");
        this.backdrop = $t.find(".backdrop");

        this.setMask(this.mask);

        this.scaleEl = $t.find("input[type='range']");

        this.scaleEl.on('input', () => this.scale());

        this.drag = new Drag(this.canvas[0], (d) => this.translate(d), null, (d)=>this.dragComplete(d))
    }

    scale() {
        let value = this.scaleEl.val() * 0.02;
        value = value * value;
        this.scaleFactor = value;
        this.boundImage
            .css("transform", "scale("+value+")");
    }

    translate({dx, dy}) {
        const [tx, ty] = this.translation;

        this.boundImage
            .css("top", ty+dy + "px")
            .css("left", tx+dx+"px");
    }

    dragComplete({dx, dy}) {
        const [tx, ty] = this.translation;

        this.translation = [tx+dx, ty+dy];
    }

    saveProperties(properties) {
        properties.translation = this.translation;
        properties.scale = this.scaleFactor;
        properties.frame = this.mask.imageDimensions;
        this.mask.saveProperties(properties);
    }
}
