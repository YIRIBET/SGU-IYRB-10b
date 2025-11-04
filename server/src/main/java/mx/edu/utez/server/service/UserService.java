package mx.edu.utez.server.service;

import mx.edu.utez.server.modules.User;
import mx.edu.utez.server.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;

    }
    public List<User> findAll(){
        return userRepository.findAll();
    }
    public Optional<User> findById(Long id){
        return userRepository.findById(id);

    }
    public User save(User user){
        return userRepository.save(user);
    }

    public User update(Long id, User newUser){
        return userRepository.findById(id)
                .map( user -> {
                    user.setName(newUser.getName());
                    user.setEmail(newUser.getEmail());
                    user.setPhoneNumber(newUser.getPhoneNumber());
                    return userRepository.save(user);
                })
                .orElseThrow(()-> new RuntimeException("User not found"));
    }
    public void delete(Long id){
        userRepository.deleteById(id);
    }
}
