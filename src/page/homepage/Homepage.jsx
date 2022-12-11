import { useLocation } from "react-router";
import { useState, useEffect } from "react";

import baseURL from '../../api/request'
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import '../../assets/styles/home.css';

export default function Homepage() {
  const [posts, setPost] = useState([]);
  const {search} = useLocation();

  useEffect(() => {
    const fetchPosts =  async () => {
      const res = await baseURL.get('posts' + search)
      
      setPost(res.data)
    }

    fetchPosts()
  }, [search])
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts}/>
        <Sidebar />
      </div>
    </>
  );
}
