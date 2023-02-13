import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";


configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return await listController.statistics(request);
  } else if (url.pathname === "/list" && request.method === "POST") {
    return await listController.addList(request);

  } else if (url.pathname === "/list" && request.method === "GET") {
    return await listController.viewLists(request);

  }else if ((url.pathname.match("list/[0-9]+")) && request.method === "GET") {
    return await listController.viewList(request);

  } else if ((url.pathname.match("list/[0-9]+/deactivate")) && request.method === "POST") {
    return await listController.deactiveList(request);

  }else if ((url.pathname.match("list/[0-9]+/items/[0-9]+/collect")) && request.method === "POST") {
    return await itemController.collectItem(request);
    
  }else if ((url.pathname.match("list/[0-9]+/items")) && request.method === "POST") {
    return await itemController.addItem(request);

  }else{
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });