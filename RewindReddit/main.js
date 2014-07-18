$( document ).ready(function() {
    comments = getComments();
    makeSlider(getExtrema(), comments);
});

function getComments() {
    var commentsArray = new Array(parseInt($('.comments.may-blank').text().split(" ")[0]));
    // var commentsArray = new Array();
    var toplevel = $('.sitetable.nestedlisting').children('.thing');
    var dict = {}
    var c = 0
    $.each(toplevel, function(ind, val) {
        var comments = $(val).find('.entry')
        $.each(comments , function(index, value) {
            commentsArray[c] = $(value);
            // console.log(comments.length);
            // comments.push($(value).parent());
            // var date = new Date($(value).find('.collapsed > .live-timestamp').attr('datetime')).getTime()
            // if(date < 1405188575000) {
            //     console.log(date)
            //     $(value).parent().hide("slow")
            // }
            c += 1

        });
    });
    return commentsArray;
}

function makeSlider(extrema, comments) {
    $('<label id="timerange" style="font-size: 14px">Time Range:</label><div id="rewindslider"></div><br /><p>')
        .insertBefore('.sitetable.nestedlisting')
    $('#rewindslider').slider({
        range: true,
        min: extrema[0],
        max: extrema[1],
        values: [extrema[0],  extrema[1]],
        step: (extrema[1] - extrema[0])/50,
        slide: function( event, ui ) {
                hideComments(comments, ui.values);
                // console.log(ui.values);
                $( "#timerange" ).text("Time Range: " + getDateString(ui.values[0]) + " - " + getDateString(ui.values[1]));
        }
    });

    $("#timerange").text("Time Range: " + getDateString($("#rewindslider").slider("values", 0)) +
      " - " + getDateString($("#rewindslider").slider("values", 1)));
}

function getExtrema() {
    min = new Date($('.sitetable.linklisting').find('.live-timestamp').attr('datetime')).getTime();
    max = Date.now();
    return [min, max];
}

function pad(s) {
    return ("00" + s).slice(-2);
}

function getDateString(d) {
    d = new Date(d);
    var s = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + "  " 
            + d.getHours() + ":" + pad(d.getMinutes());
    return s;
}

function hideComments(comments, vals) {
    for (i = 0; i < comments.length; i++) {
        var date = new Date($(comments[i]).find('.collapsed > .live-timestamp').attr('datetime')).getTime()
        if (vals[0] > date || vals[1] < date) {
            $(comments[i]).parent().hide();
        } else {
            $(comments[i]).parent().show();
        }

    }
}