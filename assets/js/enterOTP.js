
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