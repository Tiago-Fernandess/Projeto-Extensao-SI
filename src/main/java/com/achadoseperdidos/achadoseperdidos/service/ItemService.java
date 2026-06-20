package com.achadoseperdidos.achadoseperdidos.service;

import com.achadoseperdidos.achadoseperdidos.dto.ItemResponseDTO;
import com.achadoseperdidos.achadoseperdidos.entity.CategoriaItem;
import com.achadoseperdidos.achadoseperdidos.entity.Item;
import com.achadoseperdidos.achadoseperdidos.entity.TipoItem;
import com.achadoseperdidos.achadoseperdidos.exceptions.ItemInvalidoException;
import com.achadoseperdidos.achadoseperdidos.exceptions.ItemNotFoundException;
import com.achadoseperdidos.achadoseperdidos.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    private final ItemRepository repository;

    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }

    public Item create(Item item){

        validarItem(item);

        return repository.save(item);
    }

    public List<ItemResponseDTO> findAll(){

        List<Item> itens = repository.findAll();

        if(itens.isEmpty()){
            throw new ItemNotFoundException(0L);
        }

        return itens.stream()
                .map(this::convertToDTO)
                .toList();
    }

    public ItemResponseDTO findById(Long id){
        return convertToDTO(buscaItem(id));
    }

    public Item update(Long id, Item novoItem) {

        validarItem(novoItem);

        Item existente = buscaItem(id);

        existente.setNome(novoItem.getNome());
        existente.setDescricao(novoItem.getDescricao());
        existente.setLocal(novoItem.getLocal());
        existente.setContato(novoItem.getContato());
        existente.setTipo(novoItem.getTipo());
        existente.setCategoria(novoItem.getCategoria());

        return repository.save(existente);
    }

    public void delete(Long id) {
        repository.delete(buscaItem(id));
    }

    public List<Item> findByType(TipoItem tipo) {

        List<Item> itens = repository.findByTipo(tipo);

        if(itens.isEmpty()){
            throw new ItemInvalidoException(
                    "Nenhum item encontrado para o tipo informado."
            );
        }

        return itens;
    }

    public List<Item> findByCategoria(CategoriaItem categoria){

        List<Item> itens = repository.findByCategoria(categoria);

        if(itens.isEmpty()){
            throw new ItemInvalidoException(
                    "Nenhum item encontrado para a categoria informada."
            );
        }

        return itens;
    }

    private void validarItem(Item item){

        if(item.getNome() == null || item.getNome().isBlank()){
            throw new ItemInvalidoException(
                    "O nome do item é obrigatório."
            );
        }

        if(item.getContato() == null || item.getContato().isBlank()){
            throw new ItemInvalidoException(
                    "O contato é obrigatório."
            );
        }

        if(item.getTipo() == null){
            throw new ItemInvalidoException(
                    "O tipo do item é obrigatório."
            );
        }

        if(item.getCategoria() == null){
            throw new ItemInvalidoException(
                    "A categoria do item é obrigatória."
            );
        }
    }

    private ItemResponseDTO convertToDTO(Item item){

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
}