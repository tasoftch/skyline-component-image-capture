/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2019, TASoft Applications
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

import {Source} from "./source";
import {i18n} from "../i18n";

export class CurrentImageSource extends Source {
    get name() {
        return i18n.source_current_name;
    }

    constructor(current_image_uri, default_image_uri, can_delete) {
        super();
        this.current_image_uri = current_image_uri;
        this.default_image_uri = default_image_uri;
        this.can_delete = can_delete;
    }

    get template() {
        return "<div class='d-flex justify-content-center'><div class='d-inline-block position-relative mx-auto my-3'>\n" +
            "    <img src='' style='max-width: 300px; max-height: 300px'>\n" +
            "  <button class=\"btn btn-sm btn-outline-danger\" style=\"position: absolute; bottom: 1em; left: 50%;\">"+i18n.source_current_delete+"</button>" +
            " </div></div>";
    }

    bindTemplate($t) {
        this.image = $t.find("img");
        this.image.attr("src", this.current_image_uri);

        if(!this.can_delete)
            $t.find("button").remove();
        else
            $t.find("button").on("click", () => {
               if(confirm(i18n.source_confirm_delete)) {
                   this.emitter.trigger("delete", {file:this.current_image_uri, success:()=>{
                           this.image.attr("src", this.default_image_uri);
                           $t.find("button").remove();
                       }});
               }
            });
    }
}