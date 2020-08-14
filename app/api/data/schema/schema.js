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
      lang: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      header: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      create: { type: Date },
      updated: { type: Date, default: Date.now, required: true },
      modified: { type: Date, default: Date.now, required: true }
    }),
    gallery: new Schema({
      imgName: {
        type: String,
        required: true
      },
      imgPath: {
        type: String,
        required: true
      },
      create: { type: Date },
      updated: { type: Date, default: Date.now, required: true },
      modified: { type: Date, default: Date.now, required: true }
    }),
    mailsubscribe: new Schema({
      email:
      {
        type: String,
        required: true
      },
      confirmed:
      {
        type: String,
        required: true,
        default: false
      },
      create: { type: Date },
      updated: { type: Date, default: Date.now, required: true },
      modified: { type: Date, default: Date.now, required: true }
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
            required: true
        },
        home:
        {
            type: String,
            required: true
        },
        site_name:
        {
            type: String,
            required: true
        },
        site_description:
        {
            type: String,
            required: true
        },
        users_can_register:
        {
            type: Boolean,
            required: true
        },
        admin_email:
        {
            type: String,
            required: true
        },
        start_of_week:
        {
            type: Number,
            min: 0,
            max: 6,
        },
        use_balance_tags:
        {
            type: Boolean,
            required: true
        },
        use_smiles:
        {
           type: Boolean,
           required: true
        },
        require_name_email:
        {
            type: Boolean,
            required: true
        },
        comments_notify:
        {
            type: Boolean,
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
            required: true
        },
        mail_server_url:
        {
            type: String,
            required: true
        },
        mailserver_login:
        {
            type: String,
            required: true
        },
        mailserver_pass:
        {
            type: String,
            required: true
        },
        mailserver_pass:
        {
            type: String,
            required: true
        },
        mailserver_port:
        {
            type: Number,
            required: true
        },
        default_category:
        {
            type: Boolean,
            required: true
        },
        default_comment_status:
        {
            type: String,
            required: true,
        },
        default_ping_status:
        {
            type: String,
            required: true,
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
            required: true
        },
        time_format:
        {
            type: String,
            required: true
        },
        links_updated_date_format:
        {
            type: String,
            required: true
        },
        comment_moderation:
        {
            type: Boolean,
            required: true
        },
        moderation_notify:
        {
            type: Boolean,
            required: true
        },
        hack_file:
        {
            type: Boolean,
            required: true
        },
        site_charset:
        {
            type: String,
            required: true,
        },
        moderation_keys: String,
        active_plugins:
        [
            new Schema(
            {
                name: String,
            })
        ],
        category_base: String,
        ping_sites:
        {
            type: String,
            required: true,
        },
        comment_max_links:
        {
            type: Number,
            required: true
        },
        gmt_offset:
        {
            type: Boolean,
            required: true
        },
        default_email_category:
        {
            type: Boolean,
            required: true,
        },
        recently_edited:
        {
            type: String,
            required: true
        },
        template:
        {
            type: String,
            required: true
        },
        stylesheet:
        {
            type: String,
            required: true
        },
        comment_whitelist:
        {
            type: Boolean,
            required: true
        },
        blacklist_keys:
        {
            type: String,
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
            required: true
        },
        db_version:
        {
            type: Number,
            required: true
        },
        uploads_use_yearmonth_folders:
        {
            type: Boolean,
            required: true
        },
        upload_path:
        {
            type: String,
            required: true
        },
        site_public:
        {
            type: Boolean,
            required: true,
        },
        default_link_category:
        {
            type: Number,
            required: true,
        },
        show_on_front:
        {
            type: String,
            required: true,
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
        },
        thumbnail_size_h:
        {
            type: Number,
            required: true,
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
        },
        medium_size_h:
        {
            type: Number,
            required: true,
        },
        avatar_default:
        {
            type: String,
            required: true,
        },
        large_size_w:
        {
            type: Number,
            required: true,
        },
        large_size_h:
        {
            type: Number,
            required: true,
        },
        image_default_link_type:
        {
            type: String,
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
        },
        close_comments_days_old:
        {
            type: Number,
            required: true,
        },
        thread_comments:
        {
            type: Boolean,
            required: true,
        },
        thread_comments_depth:
        {
            type: Number,
            required: true
        },
        page_comments:
        {
            type: Boolean,
            required: true
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
            required: true
        },
        comment_order:
        {
            type: String,
            required: true
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
            required: true
        },
        page_for_posts:
        {
            type: Boolean,
            required: true
        },
        page_on_front:
        {
            type: Boolean,
            required: true
        },
        default_post_format:
        {
            type: Boolean,
            required: true
        },
        link_manager_enabled:
        {
            type: Boolean,
            required: true
        },
        finished_splitting_shared_terms:
        {
            type: Boolean,
            required: true
        },
        site_icon:
        {
            type: Boolean,
            required: true
        },
        medium_large_size_w:
        {
            type: Number,
            required: true,
            min: 0
        },
        medium_large_size_w:
        {
            type: Number,
            required: true,
            min: 0
        },
        page_for_privacy_policy:
        {
            type: Number,
            required: true
        },
        show_comments_cookies_opt_in:
        {
            type: Boolean,
            required: true
        },
        admin_email_lifespan:
        {
            type: Number,
            min: 0,
            required: true
        },
        initial_db_version:
        {
            type: Number,
            min: 0,
            required: true
        },
        fresh_site:
        {
            type: Boolean,
            required: true
        },
        CMSLANG:
        {
            type: String,
            required: true
        },
        cron:
        [
            new Schema(
            {
                name: String,
                time: Number,
                abilities: Boolean
            })
        ],
        recovery_keys:
        [
            new Schema(
            {
                name: String,
                key: String
            })
        ],
    }),
    chat: new Schema({
      pathPage: {
        type: String,
        required: true
      },
      langPage: {
        type: String,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }),
};
