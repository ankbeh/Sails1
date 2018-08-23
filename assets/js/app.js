$(document).ready( () => {
  $('.delete-blog').click( (e) => {
    e.preventDefault();
    $target = $(e.target);
    const id =$target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/blog/delete/'+ id,
      success: function(response) {
        location.reload(true);
      },
      error: function(err) {
        console.log(err);
      }
    })
  })
});
