var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
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
  // var dateMoment=moment(message.createAt).format('h:mm a');
  // var li=jQuery('<li></li>');
  // li.text(`from : ${message.from}  text:  ${message.text} ,date ${dateMoment}`);
  // jQuery('#messages').append(li);
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
