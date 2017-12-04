import {Router} from 'express'

import * as item from './item.controller'
import * as auth from '../../auth/auth.service'

const router = new Router()

router.get('/', item.index)
router.post('/', item.create)
router.delete('/:todoId', item.remove)

export default router
