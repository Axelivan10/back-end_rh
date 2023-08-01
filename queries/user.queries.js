import { UserModel } from '../models/user.model.js';
import {Op} from "sequelize" ;
import bcrypt from 'bcrypt'

class userQueries {
  
  async store(user) {
    const { firstname, secondname, imgperfil, email, password, online } = user;
    // user.password = await bcrypt.hash(password, 8)
    // console.log(user.password)
    try {
      const query = UserModel.create(user);
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
      const query = await UserModel.findByPk(id);
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

  async update(id, firstname, secondname, imgperfil, email, password, online) {
    // password = await bcrypt.hash(password, 8)

    console.log({
      firstname: firstname,
      secondname: secondname,
      imgperfil: imgperfil,
      email: email,
      password: password,
      online: online,
    });

    try {
      const query = await UserModel.update(
        {
          firstname: firstname,
          secondname: secondname,
          imgperfil: imgperfil,
          email: email,
          password: password,
          online: online,
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
      const query = await UserModel.destroy({
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
      const query = await UserModel.findAll({ where: condition });
      if (query) {
        return { ok: true, data: query };
      }
    } catch (e) {
      console.log("Error al ejecutar query", e);
      return { ok: false, data: null };
    }
  }

  async findone(condition = {}) {
    console.log("entro al findone");
    try {
      const query = await UserModel.findOne({
        where: { email: condition.email },
      });
      if (query) {
        return { ok: true, data: query };
      }
    } catch (e) {
      console.log("Error al ejecutar query", e);
      return { ok: false, data: null };
    }
  }

  async create(data) {
    try {
      const query = await MessageModel.create(data);
      if (query) {
        return { ok: true, data: query };
      } else {
        return { ok: false, data: null };
      }
    } catch (e) {
      console.log("error al ejecutar query", e);
    }
  }

  async findAll(chat_id) {
    try {
      const query = await MessageModel.findAll( {
        where: {
          [Op.or]: [
            {
              id_conversacion: chat_id,
            },
          ],
        },
      });

      if (query) {
        return { ok: true, data: query };
      } else {
        return { ok: false };
      }
    } catch (error) {
      console.log("error al-d ejeccutar query  ", error);
      return { ok: false, data: null };
    }
  }





  async findChat(id1, id2) {
    try {
      console.log("Llamada a la función findChat");
      console.log("query de chats");
      //primero checo en mensajes si existen mensajes
      console.log("buscando mensajesf  ");

      const query = await conversationModel.findOne({
        where: {
          [Op.or]: [
            { user1: id1, user2: id2 },
            { user1: id2, user2: id1 },
          ],
        },
      });

      if (query) {
        return { ok: true, data: query };
      } else {
        return { ok: false };
      }
    } catch (error) {
      console.log("error al ejecutar query DDMN  ,", error);
      return { ok: false, data: null };
    }
  }
}

export const UserQueries = new userQueries();