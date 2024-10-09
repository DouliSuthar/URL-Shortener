const express = require('express')
const router = express.Router()
const ShortURL = require('../models/urlSchema')

router.get('/', async (req, res) => {
    try {
        const shorturls = await ShortURL.find();  // Fetch all short URLs
        res.render('index', { shorturls: shorturls });  // Render the EJS template
    } catch (err) {
        console.error(err);
        res.sendStatus(500);  // Handle errors gracefully
    }
});
router.post('/shortUrls',async(req,res)=>{
    
    const url = req.body.full
    const newShortURL = new ShortURL({
        full: url
    })
    await newShortURL.save()
    console.log('Short URL Created', newShortURL);
    res.redirect('/')
})
//post end
//view data
// Using $inc operator for better performance
router.get('/:shortUrl', async (req, res) => {
    try {
        const shortUrl = await ShortURL.findOneAndUpdate(
            { short: req.params.shortUrl },  // Find the document with the matching short URL
            { $inc: { clicks: 1 } },         // Increment the click count by 1
            { new: true }                    // Return the updated document
        );
        
        if (shortUrl == null) {
            return res.sendStatus(404);  // If the short URL is not found, return a 404 error
        }

        res.redirect(shortUrl.full);  // Redirect to the full URL
    } catch (err) {
        console.error(err);
        res.sendStatus(500);  // Handle any errors by returning a 500 Internal Server Error
    }
});

router.get('/delete/:id',async(req,res)=>{
    const id = req.params.id

    try{
        await ShortURL.deleteOne({ _id : id})
        console.log('delete');
        res.redirect('/')
    }catch(err){
        console.log(err);
    }
    res.send(id)
})

module.exports = router