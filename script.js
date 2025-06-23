document.addEventListener('DOMContentLoaded', () => {
    // --- Form Submission Handling ---
    const form = document.querySelector('form');
    const uploadStatus = document.getElementById('uploadStatus');

    if (form && uploadStatus) { // Ensure elements exist before adding listeners
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(form);

            try {
                uploadStatus.textContent = 'Uploading...';
                uploadStatus.style.color = '#007bff'; // Blue for pending

                // In a real application, replace '/upload-resume' with your actual backend API endpoint
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json(); // Assuming your backend returns JSON
                    // CORRECTED LINE: Use backticks for template literal
                    uploadStatus.textContent = `Upload successful! ${result.message || 'Resume processed!'}`;
                    uploadStatus.style.color = '#28a745'; // Green for success
                    // Optional: Clear form or redirect after successful upload
                    // form.reset();
                } else {
                    const errorText = await response.text();
                    // CORRECTED LINE: Use backticks for template literal
                    uploadStatus.textContent = `Upload failed: ${response.status} ${response.statusText || ''} - ${errorText}`;
                    uploadStatus.style.color = '#dc3545'; // Red for error
                }
            } catch (error) {
                console.error('Error during upload:', error);
                // CORRECTED LINE: Use backticks for template literal
                uploadStatus.textContent = `An unexpected error occurred: ${error.message}`;
                uploadStatus.style.color = '#dc3545';
            }
        });
    }

    // --- Simple Background Animation ---
    const backgroundAnimationDiv = document.querySelector('.background-animation');
    let currentOpacity = 0.5;
    let opacityDirection = 1; // 1 for increasing, -1 for decreasing
    const opacityChangeRate = 0.0005; // How fast opacity changes
    const minOpacity = 0.3;
    const maxOpacity = 0.7;

    if (backgroundAnimationDiv) {
        function animateBackground() {
            currentOpacity += opacityDirection * opacityChangeRate;

            if (currentOpacity > maxOpacity || currentOpacity < minOpacity) {
                opacityDirection *= -1; // Reverse direction
            }

            backgroundAnimationDiv.style.opacity = currentOpacity;
            requestAnimationFrame(animateBackground); // Loop the animation
        }

        animateBackground(); // Start the animation
    }
});