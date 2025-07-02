package com.Accenture.backend.util;

import io.github.cdimascio.dotenv.Dotenv;

import jakarta.mail.Session;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.Transport;
import jakarta.mail.MessagingException;

import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.InternetAddress;

import java.util.Properties;
import org.springframework.stereotype.Component;

@Component
public class MailSender {
    // ENV VARIABLES
    private static final Dotenv dotenv = Dotenv.load();
    private static final String REMITENTE = dotenv.get("REMITENTE");
    private static final String APP_PASSWORD = dotenv.get("APP_PASSWORD");

    // Mandar correo con credenciales al usuario
    public void sendWelcomeEmail(String email, String cedula, String password) {
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        // ABRIR SESION CON LA API KEY Y EL CORREO
        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(REMITENTE, APP_PASSWORD);
            }
        });

        try {
            Message mensaje = new MimeMessage(session);
            //Set de las variables del correo
            mensaje.setFrom(new InternetAddress(REMITENTE));
            mensaje.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
            mensaje.setSubject("Bienvenido a Accenture: Sistema de Gestión de Proyectos");

            String html = getStyledHtml(cedula, password);
            mensaje.setContent(html, "text/html; charset=utf-8");

            Transport.send(mensaje);
            // exitoso
            System.out.println("Correo enviado correctamente a: " + email);

        } catch (MessagingException e) {
            System.err.println("Error al enviar el correo: " + e.getMessage());
            e.printStackTrace();
        }
    }
    // ESTRUCTURA HTML Y ESTILIZADO CSS DEL CORREO
    private String getStyledHtml(String cedula, String password) {
        return String.format(
                "<!DOCTYPE html>" +
                        "<html>" +
                        "<head>" +
                        "<style>" +
                        "body { background-color: #f4f4f4; margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; color: #333333; }" +
                        ".container { max-width: 600px; background: #ffffff; margin: 40px auto; padding: 40px; border-radius: 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.1); }" +
                        ".header { text-align: center; color: #A100FF; font-size: 28px; font-weight: bold; margin-bottom: 20px; }" +
                        ".subtitle { text-align: center; font-size: 16px; color: #666666; margin-bottom: 30px; }" +
                        ".content { font-size: 16px; line-height: 1.7; }" +
                        ".highlight { color: #A100FF; font-weight: bold; }" +
                        ".footer { margin-top: 40px; font-size: 12px; color: #aaaaaa; text-align: center; }" +
                        "</style>" +
                        "</head>" +
                        "<body>" +
                        "<div class='container'>" +
                        "<div class='header'>Accenture</div>" +
                        "<div class='subtitle'>Bienvenido al sistema de gestión de proyectos</div>" +
                        "<div class='content'>" +
                        "<p>Hola,</p>" +
                        "<p>Nos complace darte la bienvenida a <span class='highlight'>Accenture</span>. A continuación encontrarás tus credenciales de acceso:</p>" +
                        "<p><strong>Cédula:</strong> %s<br>" +
                        "<strong>Contraseña:</strong> %s</p>" +
                        "<p>Te recomendamos cambiar tu contraseña al ingresar por primera vez.</p>" +
                        "<a href='http://localhost:5173/'\n" +
                        "   class='btn'\n" +
                        "   style='background-color:#A100FF; color:#ffffff !important; text-decoration:none; display:inline-block; padding:12px 25px; border-radius:5px; font-weight:bold; font-family:Segoe UI, sans-serif;'\n" +
                        "   target='_blank'>\n" +
                        "   Ingresar al sistema\n" +
                        "</a>" +
                        "<p>Si necesitas soporte, no dudes en escribirnos.</p>" +
                        "<p>Saludos cordiales,<br>El equipo de <span class='highlight'>Accenture</span>.</p>" +
                        "</div>" +
                        "<div class='footer'>&copy; 2025 Accenture. Todos los derechos reservados.</div>" +
                        "</div>" +
                        "</body>" +
                        "</html>",
                cedula, password
        );
    }
    // Envía un código de recuperación de contraseña
    public void enviarCodigoRecuperacion(String email, String code) {
        String subject = "Código de recuperación de contraseña";
        String html = String.format(
            "<div style='font-family:Segoe UI,sans-serif;max-width:500px;margin:auto;padding:32px;background:#fff;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.08);'>" +
            "<h2 style='color:#A100FF;text-align:center;'>Recuperación de contraseña</h2>" +
            "<p>Tu código de recuperación es:</p>" +
            "<div style='font-size:2rem;font-weight:bold;color:#A100FF;text-align:center;margin:24px 0;'>%s</div>" +
            "<p>Ingresa este código en la plataforma para continuar con el proceso de recuperación.</p>" +
            "<p style='color:#888;font-size:13px;text-align:center;'>Si no solicitaste este código, ignora este mensaje.</p>" +
            "<div style='margin-top:32px;text-align:center;font-size:12px;color:#aaa;'>&copy; 2025 Accenture</div>" +
            "</div>",
            code
        );
        sendHtmlEmail(email, subject, html);
    }

    // Utilidad para enviar correos HTML genéricos
    public void sendHtmlEmail(String email, String subject, String html) {
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(REMITENTE, APP_PASSWORD);
            }
        });

        try {
            Message mensaje = new MimeMessage(session);
            mensaje.setFrom(new InternetAddress(REMITENTE));
            mensaje.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
            mensaje.setSubject(subject);
            mensaje.setContent(html, "text/html; charset=utf-8");
            Transport.send(mensaje);
            System.out.println("Correo de recuperación enviado a: " + email);
        } catch (MessagingException e) {
            System.err.println("Error al enviar el correo de recuperación: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
