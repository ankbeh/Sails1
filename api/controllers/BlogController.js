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
  // index: async (req, res) => {
  //   //let params = req.allParams();
  //   //await Blog.find(params).exec( (err, blogs) => {
  //     await Blog.find().exec( (err, blogs) => {
  //     // If blog dosent exists
  //     if (err) return res.view("/500", {
  //       title : "500",
  //       message: "Requested Resource is not avaliable",
  //       err: err.message
  //     })
  //     res.view("pages/blog/blogs", {
  //       title: 'Blogs',
  //       blogs: blogs
  //     });
  //   //find end
  //   });
  // },
  //'get /blog/new'
  new: async (req, res) => {

    res.view("pages/blog/new", {title: 'New Blog'});

  },
  //'post /blog/create'
  create: async (req, res) => {
    let params = req.allParams();
    await Blog.create(params).exec( (err, blog) => {
      if (err) return res.serverError(err);
      res.status(201);
      return res.redirect("/blogs")
    });
  },
  //'get /blog/edit/:id? || get/blogs || get /blog/search'
  find: async (req, res) => {
    let id = req.param('id');
    var idShortCut = isShortcut(id);
    if (idShortCut == true) {
      return next();
    }
    if (id) {
      await Blog.findOne(id).exec( (err, blog) => {
        if(blog === undefined) return res.notFound("The item you are searching for dosen't exists.");
        if (err) return res.serverError(err);
        //if the request url contais "edit" goto edit page else got to show page
        if (req.url.indexOf("edit") > -1 ) {
          console.log("editing")
          return res.view("pages/blog/edit", {
            title: "Edit Blog",
            blog: blog
          });
        } else {
          console.log("found");
          return res.view("pages/blog/view", {
            title: blog.title,
            blog: blog
          });
        }
      });
    } else  {
      let search = req.param('search');

      if(_.isString(search) ) {
        search = JSON.parse(search);
      }
      let options = {
        title: req.param('title') || undefined,
        content: req.param('content') || undefined,
        search: search || undefined
      };
      await Blog.find(options).exec( (err, blogs) => {
        if(blogs === undefined) return res.notFound("The item or items you are searching for dosen't exists.");
        if (err) return res.serverError(err);

        res.view("pages/blog/blogs", {
          title: "Blogs",
          blogs : blogs
        });
      });
    }
    function isShortcut(id) {
      if (id === 'find' || id === ' update' || id === 'create' || id === 'destroy') {
        return true;
      }
    }
  },
  //'get /blog/update/:id?'
  update: async (req, res) => {
    var criteria = {};
    criteria = _.merge({}, req.allParams(), req.body);
    let id = req.param('id');

    if (!id) {
      return res.badRequest("No ID Provied.")
    }

    await Blog.update(id, criteria).exec( (err, blog) => {
      //if(blog.length === 0) return res.notFound("Resource not found");
      if(err) return serverError(err);
      res.json(blog);
      return res.redirect("/blogs");
    });
  },
  destroy: async (req, res) => {
    id = req.param('id');
    if(!id) return res.badRequest("No Id Provided");

    await Blog.findOne(id).exec( (err, blog) => {
      if (err) return res.serverError(err);
      if (!blog) return res.notFound("The data dosent exists");

      Blog.destroy(id).exec( (err) => {
        if (err) return res.serverError(err);
        return res.redirect("/");
      });
    });
  },
};
