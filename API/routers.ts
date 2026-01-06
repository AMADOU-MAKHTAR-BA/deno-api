import { Router } from "@oak/oak/router";
import {
  createCharacter,
  deleteChracter,
  getAllCharacters,
  getCharacter,
  updateCharacter,
} from "./characters.ts";
const router = new Router();

router.get("/characters", getAllCharacters);
router.get("/characters/:id", getCharacter);
router.post("/characters/:id", createCharacter);
router.put("/characters/:id", updateCharacter);
router.delete("/characters/:id", deleteChracter);
export default router;
