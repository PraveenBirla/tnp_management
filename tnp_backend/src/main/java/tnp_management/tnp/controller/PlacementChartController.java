package tnp_management.tnp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tnp_management.tnp.dto.PlacementChartDTO;
import tnp_management.tnp.services.PlacementChartService;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class PlacementChartController {

    private final PlacementChartService placementChartService;

    public PlacementChartController(PlacementChartService placementChartService) {
        this.placementChartService = placementChartService;
    }

    @GetMapping("/get-chart")
    public ResponseEntity<List<PlacementChartDTO>> getChart(){
        return ResponseEntity.ok(placementChartService.getChart());
    }
}
