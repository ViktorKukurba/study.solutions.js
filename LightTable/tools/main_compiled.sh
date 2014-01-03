#!/usr/bin/env bash
rm -rf ../scripts/compiled.js
touch ../scripts/compiled.js
chmod 0666 ../scripts/compiled.js
java -jar ./closure-compiler.jar \
--compilation_level SIMPLE_OPTIMIZATIONS \
--warning_level VERBOSE \
--charset UTF-8 \
--third_party \
--js_output_file ../scripts/compiled.js \
--js ../scripts/light-table.js \

#java -jar yuicompressor-2.4.8pre.jar \
#  --type css --charset utf-8 --verbose  \
#  -o ../resources/styles/insightlab-sg.min.css  \
#  ../resources/styles/insightlab-sg.css  \

#find "../src/scripts" -name "*.js" -print |
# sed 's/.*/--js &/' |
# xargs java -jar ./closure-compiler.jar \
# --compilation_level ADVANCED_OPTIMIZATIONS \
# --warning_level VERBOSE \
# --charset UTF-8 \
# --process_jquery_primitives \
# --externs externs.js \
# --externs externs-gviz-api.js \
# --js_output_file ../bin/scripts/codebase.js