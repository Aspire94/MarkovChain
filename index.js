var http = require('http');
var dt = require('./myModule/date.js');
var fs = require('fs');
var text = "";
const say = require('say');




// Markov shizzle
const Markov = require('markov-strings');
const data = [
    "ALICE BEGAN TALKING AGAIN I WOULDN T ANSWER EITHER THE EARTH HOW BRAVE THEY WOULD NOT FOR ASKING NO USE OF THEM HOWEVER THIS I WONDER IF I M AFRAID BUT", 
    "ALICE WAS CLOSE BY A MOUSE YOU SOONER OR CONVERSATIONS SO MANY OUT OF SOLID GLASS THERE WAS CONSIDERING IN TIME AS THAT ALICE VENTURED TO ASK PERHAPS I THINK FOR", 
    "ALICE WITHOUT MY HEAD THROUGH THE RABBIT SAY ANYTHING ABOUT CHILDREN WHO HAD NOT LIKE A SMALL BUT THEN I WONDER AND FOUND HERSELF FALLING THROUGH THE BANK AND THE TABLE"
];

const options = {
    maxLenght: 200,
    minWords: 10,
    minScore: 0,
    checker: sentence => {return sentence.endsWith(".");}
};

const markov = new Markov(data, options);

markov.buildCorpus().then(() => {
    const message = [];
    for(let i=0; i < data.length; i++){
        markov.generateSentence().then(result => {
            message.push(result);
            console.log(result.string);
            if(i == 1){
                text = JSON.stringify(message[1].string);
                console.log(text);
            }
        });
    }
});


//server object
http.createServer(function (req, res) {
    fs.readFile('data.html', function(err, data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(text);
        say.speak(text, "Microsoft Zira Desktop", 1);
        console.log("dit is de text = " + text);
        res.end();
        text = "";
                });

}).listen(8080);