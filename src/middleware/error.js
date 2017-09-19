export default () => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.status || 500

      // Prevent leaking potentially sensitive error messages when libs throw in prod
      if (!(process.env.NODE_ENV === 'production' && ctx.status === 500)) {
        ctx.body = {error: err.message}
      }

      ctx.app.emit('error', err, ctx)
    }
  }
}
