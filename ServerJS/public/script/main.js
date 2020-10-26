$( document ).ready(function() {
    console.log( "ready!" );

    $('.search_icon').click(function(e){
        e.preventDefault();
        console.log('search_icon clicked');

        var data = {};
        data.filter = $('.search_input').val();
        
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            url: 'http://localhost:8081/search',						
            success: function(data) {
                console.log('success');
                console.log(JSON.stringify(data));
            }
        });
    });
});