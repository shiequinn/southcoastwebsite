<?php
session_start();

if ($_POST['captcha'] === $_SESSION['captcha']) {
    echo "CAPTCHA verified successfully!";
    // Proceed with form processing
} else {
    echo "Incorrect CAPTCHA. Please try again.";
}
