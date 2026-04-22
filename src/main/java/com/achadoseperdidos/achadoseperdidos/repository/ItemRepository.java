package com.achadoseperdidos.achadoseperdidos.repository;

import com.achadoseperdidos.achadoseperdidos.entity.Item;
import com.achadoseperdidos.achadoseperdidos.entity.TipoItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository <Item, Long>{
    List<Item> findByTipo(TipoItem tipo);
}
