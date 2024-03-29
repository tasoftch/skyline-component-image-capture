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

import {Plugin} from "./Plugin";

import API from "../api";

export class PerformAPISavePlugin extends Plugin {
    constructor(target, reference) {
        super();
        this.reference = reference;
        this.target = target;
    }

    get name() {
        return "api-save";
    }

    install(emitter, params) {
        emitter.on("save", ({file, options, properties, progress, done, error})=>{
            const fd = new FormData();

            if(this.reference !== undefined)
                fd.append('ic-ref', this.reference);
            fd.append('ic-file', file);
            fd.append('ic-options', options);
            fd.append('ic-props', JSON.stringify(properties));
            if(typeof progress.slug !== 'undefined')
                fd.append('ic-slug', progress.slug);

            API.post(this.target, fd)
                .error(e=>{
                    error(e.message ? e.message : e);
                })
                .success((d)=>{
                    progress(1);
                    emitter.trigger("saved", d)
                    done();
                })
                .upload(p => {
                    progress(p/100);
                })
        }).on("delete", ({file, success})=>{
            const fd = new FormData();

            if(this.reference !== undefined)
                fd.append('ic-ref', this.reference);
            fd.append("ic-delete", file);

            API.post(this.target, fd)
                .success(success)
        })
    }
}