import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux'; // connects components to redux store provided by provider component
import { fetchPosts } from '../actions/postActions';

class Posts extends Component {

  //React life cycle methods
  componentWillMount(){
    this.props.fetchPosts();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.newPost){
      this.props.posts.unshift(nextProps.newPost); // add new prop(element) to array
    }
  }



  render() {
      //JSX mapping posts
      const postItems = this.props.posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
      ))
    return (
      <div>
        <h1>Posts</h1>
        {postItems}
      </div>
    )
  }
}

Posts.propTypes = {
  fetchPosts: propTypes.func.isRequired,
  posts: propTypes.array.isRequired,
  newPost: propTypes.object
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item
});

export default connect(mapStateToProps, { fetchPosts }) (Posts);