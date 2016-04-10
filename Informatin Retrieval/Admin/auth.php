<?php
	session_start();
	
	if( array_key_exists( 'submitted', $_POST ) )
	{
		include('../lib/db.php');
		
		if( !empty( $_POST['uname'] ) )
		{
			$un = $_POST['uname'];
		}
		else
		{
			$msgs = urlencode('Please fill missing fields');
			header("location: index.php?msgs=$msgs");
			exit();
		}
		
		if( !empty( $_POST['pass'] ) )
		{
			$p = $_POST['pass'];
		}
		else
		{
			$msgs = urlencode("Please fill missing fields");
			header("location: index.php?msgs=$msgs");
			exit();
		}
		
		$q = "SELECT user_id, username 
			  FROM users
			  WHERE
			  (username='$un' AND password=SHA1('$p'))";
			  
		$r = mysql_query( $q );
		
		if( mysql_num_rows( $r ) > 0 )
		{
			list( $user_id, $username ) = mysql_fetch_row( $r );
			
			$_SESSION['id'] = $user_id;
			$_SESSION['username'] = $username;
			header("location: admin.php");
		}
		else
		{
			$msgs = urlencode("either your username or password is incorrect");
			header("location: index.php?msgs=$msgs");
		}
		
	}
?>