var server_name = "http://127.0.0.1:3000/";
var socket = io.connect(server_name);
console.log('Client: Connecting to server ' + server_name);
//var msgElement = document.getElementById('hl-tweet');
var clove = document.getElementById('love-tweet');
var chate = document.getElementById('hate-tweet');
var tot = document.getElementById('total');
var per = document.getElementById('per');
//var tweetList = document.getElementById('ul-tweet');
/*
$("#ping").click(function(){
  socket.emit('ping',"ping");
});
*/

//listen to love tweets
socket.on('love-tweet', function(data) {
    $('.left').prepend('<li>'+data.user+':'+data.text+'</li>');
//    msgElement.innerHTML = data.text;
    clove.innerHTML = "No. of Love Tweets: "+data.love; //display love tweet counter
    console.log('Client: Received message from server : ' + data.user);
});
//listen to hate tweets
socket.on('hate-tweet', function(data) {
    $('.right').prepend('<li>'+data.user+':'+data.text+'</li>');
    var pert=(1-(data.hate/data.total));
    total.innerHTML="Total Tweets: "+data.total;
 //calculate % of love 
    per.innerHTML=(pert*100).toFixed(2) + "% Love in this world"; 
//    msgElement.innerHTML = data.text;
    chate.innerHTML = "No. of Hate Tweets "+data.hate;
    console.log('Client: Received message from server : ' + data.user);
});
