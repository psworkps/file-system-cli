const fs = require("fs");
const { mkdir, readdir } = require('fs').promises;
const path = require('path')
const express = require('express');

const createDirectory = async (req, res) => {
    console.log('req.body', req.body)
    if (!req?.body?.dirName) {
        return res.status(400).json({ 'message': 'Directory name required' });
    }
    try {
        if (!fs.existsSync(path.join(__dirname, '..', '..', 'filesystem'))) {
            await mkdir(path.join(__dirname, '..', '..', 'filesystem'));


        }
        var newDirName = req.body.ParentDirName.slice(req.body.ParentDirName.indexOf('m/') + 1)
        await mkdir(path.join(__dirname, '..', '..', 'filesystem', newDirName, req.body.dirName));
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
    console.log(path.join(__dirname, '..', '..', 'filesystem'))
}

const listingDirectories = async (req, res) => {
    var baseDir = path.join(__dirname, '..')
    if (!req?.body?.dirName) {
        var viewPath = req.body.rootDir
        if (viewPath === undefined) {
            viewPath = './filesystem'
        } else {
            viewPath = './filesystem/' + req.body.dirName
        }
    }

    console.log('req.body.dirName', req.body.dirName)
    viewPath = req.body.dirName
    console.log('req.body', req.body)
    try {

        console.log('viewPath', viewPath)
        async function listDirectories(pth) {
            let directories = (await readdir(pth, { withFileTypes: true }))
                .filter(dirent => dirent.isDirectory())
                .map(dir => dir.name);
            return directories;

        }
        listDirectories(viewPath).then(directories => {
            if (directories === undefined) {
                directories = []
            }
            res.render('index', {
                mascots: directories,
                baseDir: baseDir
            });
        });
    } catch (err) {
        res.render('index');
    }
}

const deleteDirectory = async (req, res) => {
    console.log('req.body.dirName', req.body.dirName)
    try {
        fs.rmSync(req.body.dirName, { recursive: true, force: true });
        res.redirect('/');
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    createDirectory,
    listingDirectories,
    deleteDirectory
}