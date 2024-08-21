const timeSince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }

    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }

    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }

    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }

    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    if (seconds < 10) {
        return "just now";
    }

    return Math.floor(seconds) + " seconds ago";
}

const users = {
    "username-one": {
        name: "Ash Worth",
        src: "assets/home-office-1.jpg"
    },
    "username-two": {
        name: "Aurura Smith",
        src: "assets/home-office-2.jpg"
    },
    "username-three": {
        name: "Alice Homies",
        src: "assets/home-office-3.jpg"
    },
}

const loggedUser = users["username-one"];

let comments = [
    {
        id: 1,
        text: "This is an amazing article! Thanks for sharing.",
        author: users['username-one'],
        createdAt: "2024-03-30 13:02:38"
    },
    {
        id: 2,
        text: "I've learned so much from this. Great content!",
        author: users['username-two'],
        createdAt: "2024-03-06 15:30:02"
    },
    {
        id: 3,
        text: "Great content!",
        author: users['username-three'],
        createdAt: "2024-03-06 15:30:02"
    },
];

const commentsWrapper = document.querySelector(".comments");

const createComment = (comment) => {
    const newDate = new Date(comment.createdAt);
    return `<div class="comment">
        <div class="avatar">
            <img class="avatar" src="${comment.author.src}" alt="${comment.author.name}">
        </div>
        <div class="comment-body">
            <div class="comment-author">
                ${comment.author.name}
                <time datetime="${comment.createdAt}" class="comment-date">${timeSince(newDate)}</time>
            </div>
            <div class="comment-text"><p>${comment.text}</p></div>
        </div>
    </div>`;
}

const commentsMapped = comments.map(comment => createComment(comment));
commentsWrapper.innerHTML = commentsMapped.join("");

const newCommentForm = document.getElementById("comment-form");
const newCommentTextarea = document.querySelector("#comment-form textarea");

newCommentForm.addEventListener("submit", (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    const newCommentTextareaValue = newCommentTextarea.value;

    const newComment = {
        id: comments.length + 1,
        text: newCommentTextareaValue,
        author: loggedUser,
        createdAt: new Date().toString(),
    };

    comments.push(newComment);

    const comment = document.createElement("div");
    comment.innerHTML = createComment(newComment);

    if (commentsWrapper.hasChildNodes()) {
        commentsWrapper.insertBefore(
            comment,
            commentsWrapper.childNodes[0]
        );
    } else {
        commentsWrapper.appendChild(comment);
    }
    newCommentForm.reset();
});