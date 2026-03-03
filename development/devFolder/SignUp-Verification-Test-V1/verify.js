const mainText = document.getElementById('userNameText');

async function usernamelookup() {
    const usernameRequest = await fetch(
        'https://ns-backend-215034531154.europe-west1.run.app/usernameLookUp',
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                accountID: localStorage.getItem("accountID")
            })
        }
    );

    const username = await usernameRequest.json();
    return username.username;
}

async function loadUsername() {
    const name = await usernamelookup();
    mainText.innerHTML = `Hi, ${name}`;
}

loadUsername();



const codeInput = document.getElementById('verificationCodeInput')

codeInput.addEventListener('input', async () => {
    if (codeInput.value.length >= 6) {
        codeInput.disabled = true

        console.log('code entered')
        
        verify = await fetch('https://ns-backend-215034531154.europe-west1.run.app/verifyAccount', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: codeInput.value,
                id: localStorage.getItem('accountID')
            })
        })

        const response = await verify.json()

        if (response.outcome === false) {
            codeInput.disabled = false
            codeInput.value = ''
        } else if (response.outcome === true) {
            const token = await fetch('https://ns-backend-215034531154.europe-west1.run.app/tokenGen', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: localStorage.getItem('accountID')
                })
            })

            const tokenResponse = await token.json()

            if (tokenResponse.outcome === false) {
                console.log('an error ocoured when generating a token, please try again later')

            } else {
                document.cookie = `session=${tokenResponse.outcome}; path=/; max-age=43200; secure; samesite=None`
                window.location.href = 'dashboard.html'
            }
        } else {
            console.log('An error ocoured while atempting to verify, try again later')
        }
    }
})