package tnp_management.tnp.services;


import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import tnp_management.tnp.dto.PlacementChartDTO;
import tnp_management.tnp.projection.PlacementStatsProjection;
import tnp_management.tnp.repositories.StudentProfileRepository;

import java.util.Arrays;
import java.util.List;

@Service
public class PlacementChartService {

    private final StudentProfileRepository studentProfileRepositoryrepository;
    private final ModelMapper modelMapper;


    public PlacementChartService(  StudentProfileRepository studentProfileRepositoryrepository, ModelMapper modelMapper) {
        this.studentProfileRepositoryrepository = studentProfileRepositoryrepository;

        this.modelMapper = modelMapper;
    }


    public   List<PlacementChartDTO> getChart() {

        List<PlacementStatsProjection> results = studentProfileRepositoryrepository.getPlacementStats();

        return results.stream()
                .map(r -> modelMapper.map(r, PlacementChartDTO.class))
                .toList();
    }


}
