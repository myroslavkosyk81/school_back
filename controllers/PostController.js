import PostModel from '../models/Post.js';

export const getGrade = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(100).exec();
        const gradeUnfiltered = posts
        .map((obj) => obj.grade)
        .flat()
        .slice(0, 100);
        const grade = [... new Set(gradeUnfiltered)]
        res.json(grade);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалос завантажити теги",
        })
    }
};


export const getLastSubj = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(100).exec();
        const subjUnfiltered = posts
        .map((obj) => obj.subj)
        .flat()
        .slice(0, 100);
        const subj = [... new Set(subjUnfiltered)]
        res.json(subj);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалос завантажити теги",
        })
    }
};
export const getSubjGr = async (req, res) => {
   
    try {
        const posts = await PostModel.find( {grade: req.params.gradeN } ).limit(200).exec();
        const subjUnfiltered = posts
        .map((obj) => obj.subj)
        .flat()
        .slice(0, 200);
        const subj = [... new Set(subjUnfiltered)]
        res.json(subj);
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
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалос завантажити статті",
        })
    }
};
export const getAllF = async (req, res) => {
    try {
        const posts = await PostModel.find( {subj: req.params.subjN }).populate('user').exec();
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалос завантажити статті",
        })
    }
};
export const getGrSubjPost = async (req, res) => {
    // console.log(req.params)
    // console.log(subjN);
    // console.log(gradeN);
    try {
        const posts = await PostModel.find( {subj: req.params.subjN, grade: req.params.gradeN }).populate('user').exec();
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
                grade: req.body.grade,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                subj: req.body.subj.split(','),
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
            grade: req.body.grade,
            imageUrl: req.body.imageUrl,
            subj: req.body.subj.split(','),
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