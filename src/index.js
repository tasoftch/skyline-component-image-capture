
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

import {FileChecker} from "./checkers/file-checker";
import {QualityChecker} from "./checkers/quality-checker";
import {RatioChecker} from "./checkers/ratio-checker";
import {DimensionChecker} from "./checkers/dimension-checker";
import {FileSizeChecker} from "./checkers/file-size-checker";
import {Property} from "./property/property";
import {SlugTextFieldProperty} from "./property/slug-text-field-property";
import {TextFieldProperty} from "./property/textfield-property";
import {TextAreaProperty} from "./property/text-area-property";
import {DisabledOption, Option} from "./options/Option";
import {Source} from "./source/source";
import {LocalFileSource} from "./source/LocalFileSource";
import {RemoteFileSource} from "./source/RemoteFileSource";
import {CameraSource} from "./source/CameraSource";
import {Frame} from "./frame/frame";
import {DisplayOnlyFrame} from "./frame/display-only-frame";
import {EditorFrame} from "./frame/editor-frame";
import {Mask} from "./frame/mask/mask";
import {MaskDefault} from "./frame/mask/mask-default";
import {MaskCircle} from "./frame/mask/mask-circle";
import {Mask16_9} from "./frame/mask/Mask16_9";
import {Mask4_3} from "./frame/mask/mask-4-3";
import {ImageCapture} from "./image-capture";
import {Plugin} from "./Plugin/Plugin";
import {PerformAPISavePlugin} from "./Plugin/PerformAPISavePlugin";
import {CurrentImageSource} from "./source/CurrentImageSource";

((S)=>{
    Object.assign(S, {
        ImageCapture,
        Source: {
            Source,
            LocalFileSource,
            RemoteFileSource,
            CameraSource,
            CurrentImageSource
        },
        Frame: {
            Frame,
            DisplayOnlyFrame,
            EditorFrame
        },
        Mask: {
            Mask,
            MaskDefault,
            MaskCircle,
            Mask16_9,
            Mask4_3
        },
        Checker: {
            FileChecker,
            QualityChecker,
            RatioChecker,
            DimensionChecker,
            FileSizeChecker
        },
        Property: {
            Property,
            TextFieldProperty,
            TextAreaProperty,
            SlugTextFieldProperty
        },
        Option: {
            Option,
            DisabledOption
        },
        Plugin: {
            Plugin,
            PerformAPISavePlugin
        }
    })
})(window.Skyline);
