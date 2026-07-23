<script>
    function refreshCaptcha() {
        const captchaImage = document.querySelector('.form-captcha img');
        // Append a timestamp to prevent caching
        captchaImage.src = 'captcha_image.php?' + new Date().getTime();
    }
</script>