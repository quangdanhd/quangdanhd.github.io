module.exports = {
  server: {
    baseDir: "./",
    index: "index.html",
  },
  files: ["*.html"],
  open: false,
  injectChanges: true,
  ghostMode: {
    clicks: true,
    forms: true,
    scroll: true,
    location: true,
  },
  scrollProportionally: true,
};
