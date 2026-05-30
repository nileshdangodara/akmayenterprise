
/* ── Scroll reveal ──────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 80);
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

/* ── Char counter ───────────────────────────────── */
const msgEl = document.getElementById('message');
const countEl = document.getElementById('char-count');
msgEl.addEventListener('input', () => {
    const len = msgEl.value.length;
    countEl.textContent = `${len} / 500`;
    countEl.classList.toggle('warn', len > 420);
});

/* ── Checkbox icon ──────────────────────────────── */
const consent = document.getElementById('consent');
const checkIcon = document.getElementById('check-icon');
consent.addEventListener('change', () => {
    checkIcon.style.display = consent.checked ? 'block' : 'none';
});

/* ── Select filled state ────────────────────────── */
document.getElementById('service').addEventListener('change', function () {
    document.getElementById('service-wrap').classList.toggle('filled', !!this.value);
});

/* ── Form validation & submit ───────────────────── */
const form = document.getElementById('contact-form');
const btnText = document.getElementById('btn-text');
const btnIcon = document.getElementById('btn-icon');
const spinner = document.getElementById('btn-spinner');

function showError(input, msg) {
    const errEl = input.closest('.field-wrap')?.querySelector('.error-msg');
    if (errEl) { errEl.textContent = msg; errEl.classList.remove('hidden'); }
    input.style.borderBottomColor = '#f87171';
}
function clearError(input) {
    const errEl = input.closest('.field-wrap')?.querySelector('.error-msg');
    if (errEl) errEl.classList.add('hidden');
    input.style.borderBottomColor = '';
}

['name', 'email', 'service', 'message'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', function () { clearError(this); });
});

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const service = document.getElementById('service');
    const message = document.getElementById('message');
    const conErrEl = document.querySelector('.consent-error');

    if (!name.value.trim()) { showError(name, 'Please enter your name.'); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError(email, 'Enter a valid email address.'); valid = false;
    }
    if (!service.value) { showError(service, 'Please select a service.'); valid = false; }
    if (!message.value.trim()) { showError(message, 'Please write a message.'); valid = false; }
    if (!consent.checked) {
        conErrEl.classList.remove('hidden'); valid = false;
    } else {
        conErrEl.classList.add('hidden');
    }

    if (!valid) return;

    /* Loading state */
    btnText.textContent = 'Sending…';
    btnIcon.classList.add('hidden');
    spinner.classList.remove('hidden');

    /* Simulate async submit */
    try {
        const payload = {
            formSource: 'Contact Us',
            fullName: name.value.trim(),
            emailAddress: email.value.trim(),
            phoneNumber: document.getElementById('phone').value.trim() || 'Not Provided',
            serviceInterest: service.value,
            message: message.value.trim()
        };

        const res = await fetch('/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error('Failed to send message');
    } catch (err) {
        alert('An error occurred while sending your message. Please try again or use direct email.');
        spinner.classList.add('hidden');
        btnText.textContent = 'Send Message';
        btnIcon.classList.remove('hidden');
        return;
    }

    spinner.classList.add('hidden');
    btnText.textContent = 'Send Message';
    btnIcon.classList.remove('hidden');

    form.reset();
    document.getElementById('service-wrap').classList.remove('filled');
    checkIcon.style.display = 'none';
    countEl.textContent = '0 / 500';

    document.getElementById('success-overlay').classList.add('show');
});

/* ── Sticky Nav ────────────────────────────────────────── */
const nav = document.getElementById('topnav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});
