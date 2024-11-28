package by.kireenko.coursework.CarBooking.repositories;

import by.kireenko.coursework.CarBooking.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
}
