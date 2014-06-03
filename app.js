var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    fs = require('fs');

// Chargement de la page index.html
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {

    socket.on('petit_nouveau', function(pseudo) {
    	var pseudo = ent.encode(pseudo);
        socket.set('pseudo', pseudo);
        socket.broadcast.emit('nouvelle_connexion', pseudo);
    });

    socket.on('message', function (message) {
        socket.get('pseudo', function (error, pseudo) {
            socket.emit('ajouter_message', {pseudo: pseudo, message: message});
            socket.broadcast.emit('ajouter_message', {pseudo: pseudo, message: message});
        });
    });
});


server.listen(8080);