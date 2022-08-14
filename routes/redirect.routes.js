import { Router } from "express";
import Link from "../models/Link.js";

const router3 = new Router();

router3.get('/:code', async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code })
    if (link) {
      link.clicks++ //кол-во кликов
      await link.save()
      return res.redirect(link.from)
    }
    res.status(404).json('Link was not found')
  } catch (e) {
    res.status(500).json({ message: 'Smth went wrong' })
  }
})


export default router3;