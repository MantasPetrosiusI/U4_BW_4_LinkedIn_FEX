import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Form,
  Modal,
  Row,
  Col,
  Alert,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import {
  deletePostAction,
  getPostAction,
  sendPostAsyncAction,
} from "../redux/actions";
import { format, formatDistanceToNow } from "date-fns";
import { parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { BsTrashFill, BsUpload } from "react-icons/bs";
import LikeAndUnlike from "./LikeAndUnlike";
import { AiOutlineSmile } from "react-icons/ai";
import { HiOutlinePhoto } from "react-icons/hi2";

const NewsFeedMiddle = () => {
  const userProfileAPIRS = useSelector((state) => state.userDataAPI.stock);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();
  const [successful, setSuccessful] = useState(false);
  const handleCloseSuccessful = () => setSuccessful(false);
  const handleShowSuccessful = () => setSuccessful(true);
  const [deleted, setDeleted] = useState(false);
  const handleCloseDeleted = () => setDeleted(false);
  const handleShowDeleted = () => setDeleted(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [post, setPost] = useState({
    text: "",
    user: "",
    image: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleFile(event) {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  }

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const [comment, setComment] = useState("");

  const postComment = async (postId) => {
    try {
      const res = await fetch(
        process.env.REACT_APP_BE_URL + `/posts/${postId}/comments`,
        {
          method: "POST",
          body: JSON.stringify({
            comment: comment,
            user: userProfileAPIRS._id,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.ok) {
        setComment("");
        dispatch(getPostAction());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getPostAction());
    console.log(postsArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allPosts = useSelector((state) => state.getPosts.content);
  const postsArray = allPosts.posts;

  return (
    <>
      <Card id="news-feed-mid-section">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <img
              src={userProfileAPIRS && userProfileAPIRS.image}
              alt="profile"
              className="profile-middle m-2"
            ></img>
            <Button
              className="w-100 m-3 post-button"
              onClick={() => {
                handleShow();
              }}
            >
              <span>Start a post</span>
            </Button>
          </div>
          <div className="d-flex justify-content-around mb-3">
            <Button className="d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-supported-dps="24x24"
                fill="currentColor"
                className="svg-photo"
                width="24"
                height="24"
                focusable="false"
              >
                <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
              </svg>
              <span>Photo</span>
            </Button>
            <Button className="d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-supported-dps="24x24"
                fill="currentColor"
                className="svg-video"
                width="24"
                height="24"
                focusable="false"
              >
                <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm-9 12V8l6 4z"></path>
              </svg>
              <span>Video</span>{" "}
            </Button>
            <Button className="d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-supported-dps="24x24"
                fill="currentColor"
                className="svg-event"
                width="24"
                height="24"
                focusable="false"
              >
                <path d="M3 3v15a3 3 0 003 3h12a3 3 0 003-3V3zm13 1.75A1.25 1.25 0 1114.75 6 1.25 1.25 0 0116 4.75zm-8 0A1.25 1.25 0 116.75 6 1.25 1.25 0 018 4.75zM19 18a1 1 0 01-1 1H6a1 1 0 01-1-1V9h14zm-5.9-3a1 1 0 00-1-1H12a3.12 3.12 0 00-1 .2l-1-.2v-3h3.9v1H11v1.15a3.7 3.7 0 011.05-.15 1.89 1.89 0 012 1.78V15a1.92 1.92 0 01-1.84 2H12a1.88 1.88 0 01-2-1.75 1 1 0 010-.25h1a.89.89 0 001 1h.1a.94.94 0 001-.88z"></path>
              </svg>
              <span>Event</span>
            </Button>
            <Button className="d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-supported-dps="24x24"
                fill="currentColor"
                className="svg-article"
                width="24"
                height="24"
                focusable="false"
              >
                <path d="M21 3v2H3V3zm-6 6h6V7h-6zm0 4h6v-2h-6zm0 4h6v-2h-6zM3 21h18v-2H3zM13 7H3v10h10z"></path>
              </svg>
              <span>Write artice</span>
            </Button>
          </div>
        </div>
      </Card>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        id="modal-post-news"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column mx-2 my-2">
            <div className="d-flex">
              <img
                src={userProfileAPIRS && userProfileAPIRS.image}
                alt="profile"
                className="profile-middle m-2"
              ></img>
              <div>
                <p>
                  <strong>
                    {userProfileAPIRS && userProfileAPIRS.name}{" "}
                    {userProfileAPIRS && userProfileAPIRS.surname}
                  </strong>
                </p>
              </div>
            </div>
            <div className="form-outline">
              <Form>
                <Form.Group className="form-outline">
                  <br></br>
                  <Form.Control
                    id="textAreaExample"
                    as="textarea"
                    rows={10}
                    value={post.text}
                    onChange={(e) => {
                      setPost({
                        ...post,
                        user: userProfileAPIRS._id,
                        text: e.target.value,
                      });
                    }}
                  />

                  <label className="form-label" htmlFor="textAreaExample">
                    <p className="mb-5 pb-5">Post content!</p>
                  </label>
                </Form.Group>
              </Form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            name="file"
            onChange={handleFile}
          />
          <Button
            id="profile-pic-update-buttons  "
            className="p-2 text-light mr-1 button-to-style mx-3"
            onClick={handleClick}
          >
            <BsUpload id="button-to-style"></BsUpload>
            <span className="ml-2">IMG</span>
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(sendPostAsyncAction(post, file));
              dispatch(getPostAction());
              handleClose();
              navigate("/feed");
              setPost({ text: "" });
              handleShowSuccessful();
              //   dispatch(getPostAction());
            }}
          >
            POST
          </Button>
        </Modal.Footer>
        {file && (
          <Alert variant="success" className="mb-3">
            You selected:{" "}
            <strong>
              <em>{file.name}</em>
            </strong>{" "}
            <span className="ml-5">
              Press <strong>POST</strong> to proceed
            </span>
          </Alert>
        )}
      </Modal>
      {postsArray &&
        postsArray
          .slice(Math.max(postsArray.length - 5, 0))
          .reverse()
          .map((singlePost, i) => {
            return (
              <Row className="flex-column-reverse" key={singlePost._id}>
                <Col>
                  <Card id="news-feed-mid-section-lower" className="my-3">
                    <div className="d-flex flex-column mx-2 my-2">
                      <div className="d-flex">
                        <img
                          src={singlePost && singlePost.user.image}
                          alt="profile"
                          className="profile-middle m-2"
                        ></img>
                        <div>
                          <p className="comment-name">
                            {singlePost.user.name} {singlePost.user.surname}
                          </p>
                          <p className="comment-title">
                            {singlePost.user.title}
                          </p>
                          <p className="comment-time">
                            Date Posted:{" "}
                            {format(
                              parseISO(singlePost.createdAt),
                              "PPP ' 'HH':'m"
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="mx-3 my-5">{singlePost.text}</div>
                      {singlePost.image && (
                        <div>
                          <img
                            src={singlePost.image}
                            alt=""
                            className="image-post"
                          />
                        </div>
                      )}
                    </div>
                    <div className="parent-button-delete-post d-flex justify-content-end">
                      <div className="text-center">
                        <Button
                          className="button-edit-post pl-3 mb-3"
                          onClick={() => navigate(`/posts/${singlePost._id}`)}
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </Button>
                      </div>
                      <div className="text-center">
                        <Button
                          className="button-delete-post pl-3 mb-3"
                          onClick={() => {
                            dispatch(deletePostAction(singlePost._id));
                            handleShowDeleted();
                          }}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </Button>
                      </div>
                    </div>
                    <LikeAndUnlike singlePost={singlePost} i={i}>
                      {console.log(postsArray)}
                    </LikeAndUnlike>
                    <div>
                      <Row className=" d-flex align-items-center mx-2 mt-2">
                        <div className="col-1">
                          <img
                            src={userProfileAPIRS.image}
                            alt="user profile"
                            className="comment-profile-img"
                          />
                        </div>
                        <div className="col">
                          <InputGroup>
                            <FormControl
                              placeholder="Add a comment..."
                              aria-label="Add a comment..."
                              value={comment}
                              aria-describedby="basic-addon2"
                              onChange={(e) => setComment(e.target.value)}
                            />
                            <InputGroup.Append>
                              <Button variant="outline-secondary">
                                <AiOutlineSmile />
                              </Button>
                              <Button variant="outline-secondary">
                                <HiOutlinePhoto />
                              </Button>
                            </InputGroup.Append>
                          </InputGroup>
                          {comment.length > 0 && (
                            <Button
                              variant={"primary"}
                              onClick={() => {
                                postComment(singlePost._id);
                              }}
                              style={{
                                marginTop: 8,
                                marginLeft: 44,
                                fontSize: 12,
                                paddingBlock: 2,
                                paddingInline: 12,
                              }}
                            >
                              Post
                            </Button>
                          )}
                        </div>
                      </Row>
                      <hr />
                      <>
                        {singlePost.comments.length > 0 &&
                          singlePost.comments.map((c) => {
                            return (
                              <div key={c._id} className="comment-row d-flex">
                                <div className="col-1 ml-1 comment-profile-img">
                                  <img src={c.user?.image} alt="..." />
                                </div>
                                <div className="col ml-1 comment-body my-1 mx-2">
                                  <div className="d-flex justify-content-between mt-2">
                                    <p className="comment-name">
                                      {c.user?.name} {c.user?.surname}
                                    </p>
                                    <span>
                                      <span className="comment-time mr-3">
                                        {formatDistanceToNow(
                                          new Date(c.updatedAt),
                                          { addSuffix: true }
                                        )}
                                      </span>
                                      {userProfileAPIRS._id === c.user?._id && (
                                        <span
                                          className="comment-delete"
                                          onClick={async () => {
                                            try {
                                              const res = await fetch(
                                                `${process.env.REACT_APP_BE_URL}/posts/${singlePost._id}/comments/${c._id}`,
                                                { method: "DELETE" }
                                              );
                                              if (res.ok) {
                                                dispatch(getPostAction());
                                              }
                                            } catch (error) {
                                              console.log(error);
                                            }
                                          }}
                                        >
                                          <BsTrashFill
                                            size={14}
                                            fill="rgba(0,0,0,0.5)"
                                            className="bin"
                                          />
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                  <p className="comment-title mb-1">
                                    {c.user?.title}
                                  </p>
                                  <p className="comment-text mb-2">
                                    {c.comment}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                      </>
                    </div>
                  </Card>
                </Col>
              </Row>
            );
          })}

      {/* Successful Modal */}
      <Modal show={successful} onHide={handleCloseSuccessful}>
        <Alert variant="success" className="text-center">
          Successfully Posted !!
        </Alert>
      </Modal>

      {/* Deleted Modal */}
      <Modal show={deleted} onHide={handleCloseDeleted}>
        <Alert variant="warning" className="text-center">
          Deleted
        </Alert>
      </Modal>
    </>
  );
};

export default NewsFeedMiddle;
