
class PostComments {
    constructor(postId) {
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);
        this.createComment(postId);



        let self = this;
        //call for all existing comments
        $(' .delete-comment-button', this.postContainer).each(function () {
            self.deleteComment($(this));
        });
    }


    createComment(postId) {
        let pSelf = this;
        this.newCommentForm.submit(function (e) {
            e.preventDefault();
            length = $(`#post-${postId}-comment-length`);

            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function (data) {

                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).append(newComment);
                    let commentlength = data.data.post.comments.length;

                    // remove text from input and change the count of comments
                    if (commentlength == 1) { length.text(`${commentlength} comment`) } else { length.text(`${commentlength} comments`) }
                    $(`#post-${postId}-comments-form input[name=content]`).val('');

                    pSelf.deleteComment($(' .delete-comment-button', newComment));

                    new Noty({
                        theme: 'relax',
                        text: "Comment Created!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();

                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }


    newCommentDom(comment) {
        // i have added a class 'delete-comment-button' to delete comment link and also id to the comment's li
        return $(`
        <li id="comment-${comment._id}">
        
            <div class="comment">
                <a href="/users/profile/${comment.user._id}">

                    ${ comment.user.avatar ?
                `<img class="rounded-circle" width="39" src="${comment.user.avatar}" alt="">`
                :
                `<img class="rounded-circle" width="39" src="/images/no_profile-b3e3fdee20.jpg" alt="">`
            }
        

                    <div class="comment-content ml-2">
                        <a href="/users/profile/${comment.user._id}" class="font-weight-bold">
                            <span class="text-capitalize">
                                ${comment.user.name}
                            </span>
                        </a>
                </a>
                            ${comment.content}
                    </div>
        
                    <div class="dropdown">
                        <button class="btn btn-link dropdown-toggle details" type="button" id="gedf-drop1"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-ellipsis-h"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                            <div class="h6 dropdown-header">Configuration</div>
                            <a class="dropdown-item" href="#">Save</a>
                            <a class="delete-comment-button dropdown-item " href="/comments/destroy/${comment._id}"> Delete
                            </a>
                            <a class="dropdown-item" href="#">Report</a>
                        </div>
                    </div>
            </div>
        </li>
        `)
    }

    deleteComment(deletelink) {
        let length = $(`#post-${this.postId}-comment-length`);
        $(deletelink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deletelink).prop('href'),
                success: function (data) {

                    $(`#comment-${data.data.comment_id}`).remove();

                    let commentlength = data.data.post.comments.length - 1; 
                    
                    if(commentlength == 0){
                        length.text('');
                    }
                    else if (commentlength == 1) { 
                        length.text(`${commentlength} comment`) 
                    } else { 
                        length.text(`${commentlength} comments`) 
                    }

                    new Noty({
                        theme: 'relax',
                        text: 'Comment Deleted!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();

                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }

}