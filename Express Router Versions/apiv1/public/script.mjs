window.createPost = function () {

  let postTitle = document.querySelector("#postTitle").value;
  let postText = document.querySelector("#postText").value;

  // baseUrl/api/v1/post
  axios.post(`/api/v1/post`, {
      title: postTitle,
      text: postText
  })
      .then(function (response) {
          console.log(response.data);
          document.querySelector("#result").innerHTML = response.data;
          
          getAllPost();
      })
      .catch(function (error) {
          // handle error
          console.log(error.data);
          document.querySelector("#result").innerHTML = "error in post submission"
      })
}

function renderPost() {
    // baseUrl/api/v1/post
    axios.get(`/api/v1/posts`)
        .then(function (response) {
            let posts = response.data;
            let postContainer = document.querySelector(".result");
            postContainer.innerHTML = "";

            // Loop through the posts and create elements for each post
            posts.forEach(function (post) {
                let postElement = document.createElement("div");
                postElement.className += " post"

                let titleElement = document.createElement("h2");
                titleElement.textContent = post.title;
                postElement.appendChild(titleElement);

                let textElement = document.createElement("p");
                textElement.textContent = post.text;
                postElement.appendChild(textElement);
                postElement.dataset.postId = post.id;

                let row =  document.createElement("div")
                row.className += " space-around"

                let regards = document.createElement("p")
                regards.className += " regards"
                regards.textContent = "Zeeshan"
                row.appendChild(regards)

                let edit = document.createElement("i")
                edit.className += " regards bi bi-pencil-fill"
                // edit.addEventListener("click", edit)
                row.appendChild(edit)

                let del = document.createElement("i")
                del.className += " regards bi bi-trash-fill"
                del.addEventListener("click", function(event) {
                    event.preventDefault();
                    let postId = this.parentNode.parentNode.dataset.postId;
                    deletePost(postId);
                });
                
                row.appendChild(del)

                postElement.appendChild(row)
                postContainer.appendChild(postElement);
            });
        })
        .catch(function (error) {
            console.log(error.data);
        });
}


// GET  ALL   POSTS   /api/v1/posts/
router.get('/post/:postId', (req, res, next) => {
    console.log('this is signup!', new Date());

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === Number(req.params.postId)) {
            res.send(posts[i]);
            return;
        }
    }
    res.send('post not found with id ' + req.params.postId);
})

//GET  ONE   POST   /api/v1/post/:postId
router.get('/posts', (req, res, next) => {
    console.log('this is signup!', new Date());
    res.send(posts);
})

// DELETE  /api/v1/post/:postId
router.delete('/post/:postId', (req, res, next) => {
    console.log('this is signup!', new Date());

    const postId = req.params.postId;

    // Find the post index in the posts array
    const postIndex = posts.findIndex(post => post.id === postId);

    // If the post with the given ID exists, remove it
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        res.send('Post deleted');
    } else {
        res.status(404).send('Post not found');
    }
});

export default router



