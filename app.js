const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Post = require('./models/post');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))


const authorData = {
    id: 1,
    name: 'Tetiana Duminska',
    photo: '/images/logo.png'
  };

let initialDataAdded = false;
app.once('start', () => {

  if (!initialDataAdded) {
    Post.addPost("Embracing Tomorrow's Technology: A Glimpse into the Future",
     "Explore the cutting-edge innovations poised to redefine our daily lives. From AI-driven advancements to augmented reality experiences, discover the exciting landscape of technology waiting on the horizon.", 
     authorData);
    Post.addPost("The Evolution of Work: Navigating Careers in Tomorrow's World", "Delve into the transforming job market and the skills needed to thrive in future professions. Uncover how remote work, automation, and global connectivity are reshaping the career landscape, offering new opportunities and challenges.", authorData);
    Post.addPost("Tomorrow's Sustainable Cities: Redesigning Urban Spaces for the Future", "Discover the blueprint for eco-friendly and smart cities set to revolutionize urban living. From renewable energy integration to innovative infrastructure, explore how cities are adapting to environmental changes and fostering sustainable communities.", authorData);
    initialDataAdded = true;
  }
});


app.get('/', (req, res) => {
    const posts = Post.getAllPosts();
    res.render('main', { posts });
  });

app.post('/posts', (req, res) => {
    const { title, description} = req.body;
    Post.addPost(title, description, authorData);
    res.redirect('/');
  });

app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = Post.getPostById(postId);
    if (post) {
      res.json(post); 
    } else {
      res.status(404).send('Post not found');
    }
  });
  
  
app.put('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, description } = req.body;

  const postToUpdate = Post.getPostById(postId);

  if (postToUpdate) {
    postToUpdate.title = title;
    postToUpdate.description = description;
    Post.updatePost(postId, postToUpdate); 
    res.redirect('/');
  } else {
    res.status(404).send('Post not found');
  }
});

  
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    Post.deletePost(parseInt(id));
    res.redirect('/');
  });

app.listen(3000, () => {
    app.emit('start');
}
);
