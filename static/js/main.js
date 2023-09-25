'use strict';

function generateObject(objectName, requestedNodeList) {
    try {
        let objectKeys;
        let objectValues;
        let resultObject = {};
    
        if (objectName == "pwds_length_quantity") {
            for (let piIndex = 0; piIndex < 2; piIndex++) {
                objectKeys = requestedNodeList[piIndex].id;
                objectValues = requestedNodeList[piIndex].value;
                
                Object.assign(resultObject, {[objectKeys]: objectValues});
            }
        } else if (objectName == "alphabet_composition") {
            for (let acIndex = 0; acIndex < 4; acIndex++) {
                objectKeys = requestedNodeList[acIndex].id;
                objectValues = requestedNodeList[acIndex].checked;
    
                Object.assign(resultObject, {[objectKeys]: objectValues});
            }
        } else {
            return False
        }
    
        return resultObject
    } catch (ReferenceError) {
        console.error(`Unable to generate an object! Unknown object name ${objectName}!\nExcpected: "pwds_length_quantity" or "alphabet_composition"\n${ReferenceError}`)
    }
    
};

function getJSONPwdsInfo() {
    const pwdsLengthQuantity = generateObject("pwds_length_quantity", document.querySelectorAll('.text-input'));
    const alphabetComposition = generateObject("alphabet_composition", document.querySelectorAll('.chk-btn'));

    const json = JSON.stringify([pwdsLengthQuantity, alphabetComposition]);

    return json
};

async function getRequest() {
    try {
        const jsonData = getJSONPwdsInfo();
        
        window.location.href = 'gen_pwds.html';

        console.log("Успех:", jsonData);
    } catch (e) {
        return console.log(`Generation failed: ${e}`);
    }
}

function goBack() {
    window.location.href = 'index.html';
};

function getSnackbar(snackbarMessage) {
    let snackbar = document.getElementById('snackbar');

    snackbar.className = 'show';
    snackbar.style.backgroundColor = '#28A745';
    snackbar.innerText = `${snackbarMessage} copied!`;

    // After 1.2 seconds, remove the show class from snackbar
    setTimeout(function(){ snackbar.className = snackbar.className.replace('show', ''); }, 1200);
};

async function copyToClipboard(copyMessage, pwd) {
    try {
        await navigator.clipboard.writeText(pwd);

        console.log(`${copyMessage} was copied succesfully`);

        getSnackbar(copyMessage);
    } catch(e) {
        console.error(`Copy failed: ${e}`);
    }
};

function removeActivePwdInputs(activePwdInputs) {
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