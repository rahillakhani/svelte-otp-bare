<footer>
    <p>
        Didn’t receive a code? <a href="/retry" onclick={resendCode}>Resend</a>
    </p>
</footer>

<script>
    function resendCode() {
        alert("A new code has been sent!");
    }
</script>

<style>
    footer {
        text-align: center;
        margin-top: 20px;
        font-size: 0.9rem;
    }
    
    a {
        color: #007BFF;
        text-decoration: none;
        cursor: pointer;
    }
    
    a:hover {
        text-decoration: underline;
    }
</style>
