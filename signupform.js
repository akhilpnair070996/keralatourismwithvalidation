const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
let timeout;
let strengthBadge = document.getElementById('StrengthDisp');
let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,8}))')


form.addEventListener('submit', e => {
	e.preventDefault();
	// console.log(phone.value)
	checkInputs();
});

function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const phoneValue = phone.value.replace(/\s/g, "");
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	
	if(usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
	} else {
		setSuccessFor(username);
	}

	if(phoneValue === '') {
		setErrorFor(phone, 'Phone cannot be blank');
	} else if(!isPhone(phoneValue)) {
		setErrorFor(phone, "Not a valid number");
	}else{		
		setSuccessFor(phone);
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
	
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	}else if (!isPassword(passwordValue)) {
		setErrorFor(password, 'Not a valid password');
	} else {
		setSuccessFor(password);
	}
	
	if(password2Value === '') {
		setErrorFor(password2, 'Password2 cannot be blank');
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
	} else{
		setSuccessFor(password2);
	}

	
	//const formGroup = document.getElementsByClassName('form-group')[0]; 
	if(username.parentElement.classList.contains('error')||email.parentElement.classList.contains('error')||phone.parentElement.classList.contains('error')||password.parentElement.classList.contains('error')||password2.parentElement.classList.contains('error')||email.parentElement.classList.contains('error')){
		alert("Form error")
	}else{
		window.location.replace("http://127.0.0.1:5500/login.html");
	}
	




}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-group error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-group success';
}
	
function isEmail(email) {
	return /^([A-Za-z0-9\.-]+)@([A-Za-z0-9\-]+).([a-z]{2,3})(.[a-z]{2,3})?$/.test(email);
}
	
function isPhone(phone) {
	return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);
	//return /^[\s\./0-9]{10}$/.test(phone);
}

function isPassword(password) {
	return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
}

function StrengthChecker(PasswordParameter) {
    if(strongPassword.test(PasswordParameter)) {
        strengthBadge.style.backgroundColor = "green";
        strengthBadge.textContent = 'Strong';
    } else if(mediumPassword.test(PasswordParameter)) {
        strengthBadge.style.backgroundColor = 'orange';
        strengthBadge.textContent = 'Medium';
    } else {
        strengthBadge.style.backgroundColor = 'red';
        strengthBadge.textContent = 'Weak';
    }
}

password.addEventListener("input", () => {
    strengthBadge.style.display = 'block';
    clearTimeout(timeout);
    timeout = setTimeout(() => StrengthChecker(password.value), 500);
    if(password.value.length !== 0) {
        strengthBadge.style.display != 'block';
    } else {
        strengthBadge.style.display = 'none';
    }
});