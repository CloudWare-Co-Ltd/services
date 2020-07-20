const express = require('express');
const path = require('path');
const router = express.Router();
const PdfPrinter = require('pdfmake');
const imageToBase64 = require('image-to-base64');
const moment = require('moment');
require('moment/locale/km');
/* GET users listing. */
router.get('/', async (req, res, next) => {
    let baseImage = await imageToBase64('https://eczasopisma.p.lodz.pl/public/journals/3/pageHeaderLogoImage_en_US.png');
    const fonts = {
        Roboto: {
            normal: path.join(__dirname, '..', 'public', '/fonts/Roboto/Roboto-Regular.ttf'),
            bold: path.join(__dirname, '..', 'public', '/fonts/Roboto/Roboto-Medium.ttf'),
            italics: path.join(__dirname, '..', 'public', '/fonts/Roboto/Roboto-Italic.ttf'),
            bolditalics: path.join(__dirname, '..', 'public', '/fonts/Roboto/Roboto-MediumItalic.ttf')
        },
        RobotoMono: {
            normal: path.join(__dirname, '..', 'public', '/fonts/Roboto/RobotoMono-Regular.ttf'),
            bold: path.join(__dirname, '..', 'public', '/fonts/Roboto/RobotoMono-Bold.ttf'),
            italics: path.join(__dirname, '..', 'public', '/fonts/Roboto/RobotoMono-Italic.ttf'),
            bolditalics: path.join(__dirname, '..', 'public', '/fonts/Roboto/RobotoMono-BoldItalic.ttf')
        },
        Content: {
            normal: path.join(__dirname, '..', 'public', '/fonts/Content-Regular.ttf'),
            bold: path.join(__dirname, '..', 'public', '/fonts/Content-Bold.ttf'),
        }
    };
    const printer = new PdfPrinter(fonts);
    const docDefinition = {
        defaultStyle: {
            font: 'Content'
        },
        pageSize: {
            width: 302.36220472,
            height: 'auto'
        },
        pageMargins: [20, 40, 20, 20],
        styles: {
            default: {
                font: 'Content',
            },
            roboto: {
                font: 'Roboto',
            }
        },
        content: [
            {
                image: 'data:image/jpeg;base64,' + baseImage,
                width: 250,
                alignment: 'center'
            },
            {
                text: 'ភូមិក្បាលស្ពាន២ សង្កាត់ប៉ោយប៉ែត ក្រុងប៉ោយប៉ែត',
                alignment: "center",
                fontSize: 10,
                style: ['default'],
                margin: [0, 2]
            },
            {
                text: [
                    {
                        text: 'ទូរស័ព្ទលេខ៖ ',
                        alignment: "center",
                        style: ['default'],
                        fontSize: 10,
                    },
                    {
                        text: '085 598 999/ 081 598 999',
                        style: ['roboto'],
                        fontSize: 10,
                    },
                ],
            },
            {
                text: [
                    {
                        text: 'អ្នកប្រើប្រាស់៖ ',
                        style: ['default'],
                        margin: [0, 5]
                    },
                    {
                        text: 'ទុន ចំរ៉ើន',
                        bold: true,
                        style: ['default'],
                        margin: [0, 5]
                    },
                ],
            },
            {
                canvas: [{
                    type: 'line',
                    x1: 0,
                    y1: 5,
                    x2: 262,
                    y2: 5,
                    lineWidth: 0.1
                }],
                alignment: 'center',
                margin: [0,2.5]
            },
            {
                table: {
                    headerRows: 1,
                    widths: ['*', 'auto'],
                    body: [
                        [{
                            text: 'ពិពណ៌នា',
                            // alignment: 'center',
                            bold: true
                        }, {
                            text: 'សាច់ប្រាក់',
                            alignment: 'right',
                            bold: true
                        }],
                        ['- ចំនួនលុយប្តូរ', {
                            text: [
                                {
                                    text: '10,000 ',
                                    alignment: 'right',
                                    style: ['roboto']
                                },
                                {
                                    text: 'បាទ',
                                    style: ['default'],
                                },
                            ],
                        }],
                        ['- អត្រា', {
                            text: [
                                {
                                    text: '134,9 ',
                                    alignment: 'right',
                                    style: ['roboto']
                                },
                                {
                                    text: 'រៀល',
                                    style: ['default'],
                                },
                            ],
                        }],
                        ['- ចំនួនលុយសរុប', {
                            text: [
                                {
                                    text: '1,349,000 ',
                                    alignment: 'right',
                                    fontSize: 15,
                                    bold: true,
                                    style: ['roboto']
                                },
                                {
                                    text: 'រៀល',
                                    style: ['default'],
                                },
                            ],
                        }],
                        ['- ចំនួនលុយបានទទួល', {
                            text: [
                                {
                                    text: '10,000 ',
                                    alignment: 'right'
                                },
                                {
                                    text: 'បាទ',
                                    style: ['default'],
                                },
                            ],
                        }],
                        ['- ចំនួនលុយអាប់', {
                            text: [
                                {
                                    text: '0 ',
                                    alignment: 'right'
                                },
                                {
                                    text: 'បាទ',
                                    style: ['default'],
                                },
                            ],
                        }]
                    ],
                },
                layout: {
                    hLineWidth: function (i, node) {
                        return 0;
                    },
                    vLineWidth: function (i, node) {
                        return 0;
                    }
                }
            },
            {
                text: 'សូមពិនិត្យព័ត៌មាន និងទឹកប្រាក់ អោយបានត្រឹមត្រូវមុននឹងចាកចេញ។',
                alignment: "center",
                style: ['default'],
                margin: [0, 5]
            },
            {
                text: [
                    {
                        text: 'ថ្ងៃខែឆ្នាំប្តូរប្រាក់៖ ',
                        alignment: "center",
                        style: ['default'],
                        fontSize: 13,
                        bold: true
                    },
                    {
                        text: moment().utcOffset('GMT+7').format('D MMMM YYYY, h:mm A'),
                        fontSize: 12,
                        bold: true,
                        style: ['default']
                    },
                ],
            },
            {
                canvas: [{
                    type: 'line',
                    x1: 0,
                    y1: 5,
                    x2: 250,
                    y2: 5,
                    lineWidth: 0.1
                }],
                alignment: 'center',
                margin: [0,5]
            },
            {
                text: [
                    {
                        text: '©',
                        style: ['roboto'],
                        alignment: "center",
                    },
                    {
                        text: ' រក្សាសិទ្ធិគ្រប់យ៉ាងដោយ មជ្ឈមណ្ឌល ខ្លោដវែរ',
                        alignment: "center",
                        style: ['default'],
                        margin: [0, 5]
                    },
                ]
            },
            {
                text: '085 598 999/ 081 598 999',
                style: ['roboto'],
                alignment: "center"
            },
        ],

    };

    const options = {
        // ...
    }
    const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(res);
    pdfDoc.end();
    /*pdfDoc.pipe(fs.createWriteStream('document.pdf'));
    pdfDoc.pipe(res);
    pdfDoc.end();*/
});

module.exports = router;
