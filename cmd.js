#! /usr/bin/env node
function quit (err) {
  console.log(err)
  proess.exit(1)
}
var usage = () => quit('usage TK')
var argv = require('minimist')(process.argv.slice(2))
var gaze = require('gaze')
var spawn = require('child_process').spawn
var glob = argv._[0]
var cmd = argv.c
console.log(argv)
if (!glob) usage()
if (!cmd) usage()
function spawnCommand () {
  var cmds = cmd.split(' ')
  return spawn(cmds[0], cmds.slice(1))
}
gaze(glob, (err, watcher) => {
  if (err) quit(err)
  var proc = spawnCommand()
  proc.stdout.pipe(process.stdout)
  watcher.on('changed', () => {
    proc.kill()
    proc = spawnCommand()
    proc.stdout.pipe(process.stdout)
  })
})
