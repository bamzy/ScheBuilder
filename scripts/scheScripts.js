/**
 * Created by bamdad on 1/22/2016.
 */

//$("document").ready(function() {
//    $("#addTask").click(function () {
//        var counter = 0
//        var newTask = $("<div id= class=\"scheduleBlocks\"><h3>Block counter</h3></div>");
//        counter++;
//        //newP.append("<em>Hello There</em>");
//        console.log("hiiiii");
//        $("#blockDiv").append(newTask);
//    });
//});
var counter = 0
$(function() {
    var dialog, form,

    // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
    //    emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    taskName = $( "#taskName" ),
    priority = $( "#priority" ),
    description = $( "#description" ),
    allFields = $( [] ).add( taskName).add( priority).add( description ),
    tips = $( ".validateTips" );

    function updateTips( t ) {
        tips
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }

    function checkLength( o, n, min, max ) {
        if ( o.val().length > max || o.val().length < min ) {
            o.addClass( "ui-state-error" );
            updateTips( "Length of " + n + " must be between " +
                min + " and " + max + "." );
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp( o, regexp, n ) {
        if ( !( regexp.test( o.val() ) ) ) {
            o.addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
    }

    function addTask() {
        console.log("addTask called");
        var valid = true;
        allFields.removeClass( "ui-state-error" );

        valid = valid && checkLength( taskName, "taskName", 3, 16 );
        //valid = valid && checkLength( email, "email", 6, 80 );
        valid = valid && checkLength( description, "description", 5, 1600 );

        //valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
        //valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
        //valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );

        if ( valid ) {
            $( "#users tbody" ).append( "<tr>" +
                "<td>" + taskName.val() + "</td>" +
                "<td>" + priority.val() + "</td>" +
                "<td>" + description.val() + "</td>" +
                "</tr>" );
            dialog.dialog( "close" );

            counter++;
            var newTask = $("<div  class=\"scheduleBlocks\ shadowedDiv\"><h3>" +  "Block|" + taskName.html() + "|"+ priority.val()+"|"+ description.val()+ "</h3></div>");
            //newP.append("<em>Hello There</em>");
            //console.log("hiiiii");
            $("#blockDiv").append(newTask);

        }
        return valid;
    }

    dialog = $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: 500,
        width: 350,
        modal: true,
        buttons: {
            "Create Task": addTask,
            Cancel: function() {
                dialog.dialog( "close" );
            }
        },
        close: function() {
            form[ 0 ].reset();
            allFields.removeClass( "ui-state-error" );
        }
    });

    form = dialog.find( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        addTask();
    });

    $( "#addTask" ).button().on( "click", function() {
        dialog.dialog( "open" );
    });
});
