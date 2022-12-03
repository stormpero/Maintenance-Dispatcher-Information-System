import {setStorage} from "./storage";
import * as orders from "./adapters/orders";
import * as clients from "./adapters/clients";
import * as auto from "./adapters/auto";

setStorage(localStorage);

export {
  orders,
  clients,
  auto
}

