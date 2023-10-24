// @ts-nocheck
export const SOURCE = ['java/**/*', '!(java/indxe).js'];
export const DESTINATION = 'QxServer7.0/webapps/jc/';


import gulp, { series } from 'gulp';
import cleanCSS from 'gulp-clean-css';
import { Exec, injects, sql } from '../cli'
import { exec } from 'child_process';


export const rename = require("gulp-rename");
export const uglify = require('gulp-uglify');
export const replace = require('gulp-batch-replace');


const 启动qn = async () => Exec('net start qn')

const 清理qn = async ({ list = ['**/*.log'], opt = { cwd: `D:/development/q/qn/logs` }, ...src }) => {
    const clean = require('gulp-clean')
    console.log(list, opt)
    return await gulp.src(list, opt)
    //.pipe(clean())
     .pipe(replace(/^.+?$/, ''))
    .pipe(gulp.dest(list, opt))
}



const 关闭qn = async () => {
    try {
        await Exec('net stop qn')
        return await 清理qn
            ({ list: ['*.log'], opt: { cwd: `D:/development/q/qn/logs` } })

    } catch (e) {
        console.log(e)
        return null
    }

}



export {
    关闭qn, 清理qn, 启动qn
};

// exports.default = series(cb);



async function publishJS(props) {
    console.log('publishJS...')
    const { list, cwd, des, dev } = props

    const runSequence = require('run-sequence'),
        rev = require('gulp-rev'),
        revCollector = require('gulp-rev-collector');

    const babel = require('gulp-babel');
    const uglify = require('gulp-uglify');
    const prettier = require('gulp-prettier');

    if (!des) throw `des is ${des}`
    console.log(cwd)
    const ts = require("gulp-typescript");
    const eslint = require('gulp-eslint');
    const gulpCopy = require('gulp-copy');

    const del = require('del');
    const vinylPaths = require('vinyl-paths');


    const cleanDir = require('gulp-clean-dir');

    console.log(des)

    await gulp.src(['**/+({a..z}|{0..9}|[E,_])*[-]*.js'], { cwd: des })
        .pipe(gulp.dest('./删除的文件'))
        .pipe(vinylPaths(del))

    // await gulp.src('${des}/rev-manifest.json')
    //     .pipe(cleanDir(des))
    //     .pipe(gulp.dest('./删除的文件'))

    return gulp.src(list, { cwd })


        .pipe(gulp.dest(des))
    //         .pipe(rev())
    //         .pipe(gulp.dest(des))
    //         .pipe(rev.manifest({
    //             merge: true // Merge with the existing manifest if one exists
    //         }))
    //         //  .pipe(gulp.dest(des))
    //     //    .pipe(gulp.src(['./*.json', '**/*.jsp'], { base: des }))
    //    //     .pipe(revCollector())
    //   //      .pipe(gulp.dest(des))
}


async function publishjsp(props) {

    const { cwd, list, dest } = props
    const 删除这些 = [
        [/<%--.+?--%>/imgs, ''],
    ]
    const 保护这些 = [
        ["<%", "/**%"],
        ["%>", "%*/"]
    ]
    const 还原这些 = [
        ["/**%", "<%"],
        ["%*/", "%>"]
    ]

    //onst cheerio = require('cheerio');
    const htmlmin = require('gulp-htmlmin');
    const uglify = require('gulp-uglify');
    const pipeline = require('readable-stream').pipeline;

    const gulpif = require('gulp-if');
    var condition = function (file) {
        let path = file.path.match(/[\w_]+?\.jsp/)[0]
        let exlist = [1,
            'exp_class_manager.jsp',
            'exp_experiment_class_search_teacher.jsp',

        ]
        if (exlist.indexOf(path) > 0) {
            console.log(path)
            return false
        }
        return false;
        return true;
    }

    var options = {
        collapseWhitespace: true,//压缩HTML

        conservativeCollapse: true,
        collapseInlineTagWhitespace: true,

        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeComments: false,//清除HTML注释

        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"

        sortAttributes: true,//按频率对属性进行排序
        trimCustomFragments: true,//修剪 周围的空白区域。

        minifyJS: false,//压缩js
        minifyCSS: true//压缩css
    };


    return gulp.src(
        list,
        // ['**/exp_class_manager.jsp'],

        { cwd })
        .pipe(replace(删除这些)) //替换掉jsp标签的<%
        .pipe(replace(保护这些)) //替换掉jsp标签的<%
        // // .pipe(cheerio(function ($) {
        // //     //$('script').remove();  $('head').append('<script src="js/all.min.js"></script>');
        // // }))
        // //.pipe(htmlImport('./page/components/'))
        //.pipe(htmlmin(options))
        .pipe(gulpif(condition, htmlmin(options)))
        .pipe(replace(还原这些)) //替换回来jsp标签的<%
        .pipe(gulp.dest(dest));

}
async function pdf2html1() {
    const pdf2html = require('pdf2html');
    const html = await pdf2html.html('./java/v9.pdf');
    console.log(html);
}

async function 修复css(opts) {

    const props = {
        cwd: 'D:/development/',
        desc: 'D:/Program Files (x86)/Qianxue/QxServer7.0/webapps/',
        项目: 'sj/css/'
    }
    await publishcss(props)

}

async function publishcss(props) {

    let { cwd, desc, 项目 } = props

    let replaceThis = [
        [/@charset\s+["']UTF-8['"]\s*;?\s*/gim, ''],
        [/^\s+\*position:static:.+?$/gim, ''],
        [/(?<=^\s+content);(?="";)|：/gim, ': '],
        [/(?<=^\s+)`(?=\})/gim, ''],
        [/^\s*[^{}]+\{(?:\/\*+[\s\S\n]+?\*\/|[\s\n])+?\}/gim, ''],
        ['blr: expression(this.onFocus=this.blur());', ''],
        [/^\s*trasition.+$/gim, ''],
    ];

    // @ts-ignore
    let autoprefixer = require('gulp-autoprefixer');

    return (
        await gulp
            .src(['*.css', '**/*.css'], { cwd: `${cwd}${项目}` })
            // 创建一个内联插件，从而避免使用 gulp-uglify 插件
            //.pipe(rev())
            .pipe(replace(replaceThis))
            .pipe(
                cleanCSS({
                    format: 'beautify',
                    level: 2,
                })
            ) // Minify any CSS sources
            .pipe(
                autoprefixer({
                    cascade: true,
                })
            )
            .pipe(gulp.dest(`${desc}${项目}`))
    );
}



const publish = () => {

    let Src = '../java/**/*';
    let Des = 'QxServer7.0/webapps/jc/';

    return gulp.src(SOURCE)

        .pipe(gulp.dest(DESTINATION))

};


