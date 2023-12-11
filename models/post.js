
const posts = [];

class Post {
  constructor(id, title, description, author, createdAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.author = author;
    this.createdAt = createdAt;
    
  }

static getAllPosts() {
    return posts;
}

  static getPostById(id) {
    return posts.find(post => post.id === id);
  }

static addPost(title, description, author) {
    const id = posts.length + 1;
    const createdAt = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' ' +
                      new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const newPost = new Post(id, title, description, author, createdAt);
    posts.unshift(newPost); 
    return newPost;
}

  static updatePost(id, updatedPostData) {
    const postToUpdate = posts.find(post => post.id === id);
    if (postToUpdate) {
      const { title, description, author } = updatedPostData;
      postToUpdate.title = title || postToUpdate.title;
      postToUpdate.description = description || postToUpdate.description;
      postToUpdate.createdAt = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' ' +
      new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    return null;
  }
  static deletePost(id) {
    const index = posts.findIndex(post => post.id === id);
    if (index !== -1) {
      posts.splice(index, 1);
      return true;
    }
    return false;
  }

  
}

module.exports = Post;
