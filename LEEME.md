# The Typesetter — página temporal (solo inglés)

## Probar en local
El video no siempre arranca abriendo `index.html` con doble clic (file://). Usá un servidor local:

- **VS Code:** extensión *Live Server* → clic derecho en `index.html` → "Open with Live Server"
- **Python:** desde esta carpeta, `python -m http.server 8000` y abrí http://localhost:8000

## Subir a Latin Cloud — IMPORTANTE
1. Descargá un backup completo de `public_html/` antes de tocar nada.
2. **NO borres** estos archivos del sitio actual (los usa el sitio nuevo o pueden estar enlazados desde afuera):
   - `quality-policy.pdf` → lo enlaza el footer (certificaciones) y probablemente Certipedia/clientes.
   - `images/logo-linke.png` → posiblemente lo usen firmas de mail o LinkedIn.
   - Cualquier archivo `google*.html` o `BingSiteAuth.xml` (verificaciones de Search Console/Bing).
   - `robots.txt` (el actual está bien: permite todo).
3. Mové el resto del sitio viejo a `public_html/_old/` en vez de borrarlo.
4. Subí **todo el contenido** de esta carpeta (incluido `.htaccess`, archivo oculto) a `public_html/`.
   Si ya existe un `.htaccess`, revisalo antes de pisarlo y fusioná las reglas.
5. Activá SSL en el panel y después descomentá el bloque "Force HTTPS" del `.htaccess`.

## Comportamiento
- El video arranca en silencio (los navegadores bloquean el autoplay con sonido) con "Sound on" y "Skip" (también Esc).
- Al terminar aparece la pantalla de "en construcción" con el CTA a LinkedIn y "Watch the video again".
- Escritorio: WebM (o MP4 1080 si no lo soporta). Celular (≤900px): MP4 720.
- Con "reducir movimiento" activado, va directo a la pantalla final.

## Config
`assets/js/main.js` → `CONFIG.contactEmail`: si se completa, aparece "or write to us".

## Pendientes
- Textos provisorios: reemplazar cuando Candelaria pase el copy.
- Verificar datos de contacto del JSON-LD (index.html): teléfonos, direcciones, email.
- Tipografía: Titillium Web (Google Fonts). Museo Sans Rounded necesita licencia web.
- Paleta: tomada del PNG del logo; confirmar contra el brandbook refreshed.
