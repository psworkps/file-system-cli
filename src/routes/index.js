const router = require('express').Router();

const fs = require("fs");
const { mkdir, readdir } = require('fs').promises;
const path = require('path')
const express = require('express');

router.get('/', function (req, res) {
    var baseDir = path.join(__dirname, '..', '..', 'filesystem')
    if (!req?.body?.rootDir) {
        var viewPath = req.body.rootDir
        console.log('viewPath route', viewPath)
        console.log('base route', path.join(__dirname, '..', '..', 'filesystem'))
        if (viewPath === undefined) {
            viewPath = './filesystem'
        }
    }
    console.log('req.body.dirName', req.body)
    try {
        async function listDirectories(pth) {
            const directories = (await readdir(pth, { withFileTypes: true }))
                .filter(dirent => dirent.isDirectory())
                .map(dir => dir.name);

            return directories;
        }

        var emptyDir = ''
        listDirectories(viewPath).then(directories => {
            if (directories === undefined) {
                directories = []
                emptyDir = 'Directory is empty'
            }
            console.log('1', directories);
            res.render('index', {
                mascots: directories,
                baseDir: baseDir,
                emptyDir: emptyDir
            });
        });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
});

router.post('/', function (req, res) {
    var baseDir = path.join(__dirname, '..')
    if (!req?.body?.dirName) {
        // req.body.rootDir = './filesystem/sdf'
        var viewPath = req.body.rootDir
        if (viewPath === undefined) {
            viewPath = './filesystem'
        } else {
            viewPath = './filesystem/' + req.body.dirName
        }
        // return res.status(400).json({ 'message': 'Root Directory name required' });
    }

    console.log('req.body.dirName', req.body.dirName)
    viewPath = req.body.dirName
    console.log('req.body', req.body)
    try {

        console.log('viewPath', viewPath)
        async function listDirectories(pth) {
            try {
                let directories = (await readdir(pth, { withFileTypes: true }))
                    .filter(dirent => dirent.isDirectory())
                    .map(dir => dir.name);
                return directories;
            } catch (error) {
                console.log(error)
            }

        }
        var emptyDir = ''
        listDirectories(viewPath).then(directories => {
            console.log('directories', directories)
            if (directories === undefined) {
                directories = []
                emptyDir = 'Directory is empty'
            }
            res.render('index', {
                mascots: directories,
                baseDir: baseDir,
                emptyDir: emptyDir
            });
        });
    } catch (err) {
        res.render('index');
    }
});

router.use('/filesystem', require('./filesystem'));


module.exports = router;