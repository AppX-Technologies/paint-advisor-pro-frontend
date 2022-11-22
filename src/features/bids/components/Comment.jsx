import { Box, TextareaAutosize, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAComment } from '../bidsSlice';
import { findCommentsUniquely } from '../helpers/generalHepers';

const Comment = ({ currentClientInfo, onCommentListChange, commentList }) => {
  const { comments } = useSelector((state) => state.bids);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleCommentSubmission = () => {
    dispatch(createAComment({ customerName: currentClientInfo.customerName, comment }));
    setComment('');
  };

  useEffect(() => {
    onCommentListChange(
      findCommentsUniquely(comments, currentClientInfo && currentClientInfo.customerName)
    );
  }, [comments, currentClientInfo]);
  return (
    <>
      <Box>
        <Typography sx={{ mt: 1, flex: 1, fontSize: '16px', ml: 3 }} variant='h6' component='div'>
          Comments
        </Typography>
        {commentList &&
          commentList.map((info, idx) => {
            return (
              <>
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
                    {info.customerName}
                  </Typography>
                  <Typography
                    sx={{ ml: 2, mb: 1, flex: 1, fontSize: '14px' }}
                    variant='h3'
                    component='div'>
                    {info.comment}
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
                  On November 11th 2022,12:34 pm
                </Typography>
              </>
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
            border: '1px solid lightgray'
          }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          sx={{ ml: 1, mt: 1 }}
          variant='contained'
          color='primary'
          onClick={handleCommentSubmission}>
          Comment
        </Button>
      </Box>
    </>
  );
};

export default Comment;
