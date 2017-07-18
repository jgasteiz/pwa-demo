/*jshint esversion:6*/
/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const wbBuild = require('workbox-build');

// Clean output directory
gulp.task('clean', () => del(['static/build/*'], {dot: true}));

gulp.task('copy', () =>
    gulp.src([
        'app/**/*',
        'node_modules/workbox-sw/build/importScripts/workbox-sw.prod*.js'
    ]).pipe(gulp.dest('static/build'))
);

gulp.task('bundle-sw', () => {
    return wbBuild.injectManifest({
        globDirectory: '.',
        swSrc: 'static/js/service-worker-workbox.js',
        swDest: 'templates/service-worker-workbox.js',
        staticFileGlobs: [
            'static/css/normalize.css',
            'static/css/pwademo.css',
        ],
        templatedUrls: {
            '/': [],
            '/offline': [],
        },
    })
    .catch((err) => {
        console.log('[ERROR] This happened: ' + err);
    });
});


gulp.task('default', ['clean'], cb => {
    runSequence(
        'copy',
        'bundle-sw',
        cb
    );
});

gulp.task('watch', ['default'], () => {
    gulp.watch('app/*', ['default']);
});
