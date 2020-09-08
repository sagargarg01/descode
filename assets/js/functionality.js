
$('#resend').click(function(e){
   e.preventDefault();
   let self = this;
   $(self).css('pointer-events','none');
  
   setTimeout(function(){

      $.ajax({
         type: 'GET',
         url: $(self).attr('href')
      })
      .done(function(data){
         $(self).css('pointer-events','');
      })
      .fail(function(errorData){
   
      })

   }, 10000)

})

$('textarea').each(function () {
   this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
 }).on('input', function () {
   this.style.height = 'auto';
   this.style.height = (this.scrollHeight) + 'px';
 });

$('#posts-tab').click(function(){
   $('#submit-btn').attr('form','new-post-form');
});

$('#images-tab').click(function(){
   $('#submit-btn').attr('form','new-image-post-form');
});


var loadFile = function(event) {
   var output = document.getElementById('output');
   output.src = URL.createObjectURL(event.target.files[0]);
   output.onload = function() {
     URL.revokeObjectURL(output.src) // free memory
   }
 };
