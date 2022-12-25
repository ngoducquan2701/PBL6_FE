import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import baseURL from '../../api/request';
import './singlePost.css';
import { Context } from '../../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare, faTrash
} from '@fortawesome/free-solid-svg-icons';

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState({});
  const [state] = useContext(Context);
  const {user} = state;
  const PF = "https://quanvn.click/images/";
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
 
  useEffect(() => {
    const getPost = async () => {
      const posts = await baseURL.get('posts/' + path);
      setPost(posts.data);
      setTitle(posts.data.title);
      setDesc(posts.data.desc);
    };

    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await baseURL.delete('posts/' + path, {data: {username: user.username}})
      window.location.replace("/")
    } catch (e) {}
  };

  const handleUpdate = async () => {
    try {
      await baseURL.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <FontAwesomeIcon className="singlePostIcon" style={{color: '#7171cf'}} icon={faPenToSquare} onClick={() => setUpdateMode(true)}/>
                <FontAwesomeIcon className="singlePostIcon" style={{marginRight: '12px', color: '#d55f5f'}} icon={faTrash} onClick={handleDelete}/>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
