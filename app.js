const express = require('express');
const path = require('path');
const morgan = require('morgan');
const hbs = require("hbs");
// const { connect } = require('./db/db');
const sessions = require('express-session');
const MongoStore = require('connect-mongo');

const indexRouter = require('./routes/indexRouter');

// connect()


const app = express();
const PORT = 3000;


const secretKey = '1234567'


app.set('cookieName', 'userCookie')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(sessions({
  name: app.get('cookieName'),
  secret: secretKey,
  resave: false, // Не сохранять сессию, если мы ее не изменим
  saveUnitialized: false, // не сохраняет пустую сессию
  store: MongoStore.create({ // выбираем в качестве хранилища mongoDB
    mongoUrl: 'mongodb://localhost:27017/avito'
  }),
  cookie: { // настройки, необходимые для корректного работы cookie
    httpOnly: true, // не разрещаем модифицировать данную cookie через javascript
    maxAge: 86400 * 1e3 // устанавливаем время жизни cookie
  }
}))


app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
})
