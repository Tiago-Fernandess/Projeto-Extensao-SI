package com.achadoseperdidos.achadoseperdidos.exceptions;

public class ItemNotFoundException extends RuntimeException {
    public ItemNotFoundException(Long id) {
        super("Item com ID "+id+" não encontrado");
    }
}
