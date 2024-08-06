document.getElementById('registration-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Get form data
  const familyName = document.getElementById('familyName').value;
  const numPeople = document.getElementById('numPeople').value;

  // QR code content
  // Include the URL to redirect to in the QR code
  const qrCodeMessage = `Family Name: ${familyName}, Number of People: ${numPeople}, URL: https://lbavly1.github.io/..1q1/invited-web.html`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrCodeMessage)}`;

  // Display QR code
  const qrCodeImg = document.getElementById('qrCode');
  qrCodeImg.src = qrCodeUrl;
  document.getElementById('qrCodeContainer').classList.remove('hidden');

  // Show download button
  const downloadButton = document.getElementById('downloadButton');
  downloadButton.classList.remove('hidden');
  
  // Set up the download button functionality
  downloadButton.addEventListener('click', function() {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = 'qr_code.png';
      link.click();
  });

  // Send email (for this example, using a fictional endpoint)
  await fetch('https://your-backend-endpoint.example.com/send-email', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          familyName: familyName,
          numPeople: numPeople,
          email: 'bavly11331@gmail.com'
      })
  }).then(response => {
      if (response.ok) {
          alert('Registration successful! Check your QR code.');
      } else {
          alert('There was a problem with the registration. Please try again.');
      }
  }).catch(error => {
      console.error('Error:', error);
      alert('There was a problem with the registration. Please try again.');
  });
});
