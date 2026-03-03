Btns = document.querySelectorAll('.linkBtn').forEach(Btn => {
    Btn.addEventListener('click', () => {
        window.location.href = `devFolder/${Btn.id}/index.html`
    })
})