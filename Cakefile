fs     = require 'fs'
{exec} = require 'child_process'

isWin = !!process.platform.match /^win/

# Make sure we have any dependencies defined in our package.json
try
    colors = require 'colors'
catch error
    console.error 'Please run `npm install` first'
    process.exit 1

# define some actions
sassWatch = ->
    console.log '\t...watching .scss files'
    p = exec "sass -l -t expanded --watch sass:css"
    p.stderr.on 'data', (data) -> process.stderr.write data.red
    p.stdout.on 'data', (data) ->
        if /overwrite/.test data
            process.stdout.write data.green
        else if /Change detected/.test data
            # print nothing to reduce the flood of sass output on winders
        else
            process.stdout.write data.red

sassBuildDebug = ->
    console.log '\t...building/compressing .scss files'
    p = exec "sass -l -g -t expanded --update sass:css"
    p.stderr.on 'data', (data) -> process.stderr.write data.red
    p.stdout.on 'data', (data) ->
        if /overwrite/.test data
            process.stdout.write data.green
        else
            process.stderr.write data.red

sassBuildTight = ->
    console.log '\t...building/compressing .scss files'
    p = exec "sass -f -t comressed --update sass:css"
    p.stderr.on 'data', (data) -> process.stderr.write data.red
    p.stdout.on 'data', (data) ->
        if /overwrite/.test data
            process.stdout.write data.green
        else
            process.stderr.write data.red

sassBuild = ->
    console.log '\t...building/compressing .scss files'
    p = exec "sass -f --update sass:css"
    p.stderr.on 'data', (data) -> process.stderr.write data.red
    p.stdout.on 'data', (data) ->
        if /overwrite/.test data
            process.stdout.write data.green
        else
            process.stderr.write data.red

coffeeWatch = ->
    console.log '\t...watching .coffee files'
    p = exec "coffee -c -w -o js coffee"
    p.stderr.on 'data', (data) -> process.stderr.write data.red
    p.stdout.on 'data', (data) ->
        if /compiled src/.test data
            process.stdout.write data.green
        else
            process.stderr.write data.red

coffeeBuild = ->
    console.log '\t...compiling .coffee files'
    p = exec "coffee -c -o js coffee"
    p.stderr.on 'data', (data) -> process.stderr.write data.red
    p.stdout.on 'data', (data) ->
        if /compiled src/.test data
            process.stdout.write data.green
        else
            process.stderr.write data.red
    p.on 'exit', (code) ->
        # for some reason coffee's giving us a '-p' folder on a raw build
        fs.rmdirSync '-p' if fs.existsSync '-p'

# define the tasks
task 'build:debug', 'Build w/ as much debug info as we can get', ->
    console.log 'Building debug'.yellow

    coffeeBuild()
    sassBuildDebug()

task 'build:prod', 'Build production-ready(ish) application', ->
    console.log 'Building production'.yellow

    coffeeBuild()
    # sassBuildTight()
    sassBuild()

task 'watch', 'Automatically recompile CoffeeScript and Sass files', ->
    console.log 'Watching coffee and scss files for changes,\n\tpress [Ctl-C] to quit'.yellow

    coffeeWatch()
    sassWatch()

task 'run', 'Run the application locally on port 3000', ->
    console.log 'Starting application on http://localhost:3000,\n\tpress [Ctl-C] to quit'.yellow
    server = exec "jekyll --server 3000"
    server.stderr.on 'data', (data) -> process.stderr.write data.grey
    server.stdout.on 'data', (data) -> process.stdout.write data.grey
