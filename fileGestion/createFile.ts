//Cette maniere est aujourd'hui consideree comme encienne
const encoder = new TextEncoder();
const contenuFile = encoder.encode(
  "Hi tu viens de creer ton premier fichier avec deno js BRAVO"
);
await Deno.writeFile("text.txt", contenuFile);

//La manire moderne et conseillee edt
await Deno.writeTextFile(
  "text.txt",
  "Voici la maniere moderne d'ecrire sur un fichier est ce que tu l'a vraiement compris"
);
