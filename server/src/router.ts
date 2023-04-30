import express from "express";
import { getAllServerTypes } from './controllers/server-types.controller';
import { addServer, deleteServer, getAllServers, toggleServer } from './controllers/server.controller';
import { getCurrencies, getRates } from "./controllers/currencies.controller"
export const router = express.Router();

router.get("/currencies/list/:currencies", getCurrencies);
router.get("/currencies/rates/:currencies", getRates);
router.get("/types", getAllServerTypes);
router.post('', addServer);
router.get('', getAllServers);
router.delete('/:id', deleteServer);
router.patch("/:id", toggleServer);

