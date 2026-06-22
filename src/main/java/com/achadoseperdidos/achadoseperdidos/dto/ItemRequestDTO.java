package com.achadoseperdidos.achadoseperdidos.dto;

import com.achadoseperdidos.achadoseperdidos.entity.CategoriaItem;
import com.achadoseperdidos.achadoseperdidos.entity.TipoItem;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data                   //criar getters, setters, hash equals e equals
@NoArgsConstructor      //criar construtor que não precisa passar dados
@AllArgsConstructor     //criar construtor que precisa passar dados

public class ItemRequestDTO {
    @NotBlank(message="Nome não pode ser vazio")
    private String nome;
    @NotBlank(message="Descrição não pode ser vazia")
    private String descricao;
    @NotBlank(message="Local não pode ser vazio")
    private String local;
    private String nomeUsuario;
    @NotBlank (message="Contato não pode ser vazio")
    private String contato;
    @NotNull(message="Tipo não pode ser vazio")
    private TipoItem tipo;
    @NotNull(message="Categoria não pode ser vazia")
    private CategoriaItem categoria;
}
