
let form = document.getElementById("my-form");
let modal = document.getElementById("submission-modal");
let closeModalBtn = document.getElementById("close-modal-btn");

async function handleSubmit(event) {
	event.preventDefault();
	var status = document.getElementById("my-form-status");
	var data = new FormData(event.target);
	fetch(event.target.action, {
		method: form.method,
		body: data,
		headers: {
				'Accept': 'application/json'
		}
	}).then(response => {
		if (response.ok) {
			status.innerHTML = "Thanks for your submission!";
			form.reset();
			if (modal) {
				modal.style.display = "flex";
			}
		} else {
			response.json().then(data => {
				if (Object.hasOwn(data, 'errors')) {
					status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
				} else {
					status.innerHTML = "Oops! There was a problem submitting your form";
				}
			});
		}
	}).catch(error => {
		status.innerHTML = "Oops! There was a problem submitting your form";
	});
}

form.addEventListener("submit", handleSubmit);

if (closeModalBtn && modal) {
	closeModalBtn.addEventListener("click", function() {
		modal.style.display = "none";
	});
}

