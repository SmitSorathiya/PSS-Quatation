// Function to dynamically reframe the quotation so it fits perfectly on a single A4 page
function reframeQuotation() {
    const page = document.getElementById('quotationPage');
    const inner = document.getElementById('quotationInner');
    if (!page || !inner) return;

    // Reset styles to measure natural unconstrained content height
    page.classList.remove('compact-1', 'compact-2', 'compact-3');
    inner.style.transform = '';

    // Height available inside quotationPage
    const availableHeight = inner.clientHeight;
    
    // Check if content exceeds available height (with 2px tolerance)
    if (inner.scrollHeight > availableHeight + 2) {
        page.classList.add('compact-1');
    }
    if (inner.scrollHeight > availableHeight + 2) {
        page.classList.remove('compact-1');
        page.classList.add('compact-2');
    }
    if (inner.scrollHeight > availableHeight + 2) {
        page.classList.remove('compact-2');
        page.classList.add('compact-3');
    }
    if (inner.scrollHeight > availableHeight + 2) {
        // If content still exceeds even after compacting, scale inner proportionally
        const scale = Math.floor((availableHeight / inner.scrollHeight) * 1000) / 1000;
        inner.style.transform = `scale(${scale})`;
    }
}

// Function to setup live binding between input and output elements
function bindInput(inputId, outputId, isDate = false) {
    const inputEl = document.getElementById(inputId);
    const outputEl = document.getElementById(outputId);
    
    if (inputEl && outputEl) {
        inputEl.addEventListener('input', function() {
            if (isDate && this.value) {
                // Format date from YYYY-MM-DD to DD-MM-YYYY
                const dateParts = this.value.split('-');
                if (dateParts.length === 3) {
                    outputEl.textContent = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
                } else {
                    outputEl.textContent = this.value;
                }
            } else {
                outputEl.textContent = this.value;
            }
            reframeQuotation();
        });
        
        // Initial setup
        if (inputEl.value) {
            outputEl.textContent = inputEl.value;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Password protection
    const passwordOverlay = document.getElementById('passwordOverlay');
    const passwordInput = document.getElementById('passwordInput');
    const passwordBtn = document.getElementById('passwordBtn');
    const passwordError = document.getElementById('passwordError');

    function checkPassword() {
        if (passwordInput.value === 'pss2026') {
            passwordOverlay.style.display = 'none';
            setTimeout(reframeQuotation, 50);
        } else {
            passwordError.style.display = 'block';
            passwordInput.value = '';
        }
    }

    if (passwordBtn) {
        passwordBtn.addEventListener('click', checkPassword);
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }

    // Basic Meta
    bindInput('refNo', 'outRefNo');
    bindInput('date', 'outDate', true);
    
    // To Details
    bindInput('toManager', 'outToManager');
    bindInput('toCompany', 'outToCompany');
    bindInput('toAddressLine1', 'outToAddressLine1');
    bindInput('toAddressLine2', 'outToAddressLine2');
    
    // Rates
    bindInput('rateSupervisor', 'outRateSupervisor');
    bindInput('rateGuard', 'outRateGuard');
    bindInput('rateGunman', 'outRateGunman');
    bindInput('rateExMan', 'outRateExMan');
    bindInput('rateBouncer', 'outRateBouncer');
    
    // Set current date as default
    const dateInput = document.getElementById('date');
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.value = `${yyyy}-${mm}-${dd}`;
    
    // Trigger input event to update preview
    dateInput.dispatchEvent(new Event('input'));

    // Signature Toggle
    const signatureCheckbox = document.getElementById('includeSignature');
    const signatureImg = document.getElementById('outSignatureImg');
    const signatureArea = document.getElementById('outSignatureArea');

    function updateSignature() {
        if (!signatureCheckbox || !signatureImg) return;
        const isChecked = signatureCheckbox.checked;
        signatureImg.style.display = isChecked ? 'block' : 'none';
        if (signatureArea) {
            if (isChecked) {
                signatureArea.classList.add('has-signature');
            } else {
                signatureArea.classList.remove('has-signature');
            }
        }
        reframeQuotation();
    }

    if (signatureCheckbox) {
        signatureCheckbox.addEventListener('change', updateSignature);
        signatureCheckbox.addEventListener('click', updateSignature);
        signatureCheckbox.addEventListener('input', updateSignature);
        updateSignature();
    }

    // Window events for reframing
    window.addEventListener('resize', reframeQuotation);
    window.addEventListener('beforeprint', reframeQuotation);
    window.addEventListener('afterprint', reframeQuotation);

    // Initial reframe
    setTimeout(reframeQuotation, 100);
});
