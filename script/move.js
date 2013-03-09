function initialize_server(){

}

function nacrtaj_figure(){
    var html = "";

    for(var i =0;i<9;i++){
        html += '<div class="pasulj pasulj'+i+'"></div>';
        html += '<div class="kuruz kuruz'+i+'"></div>';
    }

    $(".figure").append(html);
    $(".pasulj").draggable({ revert: true,
                            start: function( event, ui ) {
                                console.log(ui);
                            },
                            stop: function( event, ui ) {
                                console.log(ui);
                            }
    });
    $(".kuruz").draggable({ disabled: true, revert:true });
}

function call_bomber(src,dst){
    StackMob.customcode('play',
        {player: 1, dst: '001'}, // method parameters
        'PUT', // HTTP Verb - omit this parameter for 'GET' by default
        {
            success: function(jsonResult) {
                //jsonResult is the JSON object: { "success": true/false, "error": "Error message" }
                alert( JSON.stringify(jsonResult) );
            },

            error: function(failure) {
                // ...
            }
        }
    );
}

function next_player(src,dst){

    call_bomber(src,dst);


    if(player==1){
        $(".pasulj").draggable({ revert: "invalid",disabled:true });
        $(".kuruz").draggable({ revert: true,disabled:false });
        player=2;
    }else{
        $(".kuruz").draggable({ revert: "invalid",disabled:true });
        $(".pasulj").draggable({ revert: true, disabled:false });
        player=1;
    }
}

player = 1;
last_pos = "";

$(document).ready(function() {
    // Handler for .ready() called.
    initialize_server();
    nacrtaj_figure();

    $( ".y-field" ).droppable({
        drop: function( event, ui ) {
//            console.log($(this).children().length);
            if(!$(this).children().length){
                var source = $(ui.draggable[0]).parent().attr("data-field");
                console.log(source);
                $( this )
                    .addClass( "ui-state-highlight yellow" )
                    .append(ui.draggable[0])
                ;
                $(ui.draggable[0]).css("left",12).css("top",12);
                var destination = $(this).attr("data-field");
                console.log($(this).attr("data-field"));
//            console.log(event);
                console.log(ui.draggable[0]);
                next_player(source,destination);
            }
//            console.log($(this).first().length);

        }
    });

});