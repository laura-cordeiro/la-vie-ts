"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PsicologoController = void 0;
const psicologos_1 = require("../models/psicologos");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const viaCep_1 = require("../externals/viaCep");
exports.PsicologoController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { senha, cep } = req.body;
                const fullAddress = yield viaCep_1.viaCepApi.getAddress(cep);
                const newSenha = bcryptjs_1.default.hashSync(senha, 10);
                const newPsicologo = yield psicologos_1.Psicologos.create(Object.assign(Object.assign({}, req.body), { senha: newSenha, bairro: fullAddress.bairro }));
                return res.status(201).json(newPsicologo);
            }
            catch (error) {
                return res.status(500).json("Algo errado aconteceu, chame o batman!");
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { senha } = req.body;
                const payloadUpdate = {};
                Object.assign(payloadUpdate, req.body);
                if (senha) {
                    const newSenha = bcryptjs_1.default.hashSync(senha, 10);
                    Object.assign(payloadUpdate, { senha: newSenha });
                }
                yield psicologos_1.Psicologos.update(payloadUpdate, {
                    where: { id }
                });
                const psicologo = yield psicologos_1.Psicologos.findByPk(id);
                return res.status(200).json(psicologo);
            }
            catch (error) {
                return res.status(500).json("Algo errado aconteceu, chame o batman!");
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // const hasAtendimentos = await Atendimentos.count({
                //   where: {
                //     psicologo_id: id,
                //   },
                // });
                // if (hasAtendimentos) {
                //   return res
                //     .status(401)
                //     .json(
                //       "Existe atendimentos associados a esse psicologo, não é possivel deletar!"
                //     );
                // }
                yield psicologos_1.Psicologos.destroy({
                    where: {
                        id
                    }
                });
                return res.sendStatus(204);
            }
            catch (error) {
                return res.status(500).json("Algo errado aconteceu, chame o batman!");
            }
        });
    },
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const psicologos = yield psicologos_1.Psicologos.findAll();
                return res.json(psicologos);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json("Algo errado aconteceu, chame o batman!");
            }
        });
    },
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const psicologo = yield psicologos_1.Psicologos.findByPk(id);
                return res.json(psicologo);
            }
            catch (error) {
                return res.status(500).json("Algo errado aconteceu, chame o batman!");
            }
        });
    }
};
