$('.search_input').keyup(function(){
   var name = $(this).val().trim();
   console.log(name);
   
   $.ajax({
       type:'get',
       url: `/search/user/?name=${name}`,
       success: function(data){

       },
       error: function(err){
          console.log(err.responseText);
          return;
       }
   });
});

// show search results when click on seach bar
$('.search_input').click(function(){
   $('.search_results').css('display', 'block');
   $('.search_bar').addClass('searchstyle');
   $(this).css({
      'border-bottom-right-radius':'0px',
      'border-bottom-left-radius': '0px'
   })
});

// hide seach result when clicked outside the area
$(document).mouseup(function(e){
   var area = $('.search_conatiner');

   if(!area.is(e.target) && area.has(e.target).length === 0){
      $('.search_results').css('display', 'none');
      $('.search_bar').removeClass('searchstyle');
      $('.search_input').css({
         'border-bottom-right-radius':'15px',
         'border-bottom-left-radius': '15px'
      })
   }
})

// ------------- styling ----------------

var adjustBar = () => {
   var windowWith = $(window).width();
   if(windowWith < 785){
      $('#searchContainer').addClass('collapse');
   }   
   if(windowWith > 790){
      $('#searchContainer').removeClass('collapse');
   }
}
adjustBar();

$(window).resize(function(){
  adjustBar();
})
