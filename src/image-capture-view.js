
export class ImageCaptureView {
    constructor(emitter, $el) {
        this.el = $el;
        this._skip_c = false;

        $el.on("hide.bs.modal", ()=>{if(!this._skip_c)emitter.trigger('cancel')});

        this.checkerEl = $el.find(".list-group");
        this.propertyEl = $el.find(".property-container");
        this.optionEl = $el.find(".option-container");

        this.fileSelect = $el.find(".file-select");
        this.fileInput = this.fileSelect.find("input[type='file']");
        this.fileInfo = $el.find(".file-info");
        this.imageEl = this.fileInfo.find("img")[0];
        this.progressEl = $el.find(".progress");
        this.saveButton = $el.find("button[data-role='update']");

        this.checkers = new Map();
        this.properties = new Map();
        this.options = new Map();

        this.fileInput.on("change", (e) => emitter.updateFromInput(this.fileInput[0]));
        this.saveButton.on("click", e=>emitter.validateAndSave());
    }

    runModal() {
        this.fileInput.val("");
        this.fileSelect.show();
        this.fileInfo.hide();
        this.progressEl.hide();
        this.fileInfo.find("alert").remove();

        this.saveButton.attr("disabled", 'disabled');

        this.el.modal("show");
    }

    presentError(message, level) {
        this.fileInfo.prepend( "<div class='alert alert-"+level+"'>"+message+"</div>" );
    }

    addChecker(checker) {
        if(!this.checkers.has(checker)) {
            const t = checker.renderTemplate();
            this.checkerEl.append(t);
            this.checkers.set(checker, t);
        }
    }

    removeChecker(checker) {
        if(this.checkers.has(checker)) {
            const r = this.checkers.get(checker);
            r.remove();
            this.checkers.delete(checker);
        }
    }

    addProperty(property) {
        if(!this.properties.has(property)) {
            const t = property.renderTemplate();
            this.propertyEl.append(t);
            this.properties.set(property, t);
        }
    }

    removeProperty(property) {
        if(this.properties.has(property)) {
            const r = this.properties.get(property);
            r.remove();
            this.properties.delete(property);
        }
    }

    addOption(option) {
        if(!this.options.has(option)) {
            const t = option.renderTemplate();
            this.optionEl.append(t);
            this.options.set(option, t);
        }
    }

    removeOption(option) {
        if(this.options.has(option)) {
            const r = this.options.get(option);
            r.remove();
            this.options.delete(option);
        }
    }
}
