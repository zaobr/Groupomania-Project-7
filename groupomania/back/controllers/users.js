const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                media: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                email: req.body.email,
                password: hash
            })
            .then(() => res.status(201).json({ message: "Création d'un nouvel utilisateur"}))
            .catch(error => res.status(409).json({error}))
        })
        .catch(error => res.status(500).json({error}))
};

exports.login = (req, res, next) => {
    User.findOne({where: {email: req.body.email}})
        .then(user => {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid){
                        res.status(409).json({message: "Mot de passe incorrect"})
                    }
                    else{
                        const payload = {
                            user_id: user.id,
                            isAdmin: user.isAdmin
                        }
                        res.status(200).json({
                            user_id: user.id,
                            token: jwt.sign(
                                {payload},
                                process.env.JWT_K
                            )
                        })
                    }
                })
                .catch(error => res.status(500).json({error}))
        })
        .catch(error => res.status(404).json({error}))
};

exports.getUser = (req,res, next) => {
    User.findOne({where: {id: req.auth.user_id}})
    .then(user => res.status(200).json({user}))
    .catch(error => res.status(404).json({error}))
}

exports.delete = (req, res, next) => {
    User.findOne({where: {id: req.auth.user_id}})
        .then(user => {
            if(!user){
                return res.status(400).json({error: "Ce compte n'existe pas"})
            }
            if(req.auth.user_id !== user.id && !req.auth.isAdmin){
                return res.status(405).json({error: "Vous n'êtes pas le propriétaire de ce compte"})
            }
            else{
            user.destroy()
                .then(() => res.status(200).json({message: "Utilisateur supprimé"}))
                .catch(error =>  res.status(500).json({error}))
            }
        })
        .catch(error => res.status(404).json({error}))

}