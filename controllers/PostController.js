import PostModel from '../models/Post.js';

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(100).exec();
        const tagsUnfiltered = posts
        .map((obj) => obj.tags)
        .flat()
        .slice(0, 100);
        const tags = [... new Set(tagsUnfiltered)]
        res.json(tags);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалос завантажити теги",
        })
    }
};
export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        // const posts = await PostModel.find( {tags: '2'} ).populate('user').exec();
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалос завантажити статті",
        })
    }
};
export const getAllF = async (req, res) => {
    // console.log(req.params)
    try {
        // const posts = await PostModel.find().populate('user').exec();
        const posts = await PostModel.find( {tags: req.params.tagsN } ).populate('user').exec();
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалос завантажити статті",
        })
    }
};
export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndDelete({
            _id: postId,
        }, (err, doc) =>{
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Не вдалося видалити статтю',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Не вдалося знайти статтю',
                });
            }
            res.json({
                success: true,
            })
        })
        
    }catch (err) {
        console.log(err);
        res.status(500).json({
        message: "Не вдалос завантажити статті",
        })
    }
};
export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndUpdate(
            {
            _id: postId,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не вдалося загрузити статтю',
                    });
                }
                if (!doc) {
                    return res.status(404).json({
                        message: 'Не вдалося знайти статтю',
                    });
                }
                res.json(doc);
            },

        ).populate('user');
        
    }catch (err) {
        console.log(err);
        res.status(500).json({
        message: "Не вдалос завантажити статті",
        })
    }
};
export const update = async (req, res) => {
    try {
      const postId = req.params.id;
        await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags.split(','),
            }
        );
        res.json({
            success: true,
        })  
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося оновити статтю',
        });
    }
    
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId,
        });

        const post = await doc.save();
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося створити статтю',
        })
        
    }
}; 