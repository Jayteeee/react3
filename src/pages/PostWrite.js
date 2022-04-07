import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);
  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;
  const _post = is_edit ? post_list.find((p) => p.id === post_id) : null;
  const [contents, setContents] = React.useState(_post ? _post.contents : "");
  const [layout, setLayout] = React.useState(_post ? _post.layout : "center");

  const { history } = props;

  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      history.goBack();

      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }

    return () => {
      dispatch(imageActions.setPreview(null));
    }

  }, []);

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addPost = () => {
    dispatch(postActions.addPostFB(contents, layout));
  };

  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, { contents: contents, layout }));
  };

  const is_checked = (e) => {
    if(e.target.value) {
      setLayout(e.target.value);
    }
  }

  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗! 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          _onClick={() => {
            history.replace("/");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="0px 0px 10px 0px" size="36px" bold>
          {is_edit ? "게시글 수정" : "게시글 작성"}
        </Text>
        <Upload />
        <Text margin="20px 0px" size="24px" bold>
          레이아웃 설정
        </Text>
        <Grid>
          <input type="radio" id="left" name="layout" value="left" onClick={is_checked}/>
          <label htmlFor="left">왼쪽 이미지</label>

          <input type="radio" id="center" name="layout" value="center" onClick={is_checked}/>
          <label htmlFor="center">가운데 이미지</label>

          <input type="radio" id="right" name="layout" value="right" onClick={is_checked}/>
          <label htmlFor="right">오른쪽 이미지</label>
        </Grid>
      </Grid>

      <Grid>
        <Grid padding="16px">
          <Input
            value={contents}
            _onChange={changeContents}
            label="게시글 내용"
            placeholder="게시글 작성"
            multiLine
          />
        </Grid>
      </Grid>
      <Grid padding="16px">
        <Text margin="0px" size="24px" bold>
            미리보기
        </Text>

      {layout === "left"?
      <Grid is_flex>
        <Image
          half
          shape="big_squre"
          src={preview ? preview : "http://via.placeholder.com/400x300"}
        />
        <Text margin = "10px">{contents}</Text>
      </Grid>:null}
      
      {layout === "center"?
      <Grid is_flex column width="50%">
        <Text margin = "10px">{contents}</Text>
        <Image
          center
          shape="big_squre"
          src={preview ? preview : "http://via.placeholder.com/400x300"}
        />
      </Grid>:null}

      {layout === "right"?
        <Grid is_flex>
          <Text margin = "10px">{contents}</Text>
          <Image
            half
            shape="big_squre"
            src={preview ? preview : "http://via.placeholder.com/400x300"}
          />
        </Grid>:null}

      </Grid>

      <Grid padding="16px">
        {is_edit ? (
          <Button text="게시글 수정" _onClick={editPost} _disabled={!preview || contents === "" ? true : false}></Button>
        ) : (
          <Button text="게시글 작성" _onClick={addPost} _disabled={!preview || contents === "" ? true : false}></Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
