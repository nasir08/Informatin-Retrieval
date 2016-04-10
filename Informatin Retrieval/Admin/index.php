<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Login</title>
<link rel="stylesheet" type="text/css" href="css/login.css" />
</head>

<body>
	<?php
		if( !empty( $_GET['msgs'] ) )
		{
			echo '<p class="err">'.$_GET['msgs'].'</p>';
		}
	?>
    <div id="dimg" align="center">
    	<img src="../img/crawl.png" />
        <h2>Crawler Search Engine indexer</h2>
    </div>
    <div id="login">
    <h3>admin login</h3>
	<form method="post" action="auth.php">
    	<label>username:</label>
        <input type="text" name="uname" value="" />
        
        <label>password:</label>
        <input type="password" name="pass" />
        
        <div><input type="submit" name="submitted" value="login" /></div>
    </form>
    </div>
    <div id="spacer"></div>
</body>
</html>