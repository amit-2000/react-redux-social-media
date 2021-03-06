import React from 'react';
import proTypes from 'prop-types';
import { Link } from 'react-router-dom';
const PostList = (props) => {
  // console.log('this.props.posts', this.props);
  const { posts } = props;
  return (
    <div className="posts-list">
      {posts.map((item, idx) => {
        return (
          <div className="post-wrapper" key={idx}>
            <div className="post-header">
              <div className="post-avatar">
                <Link to={`user/${item.user._id}`}>
                  <img
                    src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                    alt="user-pic"
                  />
                </Link>
                <div>
                  {' '}
                  <span className="post-auther">{item.user.name}</span>
                  <span className="post-time">a minute ago</span>
                </div>
              </div>
              <div className="post-content">{item.content}</div>
              <div className="post-actions">
                <div className="post-like">
                  <img
                    src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/2x/external-like-instagram-flatart-icons-outline-flatarticons.png"
                    alt="likes-icon"
                  />
                  <span>{item.likes.length}</span>
                </div>
                <div className="post-comments-icon">
                  <img
                    src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/2x/external-comment-chat-flatart-icons-outline-flatarticons-2.png"
                    alt="comments-icon"
                  />
                  <span> {item.comments.length} </span>
                </div>
              </div>
              <div className="post-comment-box">
                <input type="text" placeholder="start typing comment" />
              </div>
              <div className="post-comments-list">
                <div className="post-comments-item">
                  <div className="post-comment-header">
                    <span className="post-comment-auther">Bill</span>
                    <span className="post-comment-time">a minute ago</span>
                    <span className="post-comment-likes">23</span>
                  </div>
                  <div className="post-comment-content">random comment</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
// defind a propType.
PostList.proTypes = {
  posts: proTypes.array.isRequired,
};

export default PostList;
