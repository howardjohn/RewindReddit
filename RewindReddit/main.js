
$( document ).ready(function() {
    console.log(moment("20111031", "YYYYMMDD").fromNow());
    comments = getComments();
    makeSlider(getExtrema(), comments);
});

function getComments() {
    var commentsArray = new Array(parseInt($('.comments.may-blank').text().split(" ")[0]));
    var toplevel = $('.sitetable.nestedlisting').children('.thing');
    var dict = {}
    var c = 0
    $.each(toplevel, function(ind, val) {
        var comments = $(val).find('.entry')
        $.each(comments , function(index, value) {
            commentsArray[c] = $(value);
            c += 1
        });
    });
    return commentsArray;
}

function makeSlider(extrema, comments) {
    $('<div id="RedditRewind"><label id="timerange" style="font-size: 14px">Time Range:</label><div id="rewindslider"></div></div>')
        .insertBefore('.sitetable.nestedlisting');
    $('#rewindslider').slider({
        range: true,
        min: extrema[0],
        max: extrema[1],
        values: [extrema[0],  extrema[1]],
        step: (extrema[1] - extrema[0])/100,
        change: function( event, ui ) {
            hideComments(comments, ui.values);
            console.log($(".thing:hidden"));
        },
        slide: function( event, ui ) {
            $( "#timerange" ).text("Time Range: " + getDateString(ui.values[0]) + " - " + getDateString(ui.values[1]));
            hideComments(comments, ui.values);
        }
    });

    var right = parseInt($('.side').css('margin-left')) + parseInt($('.side').css('padding-left')) +
            parseInt($('.side').css('margin-right')) + parseInt($('.side').css('padding-right')) +
            parseInt($('.side').css('width'))
    $("#RedditRewind").css({
        'margin-bottom' : '20px'
    })
    $('#timerange').css({
        'margin-right' : '10px',
        'margin-left' : '10px',
        'margin-bottom' : '100px',
    });
    $('#rewindslider').css({
        'position' : 'absolute',
        'right' : (right+30).toString() + 'px',
        'left' : '20px',
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
    return moment(d).fromNow();
}

function hideComments(comments, vals) {
    for (i = 0; i < comments.length; i++) {
        var date = new Date($(comments[i]).find('.collapsed > .live-timestamp').attr('datetime')).getTime()
        console.log(comments[i])
        if (vals[0] > date || vals[1] < date) {
            $(comments[i]).parent().hide();
        } else {
            $(comments[i]).parent().show();
        }

    }
}