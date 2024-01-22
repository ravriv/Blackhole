function blackhole(element) {
    const canvas = document.querySelector(element);
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const centerx = canvas.width / 2;
    const centery = canvas.height / 2;
    const maxStars = 1000;
    const circleRadius = Math.min(canvas.width, canvas.height) / 2;

    context.strokeStyle = 'rgba(255,255,255,1)';
    context.lineWidth = 0.5;

    class Star {
        constructor() {
            this.distanceFromCenter = Math.random() * circleRadius;
            this.angle = Math.random() * 2 * Math.PI;
            this.speed = (Math.random() * 3 + 1.5) * Math.PI / 180 * (1 - this.distanceFromCenter / circleRadius);
            this.rotation = Math.random() * 2 * Math.PI;
            this.color = `rgba(255,255,255,${1 - this.distanceFromCenter / circleRadius})`;
            this.brightness = 1 - this.distanceFromCenter / circleRadius;
        }

        draw() {
            this.angle += this.speed;
            const newX = centerx + this.distanceFromCenter * Math.cos(this.angle);
            const newY = centery + this.distanceFromCenter * Math.sin(this.angle);

            if (this.distanceFromCenter > circleRadius / 2) {
                context.beginPath();
                context.moveTo(this.x, this.y);
                context.lineTo(newX, newY);
                context.stroke();
            }

            this.x = newX;
            this.y = newY;
        }
    }

    function loop() {
        context.fillStyle = 'rgba(0,0,0,0.2)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => star.draw());
        requestAnimationFrame(loop);
    }

    const stars = Array.from({ length: maxStars }, () => new Star());

    loop();
}

blackhole('#blackhole');