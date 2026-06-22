package com.achadoseperdidos.achadoseperdidos.controller;

import com.achadoseperdidos.achadoseperdidos.dto.ItemRequestDTO;
import com.achadoseperdidos.achadoseperdidos.dto.ItemResponseDTO;
import com.achadoseperdidos.achadoseperdidos.entity.CategoriaItem;
import com.achadoseperdidos.achadoseperdidos.entity.Item;
import com.achadoseperdidos.achadoseperdidos.entity.TipoItem;
import com.achadoseperdidos.achadoseperdidos.service.ItemService;
import jakarta.validation.Valid;
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
    public ItemResponseDTO create (@RequestBody @Valid ItemRequestDTO item){
        return itemService.create(item);
    }
    // LIST
    @GetMapping
    public List<ItemResponseDTO> findAll(){
        return itemService.findAll();
    }
    // GET BY ID
    @GetMapping("/{id}")
    public ItemResponseDTO findById(@PathVariable Long id){
        return itemService.findById(id);
    }
    // UPDATE
    @PutMapping("/{id}")
    public ItemResponseDTO update(@PathVariable Long id, @RequestBody @Valid ItemRequestDTO item){
        return itemService.update(id, item);
    }
    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        itemService.delete(id);
    }
    // FILTER
    @GetMapping("/tipo/{tipo}")
    public List <ItemResponseDTO> findByType(@PathVariable TipoItem tipo){
        return itemService.findByType(tipo);
    }
    @GetMapping("/categoria/{categoria}")
    public List <ItemResponseDTO> findByCategoria(@PathVariable CategoriaItem categoria){
        return itemService.findByCategoria(categoria);
    }
}
