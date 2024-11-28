package by.kireenko.coursework.CarBooking.repositories;

import by.kireenko.coursework.CarBooking.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
