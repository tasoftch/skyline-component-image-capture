import {Source} from "./source";
import {i18n} from "../i18n";

export class LocalFileSource extends Source {
    get name() {
        return i18n.source_local_file;
    }

    get template() {
        return "<div class=\"form-group file-select\" data-placeholder=\""+i18n.modal_drop_zone_text+"\">\n" +
            "                        <label> </label>\n" +
            "                        <input type=\"file\" class=\"form-control\" accept='image/jpeg,image/png,image/gif,image/bmp,image/tiff'>\n" +
            "                    </div>";
    }

    bindTemplate($t) {
        this.fileSelect = $t;
        this.fileInput = this.fileSelect.find("input[type='file']");

        this.fileInput.on("change", ()=>{
            this.handle( this.fileInput[0].files[0] );
        });
    }
}
