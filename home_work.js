
const Koa = require("koa")
const Router = require("koa-router")
const bodyparser = require("koa-bodyparser")



async function main() {
  let collection = [];

  const app = new Koa();
  const HTTP_PORT = 8080;

  app.use(bodyparser());

  //middleware
  app.use(async (ctx, next) => {
    console.log(ctx.method, ctx.url);
    await next();
    console.log("After business logic")//this will happen at the end
  });

  const router = new Router();

  //get all students
  router.get('/students', (ctx) => {
    ctx.status = 200;
    ctx.body = collection
  });

  //get by id
  router.get('/students/:id', (ctx) => {
    const id_to_find = ctx.params.id;
    to_find_object = collection.find(({ id }) => id == id_to_find) || null;
    console.log(ctx.params.id);
    console.log(to_find_object);
    if (to_find_object == null) {
      console.log("inside");
      ctx.status = 400;
      ctx.body = "Object with this " + id_to_find + " id not found!";
    }
    else {
      console.log("inside of success");
      ctx.status = 200;
      ctx.body = to_find_object;
    }
  });

  //create student
  router.post('/students', (ctx) => {
    let student = ctx.request.body;
    if (Object.keys(student).length == 3 && student.hasOwnProperty("name") && student.hasOwnProperty("gpa") && student.hasOwnProperty("age")) {
      ctx.status = 201;
      collection.push({
        id: collection.length + 1,
        name: student.name,
        age: student.age,
        gpa: student.gpa
      });
      ctx.body = "Your id is " + collection.length
      console.log(collection);
    }
    else {
      ctx.status = 400;
      ctx.body = "<h1>Incorrect request!</h1>";
    }
  });


  //patch student by id
  router.patch("/students/:id", (ctx) => {
    const id_to_patch = ctx.params.id;
    to_find_object = collection.find(({ id }) => id == id_to_patch) || null;
    if (to_find_object == null) {
      ctx.status = 400;
      ctx.body = "Object with this " + id_to_patch + " id not found!";
    }
    else {
      let student = ctx.request.body;
      objIndex = collection.findIndex((obj => obj.id == to_find_object.id));
      console.log(objIndex);
      console.log(student);

      //check if keys in request are valid
      for (const key in student) {
        if (!Object.keys(to_find_object).includes(key) || key == "id") {
          ctx.status = 400;
          ctx.body = "Incorrect request!";
          console.log(collection);
          return;
        }
      }
      ctx.status = 200;
      for (const key in student) {
        collection[objIndex][key] = student[key];
      }
      console.log(collection);
      ctx.body = "Your student is changed!";
    }
  });

  //delete student by id
  router.delete('/students/:id', (ctx) => {
    const id_to_delete = ctx.params.id;
    to_find_object = collection.find(({ id }) => id == id_to_delete) || null;
    if (to_find_object == null) {
      ctx.status = 400;
      ctx.body = "Object with this " + id_to_delete + " id not found!";
    }
    else {
      ctx.status = 200;
      collection = collection.filter((student) => student.id != id_to_delete);
      console.log(collection);
    }
  });

  app.use(router.routes());

  app.listen(HTTP_PORT);

}

main().catch(console.log);
