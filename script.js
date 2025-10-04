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

// Check saved theme on page load
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  body.classList.remove("light-mode");
  if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  body.classList.add("light-mode");
  body.classList.remove("dark-mode");
  if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Toggle theme on click
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
  body.classList.remove("light-mode");
  if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  localStorage.setItem("theme", "dark");
} else {
  body.classList.add("light-mode");
  if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  localStorage.setItem("theme", "light");
}
  });
}


const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const overlay = document.getElementById('overlay');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
  overlay.classList.toggle('active');
});

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

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200; // lower = faster

const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;

      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
};

// Trigger when section is visible
const statsSection = document.querySelector('.about'); // or .stats if you wrapped them
let statsPlayed = false;

window.addEventListener('scroll', () => {
  const sectionTop = statsSection.offsetTop - window.innerHeight + 100;
  if (!statsPlayed && window.scrollY > sectionTop) {
    animateCounters();
    statsPlayed = true;
  }
});

// TYPEWRITER / ROLE CYCLER
document.addEventListener("DOMContentLoaded", () => {
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
    roleElement.textContent = currentRole;
    roleElement.style.opacity = "0";
    requestAnimationFrame(() => { roleElement.style.opacity = "1"; });
    setTimeout(() => {
      roleElement.style.opacity = "0";
      setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        animateRole();
      }, 600);
    }, 3000);
  }

  if (roleElement) {
    roleElement.style.transition = "opacity 0.6s ease-in-out";
    animateRole();
  }
});

  function updateGreeting() {
    const greeting = document.getElementById("greeting");
    const now = new Date();
    const hour = now.getHours();

    let message = "Hi, Good Day.";

    if (hour >= 0 && hour < 12) {
      message = "Hi, Good Morning.";
    } else if (hour >= 12 && hour < 16) {
      message = "Hi, Good Afternoon.";
    } else if (hour >= 16 && hour < 24) {
      message = "Hi, Good Evening.";
    }

    greeting.textContent = message;
  }

  // Run immediately
  updateGreeting();

  // Update every minute (in case time changes)
  setInterval(updateGreeting, 60000);

// SCROLL BUTTON (section by section)
const scrollBtn = document.getElementById("scrollBtn");
const sections = document.querySelectorAll("section");
let currentSection = 0;

window.addEventListener("scroll", () => {
  const windowHeight = window.innerHeight;

  sections.forEach((sec, index) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
      currentSection = index;
    }
  });

  if (window.scrollY > 100) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }

  if (currentSection >= sections.length - 1) {
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  } else {
    scrollBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
  }
});

scrollBtn.addEventListener("click", () => {
  if (currentSection >= sections.length - 1) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    const nextSection = sections[currentSection + 1];
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
});

// Scroll animation for project cards
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.2 }
  );

  projectCards.forEach(card => {
    observer.observe(card);
  });
});

  // Reveal sections on scroll
  const reveals = document.querySelectorAll(".reveal");

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach(reveal => {
    appearOnScroll.observe(reveal);
  });

// =============================
// PRELOADER (4 bouncing dots)
// =============================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 1000); // 1s delay before fade out
  }
});

