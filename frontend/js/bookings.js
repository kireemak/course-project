async function loadBookings() {
    try {
        const response = await fetch('http://localhost:8080/api/bookings');
        const cars = await response.json();

        const tableBody = document.getElementById('bookingsTable').querySelector('tbody');
        tableBody.innerHTML = ''; 

        cars.forEach(booking => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${booking.id}</td>
                <td>${booking.user.id}</td>
                <td>${booking.car.id}</td>
                <td>${booking.startDate}</td>
                <td>${booking.endDate}</td>
                <td>${booking.status}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading bookings:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadBookings);