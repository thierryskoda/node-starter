export default app => {
  app.use('/api/user', require('../api/user'))

  // All other routes should redirect to the index.html
  app.route('/*').get((req, res) => {
    res.status(404)
    res.render('error')
  })

  return Promise.resolve(app)
}
