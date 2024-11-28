async function loadUsers() {
    try {
        const response = await fetch('http://localhost:8080/api/users');
        const cars = await response.json();

        const tableBody = document.getElementById('usersTable').querySelector('tbody');
        tableBody.innerHTML = ''; 

        cars.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phoneNumber}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadUsers);