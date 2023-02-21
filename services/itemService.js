import { sql } from "../database/database.js";

const createItem = async (listId, name) => {
  await sql`INSERT INTO
    shopping_list_items (shopping_list_id, name)
    VALUES (${listId}, ${name})`;
};


const findUncollected= async (listId) => {
  const rows = await sql`SELECT * FROM shopping_list_items
    WHERE shopping_list_id = ${ listId } AND collected = FALSE ORDER BY name`;

  return rows;
};

const findCollected = async (listId) => {
    const rows = await sql`SELECT * FROM shopping_list_items
    WHERE shopping_list_id = ${ listId } AND collected = TRUE ORDER BY name`;

  return rows;

}

const countItems = async() => {
  const rows = await sql`SELECT COUNT(*) AS count FROM shopping_list_items`;
  return rows[0].count;
};



const collect = async (itemId) => {
  await sql`UPDATE shopping_list_items
    SET collected = TRUE WHERE id = ${ itemId }`;
};




export { createItem, collect, findCollected, findUncollected,countItems };