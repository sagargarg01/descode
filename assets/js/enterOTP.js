
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