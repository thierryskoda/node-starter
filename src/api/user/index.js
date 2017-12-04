import {Router} from 'express'

import * as user from './user.controller'
import * as auth from '../../auth/auth.service'

const router = new Router()

router.get('/', user.index)

export default router
