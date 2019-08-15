<?php
$name = $_POST['username'];
$arr = array(123, 25252);

if (in_array($name, $arr)) {
    echo 'no';
} else {
    echo 'yes';
}
