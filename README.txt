HRAVÉ ATELIÉR — návrh webu (verzia 2)
=======================================

KONCEPT
  "Register" — portfólio nie je mriežka kariet, ale typografický zoznam.
  Každý projekt má vlastnú farbu. Pri prejdení myšou riadok zaplaví
  farbou a pri kurzore sa objaví náhľad fotografie.
  Na dotykových zariadeniach farbu ukazuje pásik vľavo.

  Podstránka každého projektu preberá jeho farbu ako akcent —
  citát, tlačidlá aj čísla sa menia projekt od projektu.

  Písmo: Syne (nadpisy) · Chivo (text) · Chivo Mono (údaje)
  Nadpisy sú zámerne malými písmenami.

STRÁNKY (plochá štruktúra, žiadne priečinky)
  index.html ............. úvod: 3D model + register + postup
  projekty.html .......... register s filtrom podľa typológie
  projekt-*.html ......... 12 podstránok, každá vo vlastnej farbe
  atelier.html ........... o ateliéri a službách
  kontakt.html ........... formulár

SÚBORY
  style.css .............. štýly
  register.js ............ náhľad pri kurzore + filter
  model3d.js ............. 3D chata (geometria zapečená vnútri)
  animacie.css/.js ....... scroll animácie
  menu.js ................ mobilné menu

PRIDANIE PROJEKTU
  1. Skopíruj ktorýkoľvek projekt-*.html, premenuj
  2. Zmeň <title>, description, canonical
  3. V <head> je <style>:root{--akcent:#XXXXXX}</style> — nastav farbu
  4. Prepíš nadpis, claim, tabuľku údajov a texty
  5. Do index.html a projekty.html pridaj riadok registra:
     <a class="riadok" ... style="--rc:var(--cN)"> kde N je 1–6
     data-typ musí sedieť: dom / interier / prevadzka / rekonstrukcia / exterier
  6. V projekty.html uprav počty v tlačidlách filtra

FARBY PROJEKTOV
  --c1 #FF5A1F oranžová   --c4 #F2C200 žltá
  --c2 #2F5CFF modrá      --c5 #B14BE8 fialová
  --c3 #00A36C zelená     --c6 #FF7BAC ružová

3D MODEL
  Choreografia je v poli ZASTAVKY na konci model3d.js.
  Model beží len po sekciu s id="koniec3d".
  Iný model: pošli .glb, geometria sa prepečie.

PRED SPUSTENÍM
  [ ] Zmaž <div class="draftbar"> zo všetkých stránok
  [ ] Odstráň <meta name="robots" content="noindex,nofollow">
  [ ] Nahraď 12 ukážkových projektov skutočnými
  [ ] Doplň fotografie namiesto blokov .ph
  [ ] Doplň telefón, e-mail, adresu (hľadaj "[telefón]")
  [ ] Napoj formulár na odosielanie
  [ ] Doplň Instagram v päte

POZOR
  Všetkých 12 projektov je VYMYSLENÝCH. Texty, čísla aj citáty
  treba nahradiť skutočnými pred akýmkoľvek zverejnením.
