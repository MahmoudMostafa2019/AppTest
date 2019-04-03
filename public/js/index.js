var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('newMess', function (message) {
  var li=jQuery('<li></li>');
  li.text(`from : ${message.from}  text:  ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('genLocMess', function (message) {
  var li=jQuery('<li></li>');
  var a=jQuery('<a target="_blank">My current Location</a>');
  li.text(`${message.from}:`);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
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
    console.log('send successfully.......',data);
  });
});

//----------
jQuery('#location-butt').on('click',function (e) {
if (!navigator.geolocation) {
  return alert('not  available');
}
navigator.geolocation.getCurrentPosition(
  function (postion) {
    console.log('details:',postion);
    // alert(' available');
    socket.emit('sendCordinates', {
      lat:postion.coords.latitude,
      lang: postion.coords.longitude
  });
  },function () {
      alert('notxcxcxcx available');
  }
);

});