// 1. Mobile Menu Logic
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

function closeMenu() {
    navLinks.classList.remove('active');
}

// 2. Swiper Logic (Doctors)
var swiper = new Swiper(".doctors-slider", {
    effect: "coverflow", grabCursor: true, centeredSlides: true, slidesPerView: "auto", loop: true, speed: 800,
    coverflowEffect: { rotate: 0, stretch: 0, depth: 150, modifier: 2.5, slideShadows: true, },
    autoplay: { delay: 2500, disableOnInteraction: false, },
    pagination: { el: ".swiper-pagination", clickable: true, },
});

// 3. Swiper Logic (Gallery)
var gallerySwiper = new Swiper(".gallery-slider", {
    slidesPerView: 1, spaceBetween: 20, loop: true, autoplay: { delay: 3000, disableOnInteraction: false, },
    pagination: { el: ".swiper-pagination", clickable: true, },
    breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, }
});

// 4. Swiper Logic (Insurance - INFINITE SCROLL)
var insuranceSwiper = new Swiper(".insurance-slider", {
    slidesPerView: 2, spaceBetween: 20, loop: true, speed: 4000, // Slower speed for better reading
    autoplay: { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }, // No Pause
    breakpoints: { 640: { slidesPerView: 3 }, 768: { slidesPerView: 4 }, 1024: { slidesPerView: 5 }, }
});

// 5. Reveal Animation
window.addEventListener('scroll', reveal);
function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        if (reveals[i].getBoundingClientRect().top < window.innerHeight - 80) {
            reveals[i].classList.add('active');
        }
    }
}
reveal();

// 6. Stats Counter
const counters = document.querySelectorAll('.stat-number');
let hasCounted = false;
const countObserver = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting && !hasCounted) {
        hasCounted = true;
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const inc = target > 50 ? target / 50 : 1; 
            const updateCount = () => {
                const count = +counter.innerText.replace('+','').replace(',','');
                if(count < target) {
                    counter.innerText = Math.ceil(count + inc).toLocaleString() + "+";
                    setTimeout(updateCount, 40);
                } else {
                    counter.innerText = target.toLocaleString() + "+";
                }
            };
            updateCount();
        });
    }
}, { threshold: 0.5 });
countObserver.observe(document.querySelector('.stats-bar'));

// 7. Pricing Toggle
const individualBtn = document.getElementById('individualBtn');
const familyBtn = document.getElementById('familyBtn');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');
const p3 = document.getElementById('p3');

familyBtn.addEventListener('click', () => {
    individualBtn.classList.remove('active'); familyBtn.classList.add('active');
    p1.innerText = '₹3000'; p2.innerText = '₹7500'; p3.innerText = '₹12000';
});

individualBtn.addEventListener('click', () => {
    familyBtn.classList.remove('active'); individualBtn.classList.add('active');
    p1.innerText = '₹1500'; p2.innerText = '₹3500'; p3.innerText = '₹5500';
});

// 8. WhatsApp Booking
function bookOnWhatsapp(planName, priceId) {
    const price = document.getElementById(priceId).innerText;
    const phone = "919009099380";
    const text = `Hello Apple Hospital, I would like to book the *${planName}* available at *${price}*. Please share the details and appointment slot.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

// 9. Testimonials
const testimonialData = [
    { name: "Rahul Sharma", role: "Mohammadpura Resident", text: "The staff at Apple Hospital Burhanpur is very cooperative. The emergency service is fast and doctors are available 24/7." },
    { name: "Priya Singh", role: "Maternity", text: "Dr. Surekha Pooniwala is excellent. Very good facilities for delivery. The hospital is clean and the nursing staff is very supportive." },
    { name: "Ankit Verma", role: "Govindpuram Resident", text: "Best hospital in Burhanpur for surgery. The recovery rooms are clean and the doctors are very experienced." },
    { name: "Meena Jain", role: "Pediatrics", text: "Good experience with the staff. My child was treated well and recovered quickly." },
    { name: "Suresh Gupta", role: "Emergency", text: "They handled my father's emergency case very professionally. Thankful to the doctors at Apple Hospital." }
];

const avatars = document.querySelectorAll('.avatar');
const tName = document.getElementById('testimonial-name');
const tRole = tName.nextElementSibling;
const tText = document.getElementById('testimonial-text');

function showTestimonial(index) {
    avatars.forEach(av => av.classList.remove('active'));
    avatars[index].classList.add('active');
    tText.style.opacity = 0;
    setTimeout(() => {
        tName.innerText = testimonialData[index].name;
        tRole.innerText = testimonialData[index].role;
        tText.innerText = `"${testimonialData[index].text}"`;
        tText.style.opacity = 1;
    }, 300);
}

let currentTestimonial = 2;
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % avatars.length;
    showTestimonial(currentTestimonial);
}, 5000);

// 10. Modals
const enquiryModal = document.getElementById('enquiryModal');
const reviewsModal = document.getElementById('reviewsModal');
const openEnquiryBtn = document.getElementById('openModalBtn');
const openReviewsBtn = document.getElementById('viewAllReviewsBtn');
const closeEnquiryBtn = document.getElementById('closeModalBtn');
const closeReviewsBtn = document.getElementById('closeReviewsBtn');

openEnquiryBtn.addEventListener('click', () => enquiryModal.classList.add('active'));
openReviewsBtn.addEventListener('click', () => {
    const container = document.getElementById('reviewsContainer');
    container.innerHTML = ""; 
    const extraReviews = [{text:"Excellent care.", rating:5}, {text:"Clean hospital.", rating:5}, {text:"Polite staff.", rating:4}, {text:"Long wait time.", rating:3}, {text:"Parking issue.", rating:2}, {text:"Best plastic surgeon.", rating:5}, {text:"Quick billing.", rating:4}, {text:"Good pharmacy.", rating:5}];
    extraReviews.forEach(r => {
        container.innerHTML += `<div class="review-item"><div class="review-header"><span class="review-author">Patient</span><span class="review-rating">${'★'.repeat(r.rating)}</span></div><p class="review-body">"${r.text}"</p></div>`;
    });
    reviewsModal.classList.add('active');
});

closeEnquiryBtn.addEventListener('click', () => enquiryModal.classList.remove('active'));
closeReviewsBtn.addEventListener('click', () => reviewsModal.classList.remove('active'));
window.addEventListener('click', (e) => {
    if(e.target === enquiryModal) enquiryModal.classList.remove('active');
    if(e.target === reviewsModal) reviewsModal.classList.remove('active');
});

// 11. FAQ & Scroll
document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        document.querySelectorAll('.faq-item').forEach(i => { if(i!==item) i.classList.remove('active'); });
        item.classList.toggle('active');
    });
});

const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 500);
});
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

/* --- PREMIUM CHATBOT LOGIC --- */
const chatWindow = document.getElementById("ah-chat");
const chatToggleBtn = document.getElementById("chatToggleBtn");
const closeChatBtn = document.getElementById("closeChatBtn");
const chatBody = document.getElementById("ah-body");

const phone = "+919009099380";
const whatsapp = "https://wa.me/919009099380";
let lang = "";

// Toggle
chatToggleBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    if(chatBody.innerHTML === "") initChat();
});
closeChatBtn.addEventListener('click', () => chatWindow.classList.remove('active'));

function initChat() {
    bot("🌐 Please select language / कृपया भाषा चुनें:");
    showOptions([
        {text: "🇮🇳 हिंदी", val: "hi"},
        {text: "🇬🇧 English", val: "en"}
    ], "lang");
}

function bot(msg) {
    chatBody.innerHTML += `<div class="bot-msg">${msg}</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
}

function userReply(msg) {
    chatBody.innerHTML += `<div class="user-msg">${msg}</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showOptions(options, type) {
    let html = `<div class="options-container">`;
    options.forEach(opt => {
        html += `<div class="option-chip" onclick="handleOption('${opt.val}', '${opt.text}', '${type}')">${opt.text}</div>`;
    });
    html += `</div>`;
    chatBody.innerHTML += html;
    chatBody.scrollTop = chatBody.scrollHeight;
}

function handleOption(val, text, type) {
    // Remove options
    const opts = document.querySelector('.options-container:last-child');
    if(opts) opts.remove();

    // Show user reply
    userReply(text);

    setTimeout(() => {
        if(type === "lang") {
            setLang(val);
        } else {
            handleMenu(val);
        }
    }, 500);
}

function setLang(l) {
    lang = l;
    if(l === "") { chatBody.innerHTML = ""; initChat(); return; } // Restart
    
    bot(lang === "hi" 
        ? "🙏 Apple Hospital में आपका स्वागत है। मैं आपकी क्या मदद कर सकता हूँ?" 
        : "👋 Welcome to Apple Hospital. How can I help you today?");
    
    showMainMenu();
}

function showMainMenu() {
    const menu = lang === "hi" ? [
        {text:"📅 अपॉइंटमेंट", val:"appt"},
        {text:"👨‍⚕️ डॉक्टर", val:"doc"},
        {text:"💊 सेवाएं", val:"serv"},
        {text:"🕒 OPD समय", val:"time"},
        {text:"🏥 पता", val:"addr"},
        {text:"💳 बीमा/Insurance", val:"ins"},
        {text:"📞 संपर्क", val:"cont"}
    ] : [
        {text:"📅 Appointment", val:"appt"},
        {text:"👨‍⚕️ Doctors", val:"doc"},
        {text:"💊 Services", val:"serv"},
        {text:"🕒 OPD Timings", val:"time"},
        {text:"🏥 Address", val:"addr"},
        {text:"💳 Insurance", val:"ins"},
        {text:"📞 Contact", val:"cont"}
    ];
    showOptions(menu, "menu");
}

function handleMenu(val) {
    switch(val) {
        case "appt":
            bot(lang==="hi" ? "अपॉइंटमेंट बुक करने के लिए नीचे दिए गए बटन का उपयोग करें:" : "To book an appointment, please use the buttons below:");
            showCTA();
            break;
        case "doc":
            bot(lang==="hi" ? "हमारे पास स्त्री रोग, रेडियोलॉजी, प्लास्टिक सर्जरी और सामान्य चिकित्सा के विशेषज्ञ हैं।" : "We have specialists in Gynecology, Radiology, Plastic Surgery, and General Medicine.");
            setTimeout(() => showMainMenu(), 1500);
            break;
        case "serv":
            bot(lang==="hi" ? "हम 24/7 इमरजेंसी, सोनोग्राफी, सीटी स्कैन, डिजिटल एक्स-रे और फार्मेसी की सुविधा प्रदान करते हैं।" : "We offer 24/7 Emergency, Sonography, CT Scan, Digital X-Ray, and Pharmacy services.");
            setTimeout(() => showMainMenu(), 1500);
            break;
        case "time":
            bot(lang==="hi" ? "🕒 OPD समय: सुबह 10-2, शाम 6-9 (सोम-शनि)। इमरजेंसी 24/7 खुली है।" : "🕒 OPD Timings: 10am-2pm, 6pm-9pm (Mon-Sat). Emergency is open 24/7.");
            setTimeout(() => showMainMenu(), 2000);
            break;
        case "ins":
            bot(lang==="hi" ? "✅ हम आयुष्मान भारत और सभी प्रमुख TPA बीमा स्वीकार करते हैं।" : "✅ We accept Ayushman Bharat and all major TPA insurances.");
            setTimeout(() => showMainMenu(), 1500);
            break;
        case "addr":
            bot(lang==="hi" ? "📍 पता: गोविंदपुरम कॉलोनी, पावर हाउस के सामने, बुरहानपुर।" : "📍 Address: Govindpuram Colony, Opp. Power House, Burhanpur.");
            setTimeout(() => showMainMenu(), 2000);
            break;
        case "cont":
            bot(lang==="hi" ? "संपर्क विवरण:" : "Contact Details:");
            showCTA();
            break;
    }
}

function showCTA() {
    const html = `
    <div class="cta-card">
        <a href="tel:${phone}" class="call-btn"><i class="fas fa-phone"></i> ${lang==="hi"?"कॉल करें":"Call Now"}</a>
        <a href="${whatsapp}" target="_blank" class="wa-btn"><i class="fab fa-whatsapp"></i> ${lang==="hi"?"व्हाट्सएप":"WhatsApp"}</a>
    </div>`;
    chatBody.innerHTML += html;
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Show menu again after a delay
    setTimeout(() => {
        bot(lang==="hi" ? "क्या कुछ और मदद चाहिए?" : "Do you need anything else?");
        showMainMenu();
    }, 3000);
}
