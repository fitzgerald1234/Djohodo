import nodemailer from 'nodemailer'

export class Mail {
    constructor(settings ) {
        this.settings = settings;
       // console.log(settings);
        this.options = {
            from: 'arealinvigstone@gmail.com',
            to: '',
            subject: '',
            text: '',
            html: ''
           // html: "<p style='font-weight:bold; font-size:25px;'> Hi. My name is John </p>"
        };
    }

    async  send(to, subject, body) {
        if(nodemailer && this.options) {
            let self = this;
           // console.log(self.settings);
            const transporter = nodemailer.createTransport(self.settings);
            self.options.to = to;
            self.options.subject = subject;
            self.options.html = body;
            await transporter.sendMail(self.options, (error, info) => {
                if(error) {
                    console.log(error);
                } else {
                console.log("okkkk");    
                }
            });
        }
    }
}

