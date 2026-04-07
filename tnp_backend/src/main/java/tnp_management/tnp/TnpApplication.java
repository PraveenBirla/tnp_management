package tnp_management.tnp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafka;

@SpringBootApplication
@EnableKafka
public class TnpApplication {

	public static void main(String[] args) {
		SpringApplication.run(TnpApplication.class, args);
	}

}
