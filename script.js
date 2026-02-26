// Smooth Scroll for Navbar Links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Hero Button Animation
const heroBtn = document.querySelector('.btn');
heroBtn.addEventListener('mouseover', () => {
  heroBtn.style.transform = 'scale(1.1)';
});
heroBtn.addEventListener('mouseout', () => {
  heroBtn.style.transform = 'scale(1)';
});

// Destination Cards Hover Animation
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseover', () => {
    card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
  });
  card.addEventListener('mouseout', () => {
    card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
  });
});

// Booking Form Popup (Example)
const bookingBtn = document.createElement('button');
bookingBtn.textContent = "Book Now";
bookingBtn.classList.add("btn");
document.querySelector('.destinations').appendChild(bookingBtn);

bookingBtn.addEventListener('click', () => {
  window.location.href = "booking.html";
});
// Stats Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200; // lower = faster

const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

// Trigger animation when section is visible
const statsSection = document.querySelector('.stats');
let statsPlayed = false;

window.addEventListener('scroll', () => {
  const sectionTop = statsSection.offsetTop;
  const sectionHeight = statsSection.offsetHeight;
  const scrollPos = window.scrollY + window.innerHeight;

  if (!statsPlayed && scrollPos > sectionTop + sectionHeight / 3) {
    animateCounters();
    statsPlayed = true;
  }
});
// Show popup on page load
window.onload = () => {
  document.getElementById('seasonPopup').style.display = 'flex';
};

// Close popup
document.getElementById('closePopup').addEventListener('click', () => {
  document.getElementById('seasonPopup').style.display = 'none';
});
document.addEventListener("DOMContentLoaded", function () {
  /* =========================
     🇮🇳 ALL INDIA STATES
  ========================== */
  const states = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
    "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand",
    "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
    "Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
    "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
    "Uttar Pradesh","Uttarakhand","West Bengal","Delhi"
  ];

  const fromState = document.getElementById("fromState");
  const toState = document.getElementById("toState");
  const travellersInput = document.getElementById("travellers");
  const totalPriceDisplay = document.getElementById("totalPrice");
  const hiddenPrice = document.getElementById("hiddenPrice");
  const bookingForm = document.getElementById("bookingForm");
  const paymentMethod = document.getElementById("paymentMethod");
  const cardSection = document.getElementById("cardSection");
  const upiSection = document.getElementById("upiSection");

  /* =========================
     Populate Dropdowns
  ========================== */
  function loadStates() {
    fromState.innerHTML = '<option value="">Select Departure</option>';
    toState.innerHTML = '<option value="">Select Destination</option>';

    states.forEach(state => {
      fromState.innerHTML += `<option value="${state}">${state}</option>`;
      toState.innerHTML += `<option value="${state}">${state}</option>`;
    });
  }
  loadStates();

  /* =========================
     💰 PRICE CALCULATION
  ========================== */
  function calculatePrice() {
    const from = fromState.value;
    const to = toState.value;
    const travellers = parseInt(travellersInput.value) || 0;

    if (!from || !to || travellers <= 0) {
      totalPriceDisplay.innerText = 0;
      hiddenPrice.value = 0;
      return;
    }

    if (from === to) {
      alert("Departure and Destination cannot be same!");
      totalPriceDisplay.innerText = 0;
      hiddenPrice.value = 0;
      return;
    }

    const basePrice = 2500;
    const distanceFactor = Math.abs(states.indexOf(from) - states.indexOf(to));
    const calculatedBase = basePrice + (distanceFactor * 300);
    const total = calculatedBase * travellers;

    totalPriceDisplay.innerText = total;
    hiddenPrice.value = total;
  }

  fromState.addEventListener("change", calculatePrice);
  toState.addEventListener("change", calculatePrice);
  travellersInput.addEventListener("input", calculatePrice);

  /* =========================
     💳 PAYMENT TOGGLE
  ========================== */
  paymentMethod.addEventListener("change", function () {
    if (this.value === "card") {
      cardSection.style.display = "block";
      upiSection.style.display = "none";
    } else if (this.value === "upi") {
      cardSection.style.display = "none";
      upiSection.style.display = "block";
    } else {
      cardSection.style.display = "none";
      upiSection.style.display = "none";
    }
  });

  /* =========================
     🎉 FORM SUBMIT + REDIRECT
  ========================== */
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const from = fromState.value;
    const to = toState.value;
    const travellers = travellersInput.value;
    const total = hiddenPrice.value;
    const bookingID = "TE" + Date.now();

    if (!from || !to || travellers <= 0) {
      alert("Please complete the form properly!");
      return;
    }

    // Save in localStorage
    localStorage.setItem("bookingID", bookingID);
    localStorage.setItem("from", from);
    localStorage.setItem("to", to);
    localStorage.setItem("travellers", travellers);
    localStorage.setItem("total", total);

    window.open("confirmation.html", "_self");
  });
})