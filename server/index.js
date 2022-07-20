const express = require('express');
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const User = require('./Database/Userschema');
const Que_ans = require('./Database/Questionschema');
const jwtkey = 'e-commerce';
const PORT = process.env.PORT || 4001;
const PortalURL = 'http://localhost:3001';
require('./Database/MongoConnect');
require('./Passport/googleauth');
const app = express();
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// =======================Home===================
app.get('/', async (req, resp) => {
  resp.send("Algo viz Home page");
})
// =========================== verifying JWT Token as Middleware==========
const verifyingJWT = (req, resp, next) => {
  const token = req.headers['authorization'];
  jwt.verify(token, jwtkey, (err, valid) => {
    if (err) {
      resp.status(401).send({ Error: err.message + ", Please login again." })
    }
    else {
      req.body.userid = valid.user._id;
      req.body.name = valid.user.name;
      next();
    }
  })
}

// ================================Google Authentication===================

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login/failure' }), async (req, resp) => {
    const user = req.user
    jwt.sign({ user }, jwtkey, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) }, (err, token) => {
      if (err) {
        resp.redirect(PortalURL + `/login?Error=${err.message}`)
      }
      resp.redirect(PortalURL + `/Authenticate?auth=${token}&name=${req.user.name}&email=${req.user.email}&avatar=${req.user.avatar}`)
    })
  }
);

// -----------------------------------------------------------
// ==================Checking User login with google ================
app.get('/login/failure', (req, resp) => {
  resp.status(401).send('Login failed')
})


// ================================== Sign up====================
app.post('/signup', async (req, resp) => {
  const data = new User(req.body);
  await data.save().then((result) => {
    let user = result.toObject();
    delete user.password;
    jwt.sign({ user }, jwtkey, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) }, (err, token) => {
      if (err) {
        resp.status(401).send({ Error: 'Something went wrong, please try again.' })
      }
      resp.status(200).send({ user, auth: token, Error: false })
    })
  })
    .catch(err => {
      resp.status(403).send({ Error: "Email id is already exist, please login." })
    });
})
// ================================== Login====================
app.post('/login', async (req, resp) => {
  let Email = req.body.email;
  let Password = req.body.password;
  const method = await User.findOne({ email: Email }, { registration_type: 1 });
  if (method) {
    if (method.registration_type == 'Local') {
      const user = await User.findOne({ $and: [{ email: Email }, { password: Password }] }, { name: 1, email: 1, avatar: 1 });
      if (user) {
        jwt.sign({ user }, jwtkey, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) }, (err, token) => {
          if (err) {
            resp.status(401).send({ Error: 'Something went wrong.' })
          }
          resp.status(200).send({ user, auth: token, Error: false })
        })
      }
      else {
        resp.status(401).send({ Error: 'Email or password is wrong.' })
      }

    }
    else {
      resp.status(401).send({ Error: "Please choose 'Continue with Google option' because you already register with Google Account" })
    }
  }
  else {
    resp.status(401).send({ Error: 'You are a new Member, please Sign Up.' })

  }
})
// ============================ Question Post/ Ask a question======================
app.post('/postquestion', verifyingJWT, async (req, resp) => {
  const que = new Que_ans(req.body);
  await que.save().then((result) => {
    resp.send({ Message: "Successfully posted" })
  }).catch(err => {
    resp.send({Error:"Failed to post Question"})
  })
})

//======================== Geeting all Questions===========================
app.post('/allquestion',async(req,resp)=>{
  const pagename=req.body.pagename;
  await Que_ans.find({pagename:pagename})
  .then((result)=>{
    resp.send({data:result})
  }).catch(err=>{
    resp.send({Error:err.message})
  })
}) 

// ==================== Reply / Answer post=============================
app.post('/postreply', verifyingJWT, async (req, resp) => {
  const queid = req.body.queid;
  const userid = req.body.userid;
  const username = req.body.name;
  const answer = req.body.reply;
  console.log(answer,username)
  if(answer && username){
  await Que_ans.findOne({ _id: queid }, { _id: 0, answer: 1 })
    .then(async (result) => {
      let oldreply = result.answer;
      if (oldreply) {
        let index = Object.keys(oldreply).length + 1;
        oldreply[index] = {
          ans_userid: userid,
          ans_name: username,
          reply: answer
        }
      }
      else {
        oldreply = {
          1: {
            ans_userid: userid,
            ans_name: username,
            reply: answer
          }
        }
      }
       await Que_ans.updateOne({ _id: queid }, { $set: { answer: oldreply } })
        .then(result => {
          if (result.acknowledged) {
            resp.send({ Message: "Successfull" })
          }
          else {
            resp.send({ Error: "Failed to post" })
          }
        }).catch(err => {
          resp.status(401).send({ Error: "Error will posting reply" });
        })
    }).catch(err => {
      resp.status(401).send({ Error: "Something went wrong, please try again" });
    });
  }
  else{
  resp.send({Error:"Please fill the answer."})

  }
})

// ========================================= Logout ===========
app.get('/logout', (req, resp) => {
  req.logout(() => {
    console.log('Logged out !!')
  });
  resp.status(200).send('Successfully logout');
})

app.listen(PORT);