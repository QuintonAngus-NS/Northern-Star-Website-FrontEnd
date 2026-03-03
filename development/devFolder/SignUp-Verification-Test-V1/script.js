const SUBMIT = document.getElementById('submitBtn');

console.log('frondend server online')

SUBMIT.addEventListener('click', async (e) => {
    e.preventDefault();

    const EMAIL = document.getElementById('emailInput').value;
    const USERNAME = document.getElementById('userNameInput').value;
    const PASSWORD = document.getElementById('passwordInput').value;
    const CONFIRMPASSWORD = document.getElementById('confirmPasswordInput').value;

    const USERNAMEERROR = document.getElementById('userNameError');
    const EMAILERROR = document.getElementById('emailError');
    const PASSWORDERROR = document.getElementById('passwordError');
    const CONFIRMPASSWORDERROR = document.getElementById('confirmPasswordError');

    // Clear old errors
    USERNAMEERROR.innerHTML = "";
    EMAILERROR.innerHTML = "";
    PASSWORDERROR.innerHTML = "";
    CONFIRMPASSWORDERROR.innerHTML = "";

    // Validation rules
    const VALIDUSERNAME = /^[A-Za-z0-9 ]+$/.test(USERNAME);
    const VALIDEMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(EMAIL);
    const VALIDPASSWORD = /^[A-Za-z0-9@_.!-]+$/.test(PASSWORD);
    const VALIDCONFIRMPASSWORD = PASSWORD === CONFIRMPASSWORD;

    // Show errors independently
    if (!VALIDUSERNAME) {
        USERNAMEERROR.innerHTML = "⚠ Invalid Username";
    }

    if (!VALIDEMAIL) {
        EMAILERROR.innerHTML = "⚠ Invalid Email Address";
    }

    if (!VALIDPASSWORD) {
        PASSWORDERROR.innerHTML = "⚠ Invalid Password";
    }

    if (!VALIDCONFIRMPASSWORD) {
        CONFIRMPASSWORDERROR.innerHTML = "⚠ Passwords Do Not Match";
    }

    // If everything is valid, proceed
    if (VALIDUSERNAME && VALIDEMAIL && VALIDPASSWORD && VALIDCONFIRMPASSWORD) {
        console.log("All fields valid — submitting...");

        const signUpRequest = await fetch('https://ns-backend-215034531154.europe-west1.run.app/signUpRequest', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: USERNAME,
                email: EMAIL,
                password: PASSWORD,
                confirmedPassword: CONFIRMPASSWORD
            })
        })

        const signUpResponse = await signUpRequest.json()

        if (signUpResponse.outcome === true) {
            localStorage.setItem('accountID', signUpResponse.accountID)
            window.location.href = 'verify.html'

        }

    }
});
