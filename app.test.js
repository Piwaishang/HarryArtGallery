

'use strict';
const request = require('supertest');
const axios = require('axios');
const cheerio = require('cheerio');
const app = require('./index.js');
var fs = require('fs');
const { register } = require('./node_modules/tsconfig-paths/lib/index.js');




describe('Test the things service', () => {

    test('Basic, GET / succeeds', () => {
        return request(app).get('/').expect(200);
    });

    test('POST Commenting 作曲作品(Composition)《Child of me skateboarding》 with username 滑滑板摔倒的经历 (Not registered yet) (Part 1)', async () => {
        var username = "滑滑板摔倒的经历"
        const params = JSON.parse('{"username":"' + username + '", "comment": "滑板公园我看到别的滑板运动员滑滑板摔倒把膝盖摔伤，并且被纱布包扎" }');
        console.log(username + " said: " + params["comment"])
        
        return request(app)
            .post('/Commenting/1')
            .send(params)
            .expect(200);
    });
    test('POST Commenting 作曲作品(Composition)《Child of me skateboarding》 with username 滑滑板摔倒的经历 (Not registered yet) (Part 2)', async () => {
        try {
            // Make a request to the specified URL
            const response = await axios.get('http://127.0.0.1:8080/Artwork_details/1');

            // Load the HTML content into Cheerio for easier manipulation
            const $ = cheerio.load(response.data);

            // Extract the comments from the page
            const comments = $('dd#作品 ul li').map((_, element) => $(element).text()).get();
            console.log("Comments addressing composition Child of me Skateboarding🛹: " + comments)
            // Check if any comment mentions "Child of me Skateboarding"
            const commentsAddressingSpecific = comments.some(comment =>
                comment.includes('滑滑板摔倒的经历') && comment.includes('滑板公园我看到别的滑板运动员滑滑板摔倒把膝盖摔伤，并且被纱布包扎')
            );

            // Assert that at least one comment addresses the previous composition
            expect(commentsAddressingSpecific).toBeTruthy();
        } catch (error) {
            // Handle errors, such as network issues or invalid HTML format
            console.error('Error during test:', error.message);
            // Fail the test if an error occurs
            expect(error).toBeNull();
        }
    });
    test('POST Commenting 作曲作品(Composition)《Child of me skateboarding》 with username 滑滑板摔倒的经历 (Not registered yet), see if the account countains username 滑滑板摔倒的经历 (Pass means contain, fail means not contain) (Part 3)', async () => {
        var Accounts = fs.readFileSync('Accounts.txt');
        var Accounts = JSON.parse(Accounts);
        var registered = false;
        for (var x = 0; x < Accounts.length; x++) {

            if (Accounts[x]["username"] == "滑滑板摔倒的经历") {

                register = true;
            }
        }
        expect(registered).toBeTruthy();

        
    });
    
    test('Get artist xxx', () => {
        console.log("Get artists xxx");
        console.log(request(app).get('/Artists/0'));
        return request(app).get('/Artists/0').expect(200);

    });

    test("Test status if no username is included", ()=>{
        return request(app).post('/Compositions').expect(200);

    });

    
    test("Test content of artwork No. 2 is (Fantasia in F)", async () => {
        try {
            // Make a request to the specified URL
            const response = await axios.get('http://127.0.0.1:8080/Artwork_details/2');

            // Load the HTML content into Cheerio for easier manipulation
            const $ = cheerio.load(response.data);

            // Extract the content of the '作品' dd elements
            const typeContent = $('dd#作品:nth-child(2)').text();
            console.log("Composition for (MUSI1271): " + typeContent)
            // Assert that the content contains the expected type
            expect(typeContent).toContain('Fantasia in F');
        } catch (error) {
            // Handle errors, such as network issues or invalid HTML format
            console.error('Error during test:', error.message);
            // Fail the test if an error occurs
            expect(error).toBeNull();
        }

    });

    test('Check if the comments of composition Fantasia in F address the previous composition "Child of me Skateboarding"', async () => {
        try {
            // Make a request to the specified URL
            const response = await axios.get('http://127.0.0.1:8080/Artwork_details/2');

            // Load the HTML content into Cheerio for easier manipulation
            const $ = cheerio.load(response.data);

            // Extract the comments from the page
            const comments = $('dd#作品 ul li').map((_, element) => $(element).text()).get();
            console.log("Comments addressing composition (MUSI1271) Fantasia in F: " + comments)
            // Check if any comment mentions "Child of me Skateboarding"
            const mentionsPreviousComposition = comments.some(comment =>
                comment.includes('Child of me Skateboarding')
            );

            // Assert that at least one comment addresses the previous composition
            expect(mentionsPreviousComposition).toBeTruthy();
        } catch (error) {
            // Handle errors, such as network issues or invalid HTML format
            console.error('Error during test:', error.message);
            // Fail the test if an error occurs
            expect(error).toBeNull();
        }
    });

});


    

/*
var 艺术作品 = fs.readFileSync('艺术作品.txt');
var 艺术作品 = JSON.parse(艺术作品);

if (所有艺术品.length == 0) {
    for (var i = 0; i < 艺术作品.length; i++) {

        console.log(艺术作品[i]["评论"]);
        

    }
}*/