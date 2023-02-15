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

(function(IK) {
    Object.assign(IK.TRANSLATIONS, {
        modal_title: "Neues Bild hochladen",
        modal_close: "Schliessem",
        modal_description: "Hier kannst Du neue Bilder auswählen und hochladen in Deine Applikation.",

        modal_cancel: "Abbrechen",
        modal_accept: "Hochladen",

        modal_drop_zone_text: "Oder Datei hierher ziehen…",

        source_local_file: "Datei",
        source_remote_file: "URL",
        source_remote_file_load: "Laden…",
        source_camera: "Kamera",
        source_camera_error: "Konnte keine Verbindung zu der Kamera herstellen.",
        source_camera_capture: "Los!",
        source_camera_default_name: "aufnahme.jpg",

        source_current_name: "Bild",
        source_current_delete: "Löschen",
        source_confirm_delete: "Willst Du dieses Bild wirklich löschen?",

        quality_title: "Qualität",
        quality_perfect: "Perfekt",
        quality_OK: "OK",
        quality_sufficient: "Genügend",
        quality_scarce: "Knapp",
        quality_insufficient: "Ungenügend",

        ratio_title: "Format",
        ratio_bad: "Ungünstig (16:9 bis 1:1)",

        dimension_title: "Abmessung",
        size_title: "Grösse",

        property_slug_error: "Slug darf nur lateinische Zeichen enthalten.",

        image_load_error: "Konnte Bild nicht laden.",

        property_slug_label: "Slug",
        property_slug_placeholder: "meine-datei",
        property_caption_label: 'Titel',
        property_caption_placeholder: "Mein Bild",
        property_alt_label: "Alt",
        property_alt_placeholder: "Text für den Fehlerfall",

        options_label: "Optionen",
        option_scale_to_best: "Auf beste Grösse skalieren",
        option_render_preview: "Vorschaubild erstellen",
        option_make_watermark: "Wasserzeichen erstellen",
        option_make_main: "Als Hauptbild definieren"
    });
})(window.Skyline.ImageCapture);