game.module(
    'game.main'
)
.body(function() {

game.addAsset('panda.png');

var sprites = [];
var fps = [];
var startTime;
var last;
var frames = 0;
var gravity = 0.75;
var ready = false;
var maxX = 800;
var minX = 0;
var maxY = 600;
var minY = 0;

game.createScene('Main', {
    init: function() {
        this.addSprite(5000);
        console.log(this.stage.width, this.stage.height);
        startTime = Date.now();
        last = startTime + 2000; // Skip first 2 seconds
    },

    addSprite: function(count) {
        for (var i = 0; i < count; i++) {
            var sprite = new game.Sprite('panda.png');
            sprite.speedX = Math.random() * 10;
            sprite.speedY = Math.random() * 10 - 5;
            sprite.rotationSpeed = 0.1 + Math.random() * 0.3;
            sprite.anchor.set(sprite.width / 2, sprite.height / 2);
            sprite.position.x = Math.random() * maxX;
            sprite.position.y = Math.random() * maxY;
            sprite.addTo(this.stage);
            sprites.push(sprite);
        }
    },

    update: function() {
        if (ready) return;

        var now = Date.now();

        if (now >= last) frames++;
        if (now >= last + 500) {
            fps.push(Math.round((frames * 1000) / (now - last)));
            last = now;
            frames = 0;
        }
        if (now >= startTime + 1000 * 10) {
            var total = 0;
            for (var i = 0; i < fps.length; i++) {
                total += fps[i];
            }
            var average = total / fps.length;
            var precision = Math.pow(10, 1);
            average = Math.round(average * precision) / precision;

            ready = true;

            game.system._stopRunLoop();
            alert('FPS: ' + average);
            return;
        }

        var sprite;
        for (var i = 0; i < sprites.length; i++) {
            sprite = sprites[i];
            
            sprite.position.x += sprite.speedX;
            sprite.position.y += sprite.speedY;
            sprite.speedY += gravity;
            sprite.rotation += sprite.rotationSpeed;
            if (sprite.position.x > maxX) {
                sprite.speedX *= -1;
                sprite.position.x = maxX;
            }
            else if (sprite.position.x < minX) {
                sprite.speedX *= -1;
                sprite.position.x = minX;
            }
            if (sprite.position.y > maxY) {
                sprite.speedY *= -0.85;
                sprite.position.y = maxY;
                sprite.spin = (Math.random()-0.5) * 0.2
                if (Math.random() > 0.5) {
                    sprite.speedY -= Math.random() * 6;
                }
            } 
            else if (sprite.position.y < minY) {
                sprite.speedY = 0;
                sprite.position.y = minY;
            }
        }
    }
});

});
