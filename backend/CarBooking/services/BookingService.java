package by.kireenko.coursework.CarBooking.services;

import by.kireenko.coursework.CarBooking.models.Booking;
import by.kireenko.coursework.CarBooking.models.Car;
import by.kireenko.coursework.CarBooking.repositories.BookingRepository;
import by.kireenko.coursework.CarBooking.repositories.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class BookingService {

    private final BookingRepository bookingRepository;
    private final CarRepository carRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository, CarRepository carRepository) {
        this.bookingRepository = bookingRepository;
        this.carRepository = carRepository;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id.intValue())
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
    }

    @Transactional(readOnly = false)
    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Transactional(readOnly = false)
    public Booking updateBooking(Long id, Booking updatedBooking) {
        Booking existingBooking = getBookingById(id);
        existingBooking.setStartDate(updatedBooking.getStartDate());
        existingBooking.setEndDate(updatedBooking.getEndDate());
        existingBooking.setStatus(updatedBooking.getStatus());
        existingBooking.setCar(updatedBooking.getCar());
        existingBooking.setUser(updatedBooking.getUser());
        return bookingRepository.save(existingBooking);
    }

    @Transactional(readOnly = false)
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id.intValue());
    }

    @Transactional(readOnly = false)
    public Booking createBookingWithCheck(Booking booking) {
        Car car = carRepository.findById(booking.getCar().getId().intValue())
                .orElseThrow(() -> new RuntimeException("Car not found with id: " + booking.getCar().getId()));
        if (!"Available".equalsIgnoreCase(car.getStatus())) {
            throw new RuntimeException("Car is not available for booking.");
        }

        car.setStatus("Rented");
        carRepository.save(car);
        return bookingRepository.save(booking);
    }

    @Transactional(readOnly = false)
    public Booking completeBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId.intValue())
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));
        Car car = booking.getCar();
        car.setStatus("Available");
        carRepository.save(car);
        booking.setStatus("Completed");
        return bookingRepository.save(booking);
    }
}
