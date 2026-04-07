
package tnp_management.tnp.advices;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ApiResponse<T>{
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timeStamp;
    private T data;
    private ApiError Error;

    public ApiResponse( ApiError apiError) {
        this();
        this.  Error = apiError;
    }

    public  ApiResponse(T data){
        this();
        this.data = data;
    }

    public ApiResponse(){
        this.timeStamp = LocalDateTime.now();
    }



}
