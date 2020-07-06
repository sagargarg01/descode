// {






// // i don't think creating post as ajax is a good idea , its not
// // we will see about that in future









//     //method to submit the form data for new post using AJAX
//     let createPost = function () {
//         let newPostform = $('#new-post-form');

//         newPostform.submit(function (e) {
//             e.preventDefault();

//             $.ajax({
//                 type: 'post',
//                 url: '/posts/create',
//                 data: newPostform.serialize(),
//                 success: function (data) {
//                     let newPost = newPostDom(data.data.post);
//                     $('#post-list-container>div').prepend(newPost);
//                     deletePost($(' .delete-post-button', newPost));

//                     // call the create comment class

//                     // CHANGE :: enable the functionality of the toggle like button on the new post
//                     new ToggleLike($(' .toggle-like-button', newPost));

//                     new Noty({
//                         theme: 'relax',
//                         text: "Post Created!",
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1500
//                     }).show();

//                 }, console, error: function (error) {
//                     console.log(error.responseText);
//                 }

//             })
//         });
//     }

//     //method to create a post using DOM
//     let newPostDom = function (post) {
//         return $(`
//         <li id="post- ${post._id}">
        
//             <div class="card post">
        
//                 <!-- head for the post -->
//                 <div class="card-header">
                   
//                     <div class="d-flex justify-content-between align-items-center">
        
//                         <a href="/users/profile/${post.user.id}" class="text-dark">
//                             <div class="d-flex justify-content-between align-items-center">
//                                 <div class="mr-2">
//                                     ${post.user.avatar}
//                                     <img class="rounded-circle" width="45" src="${post.user.avatar}" alt="">
                                   
//                                     <img class="rounded-circle" width="45" src="<%= assetPath('images/no_profile.jpg') %>" alt="">
                                     
//                                 </div>
//                                 <div class="ml-2">
//                                     <div class="h5 m-0 text-capitalize">${post.user.name}</div>
//                                     <div class="h7 text-muted">${post.user.email}</div>
//                                 </div>
//                             </div>
//                         </a>
        
//                         <div class="dropdown">
//                             <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown"
//                                 aria-haspopup="true" aria-expanded="false">
//                                 <i class="fa fa-ellipsis-h"></i>
//                             </button>
//                             <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
//                                 <div class="h6 dropdown-header">Configuration</div>
//                                 <a class="dropdown-item" href="#">Save</a>
//                                 <% if(locals.user.id == post.user.id){ %>
//                                 <a class="delete-post-button dropdown-item" href="/posts/destroy/${post.id}"> Delete </a>
//                                 <% } %>
//                                 <a class="dropdown-item" href="#">Report</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
        
//                 <!-- post body -->
//                 <div class="card-body card-post">
//                     <small>
//                         <div class="text-muted h7 mb-2"> <i class="far fa-clock"></i> &nbsp; <span id="created">
//                                 ${post.createdAt} </span> </div>
//                     </small>
        
//                     <p class="card-text">
//                     ${post.content}
//                     </p>
        
//                     <small class="text-muted" id="likes-count-<%= post._id %>" data-likes="<%= post.likes.length %>">
//                         if(${post.likes.length} > 0){
//                         <img src="/images/like.png" class="rounded-circle" width="30">
//                         ${post.likes.length}
//                          } 
//                     </small>
        
//                     <span class="comments">
//                         <small class="text-muted">
//                              if( ${post.comments.length} > 0){
                                    
//                                 if(${post.comments.length} == 1){ 
//                                     ${post.comments.length} comment
//                                 }else{ 
//                                     ${post.comments.length} comments
//                                } 
//                             } 
                           
//                         </small>
//                     </span>
//                 </div>
        
//                 <!-- post footer -->
//                 <div class="card-footer">
        
//                    if(${post.likes.find(x=> x.user == locals.user.id)}){ 
//                     <a class="toggle-like-button card-link" id="put-like-${post._id}"
//                         href="/likes/toggle/?id=${post._id}"> <i class="fas fa-thumbs-up"></i> Like </a>
        
//                      } else{ 
//                     <a class="toggle-like-button card-link" id="put-like-${post._id}"
//                         href="/likes/toggle/?id=${post._id}"> <i class="far fa-thumbs-up"></i> Like </a>
//                      } 
        
//                     <a class="card-link" data-toggle="collapse" href="#comment-${post._id}" role="button"
//                         aria-expanded="false" aria-controls="collapseExample"><i class="far fa-comment"></i> Comment</a>
//                     <div class="collapse mt-2" id="comment-${post._id}">
//                         <div class="card card-body">
        
//                             <!-- comment functionality -->
//                             <div class="post-comments">
//                                 <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">
//                                     <div class="form-group">
//                                         <input class="form-control" type="text" name="content" placeholder="Add a comment..."
//                                             required>
//                                     </div>
//                                     <input type="hidden" name="post" value="${post._id}">
        
//                                 </form>
        
//                                 <div class="post-comments-list">
//                                     <ul id="post-comments-${post._id}">
                                        
//                                     </ul>
        
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
    
//                 </div>
//             </div>
        
//         </li>
//         `)
//     }




//     //  method to delete a post from DOM
//     let deletePost = function (deleteLink) {
//         $(deleteLink).click(function (e) {
//             e.preventDefault();


//             $.ajax({
//                 type: 'get',
//                 url: $(deleteLink).prop('href'),
//                 success: function (data) {
//                     $(`#post-${data.data.post_id}`).remove();

//                     new Noty({
//                         theme: 'relax',
//                         text: "Post Deleted!",
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1500
//                     }).show();

//                 }, error: function (error) {
//                     console.log(error.responseText);
//                 }
//             })
//         });

//     }

//     let convertPostsToAjax = function(){
//         $('#post-list-container>ul>li').each(function(){
//             let self = $(this); // ye this kya waapis lara h 
//             let deleteButton = $(' .delete-post-button', self);
//             deletePost(deleteButton);  // ye kb kaam krega jb mei click krunga tb

//             // get the post's id by splitting the id attribute
//             let postId = self.prop('id').split("-")[1]   // ye function kaam kese krra h
//             new PostComments(postId);
//             //kya h class postcomments public hai , yaha kese show hori h 
//         });
//     }

//     createPost();
//     convertPostsToAjax();
// }