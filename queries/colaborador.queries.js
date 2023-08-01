import { ColaboradorModel } from '../models/colaborador.model.js';
import {Op} from "sequelize" ;
import bcrypt from 'bcrypt'

class colaboradorQueries {

  async updateColaboradorAvatar(id, img) {
    try {
      const updatedColaborador = await ColaboradorModel.update(
        { img: img },
        { where: { id: id } }
      );
      return updatedColaborador;
    } catch (error) {
      throw new Error(error.message);
    }
}

  async store(user) {
    try {
      const query = ColaboradorModel.create(user);
      if (query) {
        return { ok: true, data: query };
      }
    } catch (e) {
      console.log("Error al ejecutar query", e);
      return { ok: false, date: null };
    }
  }
  

  async findid(id) {
    try {
      const query = await ColaboradorModel.findByPk(id);
      if (query) {
        return { ok: true, data: query };
      } else {
        return { ok: false, data: null };
      }
    } catch (e) {
      console.log("Error al ejecutar query", e);
      return { ok: false, data: null };
    }
  }

  async update(id, name, email, img, puesto, numberMsp, rfc, curp, place, salary, hired, birth,tel, lastname, /*country, direction*/) {
    // password = await bcrypt.hash(password, 8)
    try {
      const query = await ColaboradorModel.update(
        {
            id:id,
            name: name,
            email: email,
            img: img,
            puesto: puesto,
            numberMsp: numberMsp,
            rfc: rfc,
            curp: curp,
            place: place,
            salary: salary,
            hired: hired,
            birth: birth,
            tel: tel,
            lastname: lastname,
            // country: country,
            // direction: direction
        },
        {
          where: {
            id: id,
          },
        }
      );
      if (query) {
        return { ok: true, data: query };
      } else {
        return { ok: false, data: null };
      }
    } catch (e) {
      console.log("Error al ejecutar query", e);
      return { ok: false, data: null };
    }
  }

  async delete(id) {
    try {
      const query = await ColaboradorModel.destroy({
        where: {
          id: id,
        },
      });
      if (query) {
        return { ok: true, data: query };
      } else {
        return { ok: false, data: null };
      }
    } catch (e) {
      console.log("Error al ejecutar query", e);
      return { ok: false, data: null };
    }
  }

  async find(condition = {}) {
    try {
      const query = await ColaboradorModel.findAll({ where: condition });
      if (query) {
        return { ok: true, data: query };
      }
    } catch (e) {
      console.log("Error al ejecutar query", e);
      return { ok: false, data: null };
    }
  }
 
}

export const ColaboradorQueries = new colaboradorQueries();