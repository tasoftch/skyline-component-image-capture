import {Source} from "./source";
import {i18n} from "../i18n";

import SK from '../skyline'

export class RemoteFileSource extends Source {
    get name() {
        return i18n.source_remote_file;
    }

    get template() {
        return "<div class=\"input-group my-3\">\n" +
            "  <div class='input-group-prepend'><span class=\"input-group-text\">@</span></div> \n" +
            "  <input type=\"text\" class=\"form-control\" placeholder=\"https://www.example.org/image.jpg\">\n" +
            "  <div class='input-group-append'><button class='btn btn-outline-primary' onclick='$(this).parent().parent().find(\"input\").trigger(\"change\")'>"+i18n.source_remote_file_load+"</button></div>" +
            "</div>";
    }

    reset() {
        this.boundI.val("");
    }

    bindTemplate($t) {
        this.bound = $t;
        this.boundI = this.bound.find("input");

        this.boundI.on("change", ()=>{
            const xhr = SK.API.setup.xhr();
            xhr.open("GET", this.boundI.val());
            xhr.responseType = 'arraybuffer';
            xhr.onload = () => {
                if(xhr.status !== 200)
                    this.boundI.addClass("is_invalid");
                else {
                    const f = new Blob([xhr.response], {type:xhr.getResponseHeader('content-type'), name:'test'});

                    f.name = this.boundI.val().split("/").pop();

                    this.handle(f);
                }
            }
            xhr.onerror = () => {
                this.boundI.addClass("is_invalid");
            }
            xhr.send();
        }).on('input', ()=>{
            this.boundI.removeClass("is_invalid");
        });
    }
}
