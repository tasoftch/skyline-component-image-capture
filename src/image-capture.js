import {_panel} from "./templates/panel";
import {_property} from "./templates/property";
import {FileChecker} from "./checkers/file-checker";
import {Property} from "./property/property";

export const _limits = {FILE_SIZE: 2e6, UPLOADS: 20, POST_SIZE: 8e6};

import $ from "./jquery";
import {ImageCaptureView} from "./image-capture-view";
import {QualityChecker} from "./checkers/quality-checker";
import {DimensionChecker} from "./checkers/dimension-checker";
import {FileSizeChecker} from "./checkers/file-size-checker";
import {i18n} from "./i18n";
import {SlugTextFieldProperty} from "./property/slug-text-field-property";
import {TextFieldProperty} from "./property/textfield-property";
import {_option} from "./templates/option";
import {Option} from "./options/Option";
import {Emitter} from "./core/emitter";
import {Events} from "./core/events";
import {RatioChecker} from "./checkers/ratio-checker";


const _templates = {
    panel: _panel,
    property: _property,
    option: _option
}

const $panel = $(_templates.panel);

$(()=>{
    $(document.body).append($panel);
})

class ImageCapture extends Emitter {
    get LIMITS() { return _limits; }
    get TEMPLATES() { return _templates; }

    constructor({checkers = null, properties = null, options = null}) {
        super(new Events());

        this.checkers = [];
        this.properties = new Map();
        this.options = new Map();
        this.view = new ImageCaptureView(this, $panel);

        if(checkers)
            checkers.forEach(c=>this.addChecker(c));
        if(properties)
            properties.forEach(p=>this.addProperty(p));
        if(options)
            options.forEach(o=>this.addOption(o));
    }

    addChecker(checker) {
        if(checker instanceof FileChecker) {
            this.checkers.push(checker);
            this.view.addChecker(checker);
        }
        return this;
    }

    removeChecker(checker) {
        const idx = this.checkers.indexOf(checker);
        if(idx !== false) {
            delete this.checkers[idx];
            this.view.removeChecker(checker);
        }
        return this;
    }

    clearCheckers() {
        this.checkers.forEach(c=>this-this.removeChecker(c));
    }

    addProperty(property) {
        if(property instanceof Property) {
            this.properties.set(property.name, property);
            this.view.addProperty(property);
        }
        return this;
    }

    removeProperty(property) {
        if(property instanceof Property)
            property = property.name;

        const prop = this.properties.get(property);
        if(prop) {
            this.view.removeProperty(prop);
        }
        this.properties.delete(property);
        return this;
    }

    clearProperties() {
        this.properties.forEach(c=>this-this.removeProperty(c));
    }

    addOption(option) {
        if(typeof option.id === 'number') {
            this.options.set(option.id, option);
            this.view.addOption(option);
        }

        return this;
    }

    removeOption(option) {
        if(typeof option === 'object')
            option = option.id;
        const opt = this.options.get(option);
        if(opt)
            this.view.removeOption(opt);
        this.options.delete(option);
        return this;
    }

    clearOptions() {
        this.options.forEach(c=>this-this.removeOption(c));
    }

    run(target) {
        this.checkers.forEach(c=>c.reset());
        this.properties.forEach(p=>p.reset());
        this.view.propertyEl.find(".alert").remove();

        this.view.runModal();
    }

    updateFromInput(input) {
        var file = input.files[0];

        if(/^image\/.+/.test(file.type)) {
            var fr = new FileReader();
            fr.onload = () => {
                let img = this.view.imageEl;
                img.onload = () => {
                    this.file = file;

                    this.view.fileInfo.show();
                    this.view.fileSelect.hide();

                    const i = new Image();
                    this.image = i;
                    i.src = img.src;

                    let ok = true;

                    this.checkers.forEach(c=>{
                        ok = c.checkImage(i, file) && ok;
                    });

                    this.properties.forEach(p=>p.willAppear(i, file));

                    this.options.forEach(o=>{
                        if(typeof o.willAppear === 'function')
                            o.willAppear(i, file, this.view.options.get(o).find("input")[0]);
                    })

                    if(ok)
                        this.view.saveButton.attr("disabled", false);

                    this.trigger('update', {file, image:i});
                };

                img.onerror = () => {
                    this.view.presentError(i18n.image_load_error, 'error');
                    this.trigger('error')
                }
                img.src = fr.result;
            }
            fr.readAsDataURL(file);
        }
    }

    validateAndSave() {
        this.view.propertyEl.find(".alert").remove();

        try {
            this.properties.forEach(p=>{
                p.validate(this.image, this.file)
            });
        } catch (e) {
            this.view.propertyEl.prepend( "<div class='alert alert-danger'>"+e.message+"</div>" );
        }

        const properties = {};
        this.properties.forEach(p=> properties[p.name] = p.value );
        let options = 0;
        this.options.forEach(o=>{
            options |= o.value;
        });

        this.view.progressEl.show();
        const pfn = (p)=>{
            p = Math.round(p * 100);
            this.view.progressEl.find(".progress-bar")
                .css("width", p + "%")
                .attr("aria-valuenow", p)
                .text(p + "%");
        };
        
        pfn(0);

        this.trigger('save', {file:this.file, image:this.image, options, properties, progress:pfn, done:()=>{
            this.view._skip_c = true;
            this.cancel();
                this.view._skip_c = false;
            }});
    }

    cancel() {
        this.view.el.modal("hide");
    }
}

export default new ImageCapture({
    /*  By default, the image checker needs to be configured depending on your application.
    checkers:[
        new QualityChecker( QualityChecker.qualityBreakpoints ),
        new RatioChecker(16/9),
        new DimensionChecker(),
        new FileSizeChecker()
    ],
    properties: [
        new SlugTextFieldProperty({name: "slug", label: i18n.property_slug_label, placeholder: i18n.property_slug_placeholder, icon: 'fa-globe'}),
        new TextFieldProperty({name:'caption', label:i18n.property_caption_label, placeholder:i18n.property_caption_placeholder, icon: 'fa-tag'}),
        new TextFieldProperty({name:'alt', label:i18n.property_alt_label, placeholder:i18n.property_alt_placeholder, icon: 'fa-bolt'}),
    ],
    options: [
        new Option({id:1, label: i18n.option_scale_to_best, checkedByDefault: true}),
        new Option({id:2, label: i18n.option_render_preview, checkedByDefault: true}),
        new Option({id:4, label: i18n.option_make_watermark, checkedByDefault: false})
    ]
     */
});
