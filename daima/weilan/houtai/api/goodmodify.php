<?php
header('Content-type:text/html;charset=utf-8');
include "cot.php";

$bookid = isset($_REQUEST['bookid']) ? $_REQUEST['bookid'] : "";
$booktitle = isset($_REQUEST['booktitle']) ? $_REQUEST['booktitle'] : "";
$bookauthor = isset($_REQUEST['bookauthor']) ? $_REQUEST['bookauthor'] : "";
$pricing = isset($_REQUEST['pricing']) ? $_REQUEST['pricing'] : "";
$price = isset($_REQUEST['price']) ? $_REQUEST['price'] : "";
$discount = isset($_REQUEST['discount']) ? $_REQUEST['discount'] : "";
$stock = isset($_REQUEST['stock']) ? $_REQUEST['stock'] : "";
$bookdetailbookprice = isset($_REQUEST['bookdetailbookprice'])  ? $_REQUEST['bookdetailbookprice'] : "";
$bookimg = isset($_REQUEST['bookimg']) ? $_REQUEST['bookimg'] : "";
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : "";
if ($action == 1) {
    $sql = "DELETE FROM book WHERE bookid=$bookid";
} else if ($action == 0) {
    $sql = "UPDATE  book SET  booktitle='$booktitle',  bookauthor='$bookauthor',  pricing=$pricing, price=$price, discount=$discount, stock=$stock, bookdetailbookprice='$bookdetailbookprice', bookimg='$bookimg' WHERE bookid=$bookid";
} else {
    $sql = "INSERT INTO book (booktitle, bookauthor,pricing,price, discount,stock,bookdetailbookprice,bookimg) VALUES('$booktitle','$bookauthor',$pricing,$price,$discount,$stock,'$bookdetailbookprice','$bookimg')";
}
$conn->query("set names utf8");
$res = $conn->query($sql);
echo $res;
$conn->close();
