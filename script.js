// Payment System
document.addEventListener('DOMContentLoaded', function() {
    const paymentModal = document.getElementById('payment-modal');
    const successModal = document.getElementById('success-modal');
    const serviceButtons = document.querySelectorAll('.service-btn');
    const giftButtons = document.querySelectorAll('.gift-btn');
    const customGiftBtn = document.querySelector('.custom-gift-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal, .cancel-btn, .close-success');
    const paymentOptions = document.querySelectorAll('.payment-option');
    const paymentForms = document.querySelectorAll('.payment-form');
    const payNowBtn = document.getElementById('pay-now-btn');

    let currentOrder = { type: '', service: '', amount: 0, isGift: false };

    // Service order
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            const price = parseInt(this.getAttribute('data-price'));
            currentOrder = { type: 'service', service, amount: price, isGift: false };
            openPaymentModal(service.replace('-', ' ').toUpperCase(), price);
        });
    });

    // Gift cards
    giftButtons.forEach(button => {
        button.addEventListener('click', function() {
            const amount = parseInt(this.getAttribute('data-amount'));
            currentOrder = { type: 'gift', service: 'Gift Card', amount, isGift: true };
            openPaymentModal('Gift Card', amount, true);
        });
    });

    // Custom gift card
    if (customGiftBtn) {
        customGiftBtn.addEventListener('click', function() {
            const customAmountInput = document.querySelector('.custom-amount');
            if (!customAmountInput) return;
            const amount = parseInt(customAmountInput.value);
            if (!amount || amount < 25) {
                showNotification('Please enter a valid amount (minimum $25)', 'error');
                return;
            }
            currentOrder = { type: 'gift', service: 'Custom Gift Card', amount, isGift: true };
            openPaymentModal('Custom Gift Card', amount, true);
        });
    }

    function openPaymentModal(serviceName, amount, isGift = false) {
        document.getElementById('modal-title').textContent = isGift ? 'Purchase Gift Card' : 'Complete Your Order';
        document.getElementById('order-service').textContent = serviceName;
        document.getElementById('order-price').textContent = `$${amount}`;
        document.getElementById('total-amount').textContent = `$${amount}`;
        const giftForm = document.getElementById('gift-form');
        if (giftForm) {
            giftForm.style.display = isGift ? 'block' : 'none';
            giftForm.classList.toggle('active', isGift);
        }
        paymentModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        paymentModal.style.display = 'none';
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetPaymentForm();
    }

    closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));
    window.addEventListener('click', e => {
        if (e.target === paymentModal || e.target === successModal) closeModal();
    });

    // Payment options
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            paymentForms.forEach(form => form.classList.remove('active'));
            const formId = this.getAttribute('data-form');
            const selectedForm = document.getElementById(formId);
            if (selectedForm) selectedForm.classList.add('active');
        });
    });

    // Pay now
    if (payNowBtn) {
        payNowBtn.addEventListener('click', function() {
            closeModal();
            successModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    function resetPaymentForm() {
        paymentOptions.forEach(opt => opt.classList.remove('active'));
        paymentForms.forEach(form => form.classList.remove('active'));
    }
});

// 🌙☀ Dark/Light Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Video background references
const lightVideo = document.querySelector(".light-mode-bg");
const darkVideo = document.querySelector(".dark-mode-bg");

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  if (lightVideo) lightVideo.style.display = "none";
  if (darkVideo) darkVideo.style.display = "block";
} else {
  body.classList.remove("dark-mode");
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  if (lightVideo) lightVideo.style.display = "block";
  if (darkVideo) darkVideo.style.display = "none";
}

// Toggle theme on click
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  const isDark = body.classList.contains("dark-mode");
  themeToggle.innerHTML = isDark
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Switch background videos
  if (lightVideo && darkVideo) {
    lightVideo.style.display = isDark ? "none" : "block";
    darkVideo.style.display = isDark ? "block" : "none";
  }
});

// 🍔 Mobile Menu Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const overlay = document.getElementById("overlay");

if (hamburger && navMenu && overlay) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
    overlay.classList.remove("active");
  });
}

// 🧠 Hero Section Robot Video Fix — ensures only one plays
const robotVideo = document.getElementById("robot-video");
if (robotVideo) {
  robotVideo.addEventListener("loadeddata", () => {
    robotVideo.play().catch(() => {});
  });
  robotVideo.loop = true;
  robotVideo.muted = true;
  robotVideo.play();
}

// Close when overlay is clicked
overlay.addEventListener('click', () => {
  navMenu.classList.remove('active');
  hamburger.classList.remove('active');
  overlay.classList.remove('active');
});

// Animate skill bars when visible
const skillSections = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const targetWidth = bar.getAttribute('data-width');
      bar.style.width = targetWidth;

      // Animate numbers under bars
      const percentText = bar.parentElement.nextElementSibling;
      let count = 0;
      const finalValue = parseInt(targetWidth);
      const interval = setInterval(() => {
        if (count >= finalValue) {
          clearInterval(interval);
        } else {
          count++;
          percentText.textContent = count + "%";
        }
      }, 20);
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

skillSections.forEach(bar => {
  skillObserver.observe(bar);
});


// =============================
// EXTRA FEATURES ADDED
// =============================

// 1. Typewriter effect for hero roles
document.addEventListener("DOMContentLoaded", function () {
  const roles = [
    "Creative Web Developer",
    "UI/UX Designer",
    "Backend Engineer",
    "Fullstack Enthusiast"
  ];
  const roleElement = document.getElementById("role");

  let roleIndex = 0;

  function animateRole() {
    const currentRole = roles[roleIndex];
    roleElement.textContent = currentRole; // Set full role text
    roleElement.style.opacity = "0"; // Start faded out

    // Smooth fade-in
    requestAnimationFrame(() => {
      roleElement.style.opacity = "1";
    });

    // Schedule fade-out and next role
    setTimeout(() => {
      roleElement.style.opacity = "0";
      setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length; // Cycle roles
        animateRole(); // Repeat
      }, 600); // Fade-out duration (0.6s)
    }, 3000); // Display duration (3 seconds)
  }

  if (roleElement) {
    roleElement.style.transition = "opacity 0.6s ease-in-out"; // Initial transition
    animateRole(); // Start animation
  }
});

// 2. Ensure headings adapt to theme
// This part relies on your CSS variables (make sure you have them in style.css):
// :root { --heading-color: #111; }
// body.dark-mode { --heading-color: #fff; }
document.addEventListener("DOMContentLoaded", function () {
  const headings = document.querySelectorAll("section h2, section h3, .hero-title, .hero-subtitle");
  headings.forEach(h => h.style.color = "var(--heading-color)");
});

// 3. Services & Pricing headings always black
document.addEventListener("DOMContentLoaded", function () {
  const serviceHeadings = document.querySelectorAll("#services h2, #services h3");
  serviceHeadings.forEach(h => h.style.color = "#000");
});

// ===============================
// PRELOADER ANIMATION
// ===============================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("fade-out");
  }, 500); // small delay for smooth fade
});

// ===============================
// PRELOADER (4 bouncing dots)
// ===============================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  if (preloader) {
    // Wait a bit for smooth fade
    setTimeout(() => {
      preloader.classList.add("fade-out");
    }, 700); // Adjust timing for your liking
  }
});

// 🕒 Dynamic Greeting Based on Time
document.addEventListener("DOMContentLoaded", () => {
  const greetText = document.getElementById("greet-text");
  const timeInfo = document.getElementById("time-info");

  function updateGreeting() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');

    let greeting = "";
    if (hours >= 0 && hours < 12) {
      greeting = "Good Morning";
    } else if (hours >= 12 && hours < 16) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }

    if (greetText) greetText.textContent = `Hi, ${greeting}`;
  }

  updateGreeting();
  setInterval(updateGreeting, 60000); // update every minute
});

// ===============================
// 🚀 Scroll Button (Section-by-Section Scroll)
// ===============================
const scrollButton = document.getElementById("scroll-button");
const sections = document.querySelectorAll("section");
let currentIndex = 0;

// Show the button after some scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollButton.classList.add("show");
  } else {
    scrollButton.classList.remove("show");
  }

  // If we are near bottom → switch to UP arrow
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    scrollButton.classList.add("up");
  } else {
    scrollButton.classList.remove("up");
  }
});

// Scroll section by section
scrollButton.addEventListener("click", () => {
  if (scrollButton.classList.contains("up")) {
    // Back to top
    window.scrollTo({ top: 0, behavior: "smooth" });
    currentIndex = 0;
  } else {
    currentIndex++;
    if (currentIndex < sections.length) {
      sections[currentIndex].scrollIntoView({ behavior: "smooth" });
    } else {
      scrollButton.classList.add("up");
    }
  }
});
