import gulp from "gulp";
import fs from "fs-extra";
import rev from "gulp-rev";
import rename from "gulp-rename";
import revReplace from "gulp-rev-replace";

const output = "assets";

gulp.task("clean", function () {
  fs.emptyDirSync(`./${output}`);
  return Promise.resolve();
});

gulp.task("rev", function () {
  return gulp
    .src([
      `./src/${output}/**/*.css`,
      `./src/${output}/**/*.js`,
      `./src/${output}/**/*.jpg`,
      `./src/${output}/**/*.png`,
      `./src/${output}/**/*.gif`,
      `./src/${output}/**/*.ico`,
    ])
    .pipe(rev())
    .pipe(
      rename(function (path) {
        const dashIndex = path.basename.lastIndexOf("-");
        if (dashIndex !== -1) {
          const basename = path.basename.substring(0, dashIndex);
          const hash = path.basename.substring(dashIndex + 1);
          path.basename = `${basename}.${hash}`;
        }
      })
    )
    .pipe(gulp.dest(`./${output}`))
    .pipe(rev.manifest())
    .pipe(gulp.dest(`./${output}`));
});

gulp.task("rev-replace", function () {
  const manifest = gulp.src(`./${output}/rev-manifest.json`);

  return gulp
    .src("./src/**/*.html")
    .pipe(revReplace({ manifest: manifest }))
    .pipe(gulp.dest("./"));
});

gulp.task("default", gulp.series("clean", "rev", "rev-replace"));
