const express=require('express')
const search=require('../controller/search')
const router=express.Router()
router.get('/search=:pd',search.Search)
router.get('/type/search=:pd&type=:ty',search.SearchType)
router.get('/setype/:ty',search.Searchty)
module.exports=router