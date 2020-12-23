
import {i18n} from "../i18n";

export const _panel = "<div class=\"modal fade\" id=\"sky-it-capture-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"sky-it-capture-modal-titel\"\n" +
        "     aria-hidden=\"true\">\n" +
        "    <div class=\"modal-dialog\" role=\"document\">\n" +
        "        <div class=\"modal-content\">\n" +
        "            <div class=\"modal-header alert-primary\">\n" +
        "                <h5 class=\"modal-title\" id=\"sky-it-capture-modal-titel\">"+i18n.modal_title+"</h5>\n" +
        "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\""+i18n.modal_close+"\">\n" +
        "                    <span aria-hidden=\"true\">&times;</span>\n" +
        "                </button>\n" +
        "            </div>\n" +
        "            <div class=\"modal-body\">\n" +
        "                    <p>\n" +
        i18n.modal_description +
        "                    </p>\n" +
        "                    <div class=\"form-group file-select\" data-placeholder=\"Or put here\">\n" +
        "                        <label> </label>\n" +
        "                        <input type=\"file\" class=\"form-control\" accept='image/jpeg,image/png,image/gif,image/bmp,image/tiff'>\n" +
        "                    </div>\n" +
        "                    <div class=\"file-info\">\n" +
        "                        <figure class=\"figure w-100 text-center\">\n" +
        "                            <img class=\"w-75 img-fluid rounded shadow\" src=\"\" alt=\"\">\n" +
        "                        </figure>\n" +
        "                        <ul class=\"list-group\">\n" +
        "                        </ul>\n" +
        "\n" +
        "                        <hr class=\"my-2\">\n" +
        "                        <div class='property-container'></div>" +
    "                            <div class=\"form-group row\">\n" +
        "                            <label for=\"\" class=\"col-lg-2 col-form-label\">"+i18n.options_label+"</label>\n" +
        "                            <div class=\"col-md-9 pt-1\">\n" +
        "                                <div class=\"option-container\"></div>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                        <div class=\"progress\">\n" +
        "                            <div class=\"progress-bar\" role=\"progressbar\" style=\"width: 25%;\" aria-valuenow=\"25\"\n" +
        "                                 aria-valuemin=\"0\" aria-valuemax=\"100\">25%\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <div class=\"modal-footer d-flex justify-content-between\">\n" +
        "            <button type=\"button\" class=\"btn btn-sm btn-outline-danger\" data-dismiss=\"modal\">"+i18n.modal_cancel+"</button>\n" +
        "            <button type=\"button\" class=\"btn btn-sm btn-outline-success\" data-role=\"update\">"+i18n.modal_accept+"</button>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "</div>";
