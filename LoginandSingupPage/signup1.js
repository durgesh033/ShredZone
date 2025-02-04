document.addEventListener("DOMContentLoaded", function () {
    let progressBar = document.getElementById("progressBar");
    let nextBtn = document.getElementById("nextBtn");

    // Start Progress at 50%
    progressBar.style.width = "25%";

    nextBtn.addEventListener("click", function () {
        window.location.href = "signup2.html"; // Next page
    });
});
document.getElementById("nextBtn").addEventListener("click", async function () {
    const userData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        mobile: document.getElementById("mobile").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    try {
        const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Sign-up successful!");
            window.location.href = "signup2.html"; // Redirect to next page
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
    }
});

