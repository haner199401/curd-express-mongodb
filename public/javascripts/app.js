/**
 * Created by haner on 16/3/8.
 */


$('#submitBtn').click(function(){
    $.ajax({
        url:'/users/add/user',
        method:'post',
        data:$('#userform').serializeArray(),
        success:function(re,err){

        }
    });
});