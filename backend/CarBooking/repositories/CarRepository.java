package by.kireenko.coursework.CarBooking.repositories;

import by.kireenko.coursework.CarBooking.models.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Integer> {
    List<Car> findByStatus(String status);
}
