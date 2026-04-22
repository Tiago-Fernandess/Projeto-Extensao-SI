package com.achadoseperdidos.achadoseperdidos.controller;

import com.achadoseperdidos.achadoseperdidos.entity.Item;
import com.achadoseperdidos.achadoseperdidos.entity.TipoItem;
import com.achadoseperdidos.achadoseperdidos.service.ItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/items")
public class ItemController {
    private final ItemService itemService;
    public ItemController(ItemService itemService){
        this.itemService= itemService;
    }
    // CREATE
    @PostMapping
    public Item create (@RequestBody Item item){
        return itemService.create(item);
    }
    // LIST
    @GetMapping
    public List<Item> findAll(){
        return itemService.findAll();
    }
    // GET BY ID
    @GetMapping("/{id}")
    public Item findById(@PathVariable Long id){
        return itemService.findById(id);
    }
    // UPDATE
    @PutMapping("/{id}")
    public Item update(@PathVariable Long id, @RequestBody Item item){
        return itemService.update(id, item);
    }
    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        itemService.delete(id);
    }
    // FILTER
    @GetMapping("/tipo/{tipo}")
    public List <Item> findByType(@PathVariable TipoItem tipo){
        return itemService.findByType(tipo);
    }
}
