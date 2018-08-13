<?php
if(isset($_POST['email'])) {
 
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "alexjyong@gmail.com";
 
 
 
    // validation expected data exists
    if(!isset($_POST['form_firstname']) ||
        !isset($_POST['form_lastname']) ||
        !isset($_POST['form_email']) ||
        !isset($_POST['form_number']) ||
        !isset($_POST['message'])) {
	    header('Content-Type: application/json');
	    echo "Error: ", array('error' => '1', 'error_text', 'We are sorry, but there appears to be a problem with the form you submitted.');
		die();
    }
 

	if(isset($_POST['g-recaptcha-response'])){
	  $captcha=$_POST['g-recaptcha-response'];
	}
	if(!$captcha){
	  echo '<h2>Please check the the captcha form.</h2>';
	  exit;
	}
	$response=json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6Ldgw2kUAAAAANkm5iRK9Yl-1OJKjuN2MHuhLIH5&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']), true);
	if($response['success'] == false)
	{
	  echo '<h2>Error getting captcha validation.';
	}
	else
	{
		//do nothing
	}     
 
    $first_name = $_POST['form_firstname']; // required
    $last_name = $_POST['form_lastname']; // required
    $email_from = $_POST['form_email']; // required
    $telephone = $_POST['form_number']; // not required
    $comments = $_POST['message']; // required
 
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
 
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
  }
 
    $string_exp = "/^[A-Za-z .'-]+$/";
 
  if(!preg_match($string_exp,$first_name)) {
    $error_message .= 'The First Name you entered does not appear to be valid.<br />';
  }
 
  if(!preg_match($string_exp,$last_name)) {
    $error_message .= 'The Last Name you entered does not appear to be valid.<br />';
  }
 
  if(strlen($comments) < 2) {
    $error_message .= 'The Comments you entered do not appear to be valid.<br />';
  }
 
  if(strlen($error_message) > 0) {
    header('Content-Type: application/json');
    echo "Error: ", array('error' => '1', 'error_text', $error_message);
    die();
  }
 
    $email_subject = "A message from " .clean_String($first_name)." ".clean_string($last_name);
    $email_message = "You have a message!.\n\n";
 
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
 
     
 
    $email_message .= "First Name: ".clean_string($first_name)."\n";
    $email_message .= "Last Name: ".clean_string($last_name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Telephone: ".clean_string($telephone)."\n";
    $email_message .= "Message: ".clean_string($comments)."\n";
 
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
$mail_check = @mail($email_to, $email_subject, $email_message, $headers);  

if(!$mail_check){

	header('Content-Type: application/json');
	echo "Result: ", array('error' => '1', 'error_text', "Error sending emails");
}
else {
	header('Content-Type: application/json');
	echo "Result: ", array('success' => '1');
}
?>
 
<!-- include your own success html here -->
 
Thank you for contacting us. We will be in touch with you very soon.
 
<?php
 
}
?>
