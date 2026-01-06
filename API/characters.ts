import { Context, RouterContext } from "@oak/oak";
interface TypeMyCharacters {
    id: string | undefined;
    name: string;
    world: string;
  }
const myCharacters: TypeMyCharacters[] = [
  { id: "1", name: "AIZEN", world: "Bleach" },
  { id: "2", name: "LUFFY", world: "One Piece" },
  { id: "3", name: "LELOUCH", world: "Code Geass" },
  { id: "4", name: "VEGETA", world: "Dragon Ball" },
  { id: "5", name: "ITACHI", world: "Naruto" },
];

// @desc Get all characters
// @route GET /characters
const getAllCharacters = (ctx: Context) => {
  const { response } = ctx;
  if (!myCharacters) {
    response.status = 404;
    response.body = {
      success: false,
      msg: "la liste de vos personnages est introuvable",
    };
    return;
  }
  response.status = 200;
  response.body = {
    success: true,
    data: myCharacters,
  };
};

// @desc Get a cahracter
//@route GET /characters/:id
const getCharacter = (ctx: RouterContext<"/characters/:id">) => {
  const { params, response } = ctx;
  const CharacterId = params.id;
  const index = myCharacters.findIndex(
    (character) => character.id === CharacterId
  );
  if (index === -1) {
    response.status = 404;
    response.body = {
      success: false,
      msg: "On a trouve aucun personnage ayant l'id que vous avez fourni",
    };
    return;
  }
  const myCharacter = myCharacters[index];
  response.status = 200;
  response.body = {
    success: true,
    data: myCharacter,
  };
};

// @desc Create a character
// @route POST /characters/:id

const createCharacter = async (ctx: RouterContext<"/characters/:id">) => {
  const { request, params, response } = ctx;
  if (!request.body) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "Votre requete ne peut aboutir",
    };
    return;
  }
  try {
    const characterId = params.id;
    const index = myCharacters.findIndex(
      (character) => character.id === characterId
    );
    if (index !== -1) {
      response.status = 409;
      response.body = {
        success: false,
        msg: "Il existe deja un personnage possedant cet id",
      };
      return;
    }
    const dataCharacter: TypeMyCharacters = await request.body.json();
    dataCharacter.id = params.id;
    if (!dataCharacter.name || !dataCharacter.world) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "Certaines informations indispensables a la creation du personnage n'ont pas ete fourni",
      };
      return;
    }
    myCharacters.push(dataCharacter);
    response.status = 201;
    response.body = {
      success: true,
      data: myCharacters,
    };
  } catch (error) {
    console.error(error);
    response.status = 400;
    response.body = {
      success: false,
      msg: "Veillez tout d'abord donner les informations pour la creation de votre personnage",
    };
  }
};

// @desc Update a character
// @route PUT /characters/:id
const updateCharacter = async (ctx: RouterContext<"/characters/:id">) => {
  const { request, params, response } = ctx;

  if (!request.body) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "Votre requete est invalide",
    };
    return;
  }
  try {
    const characterId = params.id;
    const index = myCharacters.findIndex(
      (character) => character.id === characterId
    );

    if (index === -1) {
      response.status = 404;
      response.body = {
        success: false,
        msg: "Aucun personnage ne possede l'id fournit . Pour modifier un personnage , veillez fournir un id valide",
      };
      return;
    }
    const dataUpdate: { id: string; name?: string; world?: string } =
      await request.body.json();
    myCharacters[index] = {
      ...myCharacters[index],
      ...dataUpdate,
    };

    response.status = 200;
    response.body = {
      success: true,
      data: myCharacters,
    };
  } catch (error) {
    console.error(error);
    response.status = 400;
    response.body = {
      success: false,
      msg: "Votre requete est invalide",
    };
  }
};

// @desc delete a character
// @route DELETE /characters/:id
const deleteChracter = (ctx: RouterContext<"/characters/:id">) => {
  const { params, response } = ctx;
  const characterId = params.id;
  const index = myCharacters.findIndex(
    (character) => character.id === characterId
  );
  if (index === -1) {
    response.status = 404;
    response.body = {
      success: false,
      msg: "aucun personnage possedant l'id fournit n'a ete trouve . Pour supprimer un personnage , veillez fournir un id valide",
    };
    return;
  }
  myCharacters.splice(index, 1);
  response.status = 200;
  response.body = {
    success: true,
    data: myCharacters,
  };
};
export {
  getAllCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteChracter,
};

//   deno run --allow-net --watch .\API\server.ts
