// Navigation menu control
var navLinks = document.getElementById("navLinks");
var openMenuIcon = document.getElementById("openMenu");
var closeMenuIcon = document.getElementById("closeMenu");

function showMenu() {
    navLinks.style.display = "block"; // Show the sidebar
    navLinks.style.right = "0"; // Move the sidebar into view
    openMenuIcon.style.display = "none"; // Hide the menu icon
    closeMenuIcon.style.display = "block"; // Show the close icon
}

function hideMenu() {
    navLinks.style.right = "-200px"; // Move the sidebar out of view
    setTimeout(function () {
        navLinks.style.display = "none"; // Hide the sidebar after it has moved out
        openMenuIcon.style.display = "block"; // Show the menu icon again
        closeMenuIcon.style.display = "none"; // Hide the close icon
    }, 300); // Delay to match the transition time
}



document.addEventListener('DOMContentLoaded', function () {

    // Expand <hr> elements on scroll into view
    const hrElements = document.querySelectorAll('hr');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = '100%';
            } else {
                entry.target.style.width = '0';
            }
        });
    });

    hrElements.forEach(hr => {
        observer.observe(hr);
    });

    // Rotating paragraphs in CEO section
    const paragraphs = document.querySelectorAll("#CEO .content p");
    let currentIndex = 0;

    function showNextParagraph() {
        if (paragraphs.length > 0) {
            paragraphs[currentIndex].classList.add("visible");

            setTimeout(() => {
                paragraphs[currentIndex].classList.remove("visible");
                currentIndex = (currentIndex + 1) % paragraphs.length; // Loop back to the first paragraph
                showNextParagraph();
            }, 10000); // Adjust this duration as needed for visibility time
        }
    }

    showNextParagraph();

    // Cookie popup functionality
    let popUp = document.getElementById("cookiePopup");

    // When the user clicks the accept button
    document.getElementById("acceptCookie").addEventListener("click", () => {
        // Create a date object
        let d = new Date();
        // Increment the current time by 365 days (cookie will expire after 1 year)
        d.setFullYear(d.getFullYear() + 1);
        // Create a Cookie with name = myCookieName, value = thisIsMyCookie, and expiry time = 1 year
        document.cookie = "myCookieName=thisIsMyCookie; expires=" + d.toUTCString() + "; path=/";
        // Hide the popup
        popUp.classList.add("hide");
        popUp.classList.remove("show");
    });

    // When the user clicks the decline button
    document.getElementById("declineCookie").addEventListener("click", () => {
        // Hide the popup without setting a cookie
        popUp.classList.add("hide");
        popUp.classList.remove("show");
    });

    // Function to check if the cookie is already present
    const checkCookie = () => {
        // Read the cookie and split on "="
        let input = document.cookie.split(";");
        let cookieFound = input.some(cookie => cookie.trim().startsWith("myCookieName="));
        if (cookieFound) {
            // Hide the popup if the cookie is found
            popUp.classList.add("hide");
            popUp.classList.remove("show");
        } else {
            // Show the popup if the cookie is not found
            popUp.classList.add("show");
            popUp.classList.remove("hide");
        }
    };

    // Check if the cookie exists when the page loads
    window.onload = () => {
        setTimeout(() => {
            checkCookie();
        }, 2000); // Show the popup after 2 seconds if the cookie doesn't exist
    };



    // Newsletter form submission
    document.getElementById('newsletter-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('newsletter-email').value;

        fetch('https://api.mailjet.com/v3.1/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('YOUR_API_KEY:YOUR_API_SECRET')
            },
            body: JSON.stringify({
                Messages: [
                    {
                        From: {
                            Email: "your-email@example.com",
                            Name: "Your Name or Company"
                        },
                        To: [
                            {
                                Email: email,
                                Name: "Subscriber"
                            }
                        ],
                        Subject: "Welcome to our Newsletter",
                        TextPart: "Thank you for subscribing to our newsletter.",
                        HTMLPart: "<h3>Dear subscriber,</h3><p>Thank you for subscribing to our newsletter.</p>"
                    }
                ]
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Thank you for subscribing!');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('There was an error. Please try again.');
            });
    });


    // Contact form submission via Formspree with reCAPTCHA
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const form = e.target;
            const captcha = grecaptcha.getResponse();

            if (!captcha) {
                alert("Please complete the CAPTCHA.");
                return;
            }

            const formData = new FormData(form);
            formData.append("g-recaptcha-response", captcha);

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: formData,
                    headers: { Accept: "application/json" }
                });

                if (response.ok) {
                    alert("Message sent successfully!");
                    form.reset();
                    grecaptcha.reset(); // Reset the CAPTCHA
                } else {
                    alert("Failed to send message. Please try again.");
                }
            } catch (error) {
                console.error("Submission error:", error);
                alert("Something went wrong. Please try again later.");
            }
        });
    }



    // Sticky navigation on scroll
    const navLinks = document.querySelector('header nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            // Scrolling down
            navLinks.style.top = "-80px"; // Adjust based on navbar height
        } else {
            // Scrolling up
            navLinks.style.top = "0";
        }

        // Toggle sticky class based on scroll position
        if (currentScroll > 0) {
            navLinks.classList.add('sticky');
        } else {
            navLinks.classList.remove('sticky');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    });
});


// mission, vision and value section
document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('#mission-vision-value .layer');

    // Function to apply IntersectionObserver only on small screens
    function applyIntersectionObserver() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    // Apply hover effect on larger screens
    function applyHoverEffect() {
        elements.forEach(element => {
            element.parentElement.addEventListener('mouseenter', function () {
                element.classList.add('in-view');
            });
            element.parentElement.addEventListener('mouseleave', function () {
                element.classList.remove('in-view');
            });
        });
    }

    // Check screen size and apply appropriate behavior
    if (window.innerWidth <= 768) {
        applyIntersectionObserver(); // Apply scroll-into-view effect for smaller screens
    } else {
        applyHoverEffect(); // Apply hover effect for larger screens
    }

    // Optional: Re-check on window resize (only needed if you expect users to resize their browser)
    window.addEventListener('resize', function () {
        if (window.innerWidth <= 768) {
            applyIntersectionObserver();
        } else {
            applyHoverEffect();
        }
    });
});

// frequently asked question
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
        });
    });
});

