/**
 * BlogController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
// var defulat = function(req, res, next){
// var id = req.param('id');
// var title = req.param('title');
// var details = req.param('details');
// var params = {id: id, title: title, details: details};
// var p1 = blog || blogs;
// var noId = function(id, err) {
//   if (!id) return res.view("/500", {
//     title: "500",
//     message: "Request invalid",
//     err: err.message
//   });
// };
// var noBlog = function(p1, err) {
//   if (!blog) return res.view("/404", {
//     title : "404",
//     message: "Requested Resource is not avaliable",
//     err: err.message
//   });
// }
// var otherError = function(err) {
//   if(err) throw console.log(err); return;
// }
// };

module.exports = {
  //'get /blogs'
  index: (req, res) => {
    let params = req.allParams();
    Blog.find(params).exec( (err, blogs) => {
      // If blog dosent exists
      if (err) return res.view("/500", {
        title : "500",
        message: "Requested Resource is not avaliable",
        err: err.message
      })
      res.view("pages/blog/blogs", {
        title: 'Blogs',
        blogs: blogs
      });
    //find end
    });
  },
  //'get /blog/new'
  new: (req, res) => {

    res.view("pages/blog/new", {title: 'New Blog'});

  },
  //'post /blog/create'
  create: (req, res) => {
    let params = req.allParams();
    Blog.create(params).exec( (err, blog) => {
    res.redirect("/blogs")
    });
  },
  //'get /blog/edit/:id?'
  read1: (req, res) => {

  },
  //'get /blog/update/:id?'
  update: (req, res) => {

  },
  destroy: (req, res) => {

  },

};
