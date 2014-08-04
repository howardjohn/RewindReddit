var c = 0;
var newestDate = 0;
var oldestDate = Date.now();
$( document ).ready(function() {
    comments = getComments();
    makeSlider(getExtrema(), comments);
});

function getComments() {
    var commentsArray = new Array(parseInt($('.comments.may-blank').text().split(" ")[0]));
    var toplevel = $('.sitetable.nestedlisting').children('.thing');
    var c = 0;
    $.each(toplevel, function(ind, val) {
        var comments = $(val).find('.entry');
        $.each(comments , function(index, value) {
            var date = new Date($(value).find('.collapsed > .live-timestamp').attr('datetime')).getTime();
            commentsArray[c] =  [$(value), date];
            if (date > newestDate) {
                newestDate = date;
            }
            if (date < oldestDate) {
                oldestDate = date;
            }
            c += 1;
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
            $( "#timerange" ).text("Time Range: " + getDateString(ui.values[0]) + " - " + getDateString(ui.values[1]));
        },
        slide: function( event, ui ) {
            c += 1
            if (c == 25){   
                $( "#timerange" ).text("Time Range: " + getDateString(ui.values[0]) + " - " + getDateString(ui.values[1]));
                c = 0;
            }
            $( "#timerange" ).text("Time Range: " + getDateString(ui.values[0]) + " - " + getDateString(ui.values[1]));
            hideComments(comments, ui.values);
        }
    });

    var right = parseInt($('.side').css('margin-left')) + parseInt($('.side').css('padding-left')) +
            parseInt($('.side').css('margin-right')) + parseInt($('.side').css('padding-right')) +
            parseInt($('.side').css('width')) + parseInt($('.content').css('margin-right')) + 
            parseInt($('body').css('margin-right'))
    var left = parseInt($('.content').css('margin-left')) + parseInt($('.commentarea').css('margin-left')) + 
            parseInt($('.commentarea').css('padding-left')) + parseInt($('body').css('margin-left'))

    $("#RedditRewind").css({
        'margin-bottom' : '20px'
    })
    $('#timerange').css({
        'margin-right' : '10px',
        'margin-left' : '10px',
        'margin-bottom' : '100px'
    });
    $('#rewindslider').css({
        'position' : 'absolute',
        'right' : (right+30).toString() + 'px',
        'left' : (left+20).toString() + 'px'
    });
    $("#timerange").text("Time Range: " + getDateString($("#rewindslider").slider("values", 0)) +
      " - " + getDateString($("#rewindslider").slider("values", 1)));
}

function getExtrema() {
    min = oldestDate;
    max = newestDate;
    if (min == max) {
        max = Date.now();
    }
    return [min, max];
}

function getDateString(d) {
    return moment(d).fromNow();
}

function hideComments(comments, vals) {
    for (i = 0; i < comments.length; i++) {
        if(comments[i] != undefined){
            var date = comments[i][1];
            if (vals[0] > date || vals[1] < date) {
                $(comments[i][0]).parent().hide();
            } else {
                $(comments[i][0]).parent().show();
            }
        }
    }
}