class Dot {
    constructor(props) {
        this.x = 0;
        this.y = 0;
        this.r = 20;
        this.vx = 0;
        this.vy = 0;
        this.strokeStyle = 'rgba(0, 0, 0, 0)';
        this.fillStyle = 'rgb(57, 119, 224)';
        this.alpha = 1;
        Object.assign(this, props);
        return this;
    }
    render(ctx) {
        let {
            x,
            y,
            r,
            fillStyle,
            strokeStyle,
            alpha
        } = this;
        ctx.save()
        ctx.translate(x, y);
        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        return this;
    }
    isPoint(pos) {
        let {
            x,
            y
        } = pos;
        return this.r >= Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
    }
}