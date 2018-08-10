module.exports = (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  return next();
};
