$(".search_input").keyup((function(){var s=$(this).val().trim();console.log(s),$.ajax({type:"get",url:"/search/user/?name="+s,success:function(s){},error:function(s){console.log(s.responseText)}})})),$(".search_input").click((function(){$(".search_results").css("display","block"),$(".search_bar").addClass("searchstyle"),$(this).css({"border-bottom-right-radius":"0px","border-bottom-left-radius":"0px"})})),$(document).mouseup((function(s){var r=$(".search_conatiner");r.is(s.target)||0!==r.has(s.target).length||($(".search_results").css("display","none"),$(".search_bar").removeClass("searchstyle"),$(".search_input").css({"border-bottom-right-radius":"15px","border-bottom-left-radius":"15px"}))}));var adjustBar=()=>{var s=$(window).width();s<785&&$("#searchContainer").addClass("collapse"),s>790&&$("#searchContainer").removeClass("collapse")};adjustBar(),$(window).resize((function(){adjustBar()}));