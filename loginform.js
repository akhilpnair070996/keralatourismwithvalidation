const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
	e.preventDefault();
	// console.log(phone.value)
	checkInputs(e);
});

function checkInputs(e) {
	// trim to remove the whitespaces
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	
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


	// console.log(, password.parentElement)
	// const emailInput = document.getElementsByClassName('form-group')[0];
	// const passwordInput = document.getElementsByClassName('form-group')[1];
	if(email.parentElement.classList.contains('error') || password.parentElement.classList.contains('error') ){
		alert("Form error")
	}else{
		window.location.replace("http://127.0.0.1:5500/index.html");
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

function isPassword(password) {
	return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
}