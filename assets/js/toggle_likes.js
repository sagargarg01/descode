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
                    
                    let likesCount = data.data.post.likes.length;

                    if(data.data.deleted == true){
                        $(`#put-like-${data.data.post._id}`).html('<i class="far fa-thumbs-up"></i> Like');
                    }
                    else{
                        $(`#put-like-${data.data.post._id}`).html('<i class="fas fa-thumbs-up"></i> Like');
                    }

                    if (likesCount > 0) {
                            $(`#likes-count-${data.data.post._id}`).html(`<img src="/images/like-4113758d1a.png" 
                            data-likes="<%= post.likes.length %>" id="count" class="rounded-circle" width="30" > ${likesCount}`);
                    }
                    else {
                        $(`#likes-count-${data.data.post._id}`).html('');
                    }
                })
                .fail(function (errData) {
                    console.log('error in completing the request');
                });


        });
    }
}
