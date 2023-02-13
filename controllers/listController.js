import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};


/*
creating a list and and redirecting 
*/

const addList = async (request) => {

  const formData = await request.formData();

  const name = formData.get("name");

  await listService.create(name);

  return requestUtils.redirectTo("/list");
};

const deactiveList = async (request) => {

  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await listService.deactivate(urlParts[2]);

  return requestUtils.redirectTo("/list");
};


const viewList = async (request) => {

  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  const data = {
    list: await listService.findById(urlParts[2]),
    uncollected: await itemService.findUncollected(urlParts[2]),
    collected: await itemService.findCollected(urlParts[2])

  };

  return new Response(await renderFile("list.eta", data), responseDetails);
};



/*
showing all non completed lists
*/

const viewLists = async () => {

  const data = {
    lists: await listService.findAllActive(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

const statistics = async() => {
  
  const data = {
    lists: await listService.countLists(),
    items: await itemService.countItems(),
  };

  return new Response(await renderFile("main.eta", data), responseDetails);
};

export { addList, viewLists, deactiveList, viewList, statistics};