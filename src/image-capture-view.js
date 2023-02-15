
export class ImageCaptureView {
    constructor(emitter, $el) {
        this.el = $el;
        this._skip_c = false;
        this._emitter = emitter;

        $el.on("hide.bs.modal", ()=>{
            if(!this._skip_c) {
                emitter.sources.forEach(p=>p.deselect());
                emitter.trigger('cancel');
            }
        });

        this.checkerEl = $el.find(".list-group");
        this.frameEl = $el.find(".frame-set");
        this.propertyEl = $el.find(".property-container");
        this.optionEl = $el.find(".option-container");
        this.optionLbl = $el.find(".options-label");

        this.sourcesElM = $el.find(".sources");
        this.sourcesEl = $el.find(".sources .tab-content");
        this.sourcesTabEl = $el.find(".sources .nav");

        this.fileInfo = $el.find(".file-info");
        this.imageEl = this.fileInfo.find("img")[0];
        this.progressEl = $el.find(".progress");
        this.saveButton = $el.find("button[data-role='update']");

        this.checkers = new Map();
        this.properties = new Map();
        this.options = new Map();

        this.sources = new Map();
        this.selectedSource = null;

        this.frame = null;

        this.saveButton.on("click", e=>emitter.validateAndSave());
    }

    runModal() {
        this.sourcesElM.show();
        this.fileInfo.hide();
        this.progressEl.hide();
        this.fileInfo.find("alert").remove();

        this.saveButton.attr("disabled", 'disabled');

        this.el.modal("show");
    }

    presentError(message, level) {
        this.fileInfo.prepend( "<div class='alert alert-"+level+"'>"+message+"</div>" );
    }

    addSource(source) {
        if(!this.sources.has(source)) {
            const t = source.renderTemplate();
            const w = $("<div class=\"tab-pane fade\" role=\"tabpanel\"></div>");
            w.append(t);

            this.sourcesEl.append(w);

            const $t = $("<li class='nav-item' role='presentation'><a class=\"nav-link ic-tab-item\" href='#' onclick='return false;'>"+source.name+"</a></li>");
            $t.on("click", () => {
                this._emitter.selectSource(source);
            })
            this.sources.set(source, {w, t:$t});
            this.sourcesTabEl.append($t);
        }
    }

    select(source) {
        if(source && this.selectedSource !== source) {
            if(this.selectedSource) {
                this.selectedSource.deselect();
            }

            this.selectedSource = source;
            const ds = this.sources.get(source);
            if(ds) {
                const {w,t}=ds;
                this.sourcesTabEl.find("li a").removeClass("active");
                t.find("a").addClass("active");
                this.sourcesEl.find(".tab-pane").removeClass("show").removeClass("active");
                w.addClass("active").addClass("show");
            }
        }
    }

    removeSource(source) {
        if(this.sources.has(source)) {
            const {w,t} = this.sources.get(source);
            if(this.selectedSource === source) {
                source.deselect();
                this.selectedSource = null;
                this.sourcesTabEl.find("li a").removeClass("active");
                this.sourcesEl.find(".tab-pane").removeClass("show").removeClass("active");
            }
            w.remove();
            t.remove();
            this.sources.delete(source);
        }
    }

    setupFrame(frame) {
        if(this.frame) {
            this.frame.remove();
        }

        this.frame = frame.renderTemplate();
        this.frameEl.append(this.frame);
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
            this.optionLbl.removeClass("d-none");
        }
    }

    removeOption(option) {
        if(this.options.has(option)) {
            const r = this.options.get(option);
            r.remove();
            this.options.delete(option);

            if(this.options.size < 1)
                this.optionLbl.addClass("d-none");
        }
    }
}
