var gulp = require('gulp'),
    fs = require('fs'),
    argv = require('yargs').argv,
    GulpSSH = require('gulp-ssh');

var config = {
  host: argv.server,
  username: argv.user,
  privateKey: fs.readFileSync(argv.key)
}

var gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config
});

gulp.task('sync', function() {
  return gulpSSH
    .shell(['cd '+ argv.location, 'git add -A .', 'git commit -am "commit from gulp sync"', 'git pull -X ours --no-edit', 'git push', 'git status', 'php please clear:cache'], {filePath: 'statasync.logs'})
    .pipe(gulp.dest('.'));
});