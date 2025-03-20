<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verify the reCAPTCHA response
    $recaptcha_secret = "6LdLDiMqAAAAAHQj0BCmlLlXJy04iQVwJMuRZvmE";
    $recaptcha_response = $_POST['g-recaptcha-response'];

    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptcha_secret&response=$recaptcha_response");
    $response_keys = json_decode($response, true);

    if(intval($response_keys["success"]) !== 1) {
        echo "Please complete the CAPTCHA.";
    } else {
        // CAPTCHA verified, proceed with form processing
        $name = htmlspecialchars($_POST['name']);
        $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
        $message = htmlspecialchars($_POST['message']);

        // Email details
        $to = "contact@datainsightsolution.com";
        $subject = "New Contact Form Submission";
        $headers = "From: " . $email . "\r\n" .
                   "Reply-To: " . $email . "\r\n" .
                   "X-Mailer: PHP/" . phpversion();

        $body = "Name: $name\n";
        $body .= "Email: $email\n\n";
        $body .= "Message:\n$message\n";

        // Send the email
        if (mail($to, $subject, $body, $headers)) {
            echo "Thank you for your message. It has been sent.";
        } else {
            echo "Sorry, something went wrong. Please try again later.";
        }
    }
} else {
    echo "Invalid request.";
}
?>

