import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLike } from "react-icons/ai";
import { TfiCommentAlt } from "react-icons/tfi";
import { RxLoop } from "react-icons/rx";
import { IoIosSend } from "react-icons/io";
import { AiTwotoneLike } from "react-icons/ai";
import { Col, Row } from "react-bootstrap";
import { getPostAction, getUserProfileApi } from "../redux/actions";
import { useEffect } from "react";

const LikeAndUnlike = (props) => {
  const userProfileAPIRS = useSelector((state) => state.userDataAPI.stock);
  console.log(userProfileAPIRS)
  const dispatch = useDispatch();

  const toggleLikes = async (postID, userID) => {
    console.log(postID, userID);
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
      dispatch(getPostAction());
    } catch (error) {
      console.log(error);
    }
  };

  const isLikedByUser = props.singlePost?.likes.some(
    (like) => like.toString() === userProfileAPIRS._id?.toString()
  );

  const handleLikeClick = () => {
    toggleLikes(props.singlePost?._id, userProfileAPIRS?._id);
  };

  const handleUnlikeClick = () => {
    toggleLikes(props.singlePost?._id, userProfileAPIRS?._id);
  };

  const showComments = () => {
    let comment = document.getElementById(`${props.singlePost._id}`);
    comment.classList.remove("comment-section");
    comment.classList.add(".comment-sectionShow");
  };

  return (
    <div className="card-footer p-0">
      <Row className="justify-content-center align-items-center">
        <Col className="text-center comment-box pt-2">
          {isLikedByUser ? (
            <button className="comment-box-btn ml-3" onClick={handleLikeClick}>
              <AiTwotoneLike className="comment-box-btn-icon  mr-1" />
              Unlike
            </button>
          ) : (
            <button
              className="comment-box-btn ml-3"
              onClick={handleUnlikeClick}
            >
              <AiOutlineLike className="comment-box-btn-icon  mr-1" />
              Like
            </button>
          )}
        </Col>
        <Col className="text-center comment-box pt-2">
          <button className="comment-box-btn" onClick={showComments}>
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
