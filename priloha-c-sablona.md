# AI Workflow Dokumentácia

**Meno:** Samuel Elsner

**Dátum začiatku:** Mon Dec 15 2025

**Dátum dokončenia:** 

**Zadanie:** Frontend

---

## 1. Použité AI Nástroje

Vyplň približný čas strávený s každým nástrojom:

- [ ] **Cursor IDE:** _____ hodín
- [ ] **Opencode:** _____ hodín  

**Celkový čas vývoja (priližne):** _____ hodín

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

**Výsledok:**  

**Úpravy:**
```
```

**Poznámky:**
```
```

---

## 3. Problémy a Riešenia 

> 💡 **Tip:** Problémy sú cenné! Ukazujú ako riešiš problémy s AI.

### Problém #1: _________________________________

**Čo sa stalo:**
```
[Detailný popis problému - čo nefungovalo? Aká bola chyba?]
```

**Prečo to vzniklo:**
```
[Tvoja analýza - prečo AI toto vygeneroval? Čo bolo v prompte zlé?]
```

**Ako som to vyriešil:**
```
[Krok za krokom - čo si urobil? Upravil prompt? Prepísal kód? Použil iný nástroj?]
```

**Čo som sa naučil:**
```
[Konkrétny learning pre budúcnosť - čo budeš robiť inak?]
```

**Screenshot / Kód:** [ ] Priložený

---

### Problém #2: _________________________________

**Čo sa stalo:**
```
```

**Prečo:**
```
```

**Riešenie:**
```
```

**Learning:**
```
```

## 4. Kľúčové Poznatky

### 4.1 Čo fungovalo výborne

**1.** 
```
[Príklad: Claude Code pre OAuth - fungoval first try, zero problémov]
```

**2.** 
```
```

**3.** 
```
```

**[ Pridaj viac ak chceš ]**

---

### 4.2 Čo bolo náročné

**1.** 
```
[Príklad: Figma MCP spacing - často o 4-8px vedľa, musel som manuálne opravovať]
```

**2.** 
```
```

**3.** 
```
```

---

### 4.3 Best Practices ktoré som objavil

**1.** 
```
[Príklad: Vždy špecifikuj verziu knižnice v prompte - "NextAuth.js v5"]
```

**2.** 
```
```

**3.** 
```
```

**4.** 
```
```

**5.** 
```
```

---

### 4.4 Moje Top 3 Tipy Pre Ostatných

**Tip #1:**
```
[Konkrétny, actionable tip]
```

**Tip #2:**
```
```

**Tip #3:**
```
```

---

## 6. Reflexia a Závery

### 6.1 Efektivita AI nástrojov

**Ktorý nástroj bol najužitočnejší?** _________________________________

**Prečo?**
```
```

**Ktorý nástroj bol najmenej užitočný?** _________________________________

**Prečo?**
```
```

---

### 6.2 Najväčšie prekvapenie
```
[Čo ťa najviac prekvapilo pri práci s AI?]
```

---

### 6.3 Najväčšia frustrácia
```
[Čo bolo najfrustrujúcejšie?]
```

---

### 6.4 Najväčší "AHA!" moment
```
[Kedy ti došlo niečo dôležité o AI alebo o developmente?]
```

---

### 6.5 Čo by som urobil inak
```
[Keby si začínal znova, čo by si zmenil?]
```

### 6.6 Hlavný odkaz pre ostatných
```
[Keby si mal povedať jednu vec kolegom o AI development, čo by to bylo?]
```
