package tnp_management.tnp.services;

import org.modelmapper.ModelMapper;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tnp_management.tnp.Entities.Events;
import tnp_management.tnp.Entities.StudentProfile;
import tnp_management.tnp.Entities.User;
import tnp_management.tnp.dto.EventRequestDTO;
import tnp_management.tnp.dto.EventResponseDTO;
import tnp_management.tnp.repositories.EventRepository;
import tnp_management.tnp.repositories.StudentProfileRepository;
import tnp_management.tnp.repositories.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

   private final ModelMapper modelMapper;
   private final EventRepository eventRepository;
   private final UserRepository userRepository;
   private final StudentProfileRepository studentProfileRepository;

    public EventService(ModelMapper modelMapper, EventRepository eventRepository, UserRepository userRepository, StudentProfileRepository studentProfileRepository) {
        this.modelMapper = modelMapper;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.studentProfileRepository = studentProfileRepository;
    }

    public EventRequestDTO createEvent(EventRequestDTO dto) {

        Events events =  modelMapper.map(dto , Events.class);

        Events saved = eventRepository.save(events);

        return  modelMapper.map(saved , EventRequestDTO.class);
    }

    public List<EventResponseDTO> getAll() {
        return eventRepository.findAll().stream()
                .map(events -> modelMapper.map(events , EventResponseDTO.class))
                .collect(Collectors.toList());
    }

    public void updateEvent(Long id, EventRequestDTO dto) {

        Events currentEvent = eventRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Event Not Found"));

        modelMapper.map(dto , currentEvent);

        currentEvent.getEligibleBatches().clear();
        currentEvent.getEligibleBatches().addAll(dto.getEligibleBatches());

        currentEvent.getEligibleBranch().clear();
        currentEvent.getEligibleBranch().addAll(dto.getEligibleBranch());

        eventRepository.save(currentEvent);

    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    public List<EventResponseDTO> getAllEvents() {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        StudentProfile profile = studentProfileRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("Profile Not Found"));

        return eventRepository.findByBranchAndBatch(profile.getBranch(), profile.getPassoutYear())
                .stream()
                .map(events -> modelMapper.map(events , EventResponseDTO.class))
                .collect(Collectors.toList());

    }
}
