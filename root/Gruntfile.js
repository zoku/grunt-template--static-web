module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-connect")
    grunt.loadNpmTasks("grunt-contrib-clean")
    grunt.loadNpmTasks("grunt-contrib-concat")
    grunt.loadNpmTasks("grunt-contrib-uglify-es")
    grunt.loadNpmTasks("grunt-contrib-sass")
    grunt.loadNpmTasks("grunt-contrib-watch")
    grunt.loadNpmTasks("grunt-ejs")
    grunt.loadNpmTasks("grunt-contrib-copy")

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        connect: {
            server: {
                options: {
                    port: 9000,
                    // open a browser
                    open: true,
                    // inject livereload.js into the pages
                    livereload: false,
                    // Root directory
                    base: "dist",
                },
            },
        },
        watch: {
            options: {
                livereload: false,
            },
            default: {
                files: [],
            },
            ejs: {
                options: {
                    livereload: true,
                },
                files: ["src/ejs/**/*.ejs"],
                tasks: ["ejs"],
            },
            concat: {
                files: ["src/js/**/*.js"],
                tasks: ["concat"],
            },
            uglify: {
                options: {
                    livereload: true,
                },
                files: ["dist/assets/js/application.js"],
                tasks: ["uglify"],
            },
            sass: {
                options: {
                    livereload: true,
                },
                files: ["src/**/*.scss"],
                tasks: ["sass"],
            },
            copy: {
                options: {
                    livereload: true,
                },
                files: ["src/img/**/*", "src/fonts/**/*"],
                tasks: ["copy"],
            },
        },
        clean: ["dist/**/*"],
        ejs: {
            all: {
                cwd: "src/ejs",
                src: ["*.ejs"],
                dest: "dist/",
                expand: true,
                ext: ".html",
            },
        },
        concat: {
            options: {
                banner: '/*! static js <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                separator: ";\n",
            },
            dist: {
                src: ["src/js/**/*.js"],
                dest: "dist/assets/js/application.js",
            },
        },
        uglify: {
            options: {
                banner: '/*! static js (minified) <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },
            build: {
                src: "dist/assets/js/application.js",
                dest: "dist/assets/js/application.min.js",
            },
        },
        sass: {
            dist: {
                options: {
                    style: "compressed",
                },
                files: {
                    "dist/assets/css/styles.css": "src/scss/styles.scss",
                },
            },
        },
        copy: {
            main: {
                files: [
                    { expand: true, cwd: "src/", src: ["img/**"], dest: "dist/assets/" },
                    { expand: true, cwd: "src/", src: ["fonts/**"], dest: "dist/assets/" },
                ],
            },
        },
    })

    grunt.registerTask("default", ["clean", "ejs", "sass", "concat", "uglify", "copy", "connect", "watch"])
}
