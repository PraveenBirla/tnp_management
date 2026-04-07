package tnp_management.tnp.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    @Bean
    public NewTopic createNewTopic(){
        return TopicBuilder.name("contact-topic")
                .partitions(1)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic createDriveTopic(){
        return TopicBuilder.name("drive-topic")
                .partitions(1)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic createDriveEmailTopic(){
        return TopicBuilder.name("drive-email-topic")
                .partitions(5)
                .replicas(1)
                .build();
    }

}
