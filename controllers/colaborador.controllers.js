import { Payload } from "../heldepers/payload.js";
import { ColaboradorQueries } from "../queries/colaborador.queries.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

class ColaboradorController {
  static payload = new Payload();

  async uploadColaboradorAvatar(req, res, next) {
    try {
    const { id } = req.params;
    const file = req.file;

    const url = file.path; // Obtiene la URL generada por Cloudinary

    await ColaboradorQueries.updateColaboradorAvatar(id, url);
    res.status(200).json({ url });
    } catch (error) {
    next(error);
    }
}


  async create(req, res) {
    const body = req.body;
    console.log(body);
    const condition = body.condition;
    console.log(condition);
    const query = await ColaboradorQueries.store(body, condition);
    if (query.ok) {
      return res.status(200).json({ ok: true, data: query.data });
    } else {
      return res
        .status(403)
        .json({ ok: false, message: "Error on process request" });
    }
  }

  async find(req, res) {
    const body = req.body;
    const condition = body.condition;
    const query = await ColaboradorQueries.find(condition);
    if (query.ok) {
      return res.status(200).json({ ok: true, data: query.data });
    } else {
      return res
        .status(403)
        .json({ ok: false, message: "Error on process request" });
    }
  }

  async findid(req, res) {
    const body = req.body;
    const condition = body.condition;
    const { id } = req.params;
    const query = await ColaboradorQueries.findid(id, condition);
    // console.log(query.data.password);
    if (query.ok) {
      return res.status(200).json({ ok: true, data: query.data });
    } else {
      return res
        .status(403)
        .json({ ok: false, message: "Error on process request" });
    }
  }

  async update(req, res) {
    const body = req.body;
    const condition = body.condition;
    const { name, email, img, puesto, numberMsp, rfc, curp, place, salary, tel, lastname, hired, birth, country , direction } =
      req.body;
      // console.log(req.body.country)
    const { id } = req.params;
    const query = await ColaboradorQueries.update(
      id,
      name,
      email,
      img,
      puesto,
      numberMsp,
      rfc,
      curp,
      place,
      salary,
      hired,
      birth,
      condition,
      lastname,
      tel,
      country,
      direction,
      condition
    );
    const query2 = await ColaboradorQueries.findid(id, condition);
    if (query.ok) {
      return res.status(200).json({ query2 });
    } else {
      return res
        .status(403)
        .json({ ok: false, message: "Error on process request" });
    }
  }

  async delete(req, res) {
    const body = req.body;
    const condition = body.condition;
    const { id } = req.params;
    const query = await ColaboradorQueries.delete(id, condition);
    if (query.ok) {
      return res.status(200).json({ ok: true, data: query.data });
    } else {
      return res
        .status(403)
        .json({ ok: false, message: "Error on process request" });
    }
  }

}
export const colaboradorController = new ColaboradorController();
