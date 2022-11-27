import { Box, CircularProgress, TextareaAutosize, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../auth/authSlice';
import { showMessage } from '../../snackbar/snackbarSlice';
import { createAComment } from '../bidsSlice';
import { findCommentsUniquely } from '../helpers/generalHepers';

const Comment = ({ currentClientInfo, onCommentListChange, comment, onCommentsChange }) => {
  const { comments, isMessageLoading } = useSelector((state) => state.bids);
  const { user } = useSelector(authSelector);

  const dispatch = useDispatch();

  const handleCommentSubmission = () => {
    if (comment.trim() === '') {
      return dispatch(
        showMessage({
          message: `Cannot Post Empty Comment.`,
          severity: 'error'
        })
      );
    }
    dispatch(createAComment({ comment, token: user.token, id: currentClientInfo._id }));
    onCommentsChange('');
  };

  useEffect(() => {
    onCommentListChange(
      findCommentsUniquely(comments, currentClientInfo && currentClientInfo.name)
    );
  }, [comments, currentClientInfo]);
  return (
    <>
      <Box>
        <Typography sx={{ mt: 3, flex: 1, fontSize: '16px', ml: 3 }} variant='h6' component='div'>
          Comments
        </Typography>
        {currentClientInfo?.comments?.map((individualComment, idx) => {
          return (
            <Box key={individualComment._id}>
              <Box
                sx={{
                  mt: idx === 0 ? 1 : 3,
                  ml: 1,
                  border: '1px solid lightgray',
                  borderRadius: '20px'
                }}>
                <Typography
                  sx={{
                    ml: 2,
                    mt: 1,
                    flex: 1,
                    fontSize: '16px',
                    fontWeight: '800',
                    color: '#F66E8D'
                  }}
                  variant='h6'
                  component='div'>
                  {individualComment.userName}
                </Typography>
                <Typography
                  sx={{ ml: 2, mb: 1, flex: 1, fontSize: '14px' }}
                  variant='h3'
                  component='div'>
                  {individualComment.comment}
                </Typography>
              </Box>
              <Typography
                sx={{
                  float: 'right',
                  fontSize: '12px',
                  color: 'gray',
                  marginRight: '10px',
                  marginTop: '5px'
                }}
                variant='h2'
                component='div'>
                {new Date(individualComment.timestamp)?.toString()?.slice(0, 24)}
              </Typography>
            </Box>
          );
        })}
        <TextareaAutosize
          minRows={4}
          aria-label='maximum height'
          placeholder='Type your comment here'
          style={{
            width: '98.8%',
            borderRadius: '15px',
            marginLeft: '11px',
            marginTop: '5px',
            border: '1px solid lightgray',
            padding: '5px 10px',
            fontWeight: '600'
          }}
          value={comment}
          onChange={(e) => onCommentsChange(e.target.value)}
        />
        <Button
          sx={{ ml: 1, mt: 1 }}
          variant='contained'
          color='primary'
          disabled={isMessageLoading}
          onClick={handleCommentSubmission}>
          {isMessageLoading ? <CircularProgress size={20} /> : 'Comment'}
        </Button>
      </Box>
    </>
  );
};

export default Comment;
