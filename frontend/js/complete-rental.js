document.getElementById('completeRentalForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const bookingId = document.getElementById('bookingId').value;

    try {
        const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}/complete`, { method: 'PUT' });
        const updatedBooking = await response.json();
        const result = document.getElementById('rentalResult');
        result.textContent = `Rental completed successfully! Booking ID: ${updatedBooking.id}`;
        result.style.color = "green";
    } catch (error) {
        console.error('Error completing rental:', error);
        const result = document.getElementById('rentalResult');
        result.textContent = "Failed to complete rental.";
        result.style.color = "red";
    }
});
