# AI Workflow Dokumentácia

**Meno:** Samuel Elsner

**Dátum začiatku:** Mon Dec 15 2025

**Dátum dokončenia:** 

**Zadanie:** Frontend

---

## 1. Použité AI Nástroje

Vyplň približný čas strávený s každým nástrojom:

Ak sa jedna o tento projekt tak takto: 

- [ ] **Cursor IDE:** 0.1 hodín
- [ ] **Opencode:** 2 hodín  

**Celkový čas vývoja (priližne):** 2.5 hodín ak pocitame initial config toolov

---

## 2. Zbierka Promptov

> 💡 **Tip:** Kopíruj presný text promptu! Priebežne dopĺňaj po každej feature.

### Prompt #1: Generoval som PRP z INITIAL-pahse1.md

**Nástroj:** Opencode s definovanymi modelami opus na generovanie sonet na exekuciu 
**Kontext:** setup projektu a faza jedna public page na serach usera

**Prompt:**
```
command na generovanie /generate-prp INITIAL-phase1.md
```

**Výsledok:**  
[ ] ✅ Fungoval perfektne (first try)  
[+] ⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
[ ] ⭐⭐⭐ OK, potreboval viac úprav  
[ ] ⭐⭐ Slabé, musel som veľa prepísať  
[ ] ❌ Nefungoval, musel som celé prepísať

**Čo som musel upraviť / opraviť:**
Nefungoval switch na dark light mode a iconka mesiaca v darkmode nevyzerala dobre

**Poznámky / Learnings:**

Popravde cakal som, ze aj bez blizsieho specifikovania co dark/light mode ma spravit (trivialna vec), bude to Opencode vediet out of the box. Pravdepodobne lepsie naspecifikovat requirement.



### Prompt #2: Uprava dark/ligh mode

**Nástroj:** Opencode  
**Kontext:** Uprava dark/ligh modu uz bez PRPs, len s plan + build agentmi

**Prompt:**
Phase 1 is almost ready. We have problem that our light dark mode switching is not working. We need to be able to switch color theme from light to dark when we hit the iconbutton. Current situation is, when we hit iconbutton, it just change the text and icon of iconbutton to dark/light but not changing theme color at all. For the referance I am again putting differance of light and dark mode.

Light mode desing: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=1-705&m=dev
Dark mode design: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=5-244&m=dev

The color of elements like focus border, error text are same for both variants.

Also there is some missaligned with the dark mode "moon" icon, its overflowing the viewport.

**Výsledok:**  

Upravil to a featura funguje. 

**Úpravy:**
-

**Poznámky:**
-

### Prompt #3: Znova generovanie noveho PRP pre fazu 2 Oauth flow

**Nástroj:** Opencode  
**Kontext:** Vytvorenie profile route protected page s moznym prihlasenim na GH

**Prompt:**
generovanie INITIAL-phase2.md 

**Výsledok:**  

Pred spustenim som zadal dalsi prompt aby vedel akym smerom sa uberame.

**Úpravy:**

Adjust the PRP so we decided to go with simple express server. Also add part there, that it should generate the step by step guide for what we need to provide as a configuration into the app (secrets/tokens etc..).

**Poznámky:**
-

### Prompt #4: Exekucia 2heho PRP 

**Nástroj:** Opencode plan agent + build agent 
**Kontext:** Vytvorenie profile route protected page s moznym prihlasenim na GH

**Prompt:**
vykonanie INITIAL-phase2.md 

**Výsledok:**  

95% - jedine co, tak na zlomok sekundy mi pri callbacku ukazuje error stav aj ked ziaden error sme v reponses nemali.

**Úpravy:**

When we proceed with ouath flow and we authorize user on Github sucessuflly, once we are redirected back to the app, we are facing the error state in @github-user-search-app/src/pages/CallbackPage.tsx line 19-22 even tho there is no error from responses. For fraction of second this error is shown and then we are redirecting correctly to the url/profile.

Also one addition, once logged in, on navbar we have avatar and user name, lets change the navigation to url/profile instead of redirecting user to github. Redirection to github is done on click on name in profile page so no need to have it also here on navbar.

**Poznámky:**

nasledne sa ma opytal 

Questions Before Proceeding
1. For the error flash: Should I also add a brief "processing" state before showing errors, giving the async flow time to complete? This would prevent any momentary flashes.
2. For the navbar: Do you still want to show the username text next to the avatar, or should clicking the avatar/username combo navigate to /profile? (Currently both avatar and username are wrapped in the same link)

kde bola moja odpoved: 1. yes 2. preserve same link, then the whole element redirecting user to /profile


## 3. Problémy a Riešenia 

> 💡 **Tip:** Problémy sú cenné! Ukazujú ako riešiš problémy s AI.

### Problém #1: Neslo prepinat medzi light / dark modom

**Čo sa stalo:**
Root Cause
Tailwind CSS v4 uses a different architecture than v3. The project was using v4 (4.1.18), which requires explicit configuration to enable class-based dark mode using the @variant directive. Without this configuration, Tailwind v4 defaults to using @media (prefers-color-scheme: dark) instead of the .dark class selector.
The ThemeProvider was correctly adding/removing the .dark class on the <html> element, but Tailwind wasn't generating the proper CSS selectors to respond to that class.

**Prečo to vzniklo:**
Pravdepodobne malo kontextu ku tailwind4? Aj ked obdrzal cez Conetxt7 kontext, tak neviem

**Ako som to vyriešil:**
Zapol som plan agenta (pravdepodobne netrebalo maly fix), ktory identifikoval problem a nasledne build agent to zimplementoval

**Čo som sa naučil:**
Kontext je king.

**Screenshot / Kód:** [ ] Priložený
Vyessie som dal output z agenta. 

### Problém #2: Race conditioning pri callbacku

**Čo sa stalo:**

Na zlomok sekundy mi bol rpezentovany zly stav pri redirekte z githubu.

**Prečo:**

Malo specifikovany, flow / ale je to bezna chyba, ktora sa niekedy aj celkom tazko hlada ... 

**Riešenie:**

Opisal som chybu agentovi, ktory to identifikoval a opravil.

**Learning:**

Pri realnom projekte, je toto aj ocakavane, odstranilo by sa to prechadzanim kodu a pohcopenim co agent vyprodukoval.

## 4. Kľúčové Poznatky

### 4.1 Čo fungovalo výborne

**1.** 

Az na male drobnosti, ktore by sa dali predist ovela komplexnejsim initial promptom som nemal ziadne problemy.

### 4.2 Čo bolo náročné

**1.** 

Najnarocnejsia cast bola connectnut FIGMA mcp :D, chcel som to riesit remotne a nie cez desktop usera, a asi zial opencode zatial nekolaboruje dobre s Figma MCP.

### 4.3 Best Practices ktoré som objavil

**1.** 

Hmm, tak tento nastroj vyuzivam aktivne na dennej baze, vo vseobecnosti aj zminulosti best practices co by som aj odporucil je specifikovat miesta, ktorych sa pozadovane zmeny maju dotykat. 

Kurz mi dal velmi krasny priklad context engineeringu co mi o dost zlepsilo flow, ale kazdopadne dovtedy som celkom pedantne stale poskytoval context v promte ako som najlepsie vedel. Kazdy file, ktory sa dotykal danych zmien ci uz ako example alebo miesto kde sa featura mala doimplementovavat som vyznacil... To v combinacii s PRP len o to viac obohati kvalitu vystupu a zabrani nezerovnalostiam.


### 4.4 Moje Top 3 Tipy Pre Ostatných

**Tip #1:**

Urcite pre komplexne features pouzit sablonu pre context engineering.

**Tip #2:**

Specifikuj context oprikladanim path svojich suborov co najdokladnejsie.

**Tip #3:**

Context7 je skvele MCP, ktore snad nesmie chybat v ziadom projekte.

---

## 6. Reflexia a Závery

### 6.1 Efektivita AI nástrojov

**Ktorý nástroj bol najužitočnejší?** Opencode (je to to iste co Claude code)
**Prečo?**

Na viacerych urovniach to dokaze spravit dost vela prace, ktoru nasledne vie aj doupravovat.

**Ktorý nástroj bol najmenej užitočný?** Neviem ako na toto reagovat, kedze pouzivam len to co potrebujem.
Vo vseobecnosti ma kazdy nastroj nieco dobre aj nieco zle ... 

---

### 6.2 Najväčšie prekvapenie
```
Pri zaciatku pouzivania opencode, som si skusil naprogramovat celu featuru, ktora nemala v projekte ani podobny priklad. Bol som velmi prekvapeny, kolko veci to dokazalo spravit a ako precizne to dokazalo nasledovat practices, ktore sme na projekte mali.
```
---

### 6.3 Najväčšia frustrácia
```
Stale najvacsia frustracia je configuracia :D ... Ci uz configuracia nastrojov alebo servisov, ktore sme vyuzivali. 
```

---

### 6.4 Najväčší "AHA!" moment
```
Z minulosti prave zlom, kedy som dosledne zacal poskytovat context a o kolko sa zlepsili vystupy.
```

---

### 6.5 Čo by som urobil inak
```
Na konkretnom projekte asi nic. Vedel som co robim, nastroj pozuivam dlhodobo.
```

### 6.6 Hlavný odkaz pre ostatných
```
Nesnazit sa pouzivat vsetky nastroje? Najs si kombinaciu nastrojov co ti davaju zmysel a pouzivat ich ako doplnok pri programovani. Ja mam kombinaciu opencode - cursor - kde cursor vyuzivam na tabovanie a cursor chat maximalne na nejaku pracu s commandmi gitu alebo podobne. Popripadne ChatGPT ako different opinion ak sa npuytam na nieco "filozoficke"
```
