$( document ).ready(function() {
    var toplevel = $('.sitetable.nestedlisting').children('.thing');
    var dict = {}
    var c = 0
    $.each(toplevel, function(ind, val) {
        // $(val).hide("slow")
        var comments = $(val).find('.entry')
        $.each(comments , function(index, value) {
            // console.log($(value).parent())
            
            var date = new Date($(value).find('.collapsed > .live-timestamp').attr('datetime')).getTime()
            if(date < 1405188575000) {
                console.log(date)
                $(value).parent().hide("slow")
            }
            c += 1

        });
    });
    console.log(c)
});
