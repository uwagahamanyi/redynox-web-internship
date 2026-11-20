// Task 2: client-side validation and form handling
(function () {
  "use strict";

  const form = document.getElementById("contact-form");
  const result = document.getElementById("result");
  const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    message: document.getElementById("message")
  };

  // Each validator returns an error message, or "" if the value is valid.
  const validators = {
    name(value) {
      if (!value) return "Enter your name.";
      if (value.length < 2) return "Name must be at least 2 characters.";
      return "";
    },
    email(value) {
      if (!value) return "Enter your email address.";
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!pattern.test(value)) return "Enter a valid email, like name@example.com.";
      return "";
    },
    message(value) {
      if (!value) return "Enter a message.";
      if (value.length < 10) return "Message must be at least 10 characters.";
      return "";
    }
  };

  function showError(key, text) {
    const input = fields[key];
    document.getElementById(key + "-error").textContent = text;
    input.classList.toggle("invalid", Boolean(text));
    input.setAttribute("aria-invalid", text ? "true" : "false");
  }

  function validateField(key) {
    const error = validators[key](fields[key].value.trim());
    showError(key, error);
    return !error;
  }

  // Validate a field when the user leaves it, and re-check as they fix it
  Object.keys(fields).forEach(function (key) {
    fields[key].addEventListener("blur", function () { validateField(key); });
    fields[key].addEventListener("input", function () {
      if (fields[key].classList.contains("invalid")) validateField(key);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    const allValid = Object.keys(fields).map(validateField).every(Boolean);
    if (!allValid) {
      result.hidden = true;
      const firstInvalid = form.querySelector(".invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Capture the data
    const data = {
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      message: fields.message.value.trim(),
      submittedAt: new Date().toISOString()
    };

    // Log it (visible in Developer Tools > Console)
    console.log("Form submitted:", data);

    // Display it on the page (textContent avoids injecting HTML)
    result.innerHTML = "<h3>Message received</h3><dl></dl>";
    const list = result.querySelector("dl");
    [["Name", data.name], ["Email", data.email], ["Message", data.message]].forEach(function (pair) {
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = pair[0];
      dd.textContent = pair[1];
      list.append(dt, dd);
    });
    result.hidden = false;

    form.reset();
    Object.keys(fields).forEach(function (key) { showError(key, ""); });

    /* With a real back end, the data would be sent like this:
       fetch("/api/contact", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data)
       });
    */
  });
})();
