class Edit {
    constructor(props) {
        this.img = new Image();
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.x2 = 0;
        this.y2 = 0;
        this.width2 = 0;
        this.height2 = 0;
        this.alpha = 1;
        Object.assign(this, props);
        return this;
    }
    render(ctx) {
        let {
            img,
            x,
            y,
            width,
            height
        } = this;
        if (!width) {
            width = img.width;
        }
        if (!height) {
            width = img.width;
        }
        ctx.drawImage(img, x, y, width, height);
        return this;
    }
    filter(ctx, type, rgb) {
        let {
            x,
            y,
            width,
            height
        } = this;
        ctx.drawImage(img, x, y, width, height);
        let imageData = ctx.getImageData(x, y, width, height);
        let data = imageData.data;
        // 处理图片为黑白
        if (type === 1) {
            for (let i = 0; i < data.length; i += 4) {
                let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = avg; // red
                data[i + 1] = avg; // green
                data[i + 2] = avg; // blue
            }
        }
        // 处理图片为复古
        if (type === 2) {
            for (let i = 0; i < data.length; i += 4) {
                data[i] = data[i] + 80; // red
                data[i + 1] = data[i + 1] + 30; // green
                data[i + 2] = data[i + 2] - 50; // blue
            }
        }
        // 处理图片为粉黛
        if (type === 3) {
            for (let i = 0; i < data.length; i += 4) {
                data[i] = data[i] + 61; // red
                data[i + 1] = data[i + 1] + 46; // green
                data[i + 2] = data[i + 2] + 71; // blue
            }
        }
        // 处理图片为清新
        if (type === 4) {
            for (let i = 0; i < data.length; i += 4) {
                data[i] = data[i] + 5; // red
                data[i + 1] = data[i + 1] + 66; // green
                data[i + 2] = data[i + 2] + 92; // blue
            }
        }
        // 处理为自定义颜色
        if (type === 9) {
            for (let i = 0; i < data.length; i += 4) {
                data[i] = data[i] + rgb.r; // red
                data[i + 1] = data[i + 1] + rgb.g; // green
                data[i + 2] = data[i + 2] + rgb.b; // blue
            }
        }
        ctx.putImageData(imageData, x, y);
    }
}