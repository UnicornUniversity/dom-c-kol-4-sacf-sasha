[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Q2D1VKgn)
**Toto je základní kód k úkolu 4 z BSDE (Základy softwarového vývoje) pro distanční studium v češtině.**

Zadání úkolu je [zde](https://github.com/UnicornUniversity/BSDE-DS-Assignment4/blob/master/BSDE%202025%20Summer%20Zad%C3%A1n%C3%AD%20dom%C3%A1c%C3%AD%20%C3%BAkol%20_%20homework%20assignment%2004.pdf).

**Pro odevzdání je nutné úkol odevzdat**:

1) Kód sem na GitHub
2) Návrh algoritmu na Homework Solution
3) Na Plus4U přes tlačítko odevzdat

**Poznámky k úkolu:**
- Prosím dejte si pozor na to, že je nutné přesně dodržet strukturu ze zadání.
- Stále platí požadavky na generování náhodných osob z úkolu 3. Pokud nemáte testy pro úkol 3 zelené, tak nebudou zelené ani v úkolu 4.
- Velmi zmatečné je v tomto úkolu zaokrouhlení. V tomto ohledu:
  -   total, všechny workloads a median workload jsou celá čísla. Desetinné číslo u nich nemůže nastat.
  -   medianAge, minAge a maxAge jsou zaokrouhleny na celá čísla.
  -   averageAge je zaokrouhlený právě na 1 desetinné číslo
  -   averageWomenWorkload může být zaokrouhlený na 1 desetinné číslo nebo na celé číslo - obě možnosti jsou povolené
- **Stále je nutné pracovat s věkem jako s desetinným číslem**. Jinak vám to nevyjde.
- Dejte si pozor, abyste při řazení **řadili dle numerické hodnoty** a nikoliv abecedně. 

**Jak postupovat v úkolu:**
1) Editujete hlavně soubor main.js.
2) Úkol musí obsahovat generateEmployeeData(dtoIn) (main z minulého úkolu 3), getEmployeeStatistics(employees) (jádro tohoto úkolu 4) a být spouštěn fukncí main(dtoIn).
3) Je výrazně doporučeno úkol rozdělit do více podfunkcí, aby se zabránilo nepřehlednosti kódu. Ta je také bodována.
4) Pokud chcete, můžete importovat funkce z jiných souborů (naznačeno na druhém řádku). Použijte pro to složku src.
5) Kód je automaticky otestován po každé operaci Push. Pokud chcete, můžete si spustit testování lokálně - je třeba pro to nainstalovat NPM. Následně v příkazovém řádku ve složce projektu nainstalujete moduly přes "npm install" a spustíte testování přes "npm test".
6) Přepisování testů a nebo způsobu spouštění aplikace (složka test, .git nebo soubor package.json) není povoleno. Pokud k tomu dojde, neznamená to, že úkol nebude hodnocen. Ale přiděláte mi tím práci.
