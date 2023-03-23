import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLike } from "react-icons/ai";
import { TfiCommentAlt } from "react-icons/tfi";
import { RxLoop } from "react-icons/rx";
import { IoIosSend } from "react-icons/io";
import { AiTwotoneLike } from "react-icons/ai";
import { Col, Row } from "react-bootstrap";
import { getPostAction } from "../redux/actions";
import { useEffect, useState } from "react";
import {
  deletePostAction,
  getPostAction,
  sendPostAsyncAction,
} from "../redux/actions";

const LikeAndUnlike = (props) => {
  const userProfileAPIRS = useSelector((state) => state.userDataAPI.stock);

  const toggleLikes = async (postID, userID) => {
    const likeBody = {
      userID: userID,
    };
    try {
      let res = await fetch(
        process.env.REACT_APP_BE_URL + `/posts/${postID}/like`,
        {
          method: "PUT",
          body: JSON.stringify(likeBody),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      );
      let data = await res.json();
      dispatch(getPostAction());
    } catch (error) {
      console.log(error);
    }
  };
  const dispatch = useDispatch();

  return (
    <div className="card-footer p-0">
      <Row className="justify-content-center align-items-center">
        <Col className="text-center comment-box pt-2">
          {props.singlePost.likes.some(
            (e) => e._id === userProfileAPIRS._id
          ) ? (
            <button
              className="comment-box-btn ml-3"
              onClick={() => {
                toggleLikes(props.singlePost._id, userProfileAPIRS._id);
              }}
            >
              <AiTwotoneLike className="comment-box-btn-icon  mr-1" />
              Unlike
            </button>
          ) : (
            <button
              className="comment-box-btn ml-3"
              onClick={() => {
                toggleLikes(props.singlePost._id, userProfileAPIRS._id);
              }}
            >
              <AiOutlineLike className="comment-box-btn-icon  mr-1" />
              Like
            </button>
          )}
        </Col>
        <Col className="text-center comment-box pt-2">
          <button className="comment-box-btn">
            <TfiCommentAlt className="comment-box-btn-icon  mr-1" /> Comment
          </button>
        </Col>
        <Col className="text-center comment-box pt-2">
          <button className="comment-box-btn">
            <RxLoop className="comment-box-btn-icon mr-1" /> Repost
          </button>
        </Col>
        <Col className="text-center comment-box pt-2">
          <button className="comment-box-btn mr-3">
            <IoIosSend className="comment-box-btn-icon  mr-1" /> Send
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default LikeAndUnlike;
