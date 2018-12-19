const webpack = require('webpack');
//在内存中生成html的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const package = require('../package.json');

fs.open('./build/env.js', 'w', function(err, fd) {
    const buf = 'export default "development";';
   fs.write(fd, buf, 0, 'utf-8', function(err, written, buffer) {});
});

//通过Node中的模块操作，向外暴漏了一个配置对象
module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    //输出文件配置
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({  //创建一个在内存中生成HTML页面的插件
            //                  并且把打包好的js插入到html文件中
            // title: 'iView admin v' + package.version,
            title: '智慧秘书-瑞鸿',
            filename: '../index.html',
            inject: false
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/views/main-components/theme-switch/theme'
            },
            {
                from: 'src/views/my-components/text-editor/tinymce'
            }
        ], {
            ignore: [
                'text-editor.vue'
            ]
        })
    ]
});