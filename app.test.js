

'use strict';
const request = require('supertest');
const app = require('./index.js');
var fs = require('fs');



describe('Test the things service', () => {
    test('GET / succeeds', () => {
        return request(app).get('/').expect(200);
    });
    test('POST Commenting 作曲作品(Composition)《Child of me skateboarding》', () => {
        const params = JSON.parse('{ "comment": "又想起千岛湖夏令营我有膝盖摔伤的经历？？？小心分享作曲作品《Child of me Skateboarding》没人理之后夏令营期间看到别人膝盖摔伤" }');
        console.log("comment**"+params["comment"])
        return request(app)
            .post('/Commenting/1')
            .send(params)
            .expect(200);
    });
    
    test('Get artist', () => {

        return request(app).get('/Artists/0').expect(200);

    });

    
});
var 艺术作品 = fs.readFileSync('艺术作品.txt');
var 艺术作品 = JSON.parse(艺术作品);

if (所有艺术品.length == 0) {
    for (var i = 0; i < 艺术作品.length; i++) {

        console.log(艺术作品[i]["评论"]);
        

    }
}