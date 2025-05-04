package com.Accenture.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Maneja excepciones de negocio (RuntimeException)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorDetails> handleRuntime(RuntimeException ex, WebRequest req) {
        ErrorDetails err = new ErrorDetails(
                LocalDateTime.now(),
                ex.getMessage(),
                req.getDescription(false)
        );
        return new ResponseEntity<>(err, HttpStatus.NOT_FOUND);
    }

    // Maneja validaciones de @Valid en @RequestBody
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDetails> handleValidation(MethodArgumentNotValidException ex, WebRequest req) {
        String msg = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(e -> e.getField()+": "+e.getDefaultMessage())
                .reduce("", (a,b)-> a+"\n"+b);
        ErrorDetails err = new ErrorDetails(
                LocalDateTime.now(),
                "Validación fallida",
                msg
        );
        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorDetails> handleTypeMismatch(
            MethodArgumentTypeMismatchException ex,
            WebRequest request) {

        ErrorDetails err = new ErrorDetails(
                LocalDateTime.now(),
                "Parámetro inválido",
                "El valor '" + ex.getValue() + "' no es válido para '" + ex.getName() + "'"
        );
        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
    }

    // Captura cualquier otra excepción
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> handleAll(Exception ex, WebRequest req) {
        ErrorDetails err = new ErrorDetails(
                LocalDateTime.now(),
                ex.getMessage(),
                req.getDescription(false)
        );
        return new ResponseEntity<>(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }


}