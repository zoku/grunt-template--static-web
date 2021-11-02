"use strict"

exports.description = "Automated static project for prototyping, testing and frontend development."
exports.notes = "Install the template, then run 'npm install' to install dependencies."
exports.warnOn = "src/**"

exports.template = function (grunt, init, done) {
    init.process({}, [], function (err, props) {
        props.file_name = props.package_json ? "<%= pkg.name %>" : "FILE_NAME"

        props.src = "src/"
        props.gruntfile = "Gruntfile.js"

        var devDependencies = {
            grunt: "~1.4.1",
            "grunt-contrib-clean": "^2.0.0",
            "grunt-contrib-concat": "^1.0.1",
            "grunt-contrib-connect": "^3.0.0",
            "grunt-contrib-copy": "^1.0.0",
            "grunt-contrib-sass": "^2.0.0",
            "grunt-contrib-uglify-es": "^3.3.0",
            "grunt-contrib-watch": "^1.1.0",
            "grunt-ejs": "^1.0.0",
        }

        // Files to copy (and process).
        var files = init.filesToCopy(props)

        // Actually copy (and process) files.
        // init.copyAndProcess(files, props)
        init.copyAndProcess(files, props, { noProcess: "src/fonts/**" })

        // Generate package.json file, used by npm and grunt.
        init.writePackageJSON("package.json", {
            node_version: ">= 14.15.5",
            devDependencies: devDependencies,
        })

        // All done!
        done()
    })
}
