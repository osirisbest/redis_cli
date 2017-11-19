var redis=require('redis'),
client=redis.createClient(),
i=0,
//it`s your function for message
getMessage=function getMessage(){
    this.cnt=this.cnt||0;
    return this.cnt++;
},
setMessage=function generatorMessage(){
    client.set('myKey',JSON.stringify(
        {t:new Date().getTime(),
            iam:iam,
            message:getMessage()}));
},
eventHandler=function eventHandler(msg, callback){
    function onComplete(){
        var error = Math.random() > 0.85;
        callback(error, msg);
    }
// processing takes time...
    setTimeout(onComplete, Math.floor(Math.random()*1000));
};

const iam=Math.random();

client.on('error',function (err) {
    console.log(err);
});

var  getr=function () {
    client.get('myKey',function (err,repl) {
        parse=JSON.parse(repl);
        i++;
        deltaT=(new Date()-parse.t)

        if (parse.iam==iam){console.log('I am generator!')}
        else
        {console.log('I am NOT generator');
        eventHandler(parse.message,function(err,msg){
            console.log('err:'+err+';msg:'+msg);
            if (err){client.set('err',err);};
        });}

        console.log(i+';MY REAL NAME:'+iam+';'+';d time='+deltaT);
        console.log(parse);
        if (parse.iam==iam) {
            setMessage();
        }else if((new Date-parse.t)>2000){
            console.log('Generator is die!I am generator!');
            setMessage();
        }
    });
}
setInterval(getr,1000);