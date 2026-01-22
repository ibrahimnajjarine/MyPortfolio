document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const messageElement = document.getElementById('formMessage');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showMessage('Please fill in all fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }

    try {
      const response = await sendEmail(name, email, message);
      const result = await response.text();
      console.log('Status:', response.status);
      console.log('Response:', result);
      if (response.ok) {
        showMessage('Your message was sent successfully!', 'success');
        form.reset();
      } else {
        showMessage('Failed to send your message. Please try again.', 'error');
      }
    } catch (error) {
      showMessage('An error occurred. Please try again later.', 'error');
    }
  });

  function showMessage(message, type) {
    messageElement.textContent = message;
    messageElement.style.color = type === 'success' ? 'green' : 'red';
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function sendEmail(name, email, message) {
    const serviceID = 'service_i7ystzc';
    const templateID = 'template_awly5ym';
    const userID = 'C4ZaqT2XRh1HltNao';

    return await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceID,
        template_id: templateID,
        user_id: userID,
        template_params: { name, email, message },
      }),
    });
  }


});

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.slides');
  const slideCount = document.querySelectorAll('.slide').length;
  let currentIndex = 0;


  setInterval(() => {
    currentIndex = (currentIndex + 1) % slideCount;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, 3000);
});