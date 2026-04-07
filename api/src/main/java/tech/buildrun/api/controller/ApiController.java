package tech.buildrun.api.controller;

//Notação do Spring - Serve para indicar que estamos definindo uma API dentro dessa classe
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import tools.jackson.databind.ObjectMapper;

import java.util.ArrayList;

@RestController
public class ApiController {
//    Método HTTP

    private ArrayList<String> tasks = new ArrayList<>();

    private ObjectMapper objectMapper;

    //Utilizando o ObjectMapper para permitir que utilize minha lista no ResponseEntity
    public ApiController(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    //  Definir Caminho para nossa API na função GET
    @GetMapping(path = "/tasks")
    public ResponseEntity<String> helloWorld() {
        tasks.add("Minha tarefa");
        return ResponseEntity.ok(objectMapper.writeValueAsString(tasks));
    }
}
