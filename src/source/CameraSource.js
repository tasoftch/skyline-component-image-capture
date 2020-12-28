import {Source} from "./source";
import {i18n} from "../i18n";

export class CameraSource extends Source {
    constructor() {
        super();
        this.selectByDefault = false;
        this.stream = null;
    }

    get name() {
        return i18n.source_camera;
    }

    get template() {
        return "<div class='d-flex justify-content-center'><div class='d-inline-block position-relative mx-auto my-3'>\n" +
    "    <video width='300' height='225'></video>\n" +
    "    <button class=\"btn btn-sm btn-outline-danger\" style=\"position: absolute; bottom: 1em; left: 50%;\">"+i18n.source_camera_capture+"</button>" +
            "<div class='alert alert-danger'>"+i18n.source_camera_error+"</div>\n" +
    " </div></div>";
    }

    bindTemplate($t) {
        this.video = $t.find("video");
        this.error = $t.find(".alert");

        $t.find("button").on('click', ()=>{
            const canvas = document.createElement('canvas');
            const video = this.video[0];

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(
                video,
                0, 0,
                video.videoWidth, video.videoHeight
            );
            setTimeout(() => {
                var binStr = atob( canvas.toDataURL('image/png').split(',')[1] ),
                    len = binStr.length,
                    arr = new Uint8Array(len);

                for (var i = 0; i < len; i++ ) {
                    arr[i] = binStr.charCodeAt(i);
                }

                const b = new Blob( [arr], {type: 'image/png'} );
                b.name = i18n.source_camera_default_name;
                this.handle(b);
            });
        });
    }

    presentError(error) {
        console.log(error);
        this.error.show();
    }

    initWebcam(stream) {
        console.log("OK", stream);
        this.stream = stream;
        const video = this.video[0];
        video.width = video.offsetWidth;
        video.height = video.offsetHeight;

        if('srcObject' in video) {
            video.srcObject = stream;
        } else if(window.webkitURL)
            video.src = window.webkitURL.createObjectURL(stream);
        else if(window.URL)
            video.src = window.URL.createObjectURL(stream);

        video.play();
    }

    select() {
        this.error.hide();
        const videoObj    = { "video": true };
        try {
            if(navigator.mediaDevices.getUserMedia)
                navigator.mediaDevices.getUserMedia(videoObj).then((s)=>this.initWebcam(s)).catch((e) => this.presentError(e));
            else if(navigator.mediaDevices.webkitGetUserMedia)
                navigator.mediaDevices.webkitGetUserMedia(videoObj).then((s)=>this.initWebcam(s)).catch((e) => this.presentError(e));
            else if(navigator.mediaDevices.mozGetUserMedia)
                navigator.mediaDevices.mozGetUserMedia(videoObj).then((s)=>this.initWebcam(s)).catch((e) => this.presentError(e));
            else
                this.presentError();
        } catch (err) {
            this.presentError(err);
        }
    }

    deselect() {
        if(this.stream) {
            console.log("DESEL");

            const video = this.video[0];
            video.pause();
            video.src = "";
            video.srcObject = undefined;

            this.stream.getTracks().forEach(t=>t.stop());
        }
    }
}
