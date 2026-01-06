// const myReadFile = await Deno.open("text.txt");
// await Deno.copy(myReadFile , Deno.stdout);
// myReadFile.close();


//La nouvelle maniere de faire les choses
const myReadFileContaint =await Deno.readTextFile("text.txt");
console.log(myReadFileContaint);
