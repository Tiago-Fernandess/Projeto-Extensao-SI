package com.achadoseperdidos.achadoseperdidos.service;

import com.achadoseperdidos.achadoseperdidos.dto.ItemRequestDTO;
import com.achadoseperdidos.achadoseperdidos.dto.ItemResponseDTO;
import com.achadoseperdidos.achadoseperdidos.entity.CategoriaItem;
import com.achadoseperdidos.achadoseperdidos.entity.Item;
import com.achadoseperdidos.achadoseperdidos.entity.TipoItem;
import com.achadoseperdidos.achadoseperdidos.exceptions.ItemInvalidoException;
import com.achadoseperdidos.achadoseperdidos.exceptions.ItemNotFoundException;
import com.achadoseperdidos.achadoseperdidos.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ItemService {

    private final ItemRepository repository;

    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }

    public ItemResponseDTO create(ItemRequestDTO item){
        Item entity = dtoToEntity(item);

        return  entityToResponseDTO(repository.save(entity));
    }

    public List<ItemResponseDTO> findAll(){

        List<Item> itens = repository.findAll();

        if(itens.isEmpty()){
            throw new ItemInvalidoException(
                    "Nenhum item cadastrado."
            );
        }

        return itens.stream()
                .map(this::entityToResponseDTO)
                .toList();
    }

    public ItemResponseDTO findById(Long id){
        return entityToResponseDTO(buscaItem(id));
    }

    public ItemResponseDTO update(Long id, ItemRequestDTO novoItem) {


        Item existente = repository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));

        existente.setNome(novoItem.getNome());
        existente.setDescricao(novoItem.getDescricao());
        existente.setLocal(novoItem.getLocal());
        existente.setContato(novoItem.getContato());
        existente.setTipo(novoItem.getTipo());
        existente.setCategoria(novoItem.getCategoria());
        repository.save(existente);
        return entityToResponseDTO(existente);
    }

    public void delete(Long id) {
        repository.delete(buscaItem(id));
    }

    public List<ItemResponseDTO> findByType(TipoItem tipo) {

        List<Item> itens = repository.findByTipo(tipo);

        if(itens.isEmpty()){
            throw new ItemInvalidoException(
                    "Nenhum item encontrado para o tipo informado."
            );
        }

        return converterLista(itens);
    }

    public List<ItemResponseDTO> findByCategoria(CategoriaItem categoria){

        List<Item> itens = repository.findByCategoria(categoria);

        if(itens.isEmpty()){
            throw new ItemInvalidoException(
                    "Nenhum item encontrado para a categoria informada."
            );
        }

        return converterLista(itens);
    }


    public ItemResponseDTO entityToResponseDTO(Item item){

        ItemResponseDTO dto = new ItemResponseDTO();

        dto.setId(item.getId());
        dto.setNome(item.getNome());
        dto.setDescricao(item.getDescricao());
        dto.setLocal(item.getLocal());
        dto.setNomeUsuario(item.getNomeUsuario());
        dto.setContato(item.getContato());
        dto.setTipo(item.getTipo());
        dto.setDataRegistro(item.getDataRegistro());
        dto.setCategoria(item.getCategoria());

        return dto;
    }

    private Item buscaItem(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(id));
    }
    public Item dtoToEntity(ItemRequestDTO dto){
        Item entity = new Item();
        entity.setNome(dto.getNome());
        entity.setDescricao(dto.getDescricao());
        entity.setLocal(dto.getLocal());
        entity.setNomeUsuario(dto.getNomeUsuario());
        entity.setContato(dto.getContato());
        entity.setTipo(dto.getTipo());
        entity.setDataRegistro(LocalDateTime.now());
        entity.setCategoria(dto.getCategoria());
        return entity;
    }
    public List<ItemResponseDTO> converterLista(List<Item> itens){
        List<ItemResponseDTO> lista = new ArrayList<>();
        for(Item entity : itens){
            lista.add(entityToResponseDTO(entity));
        }
        return lista;
    }
}