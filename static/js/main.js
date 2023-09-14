'use strict';

function generatePwds() {
    window.location.href = 'gen_pwds.html';
};

function goBack() {
    window.location.href = 'index.html';
};

function getSnackbar(snackbarMessage, snackbarColor) {
    let snackbar = document.getElementById('snackbar');

    snackbar.className = 'show';

    snackbar.style.backgroundColor = snackbarColor;

    // if snackbar color is GREEN
    if (snackbarColor == '#28A745') {
        snackbar.innerText = `${snackbarMessage} copied!`;
    } else {
        snackbar.innerText = `Copy failed: ${snackbarMessage}`;
    }

    // After 1.2 seconds, remove the show class from snackbar
    setTimeout(function(){ snackbar.className = snackbar.className.replace('show', ''); }, 1200);
};

async function copyToClipboard(copyMessage, pwd) {
    try {
        await navigator.clipboard.writeText(pwd);

        console.log(`${copyMessage} was copied succesfully`);

        getSnackbar(copyMessage, '#28A745');
    } catch(e) {
        console.error(`Copy failed: ${e}`);
        
        getSnackbar(e, '#DC3545');
    }
};

function removeActivePwdInputs(activePwdInputs) {
    console.log('remove');
    activePwdInputs.forEach((activePwdInput) => {
        activePwdInput.classList.remove('active');
    })
};

function copyAll() {
    let activePwdInputs = document.querySelectorAll('.active');

    if (activePwdInputs.length > 1) {
        removeActivePwdInputs(activePwdInputs);
    } else {
        let arrayPwds = Array.from(pwdElements, (pwdElement) => pwdElement.value);

        pwdElements.forEach((pwdElement) => {
            pwdElement.classList.add('active');
        })

        copyToClipboard('All', arrayPwds);
    }
};

function copyThis(pwdElement) {
    let thisPwd = pwdElement.value;
        let activePwdInputs = document.querySelectorAll('.active');

        if (activePwdInputs.length > 0) {
            removeActivePwdInputs(activePwdInputs);
        }

        copyToClipboard(thisPwd, thisPwd);

        pwdElement.classList.add('active');
};