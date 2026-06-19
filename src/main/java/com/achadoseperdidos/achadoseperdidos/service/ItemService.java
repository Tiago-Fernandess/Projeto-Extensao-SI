package com.achadoseperdidos.achadoseperdidos.service;

import com.achadoseperdidos.achadoseperdidos.dto.ItemResponseDTO;
import com.achadoseperdidos.achadoseperdidos.entity.CategoriaItem;
import com.achadoseperdidos.achadoseperdidos.entity.Item;
import com.achadoseperdidos.achadoseperdidos.entity.TipoItem;
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
    return repository.save(item);
    }
    public List<ItemResponseDTO> findAll(){
    return repository.findAll().stream()
            .map(item -> convertToDTO(item))
            .toList();
    }
    public ItemResponseDTO findById(Long id){
        return convertToDTO(buscaItem(id));
    }
    public Item update(Long id, Item novoItem) {
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
        return repository.findByTipo(tipo);
    }
    public List<Item> findByCategoria(CategoriaItem categoria){
        return repository.findByCategoria(categoria);
    }

    private ItemResponseDTO convertToDTO(Item item){
         ItemResponseDTO dto = new ItemResponseDTO();
            dto.setId(item.getId());
            dto.setNome(item.getNome());
            dto.setDescricao(item.getDescricao());
            dto.setLocal(item.getLocal());
            dto.setNomeUsuario (item.getNomeUsuario());
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
