import React from 'react';
import proTypes from 'prop-types';
class PostList extends React.Component {
  render() {
    // console.log('this.props.posts', this.props);
    const { posts } = this.props;
    return (
      <div>
        <div className="posts-list">
          {posts.map((item, idx) => {
            return (
              <div className="post-wrapper" key={idx}>
                <div className="post-header">
                  <div className="post-avatar">
                    <img src="#" alt="avatar" />
                    <div>
                      {' '}
                      <span className="post-auther">{item.user.name}</span>
                      <span className="post-auther">a minute ago</span>
                    </div>
                  </div>
                  <div className="post-content">{item.content}</div>
                  <div className="post-actions">
                    <div className="post-like">
                      <img src="" alt="post-like-img" />
                      <span>
                        {' '}
                        {item.likes.length}
                        {'_   '}
                      </span>
                    </div>
                    <div className="post-comments">
                      <img src="" alt="post-comment-img" />
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
      </div>
    );
  }
}
// defind a propType.
PostList.proTypes = {
  posts: proTypes.array.isRequired,
};

export default PostList;
