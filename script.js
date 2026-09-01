// script.js

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
});
