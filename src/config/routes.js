import userRoutes from '../api/user'
import itemRoutes from '../api/item'

export default app => {
  app.use('/api/v1/users', userRoutes)
  app.use('/api/v1/items', itemRoutes)

  app.route('/*').get((req, res) => {
    res.status(404)
    res.render('error')
  })

  return Promise.resolve(app)
}
