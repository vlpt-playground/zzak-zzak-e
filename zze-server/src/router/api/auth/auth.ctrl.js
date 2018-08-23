const Joi = require('joi');
const User = require('models/user');

const userSchema = Joi.object({
  username: Joi.string()
    .required()
    .min(3)
    .max(15)
    .alphanum()
    .allow(['-', '_']),
  password: Joi.string()
    .required()
    .min(6),
});

exports.register = async ctx => {
  const validated = userSchema.validate(ctx.request.body);
  if (validated.error) {
    ctx.body = {
      msg: '잘못된 데이터입니다.',
      payload: validated.error,
    };
    ctx.status = 400;
    return;
  }

  const { username, password } = ctx.request.body;

  try {
    // 아이디 존재유무 확인
    const exists = await User.findOne({
      username,
    }).exec();
    if (exists) {
      ctx.status = 409;
      ctx.body = {
        msg: '이미 존재하는 계정명입니다.',
      };
      return;
    }
    // 실제로 생성
    const user = await User.register({ username, password });
    ctx.body = user.serialize();

    const token = await user.generateToken();

    ctx.body = {
      token,
    };

    ctx.cookies.set('token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.login = async ctx => {
  const validated = userSchema.validate(ctx.request.body);
  if (validated.error) {
    ctx.body = {
      msg: '잘못된 데이터입니다.',
      payload: validated.error,
    };
    ctx.status = 400;
    return;
  }

  const { username, password } = ctx.request.body;

  try {
    // 아이디 존재유무 확인
    const user = await User.findOne({
      username,
    }).exec();
    if (!user) {
      ctx.status = 401;
      ctx.body = {
        msg: '로그인 실패',
      };
      return;
    }

    const authorized = await user.checkPassword(password);
    if (!authorized) {
      ctx.status = 401;
      ctx.body = {
        msg: '로그인 실패',
      };
      return;
    }

    const token = await user.generateToken();

    ctx.body = {
      token,
    };

    ctx.cookies.set('token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.check = ctx => {
  const { user, tokenExp } = ctx.state;
  if (!user) {
    ctx.status = 401;
    return;
  }
  ctx.body = {
    user,
    tokenExp,
  };
};

exports.refreshToken = async ctx => {
  const { user, tokenExp } = ctx.state;
  if (!user) {
    ctx.status = 401;
    return;
  }
  try {
    const u = await User.findById(user._id);
    if (!u) {
      ctx.status = 401;
      return;
    }
    const token = await u.generateToken();

    ctx.body = {
      token,
    };
    ctx.cookies.set('token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};
