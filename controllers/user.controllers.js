import { Payload } from "../heldepers/payload.js";
import { UserQueries } from "../queries/user.queries.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

class UserController {
  static payload = new Payload();

  async sayHello(request, response) {
    return response.status(200).json({
      ok: true,
      message: "Hello",
    });
  }

  async processData(request, response) {
    const body = request.body;
    console.log("data from front", body);
    return response.status(403).json({
      ok: true,
      message: "data received",
    });
  }

  async ejecutartest(request, response) {
    return response.status(200).json({
      ok: true,
      message: "Hello",
    });
  }

  async create(req, res) {
    const { password } = req.body;
    const body = req.body;
    console.log(body);
    const condition = body.condition;
    console.log(condition);
    const query = await UserQueries.store(body, condition);
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
    const query = await UserQueries.find(condition);
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
    const query = await UserQueries.findid(id, condition);
    console.log(query.data.password);
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
    const { firstname, secondname, imgperfil, email, password, online } =
      req.body;
    const { id } = req.params;
    const query = await UserQueries.update(
      id,
      firstname,
      secondname,
      imgperfil,
      email,
      password,
      online,
      condition
    );
    const query2 = await UserQueries.findid(id, condition);
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
    const query = await UserQueries.delete(id, condition);
    if (query.ok) {
      return res.status(200).json({ ok: true, data: query.data });
    } else {
      return res
        .status(403)
        .json({ ok: false, message: "Error on process request" });
    }
  }

  async login(req, res) {
    const body = req.body;
    const query = await UserQueries.findone({
      email: body.email,
      password: body.password,
    });
    try {
      console.log(body.password, query.data.password);
      // const match = await bcrypt.compare(body.password, query.data.password );
      // console.log(match)

      if (body.password == query.data.password) {
        try {
          const token = UserController.payload.createToken(query.data);
          return res.status(200).send({
            ok: true,
            token: token,
            data: query.data,
          });
        } catch (error) {
          return res.status(400).json({
            ok: false,
            data: error,
          });
        }
      } else {
        return res.status(400).json({
          ok: false,
          data: null,
        });
      }
    } catch (error) {
      return res.status(400).json({
        ok: false,
        data: error,
      });
    }
  }

  // async sendTelegramMessage(req, res){
  //     console.log(req.body)
  //     console.log('sendTelegramMessage', req.body);
  //     console.log('bot token', process.env.BOT_TOKEN);
  //     const body = req.body;
  //     const message = body.message;

  //     try{
  //         const bot = new Telegraf(process.env.BOT_TOKEN);
  //         console.log('bot',bot)

  //         await bot.telegram.sendMessage(2046589024, message);
  //         return res.status(200).send({
  //             ok:true,
  //             data:null
  //         });
  //     }catch(e){
  //         console.log('error on telegram bot', e)
  //         return res.status(400).send({
  //             ok:false,
  //             data:null
  //         });
  //     }
  // }

  // async findMessages(request, response) {
  //     const body = request.body;
  //     const sender = body.sender;
  //     const receiver = body.receiver;
  //     const uuid = uuidv4();

  //     console.log('ids', sender, receiver);

  //     const fromSender = await conversationModel.findOne({ where: { from_id: sender, to_id: receiver } });
  //     const fromReceiver = await conversationModel.findOne({ where: { from_id: receiver, to_id: sender  } });
  //     let msgs = null;

  //     // console.log('from sender', fromSender);
  //     // console.log('from receiver', fromReceiver);

  //     if(fromSender === null && fromReceiver !== null) {
  //         const conv = await conversationModel.create({from_id: sender, to_id: receiver, uuid: fromReceiver.uuid });
  //         const msgs = await MessageModel.findAll({ where: { conversation_uuid: conv.uuid } });
  //         return response.status(200).json({ ok: true, data: msgs, uuid: conv.uuid });
  //     } else if ( fromReceiver === null && fromSender !== null ) {
  //         const conv = await conversationModel.create({from_id: sender, to_id: receiver, uuid: fromSender.uuid });
  //         const msgs = await MessageModel.findAll({ where: { conversation_uuid: conv.uuid } });
  //         return response.status(200).json({ ok: true, data: msgs, uuid: conv.uuid });
  //     } else if(fromSender === null && fromReceiver === null) {
  //         const conv = await conversationModel.create({from_id: sender, to_id: receiver, uuid: uuid });
  //         return response.status(200).json({ ok: true, data: null });
  //     } else if(fromReceiver !== null && fromSender !== null) {
  //         const msgs = await MessageModel.findAll({ where: { conversation_uuid: fromSender.uuid } });
  //         return response.status(200).json({ ok: true, data: msgs, uuid: fromSender.uuid });
  //     }
  // }

  async createMessages(request, response) {
    const body = request.body;
    console.log(body);
    const query = await UserQueries.create(body);

    if (query) {
      return response.status(200).json({ ok: true, data: query });
    } else {
      return response.status(403).json({ ok: false, data: null });
    }
  }

  async findChat(request, response) {
    const user1 = request.params.id1;
    const user2 = request.params.id2;

    const query = await UserQueries.findChat(user1, user2);

    if (query.ok) {
      const query2 = await UserQueries.findAll(query.data.id);

      if (query2.ok) {
        return response
          .status(200)
          .json({
            ok: true,
            data: query2.data,
            id_conversacion: query.data.id,
          });
      } else {
        return response.status(200).json({ ok: true, data: query.data.id });
      }
    } else {
      await UserQueries.create(user1, user2);
    }
  }

  // async      findMessages    (request,  response ) {
  //     const  body =  request.body
  //     console.log (body  )
  //     const query =  await MessageModel.find  ()
  //     if (query.ok) {
  //         return response.status(200).json({ ok:  true, data: query.data   })
  //     } else  {
  //         return  response.status(403).json({ok: false, data: null,message: "No se  encontro   datof" })
  //     }
  // }

  //     async createMessages (  request ,response) {
  //         const body =  request.body  ;
  //        console.log(body)
  //           const query = await MessagesQueries .create(body);

  //          if (query ) {
  //            return response.status(200).json({ok: true,  data: query }  )

  //             }else {
  //             return response.status(403).json({ok: false, data: null})
  //           }
  //    }

  //    async      findMessages    (request,  response ) {
  //     const  body =  request.  body
  //     console.log (body  )
  //     const query =  await MessagesQueries .find  ()
  //     if (query.ok) {
  //         return response.status(200).json({ ok:  true, data: query.data   })
  //     } else  {
  //         return  response.status(403).json({ok: false, data: null,message: "No se  encontro   d  atof" })
  //     }
  // }
}
export const userController = new UserController();
