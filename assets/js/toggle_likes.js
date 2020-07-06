// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike {
    constructor(toggleElement) {
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike() {
       
        $(this.toggler).click(function (e) {
            e.preventDefault();
            let self = this;

            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
                .done(function (data) {
                    
                    let likesCount = parseInt($(`#likes-count-${data.data.post._id}`).attr('data-likes'));

                    if (data.data.deleted == true) {
                        likesCount -= 1;
                    } else {
                        likesCount += 1;
                    }


                    $(`#likes-count-${data.data.post._id}`).attr('data-likes', likesCount);

                    if (likesCount > 0) {
                         
                        if(data.data.post.likes.find(x=> x.user == data.data.user.id)){ 
                        $(`#put-like-${data.data.post._id}`).html('<i class="fas fa-thumbs-up"></i> Like')
                         }else{
                            $(`#put-like-${data.data.post._id}`).html('<i class="far fa-thumbs-up"></i> Like')
                         }

                            $(`#likes-count-${data.data.post._id}`).html(`<img src="/images/like-4113758d1a.png" 
                            data-likes="<%= post.likes.length %>" id="count" class="rounded-circle" width="30" > ${likesCount}`);
                    }
                    else {
                        $(`#put-like-${data.data.post._id}`).html('<i class="far fa-thumbs-up"></i> Like')
                        $(`#likes-count-${data.data.post._id}`).html('');

                    }
                })
                .fail(function (errData) {
                    console.log('error in completing the request');
                });


        });
    }
}
