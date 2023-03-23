import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLike } from "react-icons/ai";
import { TfiCommentAlt } from "react-icons/tfi";
import { RxLoop } from "react-icons/rx";
import { IoIosSend } from "react-icons/io";
import { AiTwotoneLike } from "react-icons/ai";
import { likeAction, unlikeAction } from "../redux/actions";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

const LikeAndUnlike = (props) => {
  const userProfileAPIRS = useSelector((state) => state.userDataAPI.stock);
  console.log(userProfileAPIRS._id)
  const [isLike, setLike] = useState(false);

  const toggleLikes = async (postID, userID) => {
    const likeBody = {
      userID: userID
    }
    try {
      let res = await fetch(process.env.REACT_APP_BE_URL + `/posts/${postID}/like`, {
        method: "PUT",
        body: JSON.stringify(likeBody),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
      console.log(await res.json())
    } catch (error) {
      console.log(error)
    }

  }
  console.log(props.singlePost)

  return (
    <div className="card-footer p-0">
      <Row className="justify-content-center align-items-center">
        <Col className="text-center comment-box pt-2">
          {isLike ? (
            <button
              className="comment-box-btn ml-3"
              onClick={() => {
                toggleLikes(props.singlePost._id, userProfileAPIRS._id);
                setLike(false)
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
                setLike(true)
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
