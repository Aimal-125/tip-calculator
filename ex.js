let billInput = document.querySelector(".billAmount");
let billError = document.querySelector(".error1");

let buttons = document.querySelectorAll(".btn");
let percentageError = document.querySelector(".error3");
let customInput = document.querySelector(".customAmount");

let personInput = document.querySelector(".personAmount");
let personError = document.querySelector(".error2");

let tipText = document.querySelector("#amount-per-person");
let totalText = document.querySelector("#total-amount-per-person");

let resetBtn = document.querySelector("#reset");

let p1 = document.querySelector(".p1");
let p2 = document.querySelector(".p2");
let p3 = document.querySelector(".p3");
let p4 = document.querySelector(".p4");
let p5 = document.querySelector(".p5");

let b;
let v;
let c;
let p;
let regex = /[^.\d]/gi;

let billPerPerson;
let tipAmountPerPerson;
let totalAmountPerPerson;

tipText.innerText = "$0.00";
totalText.innerText = "$0.00";

billInput.addEventListener("input", () => {
	b = Math.abs(parseFloat(billInput.value));
	localStorage.setItem("b", b);
	billPerPerson = (localStorage.getItem("b")) / (localStorage.getItem("p"));
	if(p1.classList.contains("focused") || p2.classList.contains("focused") || p3.classList.contains("focused") || p4.classList.contains("focused") || p5.classList.contains("focused")) {
		tipAmountPerPerson = billPerPerson * ((localStorage.getItem("v")) / 100);
		totalAmountPerPerson = billPerPerson + tipAmountPerPerson;
	} else {
		tipAmountPerPerson = billPerPerson * ((localStorage.getItem("c")) / 100);
		totalAmountPerPerson = billPerPerson + tipAmountPerPerson;
	}
});

buttons.forEach(btn => {
	btn.addEventListener("click", () => {
		v = parseInt(btn.value);
		localStorage.setItem("v", v);
		billPerPerson = (localStorage.getItem("b")) / (localStorage.getItem("p"));
		tipAmountPerPerson = billPerPerson * ((localStorage.getItem("v")) / 100);
		totalAmountPerPerson = billPerPerson + tipAmountPerPerson;
	});
});
buttons.forEach(btn => {
	btn.addEventListener("keypress", () => {
		let key = event.key;
		if(key === "Enter") {
			btn.click();
		}
	});
});
p1.addEventListener("click", () => {
	p1.classList.add("focused");
	p2.classList.remove("focused");
	p3.classList.remove("focused");
	p4.classList.remove("focused");
	p5.classList.remove("focused");
});
p2.addEventListener("click", () => {
	p2.classList.add("focused");
	p1.classList.remove("focused");
	p3.classList.remove("focused");
	p4.classList.remove("focused");
	p5.classList.remove("focused");
});
p3.addEventListener("click", () => {
	p3.classList.add("focused");
	p2.classList.remove("focused");
	p1.classList.remove("focused");
	p4.classList.remove("focused");
	p5.classList.remove("focused");
});
p4.addEventListener("click", () => {
	p4.classList.add("focused");
	p2.classList.remove("focused");
	p3.classList.remove("focused");
	p1.classList.remove("focused");
	p5.classList.remove("focused");
});
p5.addEventListener("click", () => {
	p5.classList.add("focused");
	p2.classList.remove("focused");
	p3.classList.remove("focused");
	p4.classList.remove("focused");
	p1.classList.remove("focused");
});

customInput.addEventListener("input", () => {
	c = parseFloat(customInput.value.replace(regex, ""));
	localStorage.setItem("c", c);
	billPerPerson = (localStorage.getItem("b")) / (localStorage.getItem("p"));
	tipAmountPerPerson = billPerPerson * ((localStorage.getItem("c")) / 100);
	totalAmountPerPerson = billPerPerson + tipAmountPerPerson;
});
customInput.addEventListener("focus", () => {
	billPerPerson = (localStorage.getItem("b")) / (localStorage.getItem("p"));
	tipAmountPerPerson = billPerPerson * ((localStorage.getItem("c")) / 100);
	totalAmountPerPerson = billPerPerson + tipAmountPerPerson;
	buttons.forEach(btn => {
		if(btn.classList.contains("focused")) {
			btn.classList.remove("focused");
		}
	});
});

personInput.addEventListener("input", () => {
	p = Math.abs(parseInt(personInput.value));
	localStorage.setItem("p", p);
	billPerPerson = (localStorage.getItem("b")) / (localStorage.getItem("p"));
	if(p1.classList.contains("focused") || p2.classList.contains("focused") || p3.classList.contains("focused") || p4.classList.contains("focused") || p5.classList.contains("focused")) {
		tipAmountPerPerson = billPerPerson * ((localStorage.getItem("v")) / 100);
		totalAmountPerPerson = billPerPerson + tipAmountPerPerson;
	} else {
		tipAmountPerPerson = billPerPerson * ((localStorage.getItem("c")) / 100);
		totalAmountPerPerson = billPerPerson + tipAmountPerPerson;
	}
});

function printValues() {
	tipText.innerText = `$${tipAmountPerPerson.toFixed(2)}`;
	totalText.innerText = `$${totalAmountPerPerson.toFixed(2)}`;
}
billInput.addEventListener("input", printValues);
buttons.forEach(btn => {
	btn.addEventListener("click", printValues);
});
customInput.addEventListener("input", printValues);
customInput.addEventListener("focus", printValues);
personInput.addEventListener("input", printValues);

function validation() {
	if(billInput.value === "" || personInput.value === "" || tipAmountPerPerson === Infinity || totalAmountPerPerson === Infinity || isNaN(tipAmountPerPerson) || isNaN(totalAmountPerPerson) || billInput.value < 0 || personInput.value < 0 || customInput.value < 0) {
		tipText.innerText = "$0.00";
		totalText.innerText = "$0.00";
	}
}
billInput.addEventListener("input", validation);
buttons.forEach(btn => {
	btn.addEventListener("click", validation);
});
customInput.addEventListener("input", validation);
customInput.addEventListener("focus", validation);
personInput.addEventListener("input", validation);

function zeroCheck() {
	if(parseInt(personInput.value) === 0) {
		personError.innerText = "Can't be zero";
		personInput.classList.add("border");
	} else {
		personError.innerText = "";
		personInput.classList.remove("border");
	}
}

billInput.addEventListener("input", zeroCheck);
billInput.addEventListener("focus", zeroCheck);
personInput.addEventListener("input", zeroCheck);
personInput.addEventListener("focus", zeroCheck);
buttons.forEach(btn => {
	btn.addEventListener("click", zeroCheck);
	btn.addEventListener("focus", zeroCheck);
});
customInput.addEventListener("click", zeroCheck);
customInput.addEventListener("focus", zeroCheck);

function reset() {
	if(totalText.innerText !== "$0.00") {
		resetBtn.classList.add("reset");
	} else {
		resetBtn.classList.remove("reset");
	}
}

billInput.addEventListener("input", reset);
buttons.forEach(btn => {
	btn.addEventListener("click", reset);
});
customInput.addEventListener("input", reset);
customInput.addEventListener("focus", reset);
personInput.addEventListener("input", reset);

resetBtn.addEventListener("keypress", () => {
	let key = event.key;
	if(key === "Enter") {
		resetBtn.click();
	}
});
resetBtn.addEventListener("click", () => {
	tipText.innerText = "$0.00";
	totalText.innerText = "$0.00";
	resetBtn.classList.remove("reset");
	billInput.value = "";
	buttons.forEach(btn => {
		btn.classList.remove("focused");
	});
	customInput.value = "";
	personInput.value = "";
	localStorage.removeItem("b");
	localStorage.removeItem("c");
	localStorage.removeItem("p");
	localStorage.removeItem("v");
	personError.innerText = "";
	personInput.classList.remove("border");
});