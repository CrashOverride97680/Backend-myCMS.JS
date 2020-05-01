// IMPORT MODULES NODEJS
const mongoose = require('mongoose');
const { Schema } = mongoose;
// EXPORTING MODULES WITH SCHEMA
module.exports = {
    users: new Schema({
        admin:
        {
            type: Boolean,
            required: true,
            default: false
        },
        email:
        {
            type: String,
            required: true
        },
        password:
        {
            type: String,
            required: true
        },
        username:
        {
            type: String,
            required: true
        },
        name:
        {
            type: String,
            required: true
        },
        surname:
        {
            type: String,
            required: true
        },
        confirmed:
        {
            type: Boolean,
            required: true,
            default: false
        },
        create: { type: Date },
        updated: { type: Date, default: Date.now, required: true },
        modified: { type: Date, default: Date.now, required: true },
    }),
    posts: new Schema({
        template:
        {
            type: String,
            default: 'default'
        },
        page:
        {
            type: String,
            required: true
        },
        lang:
        {
            type: Number,
            required: true
        },
        typePage:
        {
            type: Number,
            required: true
        },
        backgroundImage: String,
        h1: 
        {
            type: String,
            required: true
        },
        mainContent:
        {
            type: String,
            required: true
        },
        breadcrumbs:
        {
            type: String,
            required: true
        },
        bodyPosts:
        [
            new Schema({
                h2: String,
                content: String,
                images:
                [
                    new Schema({
                        url: String,
                        alt: String,
                        textBoxImg: String
                    })
                ]
            })
        ],
        gallery:
        [
            new Schema({
                url: String,
                alt: String,
                textBoxImg: String
            })
        ],
        visible: 
        {
            type: Boolean,
            required: true
        }
    }),
    lang: new Schema({
        nameLang: 
        {
            type: String,
            required: true
        },
        codeLang:
        {
            type: String,
            required: true
        },
        charset:
        {
            type: String,
            required: true
        }
    }),
    typePosts: new Schema({
        typePostCode:
        {
            type: String,
            required: true
        },
        name: 
        {
            type: String,
            required: true
        }
    }),
    info: new Schema({
        name: 
        {
            type: String,
            required: true
        },
        logo: new Schema({
            stringImg: 
            {
                type: String,
                required: true
            },
            alt: 
            { 
                type:String,
                required: true
            }
        }),
        address: 
        {
            type:String,
            required: true
        },
        tel1: String,
        tel2: String,
        phone1: String,
        phone2: String,
        email:String,
        pec: String,
        lat: String,
        long: String,
        visible:
        {
            type: Boolean,
            required: true,
            default:false
        }
    }),
};