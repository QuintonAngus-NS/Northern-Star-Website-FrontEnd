// --- Correct cookie extraction ---
function getSessionCookie() {
    const cookies = document.cookie.split("; ");
    const sessionCookie = cookies.find(c => c.startsWith("session="));
    return sessionCookie ? sessionCookie.split("=")[1] : null;
}

const token = getSessionCookie();
const text = document.getElementsByClassName('text')[0];

console.log("Extracted session token:", token);

verify();

async function verify() {

    const cookieCheck = await fetch('https://ns-backend-215034531154.europe-west1.run.app/cookieVerify', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            cookie: token
        })
    });

    const verifyResponse = await cookieCheck.json();
    console.log('verify response is:');
    console.log(verifyResponse);

    if (verifyResponse.outcome === true) {
        localStorage.setItem('username', verifyResponse.username);
        document.body.classList.remove('none');
        document.body.classList.add('vis');
        text.innerHTML = `Hi ${localStorage.getItem('username')}, you're logged in.`;
        console.log(localStorage.getItem('username'));
        console.log('user authorised');
    } else {
        console.log('sent to signUp page');
        window.location.href = 'index.html';
    }
}
