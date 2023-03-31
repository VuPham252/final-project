package com.example.hotel.config.swagger2;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SpringFoxConfig {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build();
    }

//    public static final String PROJECT_VERSION = "0.1.0";
//
//    private ApiInfo apiInfo() {
//
//        // @formatter:off
//        final ApiInfo apiInfo =
//                new ApiInfoBuilder()
//                        .title("Oneplanets API")
//                        .version(PROJECT_VERSION)
//                        .build();
//        // @formatter:on
//
//        return apiInfo;
//    }
//    @Bean
//    public Docket docket() {
//        final Predicate<String> paths = PathSelectors.ant("/api/**");
//
//        // @formatter:off
//        final Docket docket =
//                new Docket(DocumentationType.SWAGGER_2)
//                        .apiInfo(apiInfo())
//                        .select()
//                        .paths(paths)
//                        .build()
//                        .enableUrlTemplating(true);
//        // @formatter:on
//
//        return docket;
//    }

}