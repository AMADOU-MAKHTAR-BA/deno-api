import { Application } from "@oak/oak/application";
import router from "./routers.ts";

const app = new Application();
const port = 5000;

app.use(router.routes());
app.use(router.allowedMethods());

console.log(
  `Voter serveur Deno vous attend au port : http://localhost:${port}`
);

app.listen({ port });
