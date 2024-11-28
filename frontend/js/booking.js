document.getElementById('bookingForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const bookingData = {
        user: { id: document.getElementById('userId').value },
        car: { id: document.getElementById('carId').value },
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        status: "Created"
    };

    try {
        const response = await fetch('http://localhost:8080/api/bookings/create-with-check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });

        const booking = await response.json();
        const result = document.getElementById('bookingResult');
        result.textContent = `Booking created successfully! ID: ${booking.id}`;
        result.style.color = "green";
    } catch (error) {
        console.error('Error creating booking:', error);
        const result = document.getElementById('bookingResult');
        result.textContent = "Failed to create booking.";
        result.style.color = "red";
    }
});