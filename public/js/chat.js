var socket = io();


function scrollToBottom() {
  var messages=jQuery('#messages');
  var newMessages=messages.children('li:last-child');

  var scrollHeight= messages.prop('scrollHeight');
  var scrollTop= messages.prop('scrollTop');
  var clientHeight= messages.prop('clientHeight');

  var newMessagesHeight= newMessages.innerHeight();
  var lastMessagesHeight= newMessages.prev().innerHeight();
if (scrollTop + clientHeight +newMessagesHeight+ lastMessagesHeight>= scrollHeight) {
  console.log('should sculsd');
  messages.scrollTop(scrollHeight);
}

}

socket.on('connect', function () {
  console.log('Connected to server');
var deparam = jQuery.deparam(window.location.search);
socket.emit('join',deparam,function(err){
  if (err) {
    console.log('error found in acknowledge function');
    alert(err);
    window.location.href='/'
  }else {
    console.log('not Error');
  }
})


});

socket.on('newMess', function (message) {
//template_id
var dateMoment=moment(message.createAt).format('h:mm a');
  var temp=jQuery('#template_id').html();
var html=Mustache.render(temp,
{from:message.from,
 text:message.text
 ,date:dateMoment});
 jQuery('#messages').append(html);
 scrollToBottom();
  // var dateMoment=moment(message.createAt).format('h:mm a');
  // var li=jQuery('<li></li>');
  // li.text(`from : ${message.from}  text:  ${message.text} ,date ${dateMoment}`);
  // jQuery('#messages').append(li);
});


socket.on('updateUserList', function (message) {
var ol=jQuery('<ol></lo>');
message.forEach(function (messages) {
  ol.append(jQuery('<li></li>').text(messages));
});

  jQuery('#user').html(ol);
});

socket.on('genLocMess', function (message) {
  var dateMoment=moment(message.createAt).format('h:mm a');
  var temp=jQuery('#template_id_loc').html();
  var html=Mustache.render(temp,
  {from:message.from
   //,text:message.text
   ,date:dateMoment
 ,url:message.url});
   jQuery('#messages').append(html);

  // var li=jQuery('<li></li>');
  // var a=jQuery('<a target="_blank">My current Location</a>');
  // li.text(`date:${dateMoment} :${message.from}:`);
  // a.attr('href',message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});
// socket.emit('createMess', {
//   from: 'Mahmoud',
//   text: 'Done,Yup, that works for me.'
// },function(data){
//   console.log('send successfully.......',data);
// });


jQuery('#form_mess').on('submit',function (e) {
  e.preventDefault();
  //
  socket.emit('createMess', {
    from: 'TG',
    text: jQuery('[name=message]').val()
  },function(data){
    //console.log('send successfully.......',data);
    jQuery('[name=message]').val('');
  });
});

//----------
jQuery('#location-butt').on('click',function (e) {
if (!navigator.geolocation) {
  return alert('not  available');
}
jQuery('#location-butt').attr('disabled','disabled').text('Send Location...');
navigator.geolocation.getCurrentPosition(
  function (postion) {
    console.log('details:',postion);
      jQuery('#location-butt').removeAttr('disabled').text('Send Location');
    // alert(' available');
    socket.emit('sendCordinates', {
      lat:postion.coords.latitude,
      lang: postion.coords.longitude
  });

  },function () {
    jQuery('#location-butt').removeAttr('disabled').text('Send Location');
      alert('notxcxcxcx available');
  }
);

});
