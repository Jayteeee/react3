import React from "react";
import { Grid, Image, Text, Button } from "../elements";

import {history} from "../redux/configureStore";
import { useDispatch } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";

 const Post = (props) => {
  const dispatch = useDispatch();

  const deletePost = () => {
    dispatch(postActions.deletePostFB(props.id));
  };

  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
            {props.is_me && (
              <Grid>
              <Button width="auto" margin="4px" padding="4px" _onClick={() => {
                history.push(`/write/${props.id}`);
              }}>
                수정
              </Button>
              <Button width="auto" margin="4px" padding="4px" _onClick={deletePost}>
                삭제
              </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
        {props.layout === "left"?
      <Grid is_flex>
        <Image
          half
          shape="big_squre"
          src={props.image_url}
        />
        <Text margin = "10px">{props.contents}</Text>
      </Grid>:null}
      
      {props.layout === "center"?
      <Grid is_flex column width="50%">
        <Text margin = "10px">{props.contents}</Text>
        <Image
          center
          shape="big_squre"
          src={props.image_url}
        />
      </Grid>:null}

      {props.layout === "right"?
        <Grid is_flex>
          <Text margin = "10px">{props.contents}</Text>
          <Image
            half
            shape="big_squre"
            src={props.image_url}
          />
        </Grid>:null}
        <Grid padding="16px">
          {history.location.pathname === "/"?
            <Text margin="0px" bold  _onClick={() => {history.push(`/post/${props.id}`)}}>
            댓글 {props.comment_cnt}개 모두보기
          </Text> :
          <Text margin="0px" bold>
          댓글 {props.comment_cnt}개
        </Text>}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "mean0",
    user_profile: "https://previews.123rf.com/images/aquir/aquir1311/aquir131100316/23569861-sample-grunge-red-round-stamp.jpg",
  },
  image_url: "https://previews.123rf.com/images/aquir/aquir1311/aquir131100316/23569861-sample-grunge-red-round-stamp.jpg",
  contents: "고양이네요!",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
};

export default Post;
