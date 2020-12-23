<?php
$parseSize = function($s) {
    if(preg_match("/(\d+)([kmg])/i", strtolower($s), $ms)) {
        $s = $ms[1];
        if($ms[2] == 'k')
            $s*=1024;
        elseif($ms[2] == 'm')
        $s*=1024*1024;
        elseif($ms[2] == 'g')
        $s*=1024*1024*1024;
    }
    return $s;
}
    ?>
(function(IC) {
    IC.LIMITS.FILE_SIZE: <?= $parseSize( ini_get("upload_max_filesize") ) ?>;
    IC.LIMITS.UPLOADS:   <?= ini_get("max_file_uploads") ?>;
    IC.LIMITS.POST_SIZE: <?= $parseSize( ini_get("post_max_size") ) ?>;
})(window.Skyline.ImageCapture);
