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
    options: new Schema({
        siteurl: 
        {
            type: String,
            default: "myCMS.js",
            required: true
        },
        home: 
        {
            type: String,
            default: "myCMS.js",
            required: true
        },
        site_name: 
        {
            type: String,
            default: "myCMS.js",
            required: true
        },
        site_description: 
        {
            type: String,
            default: "myCMS.js",
            required: true
        },
        users_can_register:
        {
            type: Boolean,
            default: false,
            required: true
        },
        admin_email: 
        {
            type: String,
            default: "myCMS@mail.com",
            required: true
        },
        start_of_week: 
        {
            type: Number,
            min: 0,
            max: 6,
            default: 1
        },
        use_balance_tags: 
        {
            type: Boolean,
            default: false,
            required: true
        },
        use_smiles: 
        {
           type: Boolean,
           default: true,
           required: true 
        },
        require_name_email: 
        {
            type: Boolean,
            default: true,
            required: true
        },
        comments_notify: 
        {
            type: Boolean,
            default: true,
            required: true
        },
        posts_for_rss:
        {
            type: Number,
            required: true
        },
        rss_use_excerpt: 
        {
            type: Boolean,
            default: false,
            required: true
        },
        mail_server_url:
        {
            type: String,
            default: "mail.example.com",
            required: true
        },
        mailserver_login:
        {
            type: String,
            default: "login@example.com",
            required: true
        },
        mailserver_pass: 
        {
            type: String,
            default: "login@example.com",
            required: true
        },
        mailserver_pass: 
        {
            type: String,
            default: "password",
            required: true   
        },
        mailserver_port:
        {
            type: Number,
            default: 110,
            required: true
        },
        default_category: 
        {
            type: Boolean,
            default: true,
            required: true
        },
        default_comment_status:
        {
            type: String,
            required: true,
            default: "open"
        },
        default_ping_status: 
        {
            type: String,
            required: true,
            default: "open"
        },
        default_pingback_flag: 
        {
            type: Boolean,
            required: true,
            default: true
        },
        posts_for_page:
        {
            type: Number,
            min: 0,
            max: 500
        },
        date_format:
        {
            type: String,
            default: "m/d/y",
            required: true
        },
        time_format:
        {
            type: String,
            default: "h:i",
            required: true
        },
        links_updated_date_format: 
        {
            type: String,
            default: "m/d/y h:i",
            required: true
        },
        comment_moderation:
        {
            type: Boolean,
            default: false,
            required: true
        },
        moderation_notify:
        {
            type: Boolean,
            default: true,
            required: true
        },
        hack_file: 
        {
            type: Boolean,
            required: true,
            default: false
        },
        site_charset: 
        {
            type: String,
            required: true,
            default: "UTF-8"
        },
        moderation_keys: String,
        active_plugins:
        [
            new Schema(
            {
                name: String,
            })
        ],
        category_base: 
        {
            type: String,
            default: ""
        },
        ping_sites: 
        {
            type: String,
            required: true,
            default: "http://rpc.pingomatic.com/"
        },
        comment_max_links: 
        {
            type: Number,
            default: 2,
            required: true
        },
        gmt_offset: 
        {
            type: Boolean,
            default: false,
            required: true
        },
        default_email_category: 
        {
            type: Boolean,
            required: true,
            default: true
        },
        recently_edited: 
        {
            type: String,
            required: true,
            default: ""
        },
        template: 
        {
            type: String,
            default: "default_theme",
            required: true
        },
        stylesheet: 
        {
            type: String,
            default: "default_theme",
            required: true
        },
        comment_whitelist: 
        {
            type: Boolean,
            default: true,
            required: true
        },
        blacklist_keys: 
        {
            type: String,
            default: "",
            required: true
        },
        comment_registration: 
        {
            type: Boolean,
            required: true,
            default: false
        },
        html_type: 
        {
            type: String,
            default: "text/html",
            required: true
        },
        use_trackback: 
        {
            type: Boolean,
            required: true,
            default: false
        },
        default_role: 
        {
            type: String,
            default: "subscribe",
            required: true
        },
        db_version: 
        {
            type: Number,
            default: 47018,
            required: true
        },
        uploads_use_yearmonth_folders:
        {
            type: Boolean,
            default: true,
            required: true
        },
        upload_path:
        {
            type: String,
            default: "",
            required: true
        },
        site_public: 
        {
            type: Boolean,
            required: true,
            default: true
        },
        default_link_category: 
        {
            type: Number,
            required: true,
            default: 2
        },
        show_on_front: 
        {
            type: String,
            required: true,
            default: "posts"
        },
        tag_base: String,
        show_avatars: 
        {
            type: Boolean,
            required: true
        },
        avatar_rating: 
        {
            type: String,
            required: true
        },
        upload_url_path: String,
        thumbnail_size_w: 
        {
            type: Number,
            required: true,
            default: 150
        },
        thumbnail_size_h: 
        {
            type: Number,
            required: true,
            default: 150
        },
        thumbnail_crop: 
        {
            type: Boolean,
            required: true
        },
        medium_size_w: 
        {
            type: Number,
            required: true,
            default: 300
        },
        medium_size_h: 
        {
            type: Number,
            required: true,
            default: 300
        },
        avatar_default: 
        {
            type: String,
            required: true,
            default: "theme_avatar_default"
        },
        large_size_w: 
        {
            type: Number,
            required: true,
            default: 1024,
        },
        large_size_h: 
        {
            type: Number,
            required: true,
            default: 1024
        },
        image_default_link_type: 
        {
            type: String,
            default: "none",
            required: true
        },
        image_default_size: 
        {
            type: Number,
            required: true
        },
        image_default_align: 
        {
            type: Number,
            required: true
        },
        close_comments_for_old_posts: 
        {
            type: Boolean,
            required: true,
            default: false
        },
        close_comments_days_old: 
        {
            type: Number,
            required: true,
            default: 14
        },
        thread_comments:
        {
            type: Boolean,
            required: true,
            default: true
        },
        thread_comments_depth: 
        {
            type: Number,
            required: true,
            default: 5
        },
        page_comments: 
        {
            type: Boolean,
            required: true,
            default: false
        },
        comments_per_page: 
        {
            type: Number,
            min: 50,
            max: 200
        },
        default_comment_page: 
        {
            type: String,
            required: true,
            default: "newest"
        },
        comment_order:
        {
            type: String,
            required: true,
            default: "asc"
        },
        widget_categories: 
        [
            new Schema({
                title: String
            })
        ],
        widget_text: 
        [
            new Schema(
            {
                content: String
            })
        ],
        widget_rss: 
        [
            new Schema(
            {
                content: String
            })
        ],
        uninstall_plugins: 
        [
            new Schema(
            {
                title: String,
                content: String
            })
        ],
        timezone_string: 
        {
            type: String,
            required: true,
            default: "Europe/Rome"
        },
        page_for_posts: 
        {
            type: Boolean,
            required: true,
            default: false
        },
        page_on_front: 
        {
            type: Boolean,
            required: true,
            default: false
        },
        default_post_format: 
        {
            type: Boolean,
            required: true,
            default: false
        },
        link_manager_enabled: 
        {
            type: Boolean,
            required: true,
            default: false
        }
    });
};