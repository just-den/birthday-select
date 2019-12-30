'use strict';   
            
const { src, dest, series } = require('gulp');                  
                                                    
const concat = require('gulp-concat');                  
const uglify = require('gulp-uglify');                                                          
const babel = require('gulp-babel');                                
                                        
    
function jsTask(){                  
    return src([                   
        'src/birthday-select.js',      
        ])
        .pipe(concat('birthday-select.min.js'))                
        .pipe(babel({
            "presets": ["@babel/preset-env"]
        }))                 
        .pipe(uglify())                 
        .pipe(dest('dist')                  
    );                  
}                                       

exports.buildJs = series(                   
    jsTask                  
)