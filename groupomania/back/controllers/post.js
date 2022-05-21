const User = require('../models/user');
const Post = require('../models/post');
const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
    Post.findAll({include: User})
        .then(posts => res.json({data: posts}))
        .catch(error => res.status(404).json({error}))
}

exports.getOnePost = (req, res, next) => {
    Post.findOne({where: {post_id: req.params.id}, include: User})
        .then(post => res.json({data: post}))
        .catch(error => res.status(404).json({error}))
}

exports.publishPost = (req, res, next) => {
    Post.create({
        title: req.body.title,
        text: req.body.text,
        media: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        user_id: req.auth.user_id
    })
        .then(post => res.status(201).json({data: post}))
        .catch(error => res.status(500).json({error}))
}

exports.modifyPost = (req, res, next) => {
    Post.findOne({where: {id: req.params.id}})
        .then(post => {
            if(!post){
                res.status(400).json({error: "Ce contenu n'existe pas"})
            }
            if(req.auth.user_id !== post.user_id && !req.auth.isAdmin){
                res.status(405).json({error: "Vous n'êtes pas le propriétaire de ce contenu"})
            }
            else{
                // const postObject = req.file ?
                // {...JSON.parse(req.body.post),
                // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                // } : { ...req.body };
                post.update({
                    title: req.body.title, 
                    text: req.body.text, 
                    media: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                })
                .then(() => res.status(200).json({message: "Contenu modifié"}))
                .catch(error => res.status(500).json({error}))
            }
        }    
        )
        .catch(error => res.status(404).json({error}))
}

exports.deletePost = (req, res, next) => {
    Post.findOne({where: {id: req.params.id}})
    .then(post => {
        if(!post){
            res.status(400).json({error: "Ce contenu n'existe pas"})
        }
        if(req.auth.user_id !== post.user_id && !req.auth.isAdmin){
            res.status(405).json({error: "Vous n'êtes pas le propriétaire de ce contenu"})
        }
        else{
            const filename = post.media.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                post.destroy({where: {id: req.params.id}})
                .then(() => res.status(200).json({message: "Contenu supprimé"}))
                .catch(error => res.status(500).json({error}))
              });
        }
    })
    .catch(error => res.status(404).json({error}))
}