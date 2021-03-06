# Avoid `console` errors in browsers that lack a console.
window.log = ->
    log.history = log.history or []
    log.history.push arguments
    if @console
        arguments.callee = arguments.callee.caller
        console.log Array::slice.call(arguments)

# make it safe to use console.log always
((b) ->
    c = ->
    d = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(",")

    while a = d.pop()
        b[a] = b[a] or c
) window.console = window.console or {}

# Place any jQuery/helper plugins between the backticks
`
`