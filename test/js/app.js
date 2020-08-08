/**
* @name app.js
* @file Add a small description for this file.
* @author <Add Your Name Here>, <addyouremail@mail.com>
* @version 1.0.0
*/

"use strict"

window.addEventListener('load', init, false);

function init() {
    console.log('Game running!');

    //Add Stats
    var stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
    
    var requestId;
    
    function update() {
        stats.begin();

        //Add here your game code that needs to be update every frame.
        stats.end();

        requestId = requestAnimationFrame(update);
    }

    update();

    //Add here your game code that does not needs to be update every frame.
}