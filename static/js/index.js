document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when a nav link is selected
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('active');
      });
    });
  }
});

//contact section functionalities
  
let currentMethod = 'email';
const whatsappNumber = '254716366301'; // Business WhatsApp number without '+'

function toggleContactMethod(method) {
  currentMethod = method;
  const submitBtn = document.getElementById('submitBtn');
  const subjectGroup = document.getElementById('subjectGroup');

  if (method === 'whatsapp') {
    submitBtn.textContent = 'WhatsApp';
    subjectGroup.style.display = 'none';
  } else {
    submitBtn.textContent = 'Send Email';
    subjectGroup.style.display = 'block';
  }
}

function handleContactSubmit(event) {
  if (currentMethod === 'whatsapp') {
    event.preventDefault(); // Stop default form submit
    
    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    let text = `Hello! My name is *${name}*.`;
    if (phone) text += `\nMy Phone: ${phone}`;
    text += `\n\n*Message:*\n${message}`;

    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    window.open(waUrl, '_blank');
  }
  // If 'email', form natively submits using the action URL / handler
}
