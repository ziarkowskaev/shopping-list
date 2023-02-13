import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";



  const addItem = async (request) => {

    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    const formData = await request.formData();
    const name = formData.get("name");
  
    await itemService.createItem(urlParts[2],name);
  
    return requestUtils.redirectTo(`/list/${urlParts[2]}`);
  };

  

  const collectItem = async (request) => {

    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await itemService.collect(urlParts[4]);
  
    return requestUtils.redirectTo(`/list/${urlParts[2]}`);
  };
  



  export { addItem, collectItem};