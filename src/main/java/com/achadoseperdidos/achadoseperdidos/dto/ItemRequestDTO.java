package com.achadoseperdidos.achadoseperdidos.dto;

import com.achadoseperdidos.achadoseperdidos.entity.CategoriaItem;
import com.achadoseperdidos.achadoseperdidos.entity.TipoItem;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data                   //criar getters, setters, hash equals e equals
@NoArgsConstructor      //criar construtor que não precisa passar dados
@AllArgsConstructor     //criar construtor que precisa passar dados

public class ItemRequestDTO {
    @NotBlank
    private String nome;
    private String descricao;
    private String local;
    private String nomeUsuario;
    private String contato;
    private TipoItem tipo;
    private LocalDateTime dataRegistro;
    private CategoriaItem categoria;
}
