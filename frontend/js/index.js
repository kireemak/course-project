async function loadAvailableCars() {
    try {
        const response = await fetch('http://localhost:8080/api/cars/available');
        const cars = await response.json();

        const tableBody = document.getElementById('carsTable').querySelector('tbody');
        tableBody.innerHTML = ''; 

        cars.forEach(car => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${car.id}</td>
                <td>${car.brand}</td>
                <td>${car.model}</td>
                <td>${car.year}</td>
                <td>$${car.rentalPrice}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading available cars:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadAvailableCars);