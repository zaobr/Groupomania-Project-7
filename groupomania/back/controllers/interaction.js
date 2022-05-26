const Like = require('../models/like');
const Comment = require('../models/comment');

exports.addComment = (req, res, next) => {
    Comment.create({
        text: req.body.text,
        user_id: req.auth.user_id,
        post_id: req.body.post_id
    })
        .then(comment => res.json({data: comment}))
        .catch(error => res.status(500).json({error}))
}

exports.deleteComment = (req, res, next) => {
    Comment.findOne({where: {id: req.body.comment_id}})
    .then(comment => {
        if(!comment){
            res.status(404).json({error: "Ce contenu n'existe pas"})
        }
        if(req.auth.user_id !== comment.user_id && !req.auth.isAdmin){
            res.status(405).json({error: "Vous n'êtes pas le propriétaire de ce contenu"})
        }
        else{
            comment.destroy({where: {id: req.params.id}})
                .then(() => res.status(200).json({message: "Commentaire supprimé."}))
                .catch(error => res.status(500).json({error}))
        }
    })
    .catch(error => res.status(404).json({error}))
}

exports.like = (req, res, next) => {
    Like.findOne({where: {user_id: req.auth.user_id, post_id: req.body.post_id}})
        .then(like => {
            if(!like){
                Like.create({
                    user_id: req.auth.user_id,
                    post_id: req.body.post_id
                })
                    .then(() => res.status(201).json({message: "Contenu liké."}))
                    .catch(error => res.status(500).json({error}))
            }
            else{
                like.destroy({where: {user_id: req.auth.user_id, post_id: req.body.post_id}})
                .then(() => res.status(200).json({message: "Like supprimé"}));
            }
        })
        .catch(error => res.status(404).json({error}))
}