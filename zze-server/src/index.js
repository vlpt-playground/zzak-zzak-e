require('dotenv').load();
const Koa = require('koa');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const cors = require('./lib/cors');

const router = require('./router');

const { PORT: port } = process.env;

// MongoDB 연결
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch(e => {
    console.log(e);
  });
mongoose.set('debug', true);

const app = new Koa();

app.use(cors);
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.proxy = true;

app.listen(port || 8080, () => {
  console.log('Server is listening to port %d', port || 8080);
});
