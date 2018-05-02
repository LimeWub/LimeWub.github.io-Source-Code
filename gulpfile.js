// package vars
const pkg = require("./package.json");

// gulp
const gulp = require("gulp");

// load all plugins in "devDependencies" into the variable _f
const _f = require("gulp-load-plugins")({
	pattern: ["*"],
	scope: ["devDependencies"]
});

const onError = (err) => {
	console.log(err);
};

const banner = [
	"/**",
	" * @project     <%= pkg.name %>",
	" * @author      <%= pkg.author %>",
	" * @build       " + _f.moment().format("llll") + " ET",
//	" * @release     " + _f.gitRevSync.long() + " [" + _f.gitRevSync.branch() + "]",
	" * @copyright   Copyright (c) " + _f.moment().format("YYYY") + ", <%= pkg.copyright %>",
	" *",
	" */",
	""
].join("\n");

// scss - build the scss to the build folder, including the required paths, and writing out a sourcemap
gulp.task("scss", () => {
	_f.fancyLog("-> Compiling scss");
	return gulp.src(pkg.paths.src.scss + pkg.vars.scssName, { allowEmpty: true })
		.pipe(_f.plumber({errorHandler: onError}))
		.pipe(_f.sassGlob())
		.pipe(_f.sourcemaps.init({loadMaps: true}))
		.pipe(_f.sass({
                includePaths: pkg.paths.scss
			})
			.on("error", _f.sass.logError))
		.pipe(_f.cached("sass_compile"))
		.pipe(_f.autoprefixer())
		.pipe(_f.sourcemaps.write("./"))
		.pipe(_f.size({gzip: true, showFiles: true}))
		.pipe(gulp.dest(pkg.paths.build.css));
});

// css task - combine & minimize any distribution CSS into the public css folder, and add our banner to it
gulp.task("css", gulp.series("scss", () => {
	_f.fancyLog("-> Building css");
	return gulp.src(pkg.globs.distCss, { allowEmpty: true })
		.pipe(_f.plumber({errorHandler: onError}))
		.pipe(_f.newer({dest: pkg.paths.dist.css + pkg.vars.siteCssName}))
		.pipe(_f.print.default())
		.pipe(_f.sourcemaps.init({loadMaps: true}))
		.pipe(_f.concat(pkg.vars.siteCssName))
		.pipe(_f.cssnano({
			discardComments: {
				removeAll: true
			},
			discardDuplicates: true,
			discardEmpty: true,
			minifyFontValues: true,
			minifySelectors: true
		}))
		.pipe(_f.header(banner, {pkg: pkg}))
		.pipe(_f.sourcemaps.write("./"))
		.pipe(_f.size({gzip: true, showFiles: true}))
		.pipe(gulp.dest(pkg.paths.dist.css))
		.pipe(_f.filter("**/*.css"))
		.pipe(_f.connect.reload());
}));

// babel js task - transpile our Javascript into the build directory
gulp.task("js-babel", () => {
	_f.fancyLog("-> Transpiling Javascript via Babel...");
	return gulp.src(pkg.paths.src.js + "**/*.js", { allowEmpty: true })
		.pipe(_f.plumber({errorHandler: onError}))
		.pipe(_f.newer({dest: pkg.paths.build.js}))
		.pipe(_f.babel())
		.pipe(_f.size({gzip: true, showFiles: true}))
		.pipe(gulp.dest(pkg.paths.build.js));
});

// webpack js task - package required modules and overwrite for our Javascript into the build directory
gulp.task("js-webpack", () => {
	_f.fancyLog("-> Packaging Javascript via Webpack...");
	return gulp.src(pkg.paths.build.js + "**/*.js", { allowEmpty: true })
		.pipe(_f.plumber({errorHandler: onError}))
		.pipe(_f.webpack({output: {filename:'[name].js'}}))
		.pipe(_f.size({gzip: true, showFiles: true}))
		.pipe(gulp.dest(pkg.paths.build.js));
});

// js task - minimize any distribution Javascript into the public js folder, and add our banner to it
gulp.task("js", gulp.series("js-babel","js-webpack", () => {
	_f.fancyLog("-> Building js");
	return gulp.src(pkg.globs.distJs, { allowEmpty: true })
		.pipe(_f.plumber({errorHandler: onError}))
		.pipe(_f.if(["*.js", "!*.min.js"],
			_f.newer({dest: pkg.paths.dist.js, ext: ".min.js"}),
			_f.newer({dest: pkg.paths.dist.js})
		))
		.pipe(_f.if(["*.js", "!*.min.js"],
			_f.uglify()
		))
		.pipe(_f.if(["*.js", "!*.min.js"],
			_f.rename({suffix: ".min"})
		))
		.pipe(_f.header(banner, {pkg: pkg}))
		.pipe(_f.size({gzip: true, showFiles: true}))
		.pipe(gulp.dest(pkg.paths.dist.js))
		.pipe(_f.filter("**/*.js"))
		.pipe(_f.connect.reload());
}));

// imagemin task
gulp.task("imagemin", () => {
	return gulp.src([pkg.paths.dist.img + "**/*.{png,jpg,jpeg,gif,svg}"], { allowEmpty: true })
		.pipe(_f.imagemin({
			progressive: true,
			interlaced: true,
			optimizationLevel: 7,
			svgoPlugins: [{removeViewBox: false}],
			verbose: true,
			use: []
		}))
		.pipe(gulp.dest(pkg.paths.dist.img));
});

// handlebars task
gulp.task("hbs", () => {
	return gulp.src([pkg.paths.src.templates + "**/*.hbs"], { allowEmpty: true })
	.pipe(_f.plumber({errorHandler: onError}))	
	.pipe(_f.compileHandlebars(
		pkg.handlebars.vars
		,{
            ignorePartials: true,
            batch : [pkg.paths.src.templates + "components/"]
		}))
		.pipe(_f.rename(function (path) {
				path.extname = ".html"
			})
		)
        .pipe(gulp.dest(pkg.paths.build.templates));
});

//pages
gulp.task( "pages", gulp.series("hbs",() => {
	return gulp.src([pkg.paths.build.pages + "**/*.html"], { allowEmpty: true })
	.pipe(_f.plumber({errorHandler: onError}))	
    .pipe(gulp.dest(pkg.paths.dist.pages))
	.pipe(_f.connect.reload());
}));

//fonts
gulp.task( "fonts", () => {
	return gulp.src([pkg.paths.src.fonts + '**/*'], { allowEmpty: true })
	.pipe(_f.plumber({errorHandler: onError}))	
    .pipe(gulp.dest(pkg.paths.dist.fonts));
});

//clean up build
gulp.task( "clean", () => {
	return gulp.src(pkg.paths.build.base, {read: false})
	.pipe(_f.plumber({errorHandler: onError}))
    .pipe(_f.clean());
});

// Default task
gulp.task("default", gulp.series("css", "js", "fonts", "pages", "clean", () => {
	_f.connect.server({
		root: pkg.paths.dist.base,
		livereload: true
	});
	gulp.watch(pkg.paths.src.scss + "**/*.scss", gulp.series("css"));
	gulp.watch(pkg.paths.src.js + "**/*.js", gulp.series("js"));
	gulp.watch(pkg.paths.src.templates + "**/*.hbs",gulp.series("pages", "clean"));
}));
