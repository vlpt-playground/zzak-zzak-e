module.exports = (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', ctx.origin);
  return next();
}