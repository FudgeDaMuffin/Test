var express = require('express');
var app = express();
var http = require('http');
var https = require('https');
var fs = require('fs');
var privateKey  = fs.readFileSync('/etc/letsencrypt/live/haddonfieldnutrition.com/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/haddonfieldnutrition.com/fullchain.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};
if (process.env.NODE_ENV !== 'production'){
  require('longjohn');
}
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Content-Type","application/json")
  next();
 });
function Food(name,cal,totfat,satfat,chol,na,totalcarb,fiber,sugar,protein){
    
    this.Food_name=name;
    this.Serving_qty = 1;
    this.haddfood=1;
    this.Calories=cal;
    this.Total_fat=totfat;
    this.Saturated_fat=satfat;
    this.Cholesterol=chol;
    this.Sodium=na;
    this.Total_carbohydrates=totalcarb;
    this.Dietary_fiber=fiber;
    this.Sugars=sugar;
    this.Protein=protein;
    
}
var haddonfoods = [
    new Food("Chicken Fingers",570,24,4.5,90,2220,57,3,0,36),
    new Food("Dinner Roll",100,1,0,0,210,18,2,1,4),
    new Food("Chicken Patty",270,15,2.5,25,400,16,3,1,16),
    new Food("Spicy Chicken Patty",270,15,3,25,400,17,3,1,15),
    new Food("Cheeseburger",228,16,8,70,250,1,0,1,16),
    new Food("Hot Dog",170,16,6,35,490,1,0,0,6),
    new Food("Philly Cheese Steak",369,27,13,91,1204,7,0,4,23),
    new Food("Meatball Parmesan",221,13,5,41,364,11,1,5,16),
    new Food("Grilled Cheese Sandwich",403,23,10,51,979,34,2,16),
    new Food("Panzarotti",350,9,2.4,30,970,45,3,3,19),
    new Food("Cheese Hoagie (with Lettuce and Tomato)",355,19,10,51,1022,28,4,1,15),
    new Food("Chicken Salad Hoagie",614,23,6,203,564,25,4,1,70),
    new Food("Ham and Cheese Hoagie",335,12,6,65,1446,30,4,3,22),
    new Food("Italian Hoagie",441,23,10,85,1664,29,4,2,28),
    new Food("Tuna Salad Hoagie",247,6,1.1,28,558,25,4,1,19),
    new Food("Turkey and Cheese Hoagie",356,11,5,73,1315,27,4,1,29),
    new Food("Buffalo Chicken Wrap",343,9,3,78,741,37,5,2,33),
    new Food("Chicken Caesar Wrap",511,21,8,93,1522,41,6,2,36),
    new Food("Ham and Cheese Wrap",372,17,9,69,1314,36,4,1,22),
    new Food("Tuna Salad Wrap",395,14,5,21,914,48,2,3,18),
    new Food("Turkey and Cheese Wrap",406,17,9,67,1319,41,5,3,25),
    new Food("Grilled Chicken Caesar Salad",157,8,3.1,50,535,5,2,1,21),
    new Food("Chef Salad (with Egg)",199,14,6,237,648,12,4,3,23),
    new Food("Sesame Chicken Salad",264,10,1.5,42,531,30,3,16,16),
    new Food("Grilled Buffalo Chicken Salad",113,4.4,1,40,692,6,2,2,17),
    new Food("Chicken Cobb Salad",272,15,4.8,132,613,17,4,3,20),
    new Food("Chocolate Chip Cookie",110,3.5,1.5,5,90,19,1,9,1),
    new Food("Sugar Cookie",110,3.5,1,5,85,19,0,9,1),
    new Food("Cinnamon Churro",130,9,4.5,20,160,13,0,0,2),
    new Food("Soft Pretzel",180,1,0,0,150,38,1,1,6),
    new Food("Chocolate Chunk Cookie",170,7,3,15,140,26,1,17,2),
    new Food("M&M Cookie",180,8,3,15,100,27,0,13,2),
    new Food("Lays Potato Chips",80,5,0.5,0,80,8,1,0,1),
    new Food("Baked Lays Chips",130,2,0,0,150,26,2,2,2),
    new Food("Cheetos Cheese Puffs",90,3.5,0.5,0,160,13,1,1,2),
    new Food("Cheetos Fantastix Hot Fries",130,5,1,0,200,20,2,1,2),
    new Food("Cheez-It Squares",100,3.5,1,2,150,14,1,0,2),
    new Food("Cinnamon Pop Tart",180,2.5,1,0,190,37,3,15,2),
    new Food("Strawberry Pop Tart",180,2.5,1,0,180,38,3,15,2),
    new Food("Cool Ranch Doritos",130,5,1,0,160,19,2,1,2),
    new Food("Fruit Gushers",90,1.5,0.5,0,45,21,0,12,0),
    new Food("Harvest Cheddar Sun Chips",140,6,1,0,210,18,2,2,2),
    new Food("Lays Baked Barbeque Chips",140,4,1,0,220,24,2,4,2),
    new Food("Nacho Cheese Doritos",130,5,1,0,200,20,2,1,2),
    new Food("Pirate's Booty Cheddar Cheese Puffs",100,4,1,0,105,14,0,0,2),
    new Food("Rice Krispies Bar",160,4,1,0,140,30,1,11,2),
    new Food("Smartfood Popcorn",160,10,2,5,240,13,2,2,4),
    new Food("SnackWells Vanilla Cream Sandwich Cookies",210,5,1.5,0,160,38,0,17,2),
    new Food("Spicy Sweet Chili Doritos",140,5,0.5,0,200,20,1,1,2),
    new Food("Tostitos Baked Corn Tortilla Chip Scoops",110,2.5,0,0,125,19,2,0,2)
    
]
var options = {
    host:"trackapi.nutritionix.com",
    path:"/v2/natural/nutrients",
    method:"POST",
    port:"443",
    headers:{
        'content-type': 'application/json', 
        'x-app-id': '56ef5447',
        'x-app-key': '0f567378c3fd1612013b2bf3d076b5dd',
        'x-remote-user-id':0,
    },
}
function ttc(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
app.get('/',function(req,res){
    var reqe = https.request(options,function(rese,err){
        if (err) throw err
        var responseString = "";
        rese.on("data", function (data) {
            //console.log('eee')
            responseString += data;
        });
        rese.on("end", function () {
            var dat = JSON.parse(responseString)
            if (!dat.hasOwnProperty("foods")){
                res.end(JSON.stringify({error:1,reason:"No foods returned"}))
            }
            else {
                dat=dat.foods[0]
                console.log(dat)  
                if (dat.Brand_name==null){
                    delete dat.Brand_name
                }
                
                delete dat.brand_name;
                delete dat.serving_unit;
                delete dat.serving_weight_grams
                var obarr=Object.keys(dat);
                 
                for (var i = 0;i<obarr.length;i++){
                    //console.log(obarr[i])
                    if (i>10){
                        delete dat[obarr[i]]
                    }
                    else {
                        ////conditions to change prop names/values
                        if (typeof dat[obarr[i]] == 'number') {
                            dat[obarr[i]]=Math.round(dat[obarr[i]])
                        }
                        if (obarr[i].charAt(0)=='n'){
                            dat[obarr[i].substring(3)]=dat[obarr[i]];
                            delete dat[obarr[i]];
                            obarr[i]=obarr[i].substring(3)
                        }
                        if (dat[obarr[i]]==null){
                            dat[obarr[i]]=0
                        }
                        if (i==10){
                            dat.Total_carbohydrates=dat.Total_carbohydrate
                            delete dat.Total_carbohydrate
                        }
                        dat[ttc(obarr[i])]=dat[obarr[i]]
                        delete dat[obarr[i]];
                        obarr[i]=ttc(obarr[i])
                        //console.log(dat);
                        //console.log(dat[obarr[i]]);
                    }
                }   
                //console.log(dat)
               
                res.end(JSON.stringify(dat));}
        });
            })
    if (req.query.hasOwnProperty('string')){
        
        
            var j=req.query.string
            if (!(/\d/.test(req.query.string))){
                j = "1 "+ req.query.string
            }
            console.log(j)
            reqe.end(JSON.stringify({query:j})); 
        
    }
    else if (req.query.hasOwnProperty('type')){
        res.end(JSON.stringify(haddonfoods));
    }
    res.on('finish',function(){
        console.log('req finish')
    })
    
})


process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(3001,function(){
    console.log('test.js is listening on port 3001');})
                  
httpsServer.listen(3002);
