<?php

if (is_ajax()) {
  if (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
    $action = $_POST["action"];
    switch($action) { //Switch case for value of action
      case "test": main(); breal;
    }
  }
}
else {
        header('Content-Type: application/json');
    echo("bad");
}

//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

    function main() {
        header('Content-Type: application/json');
        $email_to = "alexjyong@gmail.com";
        // validation expected data exists
        if(!isset($_POST['form_firstname']) ||
            !isset($_POST['form_lastname']) ||
            !isset($_POST['form_email']) ||
            !isset($_POST['form_number']) ||
            !isset($_POST['message'])) {
            $return = $_POST;
            $result["error"] = json_encode("We are sorry, but there appears to be a problem with the form you submitted.");
            echo json_encode($return);
            return;
        }
     

        if(isset($_POST['g-recaptcha-response'])){
          $captcha=$_POST['g-recaptcha-response'];
        }
        if(!$captcha){
            $return = $_POST;
            $result["error"] = json_encode("Please check the captcha form");
            //echo json_encode($return);
            echo json_encode("Please check the captcha form");
              return;
        }
        if($response['success'] == false)
        {
            $return = $_POST;
            $result["error"] = json_encode("Error getting captcha validation");
            echo json_encode($return);
            return;
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
        $return = $_POST;
        $result["error"] = json_encode($error_message);
        echo json_encode($return);
        return;
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
        $return = $_POST;
        $result["error"] = json_encode("Error sending emails");
        echo json_encode($return);
        return;
    }
    else {
        $return = $_POST;
        $result["success"] = json_encode("1");
        echo json_encode($return);
        return;
    }

    } 
?>
