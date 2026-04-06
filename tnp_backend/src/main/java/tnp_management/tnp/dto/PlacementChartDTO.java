package tnp_management.tnp.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlacementChartDTO {

   private Integer year;
   Long total;
   private Long placed;
   private   Long companies;
}
