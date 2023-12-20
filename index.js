var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
const net = require("net");

const multer = require('multer');
const path = require('path');

app.use(express.json())

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
const requestIp = require('request-ip');

var Starting = "<!DOCTYPE html><html><head>";
var Ending = "</head></html>";
var Index = fs.readFileSync('index.html');
var 所有艺术品 = [];
app.use(requestIp.mw())

app.use(express.urlencoded({ extended:true }))
fs.readFile('Accounts.txt', function (err, data) {
    if (err) {
        
        fs.writeFile('Accounts.txt', '[]', function(err) {
            if (err) {
            return console.error(err);
        }
   
        console.log("Data written successfully!");
        console.log("Let's read newly written data");
   
        fs.readFile('Accounts.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            
            
            });
        });
    }
    else
    {
      

    }
   
   
});
fs.readFile('Artists.txt', function (err, data) {
    if (err) {
        var 艺术作品 = fs.readFileSync('艺术作品.txt');
        var 艺术作品 = JSON.parse(艺术作品);
        var 艺术家 = {"Artists":[]};
        for (var i = 0; i < 艺术作品.length; i++) {
            for (var x = 0; x < 艺术作品[i]["作者"].length; x++) {
                
                var reg = false;
                for (var k = 0; k < 艺术家["Artists"].length; k++) {
                    console.log(艺术家["Artists"][k]["姓名"]);
                    if (艺术家["Artists"][k]["姓名"] == 艺术作品[i]["作者"][x]) {
                        reg = true;
                    }
                }
                if (reg == false) {
                    艺术家["Artists"].push({ "姓名": 艺术作品[i]["作者"][x], "简介": ["","",""] })
                }
            }

        }
        
        fs.writeFile('Artists.txt', JSON.stringify(艺术家), function (err) {
            if (err) {
                return console.error(err);
            }

            console.log("Data written successfully!");
            console.log("Let's read newly written data");

            fs.readFile('Artists.txt', function (err, data) {
                if (err) {
                    return console.error(err);
                }


            });
        });
    }
    else {


    }


});




//作曲作品集 Compositions
app.get('/Compositions', function (req, res) {
    if (所有艺术品.length == 0) {
        res.redirect("/*")
    }
    var 作曲作品html = 加载艺术作品("作曲作品",true);
    res.send(作曲作品html);
})

app.post('/Compositions', urlencodedParser, function (req, res) {

    var account = {
        "username": req.body.username,
    }
    
    var 作曲作品html = 加载艺术作品("作曲作品", true, req.body.username);
    console.log(req.body.username);
    res.send(作曲作品html);
})
//作曲作品集

//艺术作品集 Paintings
app.get('/Paintings', function(req,res){
    if (所有艺术品.length == 0) {
        res.redirect("/*")
    }
   
   var 艺术作品html = 加载艺术作品("美术作品",true);
   res.send(艺术作品html);
})
app.post('/Paintings', urlencodedParser, function (req, res) {

    var account = {
        "username": req.body.username,
    }
    var 艺术作品html = 加载艺术作品("美术作品", true, req.body.username);
    res.send(艺术作品html);
})
//艺术作品集

//单个艺术作品/作曲作品 single artwork/composition
app.get('/Artwork_details/:n', function (req, res) {
   if (所有艺术品.length == 0) {
       res.redirect("/*")
   }
   var n = parseInt(req.params.n);
   var details = 加载艺术作品(n,true);
   
   res.send(details);




})
app.post('/Artwork_details/:n', urlencodedParser, function (req, res) {
    var account = {
        "username": req.body.username,
    }
    var n = parseInt(req.params.n);
    var details = 加载艺术作品(n, true, req.body.username);

    res.send(details);




})
//单个艺术作品/作曲作品

//账号 Account
app.post('/Account',urlencodedParser, function(req,res){

   var Accounts = fs.readFileSync('Accounts.txt');
   
   
   
   var Accounts = JSON.parse(Accounts);
   
   
   var account = {
      "username":req.body.username,
      "password":req.body.password,
      "firstname": req.body.first_name,
      "lastname":req.body.last_name,
      

   };
   console.log(account["registered"])
   account["registered"] = false;
   console.log(account["registered"])
   for(var x=0;x < Accounts.length;x++)
   {

      if(Accounts[x]["username"] == account["username"]){
         
         if(Accounts[x]["password"] == account["password"]){
            
            account["registered"] = true;
            account["firstname"] = Accounts[x]["FirstName"]
             account["lastname"] = Accounts[x]["LastName"]
             account["WrittenComments"] = Accounts[x]["WrittenComments"]
         }
         else
         {
            account["password"] = ""; 
            
            res.send("Incorrect Password");
            

         }
      }
   }
   if(account["registered"]==false)
   {
      Accounts.push({"FirstName":req.body.first_name,"LastName":req.body.last_name,"email":req.body.email,"username":req.body.username,"password":req.body.password,"Likes":[],"WrittenComments":{}});
      fs.writeFile('Accounts.txt', JSON.stringify(Accounts), function(err) {
      if (err) {
         return console.error(err);
      }

   });


   }
    var 是作者 = false;

    var Artists = fs.readFileSync('Artists.txt');

    var name = "";

    var Artists = JSON.parse(Artists);
    for (var i = 0; i < Artists["Artists"].length; i++)
    {
        if (Artists["Artists"][i]["姓名"].toLowerCase() == (account["lastname"] + " " + account["firstname"]).toLowerCase()){
            是作者 = true;
            name = Artists["Artists"][i]["姓名"];
            name = name.replace(" ", "-");
        }
    }
    console.log(是作者);
    var additionalComments = "";
    
    if (是作者) {

        CommentedWorks = "";
        for (const [key, value] of Object.entries(account["WrittenComments"])) {
            CommentedWorks += "<dd>艺术作品："+key+"       评论："+value+"</dd>"
        }
        additionalComments = '<form action="/Edit/' + name + '" method="POST">根据记录你有作品，进行自我介绍 From record, you are artist, writ bio:</br><textarea type="text" name="bio" rows="4" cols="50"></textarea></br><input type="submit" value="Submit"></form><p>我的评论：</p><dt>' + CommentedWorks+"</dt>";

    }
    res.send(Index + '<script>document.getElementById("account").textContent = "Hello, ' + account["username"] + "\"; document.getElementById(\"login\").innerHTML = '" + additionalComments + "';</script>");
   

})
//账号

//编辑个人信息 Edit biography
app.post('/Edit/:name', urlencodedParser, function (req, res) {
    var Artists = fs.readFileSync('Artists.txt');
    var Artists = JSON.parse(Artists);
    var name = req.params["name"];
    name = name.replace("-", " ");
    console.log(name);
    for (var i = 0; i < Artists["Artists"].length; i++) {
        console.log(Artists["Artists"][i]["姓名"]);
        if (Artists["Artists"][i]["姓名"] == name) {
            Artists["Artists"][i]["简介"][2] = req.body.bio;
        }
    }
    fs.writeFile('Artists.txt', JSON.stringify(Artists), function (err) { })
    res.redirect("/");


});
//编辑个人信息

/*
app.post('/Artworks',urlencodedParser,function(req,res){


})
*/
//检索艺术家的艺术作品 Searching artist's artworks
app.get('/name', function (req, res) {
    if (所有艺术品.length == 0) {
        res.redirect("/*")
    }
    var name = req.query['artwork'].toLowerCase();
    var RelevantArtworks = [];
    console.log(req)
    console.log(name)
    RelevantArtworks = 所有艺术品.filter(艺术品_ => 艺术品_.名称.toLowerCase().includes(name) || 艺术品_.作者.filter(n => n.toLowerCase().includes(name)) > 0)
    /*
    for(let i=0;i<所有艺术品.length;i++){
        if(所有艺术品[i].名称.includes(name)){
            RelevantArtworks.push(所有艺术品[i]);
        }
    }*/
    var result = "";
    console.log(RelevantArtworks.length);
    for(let i=0;i<RelevantArtworks.length;i++) {
        result += 加载艺术作品(RelevantArtworks[i].id,false);
    }
    res.send(result);



})

app.post('/name', urlencodedParser, function (req, res) {

    console.log(req.body)
    
    var name = req.body['artwork'].toLowerCase();
    var RelevantArtworks = [];

    RelevantArtworks = 所有艺术品.filter(艺术品_ => 艺术品_.名称.toLowerCase().includes(name) || 艺术品_.作者.filter(n => n.toLowerCase().includes(name)) > 0)
    /*
    for(let i=0;i<所有艺术品.length;i++){
        if(所有艺术品[i].名称.includes(name)){
            RelevantArtworks.push(所有艺术品[i]);
        }
    }*/
    var result = "";
    console.log(RelevantArtworks.length);
    for (let i = 0; i < RelevantArtworks.length; i++) {
        result += 加载艺术作品(RelevantArtworks[i].id, false);
    }
    res.send(result);



})
//检索艺术家的艺术作品

//艺术家 Artists
app.get('/Artists/:n', function (req, res) {
    if (所有艺术品.length == 0) {
        res.redirect("/*")
    }
    console.log(req.params["n"]);
    var Artists = fs.readFileSync('Artists.txt');
    var Artists = JSON.parse(Artists);
    var number = req.params["n"];
    if (typeof (number) + "" == "string") {
        for (var i = 0; i < Artists["Artists"].length; i++){
            console.log(Artists["Artists"][i]["姓名"]);
            if (Artists["Artists"][i]["姓名"] == number + "") {
                console.log(number + "");
                number = i;
                break;
            }
        }
    }
    
    var html = "<!DOCTYPE html><html><head>";
    var details = Artists["Artists"][number];
    try {
        html += "<title>" + details["姓名"] + "</title>";
        html += "<ul><li>姓名 Name: " + details["姓名"] + "</li>";
        html += "<li>简介 Introduction: " + details["简介"][2] + "</li></ul>";
        html += "</head></html>"
        res.send(html);
    } catch {
        res.status(404).send("无法找到艺术家 Cannot find artist");
        res.redirect("/");
    }

})
app.post('/Artists/:n', urlencodedParser, function (req, res) {
    response = {
        username: req.body['username'],
        comments: req.body['comment']

    };

    console.log(req.body['username']);
    var Artists = fs.readFileSync('Artists.txt');
    var Artists = JSON.parse(Artists);
    var number = req.params["n"];
    if (typeof (number) + "" == "string") {
        for (var i = 0; i < Artists["Artists"].length; i++) {
            console.log(Artists["Artists"][i]["姓名"]);
            if (Artists["Artists"][i]["姓名"] == number + "") {
                console.log(number + "");
                number = i;
                break;
            }
        }
    }

    var html = "<!DOCTYPE html><html><head>";
    var details = Artists["Artists"][number];
    try {
        html += "<title>" + details["姓名"] + "</title>";
        html += "<ul><li>姓名 Name: " + details["姓名"] + "</li>";
        html += "<li>简介 Introduction: " + details["简介"][2] + "</li></ul>";
        html += "</head></html>"
        res.send(html);
    } catch {
        res.send("无法找到艺术家 Cannot find artist");
        res.redirect("/");
    }

})
//艺术家

//主页 Mainpage
app.get('/*', function (req, res) {
   /*
   var Accounts = fs.readFileSync('Accounts.txt');
   Accounts = JSON.parse(Accounts);

   Accounts.push('{"name":""}');
   fs.writeFile('Accounts.txt', JSON.stringify(Accounts), function(err) {
      if (err) {
         return console.error(err);
      }

   });*/
   const ip = req.clientIp;
    console.log(ip);
    var 艺术作品 = fs.readFileSync('艺术作品.txt');
    var 艺术作品 = JSON.parse(艺术作品);

    if (所有艺术品.length == 0) {
        for (var i = 0; i < 艺术作品.length; i++) {


            所有艺术品.push(new 艺术品(艺术作品[i]["作品名称"], 艺术作品[i]["作者"], 艺术作品[i]["类型"],i));

        }
    }
    
    res.send('' + Index);
    

})
//主页

//评论艺术作品 Commenting artwork
app.post('/Commenting/:n', urlencodedParser, function (req, res) {
    response = {
        username: req.body['username'],
        comments: req.body['comment']
        
    };
    console.log(req.body)
    if (typeof (req.body['comment']) == "undefined") {
        console.log(req.body)
        res.sendStatus(404);
    }
    var 艺术作品 = fs.readFileSync('艺术作品.txt');
    var 艺术作品 = JSON.parse(艺术作品);
    var Accounts = fs.readFileSync('Accounts.txt');
    var Accounts = JSON.parse(Accounts);

    var number = req.params["n"];
    if (typeof(response["username"]) == "undefined") {
        艺术作品[number]["Comments"].push(response["comments"]);

    } else {
        艺术作品[number]["Comments"].push(response["username"] + ": " + response["comments"]);
        for (var i = 0; i < Accounts.length; i++) {
            if (Accounts[i].username == response["username"]) {
                var name = 艺术作品[number]["作品名称"];
                Accounts[i].WrittenComments[name] = response["comments"];
                break;
            }
        }
    }
    fs.writeFile('Accounts.txt', JSON.stringify(Accounts), function (err) {
        if (err) {
            return console.error(err);
        }
    });
    fs.writeFile('艺术作品.txt', JSON.stringify(艺术作品), function (err) {
        if (err) {
            return console.error(err);
        }
    });
    
    //res.redirect(/Artwork_details/ + number);
    console.log(JSON.stringify(req.body));
    console.log(JSON.stringify(艺术作品));
    var scripts = "var f = document.createElement('form');";
    scripts += "\nf.action = '/Artwork_details/" + number + "';";
    scripts += "\nf.method = 'POST';";
    scripts += "\nvar i = document.createElement('input');";
    scripts += "\ni.type = 'hidden';";
    scripts += "\ni.name = 'username';";
    scripts += "\ni.value = '" + req.body['username'] + "';";
    scripts += "\nf.appendChild(i);";
    scripts += "\ndocument.body.appendChild(f);";
    scripts += "\nf.submit();";
    res.send("<!DOCTYPE html><body></body><script>" + scripts + "</script>");
})

//评论艺术作品



var server = app.listen(8080, function () {
    
    var host = server.address().address
    
    var port = server.address().port
    
   
   
})


//Loads Artwork(s)

//Upload Artworks
/*
// Set up the storage engine for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize Multer with the storage engine
const upload = multer({ storage: storage });

// Serve HTML form for file upload
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle file upload using Multer
app.post('/upload', upload.single('myFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    res.send('File uploaded successfully!');
});
*/
//Upload Artworks

function 加载艺术作品(类型, wholePage, username = "") {
    var 艺术作品html = Starting + "<link rel=\"stylesheet\" href=\"http://127.0.0.1:8080/style.css\">";
    var 艺术作品 = fs.readFileSync('艺术作品.txt');
    var 艺术作品 = JSON.parse(艺术作品);
    
    
    if (typeof (类型) + "" == "string") {
        
        if (类型 == "美术作品") {
            艺术作品html += "<title>美术作品 Paintings</title><dl>";
            console.log(所有艺术品.length);
            for (var i = 0; i < 所有艺术品.length; i++) {
                if (所有艺术品[i].类型[0] == "美术作品") {

                    艺术作品html += '<dt><a href="/美术作品/' + 所有艺术品[i].名称 + '.' + 所有艺术品[i].类型[1] + '"><img src="/美术作品/' + 所有艺术品[i].名称 + '.' + 所有艺术品[i].类型[1] + '" width="500" height="333"></a></dt>';
                    艺术作品html += '<dd id="美术作品">作品名称 Name：' + 所有艺术品[i].名称;
                    艺术作品html += '<dd id="美术作品">作者 Author：' + 所有艺术品[i].作者.join(",");
                    艺术作品html += '<dd id="美术作品">类型 Type：' + 所有艺术品[i].类型.join(",");
                    if (username != "") {
                        
                        艺术作品html += '<dd id="美术作品"><p onclick="redirect(\'/Artwork_details/' + i + '\')">详情</p></dd>'
                        艺术作品html += "<script>function redirect(link) { var f = document.createElement('form');f.action = link; f.method = 'POST'; var i = document.createElement('input'); i.type = 'hidden';i.name = 'username';i.value = '"+username+"';f.appendChild(i);document.body.appendChild(f);f.submit();}</script>";

                    } else {
                        艺术作品html += '<dd id="美术作品"><a href="/Artwork_details/' + i + '">详情</a></dd>'
                    }
                }

            }
            艺术作品html += "</dl>" + Ending;

        } else if (类型 == "作曲作品") {
            艺术作品html += "<title>作曲作品 Compositions</title><dl>";

            for (var i = 0; i < 所有艺术品.length; i++) {
                if (所有艺术品[i].类型[0] == "作曲作品") {

                    艺术作品html += '<dt><audio controls><source src="/作曲作品/' + 所有艺术品[i].名称 + '.' + 所有艺术品[i].类型[1] + '" type="audio/' + 所有艺术品[i].类型[1] + '"></audio></dt>';
                    艺术作品html += '<dd id="作曲作品">音乐名称 Name：' + 所有艺术品[i].名称;
                    艺术作品html += '<dd id="作曲作品">类型 Type：' + 所有艺术品[i].类型.join(",");
                    艺术作品html += '<dd id="作曲作品">作曲者 Composer：' + 所有艺术品[i].作者.join(",");

                    if (username != "") {
                        
                        艺术作品html += '<dd id="作曲作品"><p onclick="redirect(\'/Artwork_details/' + i + '\')">详情</p></dd>'
                        艺术作品html += "<script>function redirect(link) { var f = document.createElement('form');f.action = link; f.method = 'POST'; var i = document.createElement('input'); i.type = 'hidden';i.name = 'username';i.value = '" + username + "';f.appendChild(i);document.body.appendChild(f);f.submit();}</script>";

                    } else {
                        艺术作品html += '<dd id="作曲作品"><a href="/Artwork_details/' + i + '">详情</a></dd>'
                    }



                    //艺术作品html += '<dd id="作曲作品"><a href="/Artwork_details/' + i + '">详情</a></dd>';

                }

            }

            艺术作品html += "</dl>" + Ending;
        }
        if (wholePage == false) {
            艺术作品html = 艺术作品html.replace(Starting, "");
            艺术作品html = 艺术作品html.replace(Ending, "");
        }
        return 艺术作品html;
    }
    else if (typeof (类型) + "" == "number") {
        艺术作品html += "<title>" + 艺术作品[类型]["作品名称"] + "</title><dl>";
        if (艺术作品[类型]["类型"][0] == "作曲作品") {
            艺术作品html += '<dt><audio controls><source src="/作曲作品/' + 艺术作品[类型]["作品名称"] + '.' + 艺术作品[类型]["类型"][1] + '" type="audio/' + 艺术作品[类型]["类型"][1] + '"></audio></dt>';
            艺术作品html += '<dd id="作品">音乐名称 Name：' + 艺术作品[类型].作品名称 + '</dd>';
            艺术作品html += '<dd id="作品">类型 Type：' + 艺术作品[类型]["类型"].join(",") + '</dd>';
            艺术作品html += '<dd id="作品">作曲者 Composer：';
            for (var i = 0; i < 艺术作品[类型]["作者"].length; i++) {
                if (username != "") {

                    艺术作品html += '<p onclick="redirect(\'/Artists/' + i + '\')">' + 艺术作品[类型]["作者"][i]+'</p>'
                    艺术作品html += "<script>function redirect(link) { var f = document.createElement('form');f.action = link; f.method = 'POST'; var i = document.createElement('input'); i.type = 'hidden';i.name = 'username';i.value = '" + username + "';f.appendChild(i);document.body.appendChild(f);f.submit();}</script>";

                } else {
                    艺术作品html += "<a href='/Artists/" + 艺术作品[类型]["作者"][i] + "'>" + 艺术作品[类型]["作者"][i] + "</a>，"
                }
                
            }
            艺术作品html += "</dd>"
            艺术作品html += '<dd id="作品">喜欢 Likes：' + 艺术作品[类型]["喜欢"] + '</dd>'
            艺术作品html += '<dd id="作品">评论 Comments：<ul><li>\n' + 艺术作品[类型]["Comments"].join("</li><li>") + '</li></ul></dd>'
            
        }

        else if (艺术作品[类型]["类型"][0] == "美术作品") {
            艺术作品html += '<dt><a href="/美术作品/' + 艺术作品[类型]["作品名称"] + '.' + 艺术作品[类型]["类型"][1] + '"><img src="/美术作品/' + 艺术作品[类型]["作品名称"] + '.' + 艺术作品[类型]["类型"][1] + '" width="500" height="333"></a></dt>';
            艺术作品html += '<dd id="作品">作品名称 Name：' + 艺术作品[类型].作品名称;
            艺术作品html += '<dd id="作品">作者 Author：';
            for (var i = 0; i < 艺术作品[类型]["作者"].length; i++) {
                if (username != "") {

                    艺术作品html += '<p onclick="redirect(\'/Artists/' + i + '\')">' + 艺术作品[类型]["作者"][i] + '</p>'
                    艺术作品html += "<script>function redirect(link) { var f = document.createElement('form');f.action = link; f.method = 'POST'; var i = document.createElement('input'); i.type = 'hidden';i.name = 'username';i.value = '" + username + "';f.appendChild(i);document.body.appendChild(f);f.submit();}</script>";

                } else {
                    艺术作品html += "<a href='/Artists/" + 艺术作品[类型]["作者"][i] + "'>" + 艺术作品[类型]["作者"][i] + "</a>，"
                }
                
            }
            艺术作品html += '</dd>'
            艺术作品html += '<dd id="作品">类型 Type：' + 艺术作品[类型]["类型"].join(",");
            艺术作品html += '<dd id="作品">喜欢 Likes：' + 艺术作品[类型]["喜欢"] + '</dd>'
            艺术作品html += '<dd id="作品">评论 Comments：<ul><li>\n' + 艺术作品[类型]["Comments"].join("</li><li>") + '</li></ul></dd>'
        }
        if (username != "") {
            艺术作品html += '<form id = "作品" action = "/Commenting/' + 类型 + '" method = "POST">Comments</br><input type="hidden" name = "username" value = "'+username+'"><br><textarea id = "作品" type = "text" name = "comment" rows="4" cols="50"></textarea></br><input type = "submit" value = "Submit"></form>'


        } else {
            艺术作品html += '<form id = "作品" action = "/Commenting/' + 类型 + '" method = "POST">Comments</br><textarea id = "作品" type = "text" name = "comment" rows="4" cols="50"></textarea></br><input type = "submit" value = "Submit"></form>'
        }

        艺术作品html += '</dl>' + Ending;
        if (wholePage == false) {
            艺术作品html = 艺术作品html.replace(Starting, "");
            艺术作品html = 艺术作品html.replace(Ending, "");
        }
        return 艺术作品html;
    }

}



class 艺术品 {
    constructor(名称, 作者, 类型,id) {
        this.名称 = 名称;
        this.作者 = 作者;
        this.类型 = 类型;
        this.年份 = "";
        this.id = id;
        try {
            this.年份 = fs.statSync('public/' + 类型[0] + '/' + 名称 + '.' + 类型[1]).birthtime;
        } catch {

        }
        console.log(this["名称"]);
    }
    
}

module.exports = app;