package com.achadoseperdidos.achadoseperdidos.controller;

import com.achadoseperdidos.achadoseperdidos.dto.LoginDTO;
import com.achadoseperdidos.achadoseperdidos.dto.LoginResponseDTO;
import com.achadoseperdidos.achadoseperdidos.dto.UsuarioCadastroDTO;
import com.achadoseperdidos.achadoseperdidos.entity.Usuario;
import com.achadoseperdidos.achadoseperdidos.exceptions.CredenciaisInvalidasException;
import com.achadoseperdidos.achadoseperdidos.repository.UsuarioRepository;
import com.achadoseperdidos.achadoseperdidos.security.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrar(@RequestBody UsuarioCadastroDTO dto) {
        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email já cadastrado.");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(passwordEncoder.encode(dto.getSenha()));

        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Usuário cadastrado com sucesso!");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginDTO dto) {
        Usuario usuario = usuarioRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new CredenciaisInvalidasException("E-mail ou senha incorretos"));

        if (passwordEncoder.matches(dto.getSenha(), usuario.getSenha())) {
            String token = jwtService.gerarToken(usuario.getEmail());
            return ResponseEntity.ok(new LoginResponseDTO(token));
        }

        throw new CredenciaisInvalidasException("E-mail ou senha incorretos");
    }
}