// Replace these with your actual Telegram Bot Token and Chat ID
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';

async function sendToTelegram(name, email, company, message) {
    const telegramMessage = `
📧 New Contact Form Submission

👤 Name: ${name}
📩 Email: ${email}
🏢 Company: ${company}
💬 Message: ${message}
    `.trim();

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: telegramMessage,
                parse_mode: 'HTML'
            })
        });

        if (response.ok) {
            return true;
        } else {
            console.error('Telegram API Error:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        return false;
    }
}

function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const company = document.getElementById('company').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all required fields');
        return;
    }

    // Show loading state
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Send to Telegram
    sendToTelegram(name, email, company, message).then((success) => {
        if (success) {
            alert('✅ Message sent successfully! We\'ll contact you soon.');
            event.target.reset();
        } else {
            alert('❌ Error sending message. Please try again.');
        }
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// Attach form submission handler when page loads
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});
