import gulp from "gulp";
import fs from "fs-extra";
import rev from "gulp-rev";
import rename from "gulp-rename";
import revReplace from "gulp-rev-replace";

import imagemin from "gulp-imagemin";
import uglifyCss from "gulp-uglifycss";
import uglify from "gulp-uglify";

import merge from "merge-stream";

const output = "assets";

const addMinSuffixIfNeeded = () => {
  return rename(function (path) {
    if (!path.basename.endsWith(".min")) {
      path.basename += ".min";
    }
  });
};

gulp.task("clean", function () {
  fs.emptyDirSync(`./${output}`);
  return Promise.resolve();
});

gulp.task("rev", function () {
  const extensions = ["css", "js", "jpg", "png", "svg", "gif", "ico", "webp"];

  const cssStream = gulp
    .src(`./src/${output}/**/*.css`)
    .pipe(uglifyCss())
    .pipe(rev())
    .pipe(addMinSuffixIfNeeded())
    .pipe(gulp.dest(`./${output}`));

  const jsStream = gulp
    .src(`./src/${output}/**/*.js`)
    .pipe(uglify())
    .pipe(rev())
    .pipe(addMinSuffixIfNeeded())
    .pipe(gulp.dest(`./${output}`));

  const imageStream = gulp
    .src([`./src/${output}/**/*.{jpg,png,svg,gif,ico,webp}`])
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest(`./${output}`));

  const otherStream = gulp
    .src([
      `./src/${output}/**/*`,
      `!./src/${output}/**/*.{${extensions.join(",")}}`,
    ])
    .pipe(rev())
    .pipe(gulp.dest(`./${output}`));

  return merge(cssStream, jsStream, imageStream, otherStream)
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
