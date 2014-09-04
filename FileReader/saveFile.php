<?php
if(isset($_POST['thefile'])) {
    $data = $_POST['thefile'] . '-' . "\n";
    $ret = file_put_contents('/tmp/mydata.png', $data, FILE_APPEND | LOCK_EX);
    if($ret === false) {
        die('There was an error writing this file');
    }
    else {
        echo "$ret bytes written to file";
    }
}
else {
   die('no post data to process');
}
?>