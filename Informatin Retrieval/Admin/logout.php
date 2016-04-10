<?php
require_once "../lib/functions.php";
session_start();
if(isset($_SESSION['username']))
{
$uname=$_SESSION['username'];;
}
destroySession();
header("Location:index.php");
?>