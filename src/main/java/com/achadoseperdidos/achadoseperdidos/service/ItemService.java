package com.achadoseperdidos.achadoseperdidos.service;

import com.achadoseperdidos.achadoseperdidos.entity.CategoriaItem;
import com.achadoseperdidos.achadoseperdidos.entity.Item;
import com.achadoseperdidos.achadoseperdidos.entity.TipoItem;
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
    public List<Item> findAll(){
    return repository.findAll();
    }
    public Item findById(Long id){
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Item não encontrado"));
    }
    public Item update(Long id, Item novoItem) {
        Item existente = findById(id);

        existente.setNome(novoItem.getNome());
        existente.setDescricao(novoItem.getDescricao());
        existente.setLocal(novoItem.getLocal());
        existente.setContato(novoItem.getContato());
        existente.setTipo(novoItem.getTipo());
        existente.setCategoria(novoItem.getCategoria());

        return repository.save(existente);
    }
    public void delete(Long id) {
        Item item = findById(id);
        repository.delete(item);
    }
    public List<Item> findByType(TipoItem tipo) {
        return repository.findByTipo(tipo);
    }
    public List<Item> findByCategoria(CategoriaItem categoria){
        return repository.findByCategoria(categoria);
    }
}
