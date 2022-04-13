var express = require('express');
var router = express.Router();

var db = 'mongodb+srv://minhnbph16523:minhnguyen04@cluster0.mlwez.mongodb.net/wallpaper?retryWrites=true&w=majority'
const mongoose = require('mongoose');
const fs = require("fs");
mongoose.connect(db).catch(error => {
  console.log("co loi xay ra")
});

router.get('/', function(req, res, next) {
  // var array = [
  //   {id:0, name: 'Minh Nguyen 0'},
  //   {id:1, name: 'Minh Nguyen 1'},
  //   {id:2, name: 'Minh Nguyen 2'},
  //   {id:3, name: 'Minh Nguyen 3'},
  //   {id:4, name: 'Minh Nguyen 4'}
  // ]
  //
  // var number = [1,2,5,7,9,5,7,8,3,0];
  //
  // var student = { name: 'Minh', sinhNhat:'04/12', address:'Ha Noi'}
  //
  // res.render('index',
  //     {
  //       title: 'Express', name: 'MinhNB',
  //       mang: number, sinhVien: student, data: array
  //     });
  res.render('index', { title: 'Express' });
});

const imagesSchema = new mongoose.Schema({
  content:'string',
  date:'string',
  linkImg:'string'
});

const ImagesAsia = mongoose.model('images_asia',imagesSchema);
const ImagesEuro = mongoose.model('images_euro',imagesSchema);
const ImagesAmeria = mongoose.model('images_ameria',imagesSchema);

router.get('/asia',async function (req, res) {
  console.log('asia')
  var imgs = await ImagesAsia.find({});

  res.render('asia', {title: 'Asia',data: imgs});
})
router.post('/addImgAsia',async function (req, res) {
  var content = req.body.content;
  var date = req.body.date;
  var linkImg = req.body.linkImg;

  const images = new ImagesAsia({
    content: content,
    date: date,
    linkImg: linkImg,
  })

  images.save(function (error) {
    if (error) {
      res.render('asia', {message: "Them KO thanh cong !!!! " + error.message})
    } else {
      res.render('asia', {message: "Them thanh cong!!!!"})
    }
  })

  var imgs = await ImagesAsia.find({});

  res.redirect('/asia');//load lại trang
  // res.render('asia',{title : 'Thêm ảnh',data: imgs});
});
router.get('/deleteAsia', async function (req, res, next) {

  await ImagesAsia.deleteOne({_id: req.query.id})

  res.redirect('/asia');
});
//chuyen sang tab updateImgAsia
router.get('/updateAsia', async function (req, res, next) {
  var id = req.query.id;
  res.render('updateImage', {id: id});
});
//update ảnh
router.post('/updateImgAsia',async function (req, res) {

  var id_upd = req.body.id_upd;
  var content_upd = req.body.content_upd;
  var date_upd = req.body.date_upd;
  var linkImg_upd = req.body.linkImg_upd;

  console.log("Dây là ID: "+id_upd);

  const newimages = {
    content: content_upd,
    date: date_upd,
    linkImg: linkImg_upd,
  }

  await ImagesAsia.findOneAndUpdate({_id: id_upd}, newimages, function (error) {
    console.log(error)
    res.redirect('/')
  })

  res.redirect('/asia');//load lại trang
});
router.get('/viewAsia', async function (req, res, next) {
  var imgasia =  await ImagesAsia.find({_id: req.query.id})
  res.render('viewImg',{data : (imgasia[0])})
});



router.get('/euro',async function (req, res) {
  console.log('euro')
  var imgs = await ImagesEuro.find({});

  res.render('euro', {title: 'Euro', data: imgs});
})
router.post('/addImgEuro',async function (req, res) {
  var content = req.body.content;
  var date = req.body.date;
  var linkImg = req.body.linkImg;

  const images = new ImagesEuro({
    content: content,
    date: date,
    linkImg: linkImg,
  })

  images.save(function (error) {
    if (error) {
      res.render('euro', {message: "Them KO thanh cong !!!! " + error.message})
    } else {
      res.render('euro', {message: "Them thanh cong!!!!"})
    }
  })

  var imgs = await ImagesEuro.find({});

  res.redirect('/euro');//load lại trang
  // res.render('euro',{title : 'Thêm ảnh',data: imgs});
});
router.get('/deleteEuro', async function (req, res, next) {

  await ImagesEuro.deleteOne({_id: req.query.id})

  res.redirect('/euro');
});
router.get('/viewEuro', async function (req, res, next) {
  var imgeuro =  await ImagesEuro.find({_id: req.query.id})
  res.render('viewImg',{data : (imgeuro[0])})
});


//America
router.get('/america',async function (req, res) {
  console.log('America')
  var imgs = await ImagesAmeria.find({});

  res.render('america', {title: 'America',data: imgs});
})
router.post('/addImgAmerica',async function (req, res) {
  var content = req.body.content;
  var date = req.body.date;
  var linkImg = req.body.linkImg;

  const images = new ImagesAmeria({
    content: content,
    date: date,
    linkImg: linkImg,
  })

  images.save(function (error) {
    if (error) {
      res.render('america', {message: "Them KO thanh cong !!!! " + error.message})
    } else {
      res.render('america', {message: "Them thanh cong!!!!"})
    }
  })

  var imgs = await ImagesAmeria.find({});

  res.redirect('/america');//load lại trang
  // res.render('america',{title : 'Thêm ảnh',data: imgs});
});
router.get('/deleteAmerica', async function (req, res, next) {

  await ImagesAmeria.deleteOne({_id: req.query.id})

  res.redirect('/america');
});
router.get('/viewAmerica', async function (req, res, next) {
  var imgamerica =  await ImagesAmeria.find({_id: req.query.id})
  res.render('viewImg',{data : (imgamerica[0])})
});

router.get('/about',function (req,res) {
  console.log('About')
  res.render('about',{title : 'About',message:''});
})
router.post('/support', function (req,res){
  //lấy tham số
  var email = req.body.email;
  var phone = req.body.phone;
  var content = req.body.content;

  var strData = '\nEmail: '+email
                +'\nPhone: '+phone
                +'\nNội dung: '+content;

  console.log(email);
  console.log(phone);
  console.log(content);

  fs.appendFile('uploads/'+email+'.txt', strData,function (err){
    var message;
    if (err){
      message = err;
      console.log(err);
    }else {
      message = 'Upload file thành công! Location: uploads/'+email+'.txt';
    }
    res.render('about',{
      title:'About',
      message:message+'\n '+email+'\n'+phone+'\n'+content
    })
  });
});
//delete file
router.post('/delete',function (req,res){
  fs.unlink(email+'.txt',function (err){
    if (err){
      message = err;
      console.log(err);
    }else {
      message = 'Đã xóa thành công!';
      console.log(message);
    }
  });
});



module.exports = router;
